/**
 * Gera os assets derivados do logo: favicons, ícones de app, OG image
 * e versões otimizadas (menores) das ilustrações usadas no site.
 *
 * Uso: npm run assets
 */
import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const pub = (p) => path.join(root, "public", p);
mkdirSync(pub("og"), { recursive: true });

const NAVY = "#0A1F44";
const BLUE = "#2563EB";
const CYAN = "#06B6D4";

async function resizeMark(src, out, size) {
  await sharp(src)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log("ok", path.relative(root, out));
}

async function optimizeIllustration(file, width) {
  const target = pub(file);
  const info = await sharp(target)
    .resize({ width, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();
  await sharp(info).toFile(target + ".tmp");
  const fs = await import("node:fs/promises");
  await fs.rename(target + ".tmp", target);
  console.log("ok", path.relative(root, target), (info.length / 1024).toFixed(0) + " KB");
}

async function buildOg() {
  const mark = readFileSync(pub("brand/pers-mark-512.png")).toString("base64");

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0A1F44"/>
        <stop offset="55%" stop-color="#0f2145"/>
        <stop offset="100%" stop-color="#050d1f"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#2563EB"/>
        <stop offset="100%" stop-color="#06B6D4"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
      ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="1200" y2="${i * 50}"/>`).join("")}
      ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="630"/>`).join("")}
    </g>
    <circle cx="1080" cy="90" r="260" fill="#06B6D4" fill-opacity="0.14"/>
    <circle cx="120" cy="560" r="220" fill="#2563EB" fill-opacity="0.18"/>

    <image x="80" y="72" width="112" height="112" href="data:image/png;base64,${mark}"/>
    <text x="212" y="146" font-family="DejaVu Sans, sans-serif" font-size="58" font-weight="bold" fill="#ffffff">Pers Web Digital</text>

    <text x="80" y="300" font-family="DejaVu Sans, sans-serif" font-size="70" font-weight="bold" fill="#ffffff">Infraestrutura de TI sólida</text>
    <text x="80" y="378" font-family="DejaVu Sans, sans-serif" font-size="70" fill="#67E8F9">presença digital que converte.</text>

    <rect x="80" y="424" width="150" height="6" rx="3" fill="url(#accent)"/>

    <text x="80" y="496" font-family="DejaVu Sans, sans-serif" font-size="30" fill="#adc0e1">Consultoria de TI · Servidores e nuvem · Redes e firewall</text>
    <text x="80" y="546" font-family="DejaVu Sans, sans-serif" font-size="30" fill="#adc0e1">Backup e LGPD · Suporte com SLA · Sites, landing pages e apps</text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(pub("og/pers-web-digital-og.jpg"));
  console.log("ok public/og/pers-web-digital-og.jpg");
}

async function buildFaviconSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NAVY}"/><stop offset="0.5" stop-color="${BLUE}"/><stop offset="1" stop-color="${CYAN}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#g)"/>
  <path d="M21 15h13a11 11 0 0 1 0 22h-6v12h-7V15z" fill="#fff"/>
  <circle cx="28" cy="26" r="4.5" fill="${NAVY}" opacity="0.85"/>
  <rect x="41" y="41" width="7" height="7" rx="2" fill="#A5F3FC"/>
  <rect x="47" y="47" width="6" height="6" rx="2" fill="#67E8F9"/>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(pub("icon-tile-512.png"));
  const fs = await import("node:fs/promises");
  await fs.writeFile(pub("icon.svg"), svg);
  console.log("ok public/icon.svg");
}

async function main() {
  // Marca: versões menores e leves
  await resizeMark(pub("brand/pers-mark.png"), pub("brand/pers-mark-512.png"), 512);
  await resizeMark(pub("brand/pers-mark.png"), pub("brand/pers-mark-192.png"), 192);
  await resizeMark(pub("brand/pers-mark.png"), pub("brand/pers-mark-96.png"), 96);
  await resizeMark(pub("brand/pers-mark-light.png"), pub("brand/pers-mark-light-192.png"), 192);

  // Ícones do site
  await resizeMark(pub("brand/pers-mark.png"), pub("icon.png"), 512);
  await resizeMark(pub("brand/pers-mark.png"), pub("apple-icon.png"), 180);
  await resizeMark(pub("brand/pers-mark.png"), pub("favicon-32x32.png"), 32);
  await resizeMark(pub("brand/pers-mark.png"), pub("favicon-16x16.png"), 16);

  // Ilustrações: reduz peso mantendo transparência
  await optimizeIllustration("images/hero-visual.png", 1200);
  await optimizeIllustration("images/monitoring-visual.png", 1000);

  await buildFaviconSvg();
  await buildOg();

  console.log("\nAssets gerados com sucesso.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
