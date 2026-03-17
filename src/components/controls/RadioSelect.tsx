"use client";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export interface RadioSelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  disabled?: boolean;
}

// =============================================================================
// TYPES — self-contained, no shared types file
// =============================================================================

interface RadioSelectSharedProps<T = string> {
  layout?: "grid" | "list" | "horizontal";
  columns?: 1 | 2 | 3 | 4;
  size?: "sm" | "md" | "lg";
  className?: string;
  renderItem?: (option: RadioSelectOption<T>, isSelected: boolean) => ReactNode;
  options: RadioSelectOption<T>[];
}

interface ControlledProps<T = string> {
  value: T;
  defaultValue?: never;
  onChange: (value: T) => void;
}

interface UncontrolledProps<T = string> {
  value?: never;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export type RadioSelectProps<T = string> = RadioSelectSharedProps<T> &
  (ControlledProps<T> | UncontrolledProps<T>);

// =============================================================================
// CONSTANTS
// =============================================================================

const SIZE = {
  sm: {
    item: "py-2 px-3",
    icon: "h-4 w-4",
    label: "text-sm",
    description: "text-xs",
    radio: "h-4 w-4",
  },
  md: {
    item: "py-3 px-4",
    icon: "h-5 w-5",
    label: "text-base",
    description: "text-sm",
    radio: "h-5 w-5",
  },
  lg: {
    item: "py-4 px-5",
    icon: "h-6 w-6",
    label: "text-lg",
    description: "text-base",
    radio: "h-6 w-6",
  },
} as const;

const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const;

// =============================================================================
// DEFAULT RADIO ITEM (grid + list layouts)
// =============================================================================

function DefaultRadioItem<T>({
  option,
  isSelected,
  size = "md",
  id,
}: {
  option: RadioSelectOption<T>;
  isSelected: boolean;
  size?: keyof typeof SIZE;
  id: string;
}) {
  const s = SIZE[size];

  return (
    <div className=" flex  gap-2">
      <RadioGroupItem
        value={String(option.value)}
        id={id}
        disabled={option.disabled}
        className={cn("mt-0.5 shrink-0", s.radio)}
      />
      <Label
        htmlFor={id}
        className={cn(
          "font-medium cursor-pointer",
          s.label,
          isSelected && "text-primary",
          option.disabled && "cursor-not-allowed",
        )}
      >
        {option.label}
      </Label>
    </div>
    // <div
    //   className={cn(
    //     "relative flex items-start gap-3 w-full rounded-lg border-2 transition-all duration-200",
    //     s.item,
    //     isSelected
    //       ? "border-primary/10 bg-primary/5"
    //       : "border-border hover:border-primary/50 hover:bg-accent/50",
    //     option.disabled && "opacity-50 cursor-not-allowed",
    //   )}
    // >

    //   <div className="flex-1">
    //     <div className="flex items-center gap-2">
    //       {option.icon && (
    //         <span className={cn("text-muted-foreground", s.icon)}>
    //           {option.icon}
    //         </span>
    //       )}

    //       {option.badge && (
    //         <Badge variant="outline" className="ml-auto text-xs">
    //           {option.badge}
    //         </Badge>
    //       )}
    //     </div>

    //     {option.description && (
    //       <p className={cn("text-muted-foreground mt-1", s.description)}>
    //         {option.description}
    //       </p>
    //     )}
    //   </div>

    //   <AnimatePresence>
    //     {isSelected && (
    //       <motion.div
    //         initial={{ scale: 0, opacity: 0 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         exit={{ scale: 0, opacity: 0 }}
    //         className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary"
    //       />
    //     )}
    //   </AnimatePresence>
    // </div>
  );
}

// =============================================================================
// HORIZONTAL RADIO ITEM
// =============================================================================

function HorizontalRadioItem<T>({
  option,
  isSelected,
  size = "md",
  id,
}: {
  option: RadioSelectOption<T>;
  isSelected: boolean;
  size?: keyof typeof SIZE;
  id: string;
}) {
  const s = SIZE[size];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 text-center",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent/50",
        option.disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <RadioGroupItem
        value={String(option.value)}
        id={id}
        disabled={option.disabled}
        className={s.radio}
      />

      {option.icon && (
        <span className={cn("text-muted-foreground", s.icon)}>
          {option.icon}
        </span>
      )}

      <Label
        htmlFor={id}
        className={cn(
          "font-medium cursor-pointer",
          s.label,
          isSelected && "text-primary",
          option.disabled && "cursor-not-allowed",
        )}
      >
        {option.label}
      </Label>

      {option.description && (
        <p className={cn("text-muted-foreground", s.description)}>
          {option.description}
        </p>
      )}

      {option.badge && (
        <Badge variant="outline" className="mt-1 text-xs">
          {option.badge}
        </Badge>
      )}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RadioSelect<T = string>({
  options,
  layout = "list",
  columns = 2,
  size = "md",
  className,
  renderItem,
  ...props
}: RadioSelectProps<T>) {
  const isControlled = "value" in props && props.value !== undefined;

  const [internalValue, setInternalValue] = useState<T | undefined>(
    !isControlled ? (props as UncontrolledProps<T>).defaultValue : undefined,
  );

  const currentValue = isControlled
    ? (props as ControlledProps<T>).value
    : internalValue;

  const handleChange = (val: string) => {
    // Convert string back to original type if needed
    const typedValue = options.find((opt) => String(opt.value) === val)
      ?.value as T;

    if (!isControlled) {
      setInternalValue(typedValue);
    }
    (props as ControlledProps<T>).onChange?.(typedValue);
  };

  const getItemId = (index: number, value: T) =>
    `radio-${index}-${String(value)}`;

  return (
    <RadioGroup
      value={currentValue !== undefined ? String(currentValue) : undefined}
      onValueChange={handleChange}
      className={cn(
        layout === "grid" && `grid ${COLS[columns]} gap-3`,
        layout === "list" && "flex flex-col gap-2",
        layout === "horizontal" && "flex flex-row flex-wrap gap-3",
        className,
      )}
    >
      <AnimatePresence>
        {options.map((option, index) => {
          const isSelected = currentValue === option.value;
          const id = getItemId(index, option.value);

          return (
            <motion.div
              key={String(option.value)}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate="show"
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                layout === "grid" && "w-full",
                layout === "horizontal" && "flex-1 min-w-[140px]",
              )}
            >
              {renderItem ? (
                <div
                  onClick={() =>
                    !option.disabled && handleChange(String(option.value))
                  }
                >
                  {renderItem(option, isSelected)}
                </div>
              ) : layout === "horizontal" ? (
                <HorizontalRadioItem
                  option={option}
                  isSelected={isSelected}
                  size={size}
                  id={id}
                />
              ) : (
                <DefaultRadioItem
                  option={option}
                  isSelected={isSelected}
                  size={size}
                  id={id}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </RadioGroup>
  );
}

RadioSelect.displayName = "RadioSelect";
