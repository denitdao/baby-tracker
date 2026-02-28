"use client";

import { type ReactNode } from "react";
import { useQuiz } from "~/context/QuizContext";
import { CTAButton, ImagePlaceholder } from "~/components/quiz/shared";

/* ------------------------------------------------------------------ */
/*  Shared problem screen layout                                       */
/* ------------------------------------------------------------------ */

function ProblemLayout({
  problemNumber,
  title,
  children,
  onNext,
}: {
  problemNumber: number;
  title: string;
  children: ReactNode;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-block rounded-full bg-lavender-light px-3.5 py-1 text-sm font-bold text-lavender-dark">
          Problem #{problemNumber}
        </div>
        <h2 className="font-heading text-2xl font-bold leading-tight text-charcoal md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
      <CTAButton onClick={onNext}>Next</CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 11 — Problem: Sleep Pressure                                */
/* ================================================================== */

export function ProblemSleepStep() {
  const { nextStep, babyDisplayName, babyAge } = useQuiz();
  const ageText = babyAge ? `at ${babyAge.label}` : "at this age";

  return (
    <ProblemLayout
      problemNumber={1}
      title="Babies don't sleep like adults"
      onNext={nextStep}
    >
      <ImagePlaceholder
        emoji="📊"
        label="Sleep pressure wave visualization"
        description="Adult smooth sine wave vs baby's jagged pattern"
        aspectRatio="aspect-[16/9]"
      />

      <div className="rounded-2xl bg-lavender-light/50 p-5">
        <p className="leading-relaxed text-charcoal/80">
          Adults build sleep pressure over a full day.{" "}
          {babyDisplayName}&apos;s battery drains in just{" "}
          <span className="font-semibold text-charcoal">1–3 hours</span>{" "}
          {ageText}. Missing the right window by even 20 minutes can mean an
          overtired, cranky baby — and a stressful night for you.
        </p>
      </div>
    </ProblemLayout>
  );
}

/* ================================================================== */
/*  Screen 12 — Problem: Feeding Rhythm                                */
/* ================================================================== */

export function ProblemFeedingStep() {
  const { nextStep, babyDisplayName, babyAge } = useQuiz();
  const ageText = babyAge ? `At ${babyAge.label}` : "At this age";

  return (
    <ProblemLayout
      problemNumber={2}
      title="Feeding isn't just about hunger"
      onNext={nextStep}
    >
      <ImagePlaceholder
        emoji="🕐"
        label="24-hour feeding clock visualization"
        description="Circular clock showing feeding-sleep-energy connections"
        aspectRatio="aspect-[16/9]"
      />

      <div className="rounded-2xl bg-amber-light/50 p-5">
        <p className="leading-relaxed text-charcoal/80">
          {babyDisplayName}&apos;s feeding schedule directly affects sleep
          quality and mood. {ageText}, most babies need timed feeds around wake
          windows — not just when they cry.
        </p>
      </div>
    </ProblemLayout>
  );
}

/* ================================================================== */
/*  Screen 13 — Problem: Development Tracking                          */
/* ================================================================== */

export function ProblemDevelopmentStep() {
  const { nextStep, babyDisplayName, babyAge } = useQuiz();
  const ageText = babyAge ? `at ${babyAge.label}` : "at this age";

  return (
    <ProblemLayout
      problemNumber={3}
      title="Every baby develops at their own pace — but milestones still matter"
      onNext={nextStep}
    >
      <ImagePlaceholder
        emoji="📈"
        label="Milestone timeline visualization"
        description="Expected vs actual milestone windows with normal range"
        aspectRatio="aspect-[16/9]"
      />

      <div className="rounded-2xl bg-sage-light/50 p-5">
        <p className="leading-relaxed text-charcoal/80">
          {ageText}, {babyDisplayName} is in a critical development window.{" "}
          <span className="font-semibold text-charcoal">
            73% of parents
          </span>{" "}
          worry they&apos;re missing something. The key is knowing what to look
          for — and when.
        </p>
      </div>
    </ProblemLayout>
  );
}

/* ================================================================== */
/*  Screen 14 — Problem: Parental Stress                               */
/* ================================================================== */

export function ProblemStressStep() {
  const { nextStep } = useQuiz();

  return (
    <ProblemLayout
      problemNumber={4}
      title="When baby doesn't have a routine, neither do you"
      onNext={nextStep}
    >
      <ImagePlaceholder
        emoji="📅"
        label="Chaos vs order visualization"
        description="Chaotic day (scattered icons) vs organized day (timeline)"
        aspectRatio="aspect-[16/9]"
      />

      <div className="rounded-2xl bg-teal-light/50 p-5">
        <p className="leading-relaxed text-charcoal/80">
          New parents lose an average of{" "}
          <span className="font-semibold text-charcoal">
            44 days of sleep
          </span>{" "}
          in the first year. But it&apos;s not just about sleep — it&apos;s the
          unpredictability. When you don&apos;t know what&apos;s coming next,
          every hour feels harder than it needs to.
        </p>
      </div>
    </ProblemLayout>
  );
}

/* ================================================================== */
/*  Screen 15 — Solution Bridge                                        */
/* ================================================================== */

export function SolutionBridgeStep() {
  const { nextStep, parentDisplayName, babyDisplayName, babyAge } = useQuiz();
  const ageLabel = babyAge?.label;

  const benefits = [
    "Optimal wake windows and nap times",
    `The right feeding rhythm for ${babyDisplayName}'s stage`,
    "Which milestones to watch for this month",
    "A daily schedule that gives YOU breathing room",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
          Here&apos;s the good news, {parentDisplayName} 💛
        </h2>
        <p className="mt-3 font-heading text-xl font-semibold text-teal">
          A personalized routine changes everything.
        </p>
      </div>

      <p className="text-muted">
        Based on {babyDisplayName}&apos;s age
        {ageLabel ? ` (${ageLabel})` : ""}, we can calculate:
      </p>

      <div className="space-y-3">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="flex animate-slide-up items-start gap-3 rounded-xl bg-sage-light/40 p-3.5"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-xs text-white">
              ✓
            </span>
            <span className="text-charcoal">{b}</span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-amber-light/50 p-4 text-center">
        <p className="text-sm font-medium text-charcoal/80">
          <span className="font-bold text-charcoal">87%</span> of parents who
          follow a personalized routine report better sleep within 2 weeks.
        </p>
      </div>

      <CTAButton onClick={nextStep}>Build my plan →</CTAButton>
    </div>
  );
}
