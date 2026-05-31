import { HTMLAttributes } from "react";
import { CardColor } from "./Card";

const cardColorMap: Record<CardColor, string> = {
  yellow: "#FDC800",
  green: "#A3E636",
  pink: "#FF9F9F",
  blue: "#88AAEE",
  purple: "#A388EE",
  white: "#FFFFFF",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: CardColor;
}

export function Badge({ color = "yellow", className, children, ...props }: BadgeProps) {
  return (
    <span
      style={{ backgroundColor: cardColorMap[color] }}
      className={["inline-flex items-center border-2 border-black rounded-[5px] px-2 py-0.5 text-sm font-semibold shadow-[2px_2px_0px_#000]", className ?? ""].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
