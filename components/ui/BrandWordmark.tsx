import type { HTMLAttributes } from "react";

export function BrandWordmark({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`font-wordmark text-accent text-[3.5rem] leading-none font-medium tracking-[-0.035em] ${className}`}
    >
      metro.
    </span>
  );
}
