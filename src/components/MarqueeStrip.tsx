import { ReactNode } from "react";

interface MarqueeStripProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const MarqueeStrip = ({ children, speed = 40, reverse = false, className = "" }: MarqueeStripProps) => (
  <div className={`overflow-hidden ${className}`}>
    <div
      className="flex w-max will-change-transform"
      style={{
        animation: `ticker ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        backfaceVisibility: "hidden",
      }}
    >
      {children}
      {children}
    </div>
  </div>
);

export default MarqueeStrip;
