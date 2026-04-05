import { useEffect, useRef, useState } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextScramble = ({ text, className = "", delay = 0 }: TextScrambleProps) => {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          setTimeout(() => {
            let frame = 0;
            const totalFrames = Math.max(text.length, 12);
            const interval = 30; // ms per frame

            const scramble = () => {
              const progress = frame / totalFrames;
              const resolved = Math.floor(progress * text.length);
              let result = "";

              for (let i = 0; i < text.length; i++) {
                if (text[i] === " ") {
                  result += " ";
                } else if (i < resolved) {
                  result += text[i];
                } else {
                  result += chars[Math.floor(Math.random() * chars.length)];
                }
              }

              setDisplay(result);
              frame++;
              if (frame <= totalFrames) {
                setTimeout(scramble, interval);
              } else {
                setDisplay(text);
              }
            };
            scramble();
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, delay]);

  return (
    <span ref={ref} className={className}>
      {display || "\u00A0".repeat(text.length)}
    </span>
  );
};

export default TextScramble;
