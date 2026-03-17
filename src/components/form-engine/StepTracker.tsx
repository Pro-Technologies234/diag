"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface StepTrackerProps {
  maxStep: number;
  step: number;
  children?: ReactNode;
  className?: string;
}

interface StepTrackerContextType {
  currentStep: number;
  maxStep: number;
}

// =============================================================================
// CONTEXT
// =============================================================================

const StepTrackerContext = createContext<StepTrackerContextType | null>(null);

export function useStepTracker() {
  const ctx = useContext(StepTrackerContext);
  if (!ctx) throw new Error("useStepTracker must be used within StepTracker");
  return ctx;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StepTracker({
  step,
  maxStep,
  children,
  className,
}: StepTrackerProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <StepTrackerContext.Provider value={{ currentStep: step, maxStep }}>
      <div
        className={cn(
          "flex items-center gap-2 w-full justify-center",
          className,
        )}
      >
        {hasChildren
          ? children
          : Array.from({ length: maxStep }).map((_, i) => (
              <Progress
                key={i}
                value={i <= step - 1 ? 100 : 0}
                className="flex-1"
              />
            ))}
      </div>
    </StepTrackerContext.Provider>
  );
}

StepTracker.displayName = "StepTracker";
