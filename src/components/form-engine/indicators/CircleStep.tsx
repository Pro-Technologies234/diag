"use client";

import { cn } from "@/lib/utils";
import { useStepTracker } from "../StepTracker";

// =============================================================================
// TYPES
// =============================================================================

export interface CircleStepProps {
  index: number;
  label?: string;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CircleStep({ index, label, className }: CircleStepProps) {
  const { currentStep, maxStep } = useStepTracker();

  const stepNumber = index + 1;
  const isActive = stepNumber === currentStep;
  const isCompleted = stepNumber < currentStep;
  const isLast = stepNumber === maxStep;

  return (
    <div className={cn("flex flex-col items-center flex-1 relative", className)}>

      {/* Left connecting line */}
      {index !== 0 && (
        <div
          className={cn(
            "absolute left-0 top-5 w-1/2 h-[2px] transition-colors duration-300",
            isCompleted || isActive ? "bg-primary" : "bg-muted-foreground/20"
          )}
        />
      )}

      {/* Right connecting line */}
      {!isLast && (
        <div
          className={cn(
            "absolute right-0 top-5 w-1/2 h-[2px] transition-colors duration-300",
            currentStep > stepNumber ? "bg-primary" : "bg-muted-foreground/20"
          )}
        />
      )}

      {/* Circle */}
      <div
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-full border text-sm font-medium transition-colors duration-300",
          isActive && "bg-primary text-primary-foreground border-primary",
          isCompleted && "bg-primary/20 border-primary text-primary",
          !isActive && !isCompleted && "bg-muted/30 border-muted-foreground/20 text-muted-foreground"
        )}
      >
        {stepNumber}
      </div>

      {/* Label */}
      {label && (
        <span className="mt-2 text-xs text-muted-foreground text-center">{label}</span>
      )}
    </div>
  );
}

CircleStep.displayName = "CircleStep";
