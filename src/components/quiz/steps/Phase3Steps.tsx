"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuiz } from "~/context/QuizContext";
import {
  CTAButton,
  QuizInput,
  StepTitle,
  StepSubtitle,
} from "~/components/quiz/shared";

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

  const advance = useCallback(() => nextStep(), [nextStep]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LOADING_STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrentIdx(i + 1), (i + 1) * 800));
    });

    const doneAt = LOADING_STEPS.length * 800 + 500;
    timers.push(setTimeout(() => setComplete(true), doneAt));
    timers.push(setTimeout(advance, doneAt + 1000));

    return () => timers.forEach(clearTimeout);
  }, [advance]);

  return (
    <div className="space-y-8 py-8 text-center">
      <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
        Building {babyDisplayName}&apos;s plan...
      </h2>

      {/* Progress bar */}
      <div className="mx-auto max-w-xs">
        <div className="h-3 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-lavender transition-all duration-700 ease-out"
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
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-xs text-white">
                  ✓
                </span>
              ) : i === currentIdx ? (
                <span className="h-5 w-5 animate-pulse-soft rounded-full bg-amber" />
              ) : (
                <span className="h-5 w-5 rounded-full bg-border" />
              )}
              <span
                className={
                  isDone
                    ? "text-charcoal"
                    : i === currentIdx
                      ? "font-medium text-charcoal"
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
          <div className="inline-flex items-center gap-2 rounded-full bg-sage-light px-5 py-2.5 font-semibold text-sage-dark">
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

const SCHEDULE = [
  { time: "7:00 AM", emoji: "🌅", label: "Wake up" },
  { time: "7:15 AM", emoji: "🍼", label: "Morning feed" },
  { time: "9:00 AM", emoji: "😴", label: "Nap 1 (1.5 hrs)" },
  { time: "10:45 AM", emoji: "🍼", label: "Feed" },
  { time: "11:30 AM", emoji: "🎯", label: "Activity time (milestone practice)" },
  { time: "12:30 PM", emoji: "😴", label: "Nap 2 (1 hr)" },
  { time: "2:00 PM", emoji: "🍼", label: "Afternoon feed" },
  { time: "3:30 PM", emoji: "🎨", label: "Playtime & sensory" },
  { time: "4:30 PM", emoji: "😴", label: "Nap 3 (45 min)" },
  { time: "5:30 PM", emoji: "🍼", label: "Evening feed" },
  { time: "6:30 PM", emoji: "🛁", label: "Bath & wind-down" },
  { time: "7:00 PM", emoji: "🌙", label: "Bedtime routine" },
];

const VISIBLE_COUNT = 3;

export function ResultsPreviewStep() {
  const { nextStep, babyDisplayName, babyAge } = useQuiz();

  return (
    <div className="space-y-6">
      <div>
        <StepTitle>
          {babyDisplayName}&apos;s Optimized Daily Routine
        </StepTitle>
        {babyAge && (
          <div className="mt-2 inline-block rounded-full bg-lavender-light px-3 py-1 text-sm font-medium text-lavender-dark">
            Based on {babyAge.label} · Ideal bedtime: 6:30–7:30 PM
          </div>
        )}
      </div>

      {/* Schedule timeline */}
      <div className="relative">
        <div className="space-y-2">
          {SCHEDULE.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border border-border bg-surface p-3 ${
                i < VISIBLE_COUNT ? "animate-slide-up" : ""
              }`}
              style={
                i < VISIBLE_COUNT
                  ? { animationDelay: `${i * 0.1}s` }
                  : undefined
              }
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="min-w-[72px] text-sm font-bold text-teal">
                {item.time}
              </span>
              <span className="text-charcoal">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Blur overlay */}
        <div className="absolute bottom-0 left-0 right-0 top-[160px] flex items-center justify-center bg-gradient-to-b from-transparent via-antique/80 to-antique">
          <div className="rounded-2xl bg-surface p-6 text-center shadow-xl shadow-charcoal/5">
            <div className="mb-2 text-3xl">🔒</div>
            <p className="font-heading font-bold text-charcoal">
              Unlock {babyDisplayName}&apos;s full routine
            </p>
            <p className="mt-1 text-sm text-muted">
              {SCHEDULE.length - VISIBLE_COUNT} more activities planned
            </p>
          </div>
        </div>
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
    quote:
      "I stopped second-guessing everything. The routine just works.",
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <StepTitle>
          Join 50,000+ parents already using personalized routines
        </StepTitle>
      </div>

      <div className="space-y-4">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="animate-slide-up rounded-2xl border border-border bg-surface p-5"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="mb-2 text-amber">⭐⭐⭐⭐⭐</div>
            <p className="leading-relaxed text-charcoal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-3 text-sm text-muted">
              — {t.author},{" "}
              <span className="italic">{t.detail}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 rounded-xl bg-amber-light/50 p-3">
        <span className="text-lg">⭐</span>
        <span className="font-semibold text-charcoal">4.8 rating</span>
        <span className="text-sm text-muted">on the App Store</span>
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-light text-3xl">
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

      <p className="text-center text-xs text-muted">
        🔒 No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Screen 20 — Paywall                                                */
/* ================================================================== */

export function PaywallStep() {
  const { answers, setAnswer, nextStep, babyDisplayName, babyAge } = useQuiz();
  const ageRange = babyAge
    ? `${babyAge.months}–${babyAge.months + 3} months`
    : "your baby's stage";

  const features = [
    `${babyDisplayName}'s full personalized routine`,
    "Smart sleep & feeding tracker",
    `Weekly milestone alerts for ${ageRange}`,
    `Expert tips personalized to ${babyDisplayName}'s stage`,
    "Push reminders (never miss a nap window)",
    "Weekly progress reports",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <StepTitle>
          Start {babyDisplayName}&apos;s personalized routine today
        </StepTitle>
      </div>

      {/* Trial timeline */}
      <div className="flex items-center justify-between rounded-2xl bg-sage-light/40 p-4">
        <div className="text-center">
          <div className="text-sm font-bold text-sage-dark">Day 1</div>
          <div className="text-xs text-muted">Full access</div>
        </div>
        <div className="mx-2 h-px flex-1 bg-sage/30" />
        <div className="text-center">
          <div className="text-sm font-bold text-amber">Day 5</div>
          <div className="text-xs text-muted">Reminder</div>
        </div>
        <div className="mx-2 h-px flex-1 bg-sage/30" />
        <div className="text-center">
          <div className="text-sm font-bold text-muted">Day 7</div>
          <div className="text-xs text-muted">Trial ends</div>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-sage-dark">
        You won&apos;t be charged during the free trial
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Monthly */}
        <button
          type="button"
          onClick={() => setAnswer("selectedPlan", "monthly")}
          className={`rounded-2xl border-2 p-4 text-left transition-all ${
            answers.selectedPlan === "monthly"
              ? "border-teal bg-teal-light/30"
              : "border-border bg-surface hover:border-teal/30"
          }`}
        >
          <div className="text-xs font-medium text-muted">Flexible</div>
          <div className="mt-1 text-xl font-bold text-charcoal">$12.99</div>
          <div className="text-xs text-muted">/month</div>
          <div className="mt-2 rounded-full bg-border px-2 py-0.5 text-center text-xs font-medium text-muted">
            $3.25/week
          </div>
          <div className="mt-2 text-xs text-muted">7 days free</div>
        </button>

        {/* Yearly */}
        <button
          type="button"
          onClick={() => setAnswer("selectedPlan", "yearly")}
          className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
            answers.selectedPlan === "yearly"
              ? "border-teal bg-teal-light/30 shadow-md shadow-teal/10"
              : "border-border bg-surface hover:border-teal/30"
          }`}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal px-3 py-0.5 text-xs font-bold text-white">
            BEST VALUE
          </div>
          <div className="text-xs font-medium text-teal">Save 62%</div>
          <div className="mt-1 text-xl font-bold text-charcoal">$59.99</div>
          <div className="text-xs text-muted">/year</div>
          <div className="mt-2 rounded-full bg-teal-light px-2 py-0.5 text-center text-xs font-bold text-teal">
            $1.15/week
          </div>
          <div className="mt-2 text-xs text-muted">7 days free</div>
        </button>
      </div>

      {/* Features list */}
      <div className="space-y-2.5">
        <p className="text-sm font-semibold text-charcoal">
          What&apos;s included:
        </p>
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-0.5 text-sage">✓</span>
            <span className="text-sm text-charcoal/80">{f}</span>
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep}>Start My Free 7-Day Trial</CTAButton>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted">
        <span>🔒 Cancel anytime</span>
        <span>·</span>
        <span>💰 Money-back guarantee</span>
        <span>·</span>
        <span>No charge for 7 days</span>
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="w-full text-center text-xs text-muted hover:text-teal"
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

  return (
    <div className="space-y-8 py-4 text-center">
      <div className="animate-bounce-soft">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sage-light text-5xl">
          🎉
        </div>
      </div>

      <div>
        <h2 className="font-heading text-3xl font-bold text-charcoal">
          Welcome to the family, {parentDisplayName}!
        </h2>
        <p className="mt-2 text-muted">
          {babyDisplayName}&apos;s routine plan is ready. Download the app to
          get started.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 font-semibold text-white transition-all hover:bg-charcoal/80"
        >
          🍎 App Store
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-charcoal px-6 py-3.5 font-semibold text-white transition-all hover:bg-charcoal/80"
        >
          ▶️ Google Play
        </button>
      </div>

      {answers.email && (
        <p className="text-sm text-muted">
          Your subscription is already active — just sign in with{" "}
          <span className="font-medium text-charcoal">{answers.email}</span>
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
      emoji: "📱",
      bg: "bg-teal-light",
      title: "Download the app",
      subtitle: "Available on iOS and Android",
    },
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-light text-3xl">
          💌
        </div>
        <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
          Check your email!
        </h2>
        <p className="mt-2 text-muted">
          We just sent {babyDisplayName}&apos;s routine overview to{" "}
          <span className="font-medium text-charcoal">
            {answers.email || "your email"}
          </span>
        </p>
      </div>

      <div className="space-y-3 text-left">
        <p className="text-center text-sm font-semibold text-charcoal">
          While you wait:
        </p>
        {links.map((link, i) => (
          <a
            key={i}
            href="#"
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-teal/30 hover:shadow-sm"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${link.bg}`}
            >
              {link.emoji}
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-charcoal">{link.title}</div>
              <div className="text-sm text-muted">{link.subtitle}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="pt-4 text-sm text-muted">
        <div className="font-heading font-bold text-charcoal">
          Petite <span className="text-teal">Care</span>
        </div>
        <p className="mt-1">
          Thank you for trusting us with your family&apos;s routine 💛
        </p>
      </div>
    </div>
  );
}
