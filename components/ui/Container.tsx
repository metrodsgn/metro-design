import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[96rem] px-4 sm:px-5 md:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
