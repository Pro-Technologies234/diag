"use client";

import { useCallback, useMemo, useState } from "react";
import { FormEngineConfig } from "../types";

// =============================================================================
// GUARDS
// =============================================================================

/** Validation function run before advancing to the next step.
 *  Return true to advance, false to block. */
export type StepGuard<TFields extends string = string> = (
  fields: TFields[],
) => boolean | Promise<boolean>;

// =============================================================================
// HOOK OPTIONS
// =============================================================================

export interface FormRuntimeOptions<TFields extends string = string> {
  /** Total number of steps */
  config?: FormEngineConfig[];
  /** Total number of steps */
  steps: number;

  /** Starting step — defaults to 1 */
  initialStep?: number;

  /** Per-step guards — keyed by step number */
  guards?: Record<number, StepGuard<TFields>>;

  /** Called when the user submits the final step */
  onFinalSubmit?: () => Promise<void> | void;
}
export function useFormRuntime<TFields extends string = string>({
  initialStep = 1,
  steps,
  guards = {},
  config,
  onFinalSubmit,
}: FormRuntimeOptions<TFields>) {
  const [step, setStep] = useState(initialStep);
  const [loading, setLoading] = useState(false);

  const minStep = 1;
  const maxStep = steps;

  const isFirst = step === minStep;
  const isLast = step === maxStep;

  const next = useCallback(async () => {
    const currentStepFields = config?.find(({ order }) => order === step);
    const fieldsToValidate: TFields[] =
      currentStepFields?.fields.map((f) => f.path as TFields) ?? [];

    console.log("Step:", step);
    console.log("Fields to validate:", fieldsToValidate);
    if (guards[step]) {
      const valid = await guards[step](fieldsToValidate);
      if (!valid) return;
    }

    if (isLast) {
      if (!onFinalSubmit) return;
      try {
        setLoading(true);
        await onFinalSubmit();
      } finally {
        setLoading(false);
      }
      return;
    }

    setStep((s) => Math.min(s + 1, maxStep));
  }, [step, guards, isLast, onFinalSubmit, maxStep]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, minStep));
  }, []);

  const goTo = useCallback(
    async (value: number) => {
      const currentStepFields = config?.find(({ order }) => order === step);
      const fieldsToValidate: TFields[] =
        currentStepFields?.fields.map((f) => f.path as TFields) ?? [];
      if (guards[step]) {
        value <= step && setStep(value); // Allow going back without validation
        const valid = await guards[step](fieldsToValidate);
        if (!valid) return;
      }
      if (value < minStep || value > maxStep) return;
      setStep(value);
    },
    [minStep, maxStep],
  );

  return useMemo(
    () => ({
      step,
      minStep,
      maxStep,
      isFirst,
      isLast,
      loading,
      next,
      prev,
      goTo,
    }),
    [step, isFirst, isLast, loading, next, prev, goTo],
  );
}
