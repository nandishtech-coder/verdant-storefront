import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "blur";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-up",
  down: "reveal-down",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  blur: "reveal-blur",
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(variantClass[variant], shown && "is-revealed", className)}
    >
      {children}
    </div>
  );
}
