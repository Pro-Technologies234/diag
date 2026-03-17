"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface FormViewportProps {
  when: number;
  step: number;
  unmount?: boolean;
  className?: string;
  children: ReactNode;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FormViewport({
  when,
  step,
  unmount = true,
  className,
  children,
}: FormViewportProps) {
  if (step !== when) {
    return unmount ? null : <div>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn("w-full space-y-4", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

FormViewport.displayName = "FormViewport";
