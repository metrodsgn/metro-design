import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[90rem] px-6 md:px-12 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}