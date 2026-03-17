// utilities/multistep/step-layout.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// =============================================================================
// TYPES
// =============================================================================

export interface StepLayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function StepLayout({
  header,
  sidebar,
  children,
  footer,
  className,
}: StepLayoutProps) {
  return (
    <section
      className={cn(
        "flex flex-col justify-between h-screen items-center w-full",
        className,
      )}
    >
      {header && <header className="py-4 w-full">{header}</header>}

      <div className="flex flex-col flex-1 justify-center items-center w-full">
        {children}
      </div>
      {footer}
    </section>
  );
}

StepLayout.displayName = "StepLayout";
