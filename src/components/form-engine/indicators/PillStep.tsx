"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFormTracker } from "../FormTracker";

// =============================================================================
// TYPES
// =============================================================================

export interface PillStepProps {
  index: number;
  className?: string;
  onClick?: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const PILL_VARIANTS = {
  active: {
    width: 24,
    backgroundColor: "bg-primary",
  },
  completed: {
    width: 6,
    backgroundColor: "bg-foreground",
  },
  default: {
    width: 6,
    backgroundColor: "bg-foreground/40",
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function PillStep({ index, className, onClick }: PillStepProps) {
  const { currentStep } = useFormTracker();

  const stepNumber = index + 1;
  const isActive = stepNumber === currentStep;
  const isCompleted = stepNumber < currentStep;

  const variant = isActive ? "active" : isCompleted ? "completed" : "default";

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative py-4 flex items-center cursor-pointer",
        className,
      )}
    >
      <motion.div
        initial={false}
        animate={PILL_VARIANTS[variant]}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-1.5 rounded-full",
          PILL_VARIANTS[variant].backgroundColor,
        )}
      />

      {isActive && (
        <motion.div
          layoutId="pill-glow"
          className="absolute inset-0 bg-primary/20 blur-md rounded-full -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
}

PillStep.displayName = "PillStep";
