import type { HTMLAttributes } from "react";

export function BrandWordmark({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`font-sans text-accent text-[length:var(--type-brand)] leading-none font-medium tracking-[var(--tracking-brand)] ${className}`}
    >
      metro.
    </span>
  );
}
