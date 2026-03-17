"use client";

import { cn } from "@/lib/utils";
import {
  IconUser,
  IconMail,
  IconBuildingSkyscraper,
  IconTarget,
  IconCheck,
} from "@tabler/icons-react";
import { FormEngineConfig } from "../form-engine/types";
import { Badge } from "../ui/badge";

interface FormSidebarProps {
  currentStep: number;
  className?: string;
  steps: FormEngineConfig[];
}

export function OnboardignSidebar({
  currentStep,
  className,
  steps,
}: FormSidebarProps) {
  return (
    <aside className={cn("p-8 border-r bg-muted/30 font-sans", className)}>
      <div className="sticky top-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          {/* <h1 className="text-2xl font-bold">DIAG</h1> */}
          <div>
            <h2 className="text-2xl font-semibold">
              Let's get you set up in just 4 steps
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              We'll keep it short and simple, just what we need to personalize
              your experience.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step: FormEngineConfig) => {
            const isActive = step.order === currentStep;
            const isCompleted = step.order < currentStep;

            return (
              <div
                key={step.order}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-2xl transition-colors",
                  isActive && "bg-primary/10 border border-primary/20",
                  isCompleted && "opacity-80",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center border-2 border-background w-8 h-8 rounded-full shrink-0",
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <IconCheck size={16} />
                  ) : (
                    <span>{step.order}</span>
                  )}
                </div>

                <div className="">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      Step {step.order}
                    </span>
                    {isActive && (
                      <Badge className="text-xs bg-primary/20 text-primary px-2 rounded-full">
                        Current
                      </Badge>
                    )}
                  </div>
                  <h3
                    className={cn(
                      "font-semibold tracking-tighter",
                      isActive && "text-primary",
                    )}
                  >
                    {step.heading}
                  </h3>
                  {/* <p className="text-xs text-muted-foreground">
                    {step.subHeading}
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {Math.round((currentStep / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="text-xs text-muted-foreground border-t pt-4">
          <p>
            Step {currentStep} of {steps.length}
          </p>
          <p className="mt-1">Complete all steps to finish setup</p>
        </div>
      </div>
    </aside>
  );
}
