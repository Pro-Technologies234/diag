"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// =============================================================================
// TYPES
// =============================================================================

export interface FormTrackerProps {
  maxStep: number;
  step: number;
  children?: ReactNode;
  className?: string;
}

interface FormTrackerContextType {
  currentStep: number;
  maxStep: number;
}

// =============================================================================
// CONTEXT
// =============================================================================

const FormTrackerContext = createContext<FormTrackerContextType | null>(null);

export function useFormTracker() {
  const ctx = useContext(FormTrackerContext);
  if (!ctx) throw new Error("useFormTracker must be used within FormTracker");
  return ctx;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FormTracker({
  step,
  maxStep,
  children,
  className,
}: FormTrackerProps) {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <FormTrackerContext.Provider value={{ currentStep: step, maxStep }}>
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
    </FormTrackerContext.Provider>
  );
}

FormTracker.displayName = "FormTracker";
