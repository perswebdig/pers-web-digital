import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { MotionProvider } from "@/components/ui/motion-provider";
import { Footer } from "@/components/layout/footer";
import {
  ExitIntentPopup,
  MobileCtaBar,
  WhatsAppFloat,
} from "@/components/layout/conversion-widgets";
import { Tracking } from "@/components/layout/tracking";
import { JsonLd } from "@/components/seo/json-ld";
import { defaultOgImage, organizationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/*
 * Fontes hospedadas no próprio repositório (next/font/local).
 * Motivos: build determinístico na Vercel (sem dependência de rede para o
 * Google Fonts), zero requisição a fonts.gstatic.com na primeira visita
 * (melhor LCP e menos exposição de IP de visitante — ponto relevante para a
 * LGPD) e recorte `latin`, que cobre todo o português do Brasil.
 */
const inter = localFont({
  src: [
    {
      path: "../fonts/inter-latin-wght.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const jakarta = localFont({
  src: [
    {
      path: "../fonts/plus-jakarta-latin-wght.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — consultoria de TI e desenvolvimento digital`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1f44" },
    { media: "(prefers-color-scheme: dark)", color: "#050d1f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={organizationSchema()} />
        <MotionProvider>
          <Header />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* espaço da barra fixa de CTA no mobile */}
          <div className="h-20 lg:hidden" aria-hidden="true" />
          <WhatsAppFloat />
          <MobileCtaBar />
          <ExitIntentPopup />
          <Tracking />
        </MotionProvider>
      </body>
    </html>
  );
}
