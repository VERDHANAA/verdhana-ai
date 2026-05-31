import { HTMLAttributes } from "react";

export type CardColor = "yellow" | "green" | "pink" | "blue" | "purple" | "white";

const cardColorMap: Record<CardColor, string> = {
  yellow: "#FDC800",
  green: "#A3E636",
  pink: "#FF9F9F",
  blue: "#88AAEE",
  purple: "#A388EE",
  white: "#FFFFFF",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
}

export function Card({ color = "white", className, children, ...props }: CardProps) {
  return (
    <div
      style={{ backgroundColor: cardColorMap[color] }}
      className={["border-2 border-black shadow-[4px_4px_0px_#000] rounded-[5px] p-5", className ?? ""].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
