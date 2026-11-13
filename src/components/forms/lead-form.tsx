"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, waLink } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { services } from "@/data/catalog";

const schema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome completo.")
    .max(90, "Nome muito longo."),
  email: z.string().email("E-mail inválido. Confira o @ e o domínio."),
  phone: z
    .string()
    .min(10, "Telefone com DDD, por favor.")
    .max(18, "Telefone muito longo.")
    .regex(/^[0-9()+\-\s.]+$/, "Use apenas números, DDD e símbolos de telefone."),
  company: z.string().min(2, "Informe o nome da empresa."),
  service: z.string().min(1, "Escolha o serviço que você precisa."),
  message: z.string().max(1200, "Máximo de 1.200 caracteres.").optional(),
  website: z.string().max(0).optional(), // honeypot anti-spam
});

type FormValues = z.infer<typeof schema>;

const fieldBase =
  "w-full rounded-xl border bg-white px-4 text-[0.98rem] text-navy-900 placeholder:text-ink-muted/70 transition-colors focus:border-tech-500 focus:outline-none focus:ring-2 focus:ring-tech-500/30";

export function LeadForm({
  purpose = "site",
  compact = false,
  defaultService = "",
  tone = "light",
  ctaLabel = "Quero o diagnóstico gratuito",
  microcopy = "Resposta em até 1 hora útil · Sem compromisso",
  className,
}: {
  purpose?: string;
  compact?: boolean;
  defaultService?: string;
  tone?: "light" | "dark";
  ctaLabel?: string;
  microcopy?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService, name: "", email: "", phone: "", company: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (values.website) return; // spam silencioso
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, purpose, source: window.location.pathname }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error ?? "Não foi possível enviar agora.");

      setStatus("success");
      setServerMessage(data?.message ?? "");
      reset();
      track("generate_lead", {
        purpose,
        service: values.service,
        form: compact ? "compact" : "full",
        path: window.location.pathname,
      });
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof Error
          ? error.message
          : "Falha de conexão. Tente novamente ou chame no WhatsApp.",
      );
      track("form_submit", { purpose, status: "error" });
    }
  });

  if (status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl border p-6 sm:p-7",
          tone === "dark" ? "border-white/15 bg-white/[0.07]" : "border-success/25 bg-success/5",
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className={cn("mt-0.5 h-6 w-6 shrink-0", tone === "dark" ? "text-aqua-300" : "text-success")} />
          <div>
            <p className={cn("text-lg font-bold", tone === "dark" ? "text-white" : "text-navy-900")}>
              Recebido! Já estamos analisando seu caso.
            </p>
            <p className={cn("mt-1.5 text-sm leading-6", tone === "dark" ? "text-navy-200" : "text-ink-soft")}>
              {serverMessage ||
                "Um consultor entra em contato pelo telefone ou e-mail informado em até 1 hora útil, no horário comercial. Se preferir acelerar, fale agora mesmo no WhatsApp."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="sm" variant="whatsapp" whatsapp="obrigado" event="whatsapp_click" eventParams={{ location: "form_success" }}>
                Chamar no WhatsApp
              </Button>
              <Button
                size="sm"
                variant={tone === "dark" ? "on-dark" : "secondary"}
                onClick={() => setStatus("idle")}
              >
                Enviar outra mensagem
              </Button>
            </div>
          </div>
        </div>
      </m.div>
    );
  }

  const labelClass = cn(
    "mb-1.5 block text-sm font-semibold",
    tone === "dark" ? "text-navy-100" : "text-navy-800",
  );
  const errorClass = "mt-1.5 flex items-center gap-1.5 text-xs font-medium text-aqua-300";
  const borderColor = tone === "dark" ? "border-white/15" : "border-navy-200";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("space-y-4", className)}
      aria-label="Formulário de contato para diagnóstico gratuito"
    >
      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor={`${purpose}-name`} className={labelClass}>
            Nome completo
          </label>
          <input
            id={`${purpose}-name`}
            autoComplete="name"
            placeholder="Maria Silva"
            className={cn(fieldBase, borderColor, "h-11", errors.name && "border-danger")}
            {...register("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${purpose}-name-error` : undefined}
          />
          {errors.name ? (
            <p id={`${purpose}-name-error`} className={errorClass} role="alert">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${purpose}-company`} className={labelClass}>
            Empresa
          </label>
          <input
            id={`${purpose}-company`}
            autoComplete="organization"
            placeholder="Nome da sua empresa"
            className={cn(fieldBase, borderColor, "h-11", errors.company && "border-danger")}
            {...register("company")}
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company ? (
            <p className={errorClass} role="alert">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.company.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${purpose}-email`} className={labelClass}>
            E-mail corporativo
          </label>
          <input
            id={`${purpose}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="maria@empresa.com.br"
            className={cn(fieldBase, borderColor, "h-11", errors.email && "border-danger")}
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className={errorClass} role="alert">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${purpose}-phone`} className={labelClass}>
            Telefone / WhatsApp
          </label>
          <input
            id={`${purpose}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 91234-5678"
            className={cn(fieldBase, borderColor, "h-11", errors.phone && "border-danger")}
            {...register("phone")}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? (
            <p className={errorClass} role="alert">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className={compact ? "sm:col-span-2" : ""}>
          <label htmlFor={`${purpose}-service`} className={labelClass}>
            Serviço desejado
          </label>
          <select
            id={`${purpose}-service`}
            className={cn(fieldBase, borderColor, "h-11", errors.service && "border-danger")}
            {...register("service")}
            aria-invalid={Boolean(errors.service)}
          >
            <option value="">Selecione uma opção…</option>
            <optgroup label="Consultoria e infraestrutura">
              {services
                .filter((s) => s.category === "infra")
                .map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.navLabel}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Desenvolvimento digital">
              {services
                .filter((s) => s.category === "dev")
                .map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.navLabel}
                  </option>
                ))}
            </optgroup>
            <option value="outro">Ainda não sei / preciso de orientação</option>
          </select>
          {errors.service ? (
            <p className={errorClass} role="alert">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.service.message}
            </p>
          ) : null}
        </div>

        {!compact ? (
          <div className="sm:col-span-2">
            <label htmlFor={`${purpose}-message`} className={labelClass}>
              Como podemos ajudar?{" "}
              <span className={cn("font-normal", tone === "dark" ? "text-navy-300" : "text-ink-muted")}>
                (opcional)
              </span>
            </label>
            <textarea
              id={`${purpose}-message`}
              rows={4}
              placeholder="Ex.: temos 3 servidores, 45 usuários e o ERP está lento no fim do mês."
              className={cn(fieldBase, borderColor, "resize-y py-3 leading-6")}
              {...register("message")}
            />
          </div>
        ) : null}
      </div>

      {/* honeypot — invisível para pessoas, preenchido por bots */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      {status === "error" ? (
        <div
          role="alert"
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm",
            tone === "dark"
              ? "border-white/15 bg-white/10 text-navy-100"
              : "border-danger/25 bg-danger/5 text-danger",
          )}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {serverMessage}{" "}
            <a href={waLink("default")} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Fale direto no WhatsApp
            </a>
            .
          </span>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size={compact ? "lg" : "xl"}
          fullWidth
          disabled={status === "sending"}
          className="shrink-0"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" /> {ctaLabel}
            </>
          )}
        </Button>
        <p className={cn("text-xs leading-5", tone === "dark" ? "text-navy-300" : "text-ink-muted")}>
          {microcopy}
          <br />
          Seus dados são usados só para este contato, conforme nossa{" "}
          <a href="/politica-de-privacidade" className="underline">
            política de privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
}
