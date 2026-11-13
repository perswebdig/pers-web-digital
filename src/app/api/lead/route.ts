import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/lead — captura de leads de todos os formulários do site.
 *
 * Fluxo:
 *  1. Validação server-side com Zod (nunca confie só no front).
 *  2. Rate limit simples em memória por IP.
 *  3. Persistência/forwarding opcional, nesta ordem:
 *     - LEAD_WEBHOOK_URL  → n8n, Make, Zapier, Google Sheets (Apps Script), RD Station
 *     - HUBSPOT_API_KEY + HUBSPOT_PORTAL_ID → cria contato/companhia no HubSpot
 *     - RESEND_API_KEY + LEAD_NOTIFY_EMAIL  → e-mail de notificação para o comercial
 *  4. Log estruturado no runtime da Vercel (sempre, como trilha de auditoria).
 *
 * Sem nenhuma dessas variáveis configurada, o lead ainda é registrado nos
 * logs — útil em homologação, mas configure ao menos o webhook antes do go-live.
 */

const leadSchema = z.object({
  name: z.string().min(2).max(90),
  email: z.string().email(),
  phone: z
    .string()
    .min(10)
    .max(18)
    .regex(/^[0-9()+\-\s.]+$/),
  company: z.string().min(2).max(120),
  service: z.string().min(1).max(60),
  message: z.string().max(1200).optional().or(z.literal("")),
  purpose: z.string().max(60).default("site"),
  source: z.string().max(200).optional(),
  website: z.string().max(0).optional(), // honeypot
});

const SERVICE_LABELS: Record<string, string> = {
  "consultoria-ti": "Consultoria em TI",
  "servidores-e-cloud": "Servidores e Cloud",
  "redes-e-firewall": "Redes e Firewall",
  "backup-e-seguranca": "Backup e Segurança",
  "suporte-ti-empresas": "Suporte TI para Empresas",
  "criacao-de-sites": "Criação de Sites",
  "landing-pages": "Landing Pages",
  "aplicativos-mobile": "Aplicativos Mobile",
  outro: "Ainda não sabe",
};

const attempts = new Map<string, { count: number; at: number }>();
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Corpo do e-mail de notificação ao comercial, com escape de HTML */
function buildNotifyHtml(rows: [string, string][]) {
  const items = rows
    .map(([label, value]) => `<li><strong>${label}:</strong> ${escapeHtml(String(value))}</li>`)
    .join("");
  return `<h2>Novo lead pelo site</h2><ul>${items}</ul>`;
}
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.at > WINDOW_MS) {
    attempts.set(ip, { count: 1, at: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        error:
          "Muitas tentativas em sequência. Aguarde alguns minutos ou fale com a gente pelo WhatsApp.",
      },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Confira os campos obrigatórios: nome, e-mail válido, telefone e empresa." },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot preenchido: finge sucesso e descarta silenciosamente
  if (lead.website) {
    return NextResponse.json({
      ok: true,
      message: "Recebido! Um consultor entra em contato em breve.",
    });
  }

  const record = {
    ...lead,
    serviceLabel: SERVICE_LABELS[lead.service] ?? lead.service,
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    referrer: request.headers.get("referer") ?? "",
  };

  console.log("[lead]", JSON.stringify(record));

  const integrations: Promise<void>[] = [];

  // 1) Webhook genérico (n8n / Make / Zapier / Google Sheets / RD Station)
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    integrations.push(
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).then(() => undefined),
    );
  }

  // 2) HubSpot
  if (process.env.HUBSPOT_API_KEY && process.env.HUBSPOT_PORTAL_ID) {
    integrations.push(
      fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            email: lead.email,
            firstname: lead.name.split(" ")[0],
            lastname: lead.name.split(" ").slice(1).join(" "),
            phone: lead.phone,
            company: lead.company,
            hs_lead_status: "NEW",
            hs_object_source_detail_1: lead.purpose,
            property_lead_context: record.serviceLabel,
          },
        }),
      }).then(() => undefined),
    );
  }

  // 3) Notificação por e-mail (Resend)
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    integrations.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM_EMAIL ?? "site@perswebdigital.com.br",
          to: [process.env.LEAD_NOTIFY_EMAIL],
          reply_to: lead.email,
          subject: `Novo lead: ${lead.company} — ${record.serviceLabel}`,
          html: buildNotifyHtml([
            ["Nome", lead.name],
            ["Empresa", lead.company],
            ["E-mail", lead.email],
            ["Telefone", lead.phone],
            ["Serviço", record.serviceLabel],
            ["Mensagem", lead.message || "—"],
            ["Origem", `${lead.purpose} em ${lead.source ?? "/"}`],
            ["Recebido", record.receivedAt],
          ]),
        }),
      }).then(() => undefined),
    );
  }

  const results = await Promise.allSettled(integrations);
  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length) {
    console.error("[lead] integração falhou", failed.map((f) => (f as PromiseRejectedResult).reason));
  }

  return NextResponse.json({
    ok: true,
    message:
      "Recebido! Um consultor entra em contato pelo telefone ou e-mail informado em até 1 hora útil.",
  });
}
