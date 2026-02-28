"use client";

import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Option Card                                                        */
/* ------------------------------------------------------------------ */

type OptionCardProps = {
  emoji?: string;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
};

export function OptionCard({
  emoji,
  label,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-teal bg-teal-light shadow-md shadow-teal/10"
          : "border-border bg-surface hover:border-teal/30 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        {emoji && (
          <span className="shrink-0 text-2xl leading-none">{emoji}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-charcoal">{label}</div>
          {description && (
            <div className="mt-0.5 text-sm text-muted">{description}</div>
          )}
        </div>
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
            selected
              ? "border-teal bg-teal text-white"
              : "border-border group-hover:border-teal/40"
          }`}
        >
          {selected && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Button                                                         */
/* ------------------------------------------------------------------ */

type CTAButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
};

export function CTAButton({
  children,
  onClick,
  disabled,
  variant = "primary",
}: CTAButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-4 text-lg font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        variant === "primary"
          ? "bg-teal text-white shadow-lg shadow-teal/25 hover:bg-teal-dark hover:shadow-xl hover:shadow-teal/30 active:scale-[0.98]"
          : "border-2 border-border bg-surface text-charcoal hover:border-teal/30 hover:bg-antique"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Quiz Input                                                         */
/* ------------------------------------------------------------------ */

type QuizInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "date";
  autoFocus?: boolean;
};

export function QuizInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
}: QuizInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 text-lg text-charcoal transition-all placeholder:text-muted/50 focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/10"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Image Placeholder                                                  */
/* ------------------------------------------------------------------ */

type ImagePlaceholderProps = {
  emoji?: string;
  label: string;
  description?: string;
  aspectRatio?: string;
  className?: string;
};

export function ImagePlaceholder({
  emoji = "🖼️",
  label,
  description,
  aspectRatio = "aspect-[4/3]",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectRatio} flex items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-teal/20 bg-gradient-to-br from-teal-light/40 to-lavender-light/20 ${className}`}
    >
      <div className="p-6 text-center">
        <div className="mx-auto mb-3 text-4xl">{emoji}</div>
        <p className="font-heading text-sm font-semibold text-charcoal/50">
          {label}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typography                                                         */
/* ------------------------------------------------------------------ */

export function StepTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-2xl font-bold leading-tight text-charcoal md:text-3xl">
      {children}
    </h2>
  );
}

export function StepSubtitle({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-muted">{children}</p>;
}
