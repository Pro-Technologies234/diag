"use client";

import { cn } from "@/lib/utils";
import { useFormTracker } from "../FormTracker";

// =============================================================================
// TYPES
// =============================================================================

export interface TimelineStepProps {
  index: number;
  title: string;
  description?: string;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TimelineStep({
  index,
  title,
  description,
  className,
}: TimelineStepProps) {
  const { currentStep } = useFormTracker();

  const stepNumber = index + 1;
  const isActive = stepNumber === currentStep;
  const isCompleted = stepNumber < currentStep;

  return (
    <div className={cn("relative flex-1", className)}>
      {/* Background line */}
      {index !== 0 && (
        <div className="absolute left-0 top-4 w-full h-[2px] bg-muted-foreground/20 -z-10" />
      )}

      {/* Progress line */}
      {index !== 0 && (
        <div
          className={cn(
            "absolute left-0 top-4 h-[2px] -z-10 transition-all duration-500",
            isCompleted || isActive ? "bg-primary w-full" : "w-0",
          )}
        />
      )}

      {/* Dot */}
      <div
        className={cn(
          "w-4 h-4 rounded-full border-2 mx-auto relative transition-colors duration-300",
          isActive && "bg-primary border-primary",
          isCompleted &&
            "bg-green-500 border-green-500/30 outline outline-4 outline-green-500/20",
          !isActive && !isCompleted && "bg-muted/30 border-muted-foreground/20",
        )}
      >
        {isActive && (
          <div className="absolute -inset-px bg-primary animate-ping rounded-full" />
        )}
      </div>

      {/* Text */}
      <div className="mt-2 text-center">
        <p
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            isActive && "text-foreground",
            isCompleted && "text-muted-foreground",
            !isActive && !isCompleted && "text-muted-foreground/50",
          )}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
}

TimelineStep.displayName = "TimelineStep";
