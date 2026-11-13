/**
 * Ícones de marca (redes sociais) como SVG inline.
 * As marcas não fazem parte do Lucide (versões recentes removeram
 * ícones de marca por política), então usamos paths próprios —
 * mais leve que instalar um pacote extra de ícones.
 */
type Props = { className?: string };

export function LinkedInIcon({ className = "h-[18px] w-[18px]" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5ZM3 8.98h4V21H3Zm6.5 0h3.8v1.64h.05a4.17 4.17 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.06V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-[18px] w-[18px]" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-[18px] w-[18px]" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.4h2.5l.4-3h-2.9V8.6c0-.86.24-1.45 1.5-1.45h1.5V4.4a20 20 0 0 0-1.9-.1c-2.1 0-3.6 1.3-3.6 3.7v2.1H8.5v3H11V21Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-[18px] w-[18px]" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.85-1.85C18.1 5 12 5 12 5s-6.1 0-7.75.35A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2.05 12a27 27 0 0 0 .35 4.8 2.6 2.6 0 0 0 1.85 1.85C5.9 19 12 19 12 19s6.1 0 7.75-.35a2.6 2.6 0 0 0 1.85-1.85 27 27 0 0 0 .35-4.8 27 27 0 0 0-.35-4.8ZM10.15 15V9l5.1 3Z" />
    </svg>
  );
}
