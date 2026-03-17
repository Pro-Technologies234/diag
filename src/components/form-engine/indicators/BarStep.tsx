"use client";

import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useStepTracker } from "../StepTracker";

// =============================================================================
// TYPES
// =============================================================================

export interface BarStepProps {
  index: number;
  children?: React.ReactNode;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function BarStep({ index, children, className }: BarStepProps) {
  const { currentStep } = useStepTracker();

  const stepNumber = index + 1;
  const isActive = stepNumber === currentStep;
  const isCompleted = stepNumber < currentStep;

  return (
    <div
      className={cn(
        "flex-1 flex items-center justify-center relative py-2 px-4 rounded-full border transition-colors duration-300",
        !isActive && !isCompleted && "bg-muted/30 border-muted",
        isActive && "bg-muted text-muted-foreground border-muted",
        isCompleted && "bg-primary text-white border-none",
        className
      )}
    >
      {/* Active pulse ring */}
      {isActive && (
        <motion.div className="absolute -inset-1.5 rounded-full bg-primary/30 pointer-events-none border border-primary/80 animate-pulse" />
      )}

      {/* Completed fill */}
      {isCompleted && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-primary rounded-md z-0"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ transformOrigin: "left" }}
        />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Checkmark badge */}
      <motion.div
        className="size-6 rounded-sm absolute -right-3.5 z-20 flex justify-center items-center text-white bg-primary shadow-md border-2 border-card"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isCompleted ? 1.25 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        <IconCheck size={14} strokeWidth={4} />
      </motion.div>
    </div>
  );
}

BarStep.displayName = "BarStep";
