import type { HTMLAttributes } from "react";
import Image from "next/image";

export function BrandWordmark({
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/brand/metro-wordmark.png"
        alt=""
        width={2000}
        height={506}
        priority
        className="header-logo-image h-auto w-36 sm:w-40"
      />
    </span>
  );
}
