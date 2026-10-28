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
      className={`mx-auto w-full ${variantStyles[variant]} px-5 sm:px-6 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
