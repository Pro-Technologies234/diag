// utilities/multistep/step-layout.tsx
"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// =============================================================================
// TYPES
// =============================================================================

export interface FormCanvasProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FormCanvas({
  header,
  sidebar,
  children,
  footer,
  className,
}: FormCanvasProps) {
  return (
    <section
      className={cn(
        "flex flex-col justify-between h-screen items-center w-full",
        className,
      )}
    >
      {header && <header className="py-4 w-full">{header}</header>}

      <div className="flex flex-col flex-1 items-center w-full">{children}</div>
      {footer}
    </section>
  );
}

FormCanvas.displayName = "FormCanvas";
