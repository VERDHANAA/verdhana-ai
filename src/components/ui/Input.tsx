"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-black">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "border-2 border-black rounded-[5px] px-3 py-2.5 bg-white text-black",
          "focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-shadow duration-100",
          "placeholder:text-gray-400",
          error ? "border-red-600" : "",
          className ?? "",
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
