"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm font-semibold",
  md: "px-5 py-2.5 text-base font-semibold",
  lg: "px-7 py-3.5 text-lg font-bold",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#FF6B00] text-white border-2 border-black",
  secondary: "bg-white text-black border-2 border-black",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        "rounded-[5px] shadow-[4px_4px_0px_#000] transition-all duration-100 ease-in-out cursor-pointer",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000]",
        "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        disabled ? "opacity-50 pointer-events-none" : "",
        variantClasses[variant],
        sizeClasses[size],
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
