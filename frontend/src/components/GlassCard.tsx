import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils";

type Props = HTMLMotionProps<"section"> & {
  children: ReactNode;
  interactive?: boolean;
};

export function GlassCard({ children, className, interactive = true, ...props }: Props) {
  return (
    <motion.section
      whileHover={interactive ? { y: -3, boxShadow: "0 24px 70px rgba(79,124,255,0.18)" } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("glass rounded-lg p-4 shadow-glow", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
