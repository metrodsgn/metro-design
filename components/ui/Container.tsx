import { ReactNode } from "react";

type ContainerVariant = "default" | "wide" | "bleed" | "detail";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  variant?: ContainerVariant;
};

const variantStyles: Record<ContainerVariant, string> = {
  default: "max-w-content",
  wide: "max-w-[120rem]",
  bleed: "max-w-none",
  detail: "max-w-[87rem]",
};

export function Container({
  children,
  className = "",
  variant = "default",
}: ContainerProps) {
  return (
    <div
      className={`site-container site-container--${variant} mx-auto w-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
