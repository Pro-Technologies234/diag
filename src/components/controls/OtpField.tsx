"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  InputOTP as InputOTPRoot,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconRefresh, IconCheck } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// TYPES
// =============================================================================

export interface OTPFieldProps {
  /** Number of digits (4, 6, or 8) */
  length?: 4 | 6 | 8;
  /** Pattern type - numeric only or alphanumeric */
  pattern?: "numeric" | "alphanumeric";
  /** Visual layout - grouped with separator or continuous */
  layout?: "grouped" | "continuous";
  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Error message */
  error?: string;
  /** Success state */
  success?: boolean;

  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Called when all digits are filled */
  onComplete?: (value: string) => void;

  /** Resend timer in seconds */
  resendTimer?: number;
  /** Resend handler */
  onResend?: () => void;

  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Auto focus */
  autoFocus?: boolean;

  /** Additional class name */
  className?: string;
  /** Input container class name */
  inputClassName?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SIZE_CLASSES = {
  sm: {
    slot: "w-10 h-10 text-sm",
    separator: "w-4",
    icon: 14,
  },
  md: {
    slot: "w-12 h-12 text-base",
    separator: "w-6",
    icon: 16,
  },
  lg: {
    slot: "w-14 h-14 text-lg",
    separator: "w-8",
    icon: 18,
  },
} as const;

const PATTERNS = {
  numeric: {
    regex: /^[0-9]*$/,
    inputMode: "numeric" as const,
    pattern: "\\d*",
  },
  alphanumeric: {
    regex: /^[a-zA-Z0-9]*$/,
    inputMode: "text" as const,
    pattern: "[a-zA-Z0-9]*",
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// =============================================================================
// COMPONENT
// =============================================================================

export function OTPField({
  length = 6,
  pattern = "numeric",
  layout = "grouped",
  size = "md",
  label,
  description,
  error,
  success = false,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onComplete,
  resendTimer,
  onResend,
  disabled = false,
  loading = false,
  autoFocus = true,
  className,
  inputClassName,
}: OTPFieldProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [remainingTime, setRemainingTime] = React.useState(resendTimer || 0);
  const [isFocused, setIsFocused] = React.useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const patternConfig = PATTERNS[pattern];
  const sizeConfig = SIZE_CLASSES[size];

  // Timer effect
  React.useEffect(() => {
    if (!resendTimer || remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer, remainingTime]);

  // Reset timer when prop changes
  React.useEffect(() => {
    setRemainingTime(resendTimer || 0);
  }, [resendTimer]);

  const handleChange = (newValue: string) => {
    if (disabled || loading) return;

    // Validate pattern
    if (!patternConfig.regex.test(newValue)) return;

    // Update value
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);

    // Check if complete
    if (newValue.length === length) {
      onComplete?.(newValue);
    }
  };

  const handleResend = () => {
    if (remainingTime > 0 || loading || disabled) return;
    onResend?.();
    setRemainingTime(resendTimer || 60);
  };

  // Create slots based on layout
  const renderSlots = () => {
    if (layout === "grouped" && length === 6) {
      // Grouped layout with separator (XXX-XXX)
      return (
        <>
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className={cn(sizeConfig.slot, inputClassName)}
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator className={sizeConfig.separator} />
          <InputOTPGroup>
            {Array.from({ length: 3 }).map((_, i) => (
              <InputOTPSlot
                key={i + 3}
                index={i + 3}
                className={cn(sizeConfig.slot, inputClassName)}
              />
            ))}
          </InputOTPGroup>
        </>
      );
    }

    // Continuous layout (XXXXXX)
    return (
      <InputOTPGroup>
        {Array.from({ length }).map((_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            className={cn(sizeConfig.slot, inputClassName)}
          />
        ))}
      </InputOTPGroup>
    );
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Label */}
      {label && (
        <div className="space-y-1">
          <Label htmlFor="otp-input" className="text-sm font-medium">
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* OTP Input */}
      <div className={cn("relative", loading && "opacity-50")}>
        <InputOTPRoot
          id="otp-input"
          maxLength={length}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || loading}
          autoFocus={autoFocus}
          pattern={patternConfig.pattern}
          inputMode={patternConfig.inputMode}
        >
          {renderSlots()}
        </InputOTPRoot>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between min-h-[2rem]">
        {/* Error/Success/Description */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
          {success && !error && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-green-500 flex items-center gap-1"
            >
              <IconCheck size={16} />
              Verified successfully
            </motion.p>
          )}
          {!error && !success && description && (
            <motion.p
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Resend button */}
        {onResend && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResend}
            disabled={remainingTime > 0 || loading || disabled}
            className="text-xs"
          >
            <IconRefresh size={sizeConfig.icon} className="mr-1" />
            {remainingTime > 0
              ? `Resend in ${formatTime(remainingTime)}`
              : "Resend code"}
          </Button>
        )}
      </div>
    </div>
  );
}

OTPField.displayName = "OTPField";
