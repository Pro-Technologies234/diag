// =============================================================================
// ENUMS & LITERAL UNIONS
// =============================================================================

import { ReactNode } from "react";
import { CardSelectProps } from "../controls/CardSelect";
import { ChipSelectProps } from "../controls/ChipSelect";
import { SelectFieldProps } from "../controls/SelectField";
import { RadioSelectProps } from "../controls/RadioSelect";
import { OTPFieldProps } from "../controls/OtpField";

export type FieldVariant =
  | { variant: "text"; componentProps?: never }
  | { variant: "number"; componentProps?: never }
  | { variant: "otp"; componentProps?: OTPFieldProps }
  | { variant: "rich-text"; componentProps?: never }
  | { variant: "checkbox"; componentProps?: never }
  | { variant: "radio"; componentProps?: RadioSelectProps }
  | { variant: "card-select"; componentProps?: CardSelectProps }
  | { variant: "chip-select"; componentProps?: ChipSelectProps }
  | { variant: "select"; componentProps?: SelectFieldProps }
  | { variant: "file-upload"; componentProps?: never }
  | { variant: "date"; componentProps?: never };

export type FormLayout = "flow" | "panel" | "wizard";

export type GridSpan = 1 | 2;

// =============================================================================
// ATOMIC TYPES
// =============================================================================

export interface SelectOption {
  label: string;
  value: string;
}

export type BaseFieldConfig = {
  /** Unique identifier for the field */
  id: string;

  /** Dot-notation path to the form value e.g. "user.firstName" */
  path: string;

  /** Label shown above the field */
  label?: string;

  /** Sublabel shown below the label — used in checkbox variant */
  subLabel?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Hint text shown below the field */
  hint?: string;

  /** Marks field as required — shows * indicator */
  required?: boolean;

  /** Disables the field */
  isDisabled?: boolean;

  /** How many grid columns the field spans */
  gridSpan?: GridSpan;

  /** Additional className for the field wrapper */
  className?: string;
};

// =============================================================================
// FIELD CONFIG
// =============================================================================

export type FieldConfig = BaseFieldConfig & FieldVariant;

// =============================================================================
// STEP CONFIG
// =============================================================================

export interface FormEngineConfig {
  /** Step order — 1-based */
  order: number;

  /** Unique key identifying this step */
  sectionKey: string;

  /** Step heading */
  heading: string;

  /** Step subheading / description */
  subHeading?: string;

  /** Visual element rendered above the heading */
  visual?: ReactNode;

  /** Fields to render in this step */
  fields: FieldConfig[];
}

// =============================================================================
// CUSTOM RENDERERS
// =============================================================================

/** Map of custom field renderers — users extend built-ins without touching source */
export type CustomRenderers = Record<
  string,
  (
    field: FieldConfig,
    value: unknown,
    onChange: (value: unknown) => void,
  ) => ReactNode
>;

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface FormEngineProps {
  /** Step configuration array */
  config: FormEngineConfig[];

  /** Form layout mode */
  layout?: FormLayout;

  /** Custom field renderers — extends built-in variants */
  customRenderers?: CustomRenderers;

  /** Called on final step submission */
  onSubmit: (values: unknown) => Promise<void> | void;

  /** Additional className on the root element */
  className?: string;
}
