import type { HTMLAttributes } from "react";

export function BrandWordmark({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`font-display text-accent text-[3.5rem] leading-none font-medium tracking-[-0.075em] ${className}`}
    >
      metro.
    </span>
  );
}
