"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { useQuiz } from "~/context/QuizContext";
import { CTAButton } from "~/components/quiz/shared";

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
        <div className="bg-lavender-light text-lavender-dark mb-3 inline-block rounded-full px-3.5 py-1 text-sm font-bold">
          Problem #{problemNumber}
        </div>
        <h2 className="font-heading text-charcoal text-2xl leading-tight font-bold md:text-3xl">
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
      <Image
        src="/sleep-pressure.png"
        alt="Sleep pressure: adult vs baby comparison"
        width={560}
        height={315}
        className="w-full rounded-2xl"
      />

      <div className="bg-lavender-light/50 rounded-2xl p-5">
        <p className="text-charcoal/80 leading-relaxed">
          Adults build sleep pressure over a full day. {babyDisplayName}&apos;s
          battery drains in just{" "}
          <span className="text-charcoal font-semibold">1–3 hours</span>{" "}
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
      <Image
        src="/feeding-clock.png"
        alt="24-hour feeding and sleep cycle"
        width={560}
        height={315}
        className="w-full rounded-2xl"
      />

      <div className="bg-amber-light/50 rounded-2xl p-5">
        <p className="text-charcoal/80 leading-relaxed">
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
      <Image
        src="/milestones.png"
        alt="Baby development milestone timeline"
        width={560}
        height={315}
        className="w-full rounded-2xl"
      />

      <div className="bg-sage-light/50 rounded-2xl p-5">
        <p className="text-charcoal/80 leading-relaxed">
          {ageText}, {babyDisplayName} is in a critical development window.{" "}
          <span className="text-charcoal font-semibold">73% of parents</span>{" "}
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
      <Image
        src="/chaos-vs-order.png"
        alt="Chaotic day vs organized routine"
        width={560}
        height={315}
        className="w-full rounded-2xl"
      />

      <div className="bg-teal-light/50 rounded-2xl p-5">
        <p className="text-charcoal/80 leading-relaxed">
          New parents lose an average of{" "}
          <span className="text-charcoal font-semibold">44 days of sleep</span>{" "}
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
        <h2 className="font-heading text-charcoal text-2xl font-bold md:text-3xl">
          Here&apos;s the good news, {parentDisplayName} 💛
        </h2>
        <p className="font-heading text-teal mt-3 text-xl font-semibold">
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
            className="animate-slide-up bg-sage-light/40 flex items-start gap-3 rounded-xl p-3.5"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="bg-sage mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white">
              ✓
            </span>
            <span className="text-charcoal">{b}</span>
          </div>
        ))}
      </div>

      <div className="bg-amber-light/50 rounded-2xl p-4 text-center">
        <p className="text-charcoal/80 text-sm font-medium">
          <span className="text-charcoal font-bold">87%</span> of parents who
          follow a personalized routine report better sleep within 2 weeks.
        </p>
      </div>

      <CTAButton onClick={nextStep}>Build my plan →</CTAButton>
    </div>
  );
}
