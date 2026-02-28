"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useQuiz } from "~/context/QuizContext";
import { useConfetti } from "~/hooks/useConfetti";
import {
  OptionCard,
  CTAButton,
  QuizInput,
  QuizDatePicker,
  StepTitle,
  StepSubtitle,
  ImagePlaceholder,
} from "~/components/quiz/shared";

/* ================================================================== */
/*  Screen 1 — Welcome / Value Selection                               */
/* ================================================================== */

const WELCOME_OPTIONS = [
  {
    id: "sleep",
    emoji: "😴",
    label: "Better sleep for everyone",
    description: "Fewer night wake-ups, predictable naps",
  },
  {
    id: "routine",
    emoji: "📋",
    label: "An organized daily routine",
    description: "Know what to do and when, less guessing",
  },
  {
    id: "growth",
    emoji: "💪",
    label: "Confidence in your baby's growth",
    description: "Track milestones, feeding, development",
  },
];

export function WelcomeStep() {
  const { answers, setAnswer, nextStep } = useQuiz();

  return (
    <div className="space-y-6">
      <div>
        <StepTitle>Hi there! 👋</StepTitle>
        <StepSubtitle>
          Your baby&apos;s perfect routine is just a few questions away. What
          matters most to you right now?
        </StepSubtitle>
      </div>

      <div className="space-y-3">
        {WELCOME_OPTIONS.map((opt, i) => (
          <div
            key={opt.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <OptionCard
              emoji={opt.emoji}
              label={opt.label}
              description={opt.description}
              selected={answers.valueSelection === opt.id}
              onClick={() => setAnswer("valueSelection", opt.id)}
            />
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.valueSelection}>
        Let&apos;s go!
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 2 — Attribution                                             */
/* ================================================================== */

const ATTRIBUTION_OPTIONS = [
  { id: "tiktok", emoji: "🎵", label: "TikTok" },
  { id: "instagram", emoji: "📸", label: "Instagram / Facebook" },
  { id: "google", emoji: "🔍", label: "Google search" },
  { id: "youtube", emoji: "▶️", label: "YouTube" },
  { id: "friend", emoji: "💬", label: "Friend / family recommendation" },
  { id: "blog", emoji: "📰", label: "Blog / article" },
  { id: "other", emoji: "✨", label: "Other" },
];

export function AttributionStep() {
  const { answers, setAnswer, nextStep } = useQuiz();

  return (
    <div className="space-y-6">
      <StepTitle>How did you find us?</StepTitle>

      <div className="space-y-2.5">
        {ATTRIBUTION_OPTIONS.map((opt, i) => (
          <div
            key={opt.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <OptionCard
              emoji={opt.emoji}
              label={opt.label}
              selected={answers.attribution === opt.id}
              onClick={() => setAnswer("attribution", opt.id)}
            />
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.attribution}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 3 — Baby's Name                                             */
/* ================================================================== */

export function BabyNameStep() {
  const { answers, setAnswer, nextStep } = useQuiz();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && answers.babyName.trim()) nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Image
          src="/baby-mascot.png"
          alt="Cute baby mascot waving"
          width={180}
          height={180}
          className="mx-auto mb-6"
        />
        <StepTitle>Let&apos;s get to know your little one!</StepTitle>
        <StepSubtitle>What&apos;s their name?</StepSubtitle>
      </div>

      <div onKeyDown={handleKeyDown}>
        <QuizInput
          value={answers.babyName}
          onChange={(v) => setAnswer("babyName", v)}
          placeholder="Baby's name"
          autoFocus
        />
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.babyName.trim()}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 4 — Baby's Birthday                                         */
/* ================================================================== */

export function BabyBirthdayStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  return (
    <div className="space-y-6">
      <div>
        <StepTitle>When was {babyDisplayName} born?</StepTitle>
        <StepSubtitle>
          We need this to calculate the perfect routine ✨
        </StepSubtitle>
      </div>

      <QuizDatePicker
        value={answers.babyBirthday ?? ""}
        onChange={(v) => setAnswer("babyBirthday", v)}
      />

      <button
        type="button"
        onClick={() => {
          setAnswer("isNotBornYet", true);
          nextStep();
        }}
        className="w-full text-center text-sm text-teal hover:underline"
      >
        My baby is not born yet
      </button>

      <CTAButton
        onClick={nextStep}
        disabled={!answers.babyBirthday && !answers.isNotBornYet}
      >
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 5 — First Born?                                             */
/* ================================================================== */

export function FirstBornStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  return (
    <div className="space-y-6">
      <StepTitle>Is {babyDisplayName} your first baby?</StepTitle>

      <div className="grid grid-cols-2 gap-3">
        {[
          { value: true, label: "Yes" },
          { value: false, label: "No" },
        ].map((opt) => (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => setAnswer("isFirstBorn", opt.value)}
            className={`rounded-2xl border-2 py-6 text-center text-lg font-semibold transition-all ${
              answers.isFirstBorn === opt.value
                ? "border-teal bg-teal-light text-teal shadow-md shadow-teal/10"
                : "border-border bg-surface text-charcoal hover:border-teal/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={answers.isFirstBorn === null}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 5b — Baby's Gender                                          */
/* ================================================================== */

const GENDER_OPTIONS = [
  { id: "boy", emoji: "👦", label: "Boy" },
  { id: "girl", emoji: "👧", label: "Girl" },
  { id: "prefer-not", emoji: "🤍", label: "Prefer not to say" },
];

export function BabyGenderStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  return (
    <div className="space-y-6">
      <StepTitle>Is {babyDisplayName} a boy or a girl?</StepTitle>

      <div className="space-y-3">
        {GENDER_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            emoji={opt.emoji}
            label={opt.label}
            selected={answers.babyGender === opt.id}
            onClick={() => setAnswer("babyGender", opt.id)}
          />
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.babyGender}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 6 — Caregiver Role                                          */
/* ================================================================== */

const CAREGIVER_OPTIONS = [
  { id: "mom", emoji: "👩", label: "Mom" },
  { id: "dad", emoji: "👨", label: "Dad" },
  { id: "other", emoji: "🧑", label: "Other caregiver" },
];

export function CaregiverStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  return (
    <div className="space-y-6">
      <StepTitle>And who are you to {babyDisplayName}?</StepTitle>

      <div className="space-y-3">
        {CAREGIVER_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            emoji={opt.emoji}
            label={opt.label}
            selected={answers.caregiverRole === opt.id}
            onClick={() => setAnswer("caregiverRole", opt.id)}
          />
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.caregiverRole}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 7 — Parent's Name                                           */
/* ================================================================== */

export function ParentNameStep() {
  const { answers, setAnswer, nextStep } = useQuiz();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && answers.parentName.trim()) nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Image
          src="/parent-mascot.png"
          alt="Parent mascot waving"
          width={180}
          height={180}
          className="mx-auto mb-6"
        />
        <StepTitle>And what&apos;s YOUR name?</StepTitle>
      </div>

      <div onKeyDown={handleKeyDown}>
        <QuizInput
          value={answers.parentName}
          onChange={(v) => setAnswer("parentName", v)}
          placeholder="Your name"
          autoFocus
        />
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.parentName.trim()}>
        Next
      </CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 8 — Affirmation                                             */
/* ================================================================== */

export function AffirmationStep() {
  const { answers, nextStep } = useQuiz();
  const { burst } = useConfetti();
  const parentName = answers.parentName || "You";
  const babyName = answers.babyName || "Baby";

  useEffect(() => {
    const t = setTimeout(burst, 400);
    return () => clearTimeout(t);
  }, [burst]);

  return (
    <div className="space-y-8 text-center">
      <div className="animate-bounce-soft">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-light text-5xl">
          🎉
        </div>
      </div>

      <div>
        <h2 className="font-heading text-3xl font-bold text-charcoal">
          {parentName} + {babyName}
        </h2>
        <p className="mt-1 font-heading text-xl text-teal">What a team!</p>
      </div>

      <Image
        src="/team-mascot.png"
        alt="Parent and baby together"
        width={280}
        height={187}
        className="mx-auto"
      />

      <p className="text-muted">
        We&apos;re your biggest fans. Let&apos;s build the perfect routine
        together.
      </p>

      <CTAButton onClick={nextStep}>Next</CTAButton>
    </div>
  );
}

/* ================================================================== */
/*  Screen 9 — Goals (multi-select)                                    */
/* ================================================================== */

export function GoalsStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  const options = [
    { id: "night-wakeups", emoji: "😴", label: "Fewer night wake-ups" },
    { id: "nap-schedule", emoji: "⏰", label: "Predictable nap schedule" },
    {
      id: "feeding-routine",
      emoji: "🍼",
      label: "Organized feeding routine",
    },
    {
      id: "growth-milestones",
      emoji: "📈",
      label: "Track growth milestones confidently",
    },
    {
      id: "less-stress",
      emoji: "🧘",
      label: "Less daily stress and overwhelm",
    },
    { id: "more-energy", emoji: "⚡", label: "More energy during the day" },
    {
      id: "development-on-track",
      emoji: "👶",
      label: `Know if ${babyDisplayName} is developing on track`,
    },
    {
      id: "faster-bedtime",
      emoji: "🕐",
      label: "Faster, easier bedtime",
    },
  ];

  const toggleGoal = (id: string) => {
    const next = answers.goals.includes(id)
      ? answers.goals.filter((g) => g !== id)
      : [...answers.goals, id];
    setAnswer("goals", next);
  };

  return (
    <div className="space-y-6">
      <div>
        <StepTitle>
          What would make the biggest difference for your family?
        </StepTitle>
        <StepSubtitle>Select all that apply</StepSubtitle>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {options.map((opt, i) => (
          <div
            key={opt.id}
            className="animate-scale-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <OptionCard
              emoji={opt.emoji}
              label={opt.label}
              selected={answers.goals.includes(opt.id)}
              onClick={() => toggleGoal(opt.id)}
            />
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={answers.goals.length === 0}>
        Next
      </CTAButton>

      <button
        type="button"
        onClick={nextStep}
        className="w-full text-center text-sm text-muted hover:text-teal"
      >
        Skip for now
      </button>
    </div>
  );
}

/* ================================================================== */
/*  Screen 10 — Current Biggest Struggle                               */
/* ================================================================== */

export function StruggleStep() {
  const { answers, setAnswer, nextStep, babyDisplayName } = useQuiz();

  const options = [
    {
      id: "nap-timing",
      emoji: "🤷",
      label: `I never know when ${babyDisplayName} should nap`,
    },
    { id: "night-battle", emoji: "🌙", label: "Night time is a battle" },
    {
      id: "eating-enough",
      emoji: "🍼",
      label: `I'm not sure if ${babyDisplayName} is eating enough`,
    },
    {
      id: "winging-it",
      emoji: "🎯",
      label: "I feel like I'm winging it every day",
    },
    {
      id: "development-worry",
      emoji: "💭",
      label: `I worry about ${babyDisplayName}'s development`,
    },
    {
      id: "no-time",
      emoji: "⏳",
      label: "I barely have time for myself",
    },
  ];

  return (
    <div className="space-y-6">
      <StepTitle>
        What&apos;s the hardest part of your day with {babyDisplayName} right
        now?
      </StepTitle>

      <div className="space-y-2.5">
        {options.map((opt, i) => (
          <div
            key={opt.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <OptionCard
              emoji={opt.emoji}
              label={opt.label}
              selected={answers.biggestStruggle === opt.id}
              onClick={() => setAnswer("biggestStruggle", opt.id)}
            />
          </div>
        ))}
      </div>

      <CTAButton onClick={nextStep} disabled={!answers.biggestStruggle}>
        Got it — we hear you 💙
      </CTAButton>
    </div>
  );
}
