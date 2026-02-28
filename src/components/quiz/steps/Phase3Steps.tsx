"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuiz } from "~/context/QuizContext";
import { useConfetti } from "~/hooks/useConfetti";
import { useCountUp } from "~/hooks/useCountUp";
import { showAchievement } from "~/components/quiz/AchievementToast";
import {
  CTAButton,
  QuizInput,
  StepTitle,
  StepSubtitle,
} from "~/components/quiz/shared";
import Link from "next/link";

/* ================================================================== */
/*  Screen 16 — Building Plan (animated loading)                       */
/* ================================================================== */

const LOADING_STEPS = [
  "Analyzing age and stage...",
  "Calculating optimal wake windows...",
  "Building feeding schedule...",
  "Checking developmental milestones...",
  "Personalizing your routine plan...",
];

export function BuildingPlanStep() {
  const { nextStep, babyDisplayName } = useQuiz();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [complete, setComplete] = useState(false);
  const { sideCannons } = useConfetti();

  const advance = useCallback(() => nextStep(), [nextStep]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LOADING_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrentIdx(i + 1), (i + 1) * 800));
    });

    const doneAt = LOADING_STEPS.length * 800 + 500;
    timers.push(
      setTimeout(() => {
        setComplete(true);
        sideCannons();
      }, doneAt),
    );
    timers.push(setTimeout(advance, doneAt + 1000));

    return () => timers.forEach(clearTimeout);
  }, [advance, sideCannons]);

  return (
    <div className="space-y-8 py-8 text-center">
      <h2 className="font-heading text-charcoal text-2xl font-bold md:text-3xl">
        Building {babyDisplayName}&apos;s plan...
      </h2>

      {/* Progress bar */}
      <div className="mx-auto max-w-xs">
        <div className="bg-border h-3 overflow-hidden rounded-full">
          <div
            className="from-teal to-lavender h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out"
            style={{
              width: `${(currentIdx / LOADING_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step list */}
      <div className="space-y-3 text-left">
        {LOADING_STEPS.map((step, i) => {
          const isDone = i < currentIdx;
          const isActive = i === currentIdx - 1 && !isDone;
          const isPending = i >= currentIdx;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-300 ${
                isDone
                  ? "bg-sage-light/40"
                  : isActive
                    ? "bg-amber-light/40"
                    : isPending
                      ? "opacity-40"
                      : ""
              }`}
            >
              {isDone ? (
                <span className="bg-sage flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                  ✓
                </span>
              ) : i === currentIdx ? (
                <span className="animate-pulse-soft bg-amber h-5 w-5 rounded-full" />
              ) : (
                <span className="bg-border h-5 w-5 rounded-full" />
              )}
              <span
                className={
                  isDone
                    ? "text-charcoal"
                    : i === currentIdx
                      ? "text-charcoal font-medium"
                      : "text-muted"
                }
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {complete && (
        <div className="animate-bounce-soft">
          <div className="bg-sage-light text-sage-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold">
            ✅ Your plan is ready!
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Screen 17 — Results Preview                                        */
/* ================================================================== */

type ScheduleCategory = "wake" | "sleep" | "feed" | "activity" | "wind-down";

const CATEGORY_STYLES: Record<ScheduleCategory, { bg: string; dot: string }> = {
  wake: { bg: "bg-amber-light/60", dot: "bg-amber" },
  sleep: { bg: "bg-lavender-light/60", dot: "bg-lavender" },
  feed: { bg: "bg-teal-light/60", dot: "bg-teal" },
  activity: { bg: "bg-sage-light/60", dot: "bg-sage" },
  "wind-down": { bg: "bg-lavender-light/40", dot: "bg-lavender-dark" },
};

const SCHEDULE: {
  time: string;
  emoji: string;
  label: string;
  cat: ScheduleCategory;
}[] = [
  { time: "7:00 AM", emoji: "🌅", label: "Wake up", cat: "wake" },
  { time: "7:15 AM", emoji: "🍼", label: "Morning feed", cat: "feed" },
  { time: "9:00 AM", emoji: "😴", label: "Nap 1 (1.5 hrs)", cat: "sleep" },
  { time: "10:45 AM", emoji: "🍼", label: "Feed", cat: "feed" },
  {
    time: "11:30 AM",
    emoji: "🎯",
    label: "Activity time (milestone practice)",
    cat: "activity",
  },
  { time: "12:30 PM", emoji: "😴", label: "Nap 2 (1 hr)", cat: "sleep" },
  { time: "2:00 PM", emoji: "🍼", label: "Afternoon feed", cat: "feed" },
  {
    time: "3:30 PM",
    emoji: "🎨",
    label: "Playtime & sensory",
    cat: "activity",
  },
  { time: "4:30 PM", emoji: "😴", label: "Nap 3 (45 min)", cat: "sleep" },
  { time: "5:30 PM", emoji: "🍼", label: "Evening feed", cat: "feed" },
  { time: "6:30 PM", emoji: "🛁", label: "Bath & wind-down", cat: "wind-down" },
  { time: "7:00 PM", emoji: "🌙", label: "Bedtime routine", cat: "wind-down" },
];

const VISIBLE_COUNT = 4;

export function ResultsPreviewStep() {
  const { nextStep, babyDisplayName, babyAge } = useQuiz();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="animate-bounce-soft bg-lavender-light mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl">
          📋
        </div>
        <StepTitle>{babyDisplayName}&apos;s Optimized Daily Routine</StepTitle>
        {babyAge && (
          <div className="bg-lavender-light/60 mt-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="text-lavender-dark text-xs font-semibold">
              {babyAge.label}
            </span>
            <span className="bg-lavender/30 h-3 w-px" />
            <span className="text-lavender-dark text-xs font-semibold">
              Ideal bedtime 6:30–7:30 PM
            </span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="border-border bg-surface relative rounded-2xl border p-4">
        {/* Vertical timeline line */}
        <div className="bg-border absolute top-4 bottom-4 left-[35px] w-0.5" />

        <div className="relative space-y-1">
          {SCHEDULE.map((item, i) => {
            const styles = CATEGORY_STYLES[item.cat];
            const isVisible = i < VISIBLE_COUNT;

            return (
              <div
                key={i}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                  isVisible ? `${styles.bg} animate-slide-up` : "bg-transparent"
                }`}
                style={
                  isVisible ? { animationDelay: `${i * 0.12}s` } : undefined
                }
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${isVisible ? styles.dot : "bg-border"}`}
                  />
                </div>

                {/* Time */}
                <span className="text-charcoal/50 min-w-[64px] text-xs font-bold tabular-nums">
                  {item.time}
                </span>

                {/* Emoji + label */}
                <span className="text-base">{item.emoji}</span>
                <span className="text-charcoal text-sm font-medium">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Blur overlay */}
        <div className="from-surface/0 via-surface/90 to-surface absolute inset-x-0 top-[180px] bottom-0 flex items-center justify-center rounded-b-2xl bg-gradient-to-b">
          <div className="text-center">
            <div className="bg-teal-light/60 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full text-xl">
              🔒
            </div>
            <p className="font-heading text-charcoal text-base font-bold">
              Unlock {babyDisplayName}&apos;s full routine
            </p>
            <p className="text-muted mt-1 text-xs">
              {SCHEDULE.length - VISIBLE_COUNT} more activities planned for the
              day
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {(
          [
            ["sleep", "Sleep"],
            ["feed", "Feeding"],
            ["activity", "Activity"],
            ["wind-down", "Wind-down"],
          ] as const
        ).map(([cat, label]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${CATEGORY_STYLES[cat].dot}`}
            />
            <span className="text-muted text-[11px]">{label}</span>
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep}>See full plan →</CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 18 — Social Proof                                           */
/* ================================================================== */

const TESTIMONIALS = [
  {
    quote:
      "Within a week, our daughter went from 4 wake-ups to 1. I finally feel like myself again.",
    author: "Sarah",
    detail: "mom of 6-month-old",
  },
  {
    quote: "I stopped second-guessing everything. The routine just works.",
    author: "James",
    detail: "first-time dad",
  },
  {
    quote:
      "The feeding + sleep tracking together is what makes this different from everything else.",
    author: "Maria",
    detail: "mom of 2",
  },
];

export function SocialProofStep() {
  const { nextStep } = useQuiz();
  const parentCount = useCountUp(50000, 1800);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <StepTitle>
          Join{" "}
          <span className="inline-block w-[5.5ch] text-right tabular-nums">
            {parentCount.toLocaleString()}
          </span>
          + parents already using personalized routines
        </StepTitle>
      </div>

      <div className="space-y-4">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="animate-slide-up border-border bg-surface rounded-2xl border p-5"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="text-amber mb-2">⭐⭐⭐⭐⭐</div>
            <p className="text-charcoal leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-muted mt-3 text-sm">
              — {t.author}, <span className="italic">{t.detail}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-amber-light/50 flex items-center justify-center gap-2 rounded-xl p-3">
        <span className="text-lg">⭐</span>
        <span className="text-charcoal font-semibold">4.8 rating</span>
        <span className="text-muted text-sm">on the App Store</span>
      </div>

      <CTAButton onClick={nextStep}>Get my plan →</CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 19 — Email Capture                                          */
/* ================================================================== */

export function EmailCaptureStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();
  const [isValid, setIsValid] = useState(false);

  const handleChange = (v: string) => {
    setAnswer("email", v);
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-teal-light mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
          📧
        </div>
        <StepTitle>
          Where should we send {babyDisplayName}&apos;s routine plan?
        </StepTitle>
        <StepSubtitle>
          We&apos;ll also send weekly milestone updates and expert tips
        </StepSubtitle>
      </div>

      <div onKeyDown={handleKeyDown}>
        <QuizInput
          type="email"
          value={answers.email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoFocus
        />
      </div>

      <CTAButton onClick={nextStep} disabled={!isValid}>
        Send my plan
      </CTAButton>

      <p className="text-muted text-center text-xs">
        🔒 No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Screen 20 — Paywall                                                */
/* ================================================================== */

export function PaywallStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();
  const planToastFired = useRef(false);

  const selectPlan = (plan: "monthly" | "yearly") => {
    setAnswer("selectedPlan", plan);
    if (!planToastFired.current) {
      planToastFired.current = true;
      showAchievement({
        emoji: "✨",
        title: "Great choice!",
        description: `Best value for ${babyDisplayName}'s growth`,
        variant: "teal",
      });
    }
  };

  const isYearly = answers.selectedPlan === "yearly";

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <div className="relative mt-2 mb-6">
        <div className="bg-teal-light mx-auto flex h-28 w-28 items-center justify-center rounded-full text-6xl">
          🌙
        </div>
        <span className="animate-pulse-soft absolute top-2 -right-2 text-xl">
          ✨
        </span>
        <span
          className="animate-pulse-soft absolute bottom-4 -left-3 text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          ✨
        </span>
      </div>

      {/* Headline */}
      <h2 className="font-heading text-charcoal mb-8 text-center text-2xl leading-tight font-bold md:text-3xl">
        Get started with a <span className="text-teal">7 day free trial</span>{" "}
        on Petite Care
      </h2>

      {/* Plan cards — stacked */}
      <div className="mb-6 w-full space-y-3">
        {/* Yearly */}
        <button
          type="button"
          onClick={() => selectPlan("yearly")}
          className={`relative flex w-full items-center rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${
            isYearly
              ? "border-teal bg-teal-light/25 shadow-teal/15 shadow-lg"
              : "border-border bg-surface hover:border-teal/40"
          }`}
        >
          {isYearly && (
            <div className="bg-teal shadow-teal/25 absolute -top-2.5 -left-2.5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md">
              <svg width="14" height="11" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {/* Badge */}
          <div className="bg-amber text-charcoal absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-sm">
            Most popular
          </div>
          <div className="flex-1">
            <div className="text-charcoal text-lg font-bold">Individual</div>
            <div className="text-muted mt-0.5 text-sm">
              12 mo &middot; $59.99
            </div>
          </div>
          <div className="text-right">
            <span className="text-charcoal text-xl font-bold">$4.99</span>
            <span className="text-muted text-sm"> / MO</span>
          </div>
        </button>

        {/* Monthly */}
        <button
          type="button"
          onClick={() => selectPlan("monthly")}
          className={`relative flex w-full items-center rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${
            !isYearly
              ? "border-teal bg-teal-light/25 shadow-teal/15 shadow-lg"
              : "border-border bg-surface hover:border-teal/40"
          }`}
        >
          {!isYearly && (
            <div className="bg-teal shadow-teal/25 absolute -top-2.5 -left-2.5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md">
              <svg width="14" height="11" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <div className="text-charcoal text-lg font-bold">Monthly</div>
            <div className="text-muted mt-0.5 text-sm">
              1 mo &middot; $12.99
            </div>
          </div>
          <div className="text-right">
            <span className="text-charcoal text-xl font-bold">$12.99</span>
            <span className="text-muted text-sm"> / MO</span>
          </div>
        </button>
      </div>

      {/* Cancel note */}
      <p className="text-muted mb-6 text-center text-sm">
        Cancel anytime in the App Store
      </p>

      {/* CTA */}
      <div className="w-full">
        <CTAButton onClick={nextStep}>START MY FREE WEEK</CTAButton>
      </div>

      {/* Legal */}
      <p className="text-muted/70 mt-5 px-2 text-center text-[10px] leading-relaxed">
        Your monthly or annual subscription{" "}
        <strong className="text-muted">automatically renews</strong> for the
        same term unless cancelled at least 24 hours prior to the end of the
        current term. Cancel any time in the App Store at no additional cost;
        your subscription will then cease at the end of the current term.
      </p>

      <button
        type="button"
        onClick={nextStep}
        className="text-muted/50 hover:text-teal mt-4 w-full text-center text-xs transition-colors"
      >
        Continue with limited free version →
      </button>
    </div>
  );
}

/* ================================================================== */
/*  Screen 21 — Success / App Install                                  */
/* ================================================================== */

export function SuccessStep() {
  const { nextStep, parentDisplayName, babyDisplayName, answers } = useQuiz();
  const { shower } = useConfetti();

  useEffect(() => {
    const t = setTimeout(shower, 300);
    return () => clearTimeout(t);
  }, [shower]);

  return (
    <div className="space-y-8 py-4 text-center">
      <div className="animate-bounce-soft">
        <div className="bg-sage-light mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl">
          🎉
        </div>
      </div>

      <div>
        <h2 className="font-heading text-charcoal text-3xl font-bold">
          Welcome to the family, {parentDisplayName}!
        </h2>
        <p className="text-muted mt-2">
          {babyDisplayName}&apos;s routine plan is ready. Download the app to
          get started.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {/* App Store */}
        <a
          href="#"
          className="bg-charcoal hover:bg-charcoal/85 inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-none text-white/70">
              Download on the
            </div>
            <div className="text-base leading-tight font-semibold text-white">
              App Store
            </div>
          </div>
        </a>

        {/* Google Play */}
        <a
          href="#"
          className="bg-charcoal hover:bg-charcoal/85 inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M3.18 23.54c-.36-.17-.59-.52-.59-.92V1.38c0-.4.23-.75.59-.92l11.68 11.54L3.18 23.54zM15.86 16.5l-2.69-2.66 8.52-4.75c.56-.31.56-1.08 0-1.39l-8.52-4.75 2.69-2.66 10.14 5.65c1.12.62 1.12 2.28 0 2.91L15.86 16.5zM13.17 11.96L5.1 3.77l10.48 5.84-2.41 2.35zM5.1 20.23l8.07-8.19 2.41 2.35L5.1 20.23z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-none text-white/70">
              Get it on
            </div>
            <div className="text-base leading-tight font-semibold text-white">
              Google Play
            </div>
          </div>
        </a>
      </div>

      {answers.email && (
        <p className="text-muted text-sm">
          Your subscription is already active — just sign in with{" "}
          <span className="text-charcoal font-medium">{answers.email}</span>
        </p>
      )}

      <CTAButton onClick={nextStep} variant="secondary">
        Continue
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 22 — Thank You                                              */
/* ================================================================== */

export function ThankYouStep() {
  const { answers, babyDisplayName } = useQuiz();

  const links = [
    {
      emoji: "📖",
      bg: "bg-lavender-light",
      title: "5 signs your baby's sleep schedule needs adjusting",
      subtitle: "Quick read · 3 min",
    },
    {
      emoji: "👥",
      bg: "bg-amber-light",
      title: "Join our parent community",
      subtitle: "Connect with other parents",
    },
  ];

  return (
    <div className="space-y-8 py-4 text-center">
      <div>
        <div className="bg-teal-light mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
          💌
        </div>
        <h2 className="font-heading text-charcoal text-2xl font-bold md:text-3xl">
          Check your email!
        </h2>
        <p className="text-muted mt-2">
          We just sent {babyDisplayName}&apos;s routine overview to{" "}
          <span className="text-charcoal font-medium">
            {answers.email || "your email"}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="#"
          className="bg-charcoal hover:bg-charcoal/85 inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-all"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-none text-white/70">
              Download on the
            </div>
            <div className="text-base leading-tight font-semibold text-white">
              App Store
            </div>
          </div>
        </a>

        <a
          href="#"
          className="bg-charcoal hover:bg-charcoal/85 inline-flex items-center gap-3 rounded-xl px-5 py-3 transition-all"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-google-playstore.svg"
            alt="Google Play"
            className="h-7 w-7 brightness-0 invert"
          />
          <div className="text-left">
            <div className="text-[10px] leading-none text-white/70">
              Get it on
            </div>
            <div className="text-base leading-tight font-semibold text-white">
              Google Play
            </div>
          </div>
        </a>
      </div>

      <div className="space-y-3 text-left">
        <p className="text-charcoal text-center text-sm font-semibold">
          While you wait:
        </p>
        {links.map((link, i) => (
          <a
            key={i}
            href="#"
            className="border-border bg-surface hover:border-teal/30 flex items-center gap-3 rounded-xl border p-4 transition-all hover:shadow-sm"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${link.bg}`}
            >
              {link.emoji}
            </span>
            <div className="min-w-0">
              <div className="text-charcoal font-semibold">{link.title}</div>
              <div className="text-muted text-sm">{link.subtitle}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-muted pt-4 text-sm">
        <Link href="/" className="font-heading text-charcoal font-bold">
          Petite <span className="text-teal">Care</span>
        </Link>
        <p className="mt-1">
          Thank you for trusting us with your family&apos;s routine 💛
        </p>
      </div>
    </div>
  );
}
