"use client";

import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { DayPicker } from "react-day-picker";
import { format, parse, subYears } from "date-fns";

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
  const prevSelected = useRef(selected);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (selected && !prevSelected.current) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 350);
      return () => clearTimeout(t);
    }
    prevSelected.current = selected;
  }, [selected]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group h-full w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
        selected
          ? "border-teal bg-teal-light shadow-teal/10 shadow-md"
          : "border-border bg-surface hover:border-teal/30 hover:shadow-sm"
      } ${popping ? "animate-selection-pop" : ""}`}
    >
      <div className="flex items-start gap-3">
        {emoji && (
          <span className="shrink-0 text-2xl leading-none">{emoji}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-charcoal font-semibold">{label}</div>
          {description && (
            <div className="text-muted mt-0.5 text-sm">{description}</div>
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
  const wasDisabled = useRef(disabled);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (wasDisabled.current && !disabled && variant === "primary") {
      setGlowing(true);
      const t = setTimeout(() => setGlowing(false), 800);
      return () => clearTimeout(t);
    }
    wasDisabled.current = disabled;
  }, [disabled, variant]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-4 text-lg font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        variant === "primary"
          ? "bg-teal shadow-teal/25 hover:bg-teal-dark hover:shadow-teal/30 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
          : "border-border bg-surface text-charcoal hover:border-teal/30 hover:bg-antique border-2"
      } ${glowing ? "animate-glow-once" : ""}`}
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
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onFocus={handleFocus}
      className="border-border bg-surface text-charcoal placeholder:text-muted/50 focus:border-teal focus:ring-teal/10 w-full rounded-2xl border-2 px-5 py-4 text-lg transition-all focus:ring-4 focus:outline-none"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Date Picker                                                        */
/* ------------------------------------------------------------------ */

type QuizDatePickerProps = {
  value: string;
  onChange: (iso: string) => void;
};

const today = new Date();

export function QuizDatePicker({ value, onChange }: QuizDatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined;

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      onChange(format(date, "yyyy-MM-dd"));
      setOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-lg transition-all ${
          open
            ? "border-teal bg-surface ring-teal/10 ring-4"
            : "border-border bg-surface hover:border-teal/30"
        } ${selected ? "text-charcoal" : "text-muted/50"}`}
      >
        <span>
          {selected ? format(selected, "MMMM d, yyyy") : "Pick a date"}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted shrink-0"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div className="border-border bg-surface shadow-charcoal/5 absolute left-1/2 z-50 mt-2 -translate-x-1/2 rounded-2xl border-2 p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected ?? today}
            startMonth={subYears(today, 5)}
            endMonth={today}
            disabled={{ after: today }}
            captionLayout="dropdown"
            classNames={{
              root: "rdp-quiz",
              months: "flex flex-col",
              month: "space-y-3",
              month_caption: "flex items-center justify-center gap-1 px-1",
              caption_label: "hidden",
              dropdowns: "flex items-center gap-1",
              dropdown:
                "appearance-none rounded-xl border border-border bg-antique px-2 py-1.5 text-sm font-semibold text-charcoal outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 cursor-pointer",
              nav: "flex items-center gap-1",
              button_previous:
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-antique hover:text-charcoal",
              button_next:
                "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-antique hover:text-charcoal",
              month_grid: "border-collapse",
              weekdays: "",
              weekday:
                "w-9 pb-2 text-center text-xs font-semibold uppercase text-muted/60",
              week: "",
              day: "p-0 text-center",
              day_button:
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all hover:bg-teal-light hover:text-teal-dark",
              selected:
                "!bg-teal !text-white shadow-sm shadow-teal/20 hover:!bg-teal-dark",
              today: "font-bold text-teal",
              outside: "text-muted/30",
              disabled: "text-muted/20 cursor-not-allowed hover:bg-transparent",
              chevron: "h-4 w-4",
            }}
          />
        </div>
      )}
    </div>
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
      className={`${aspectRatio} border-teal/20 from-teal-light/40 to-lavender-light/20 flex items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed bg-gradient-to-br ${className}`}
    >
      <div className="p-6 text-center">
        <div className="mx-auto mb-3 text-4xl">{emoji}</div>
        <p className="font-heading text-charcoal/50 text-sm font-semibold">
          {label}
        </p>
        {description && (
          <p className="text-muted mt-1 text-xs">{description}</p>
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
    <h2 className="font-heading text-charcoal text-2xl leading-tight font-bold md:text-3xl">
      {children}
    </h2>
  );
}

export function StepSubtitle({ children }: { children: ReactNode }) {
  return <p className="text-muted mt-2">{children}</p>;
}
