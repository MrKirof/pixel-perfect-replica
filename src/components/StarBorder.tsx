import type { CSSProperties, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

import "./StarBorder.css";

interface StarBorderProps {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}

const StarBorder = ({
  as: Component = "div",
  className = "",
  color = "hsl(var(--accent))",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) => {
  const starBorderStyle = {
    "--star-border-color": color,
    "--star-border-speed": speed,
    "--star-border-thickness": `${thickness}px`,
    ...style,
  } as CSSProperties;

  return (
    <Component className={cn("star-border-container", className)} style={starBorderStyle} {...rest}>
      <div className="star-border-surface">{children}</div>
    </Component>
  );
};

export default StarBorder;
