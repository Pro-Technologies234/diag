// utilities/multistep/form-step.tsx
"use client";

import { PropsWithChildren, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface StepPanelProps {
  when: number;
  step: number;
  unmount?: boolean;
  className?: string;
  children: ReactNode;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StepPanel({
  when,
  step,
  unmount = true,
  className,
  children,
}: StepPanelProps) {
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
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

StepPanel.displayName = "StepPanel";
