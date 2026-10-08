import { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-384 px-3 sm:px-5 md:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
