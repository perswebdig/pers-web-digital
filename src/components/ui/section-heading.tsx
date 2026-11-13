import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn("mb-4 inline-flex", dark ? "eyebrow-dark" : "eyebrow")}>
          {eyebrow}
        </span>
      ) : null}
      <Tag
        className={cn(
          "text-[1.75rem] font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem]",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[1.05rem] leading-7 sm:text-lg",
            dark ? "text-navy-200" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
