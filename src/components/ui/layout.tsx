import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container-site", className)}>{children}</div>;
}

const tones = {
  light: "bg-white text-ink",
  surface: "bg-surface text-ink",
  "surface-alt": "bg-surface-alt text-ink",
  dark: "bg-navy-900 text-navy-100",
  gradient:
    "bg-[radial-gradient(80%_60%_at_50%_0%,#152a54_0%,#0a1f44_45%,#050d1f_100%)] text-navy-100",
} as const;

export function Section({
  children,
  className,
  id,
  tone = "light",
  padded = true,
  bleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: keyof typeof tones;
  padded?: boolean;
  /** remove o container interno (para grids full-bleed) */
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20",
        padded && "section-py",
        tones[tone],
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto h-px w-full max-w-container bg-gradient-to-r from-transparent via-navy-200 to-transparent",
        className,
      )}
    />
  );
}
