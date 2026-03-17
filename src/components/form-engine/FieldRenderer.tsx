"use client";

import { Controller, useFormContext } from "react-hook-form";
import { FieldConfig } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { CardSelect } from "../../controls/CardSelect";
import { ChipSelect } from "../../controls/ChipSelect";
import { SelectField } from "../../controls/SelectField";
// import { IconFileUpload, IconLoader } from "@tabler/icons-react";

// import { MediaPreview } from "../../media/media-preview";
// import { ACCEPT } from "@/constants";
// import { Skeleton } from "../../ui/skeleton";
// import { Checkbox } from "../../ui/checkbox";
// import { FilePicker } from "../../shared/file-picker";
// import { MediaUploader } from "../../shared/media-uploader";
// import EmptyState from "../../shared/empty-state";
// import { SelectInput } from "../../shared/select";
// import { HorizontalChips } from "../../shared/horizontal-chips";
// import { VisualSelector } from "./controls/visual-selector";

// =============================================================================
// TYPES
// =============================================================================

interface FieldRendererProps {
  field: FieldConfig;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function FieldRenderer({ field, className }: FieldRendererProps) {
  const { control } = useFormContext();

  // Determine the column span class
  const spanClass = field.gridSpan === 2 ? "col-span-2" : "col-span-1";

  return (
    <div
      className={cn(
        field.className,
        "w-full space-y-2 flex flex-col",
        className,
      )}
    >
      {/* Hide global label for boolean-toggle as it's inside the UI box */}
      {field.variant !== "checkbox" && field.label && (
        <Label className="font-medium text-sm">
          {field.label}{" "}
          {field.required ? (
            <span className="text-destructive">*</span>
          ) : (
            <span className="text-xs text-muted-foreground font-normal">
              (Optional)
            </span>
          )}
        </Label>
      )}

      <Controller
        name={field.path}
        control={control}
        render={({ field: { onChange, value, name, ref } }) => {
          switch (field.variant) {
            case "text":
              return (
                <Input
                  ref={ref}
                  name={name}
                  value={value ?? ""}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  disabled={field.isDisabled}
                  className={spanClass}
                />
              );

            case "rich-text":
              return (
                <Textarea
                  ref={ref}
                  name={name}
                  value={value ?? ""}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  disabled={field.isDisabled}
                  className={cn("min-h-[120px]", spanClass)}
                />
              );
            case "number":
              return (
                <Input
                  type="number"
                  value={value ?? ""}
                  onChange={(e) => onChange(e.target.valueAsNumber)}
                  placeholder={field.placeholder}
                  disabled={field.isDisabled}
                  className={spanClass}
                />
              );

            case "chip-select":
              return (
                <ChipSelect
                  {...field.componentProps}
                  options={field.componentProps?.options || []}
                  defaultValue={value}
                  onChange={onChange}
                  className={spanClass}
                />
              );

            case "select":
              return (
                <SelectField
                  {...field.componentProps}
                  options={field.componentProps?.options || []}
                  defaultValue={value}
                  onChange={onChange}
                  className={spanClass}
                />
              );

            case "file-upload":
              return (
                <div className={spanClass}>
                  {/* <MediaUploader
                    value={value}
                    onChange={onChange}
                    placeholder="Verification Document"
                    folder="verification"
                    max={8}
                    multiple
                  /> */}
                </div>
              );

            case "card-select":
              return (
                <CardSelect
                  {...field.componentProps}
                  options={field.componentProps?.options || []}
                  value={value ?? ""}
                  onChange={onChange}
                />
              );

            default:
              return (
                <Input
                  value={value ?? ""}
                  onChange={onChange}
                  className={spanClass}
                />
              );
          }
        }}
      />

      {/* Professional Hint / Helper Text */}
      {field.hint && !field.isDisabled && (
        <p className="text-[11px] text-muted-foreground italic px-1">
          {field.hint}
        </p>
      )}
    </div>
  );
}

FieldRenderer.displayName = "FieldRenderer";
