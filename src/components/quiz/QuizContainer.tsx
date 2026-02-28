"use client";

import { useQuiz, type StepId } from "~/context/QuizContext";

import {
  WelcomeStep,
  AttributionStep,
  BabyNameStep,
  BabyBirthdayStep,
  FirstBornStep,
  CaregiverStep,
  ParentNameStep,
  AffirmationStep,
  GoalsStep,
  StruggleStep,
} from "./steps/Phase1Steps";

import {
  ProblemSleepStep,
  ProblemFeedingStep,
  ProblemDevelopmentStep,
  ProblemStressStep,
  SolutionBridgeStep,
} from "./steps/Phase2Steps";

import {
  BuildingPlanStep,
  ResultsPreviewStep,
  SocialProofStep,
  EmailCaptureStep,
  PaywallStep,
  SuccessStep,
  ThankYouStep,
} from "./steps/Phase3Steps";

/* ------------------------------------------------------------------ */
/*  Step → Component mapping                                           */
/* ------------------------------------------------------------------ */

const STEP_COMPONENTS: Record<StepId, React.ComponentType> = {
  welcome: WelcomeStep,
  attribution: AttributionStep,
  "baby-name": BabyNameStep,
  "baby-birthday": BabyBirthdayStep,
  "first-born": FirstBornStep,
  caregiver: CaregiverStep,
  "parent-name": ParentNameStep,
  affirmation: AffirmationStep,
  goals: GoalsStep,
  struggle: StruggleStep,
  "problem-sleep": ProblemSleepStep,
  "problem-feeding": ProblemFeedingStep,
  "problem-development": ProblemDevelopmentStep,
  "problem-stress": ProblemStressStep,
  "solution-bridge": SolutionBridgeStep,
  "building-plan": BuildingPlanStep,
  "results-preview": ResultsPreviewStep,
  "social-proof": SocialProofStep,
  "email-capture": EmailCaptureStep,
  paywall: PaywallStep,
  success: SuccessStep,
  "thank-you": ThankYouStep,
};

const HIDE_PROGRESS: StepId[] = ["building-plan", "success", "thank-you"];
const HIDE_BACK: StepId[] = [
  "welcome",
  "affirmation",
  "building-plan",
  "success",
  "thank-you",
];

/* ------------------------------------------------------------------ */
/*  QuizContainer                                                      */
/* ------------------------------------------------------------------ */

export default function QuizContainer() {
  const { currentStep, progress, isFirstStep, prevStep, direction } =
    useQuiz();

  const StepComponent = STEP_COMPONENTS[currentStep.id];
  const showProgress = !HIDE_PROGRESS.includes(currentStep.id);
  const showBack = !isFirstStep && !HIDE_BACK.includes(currentStep.id);

  return (
    <div className="relative min-h-screen bg-antique">
      {/* Subtle dot background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1F1F2E 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Progress header */}
      {showProgress && (
        <div className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto max-w-xl px-4 py-3">
            <div className="flex items-center gap-3">
              {showBack ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-antique hover:text-charcoal"
                  aria-label="Go back"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              ) : (
                <div className="w-8" />
              )}

              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal to-lavender transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="w-10 text-right text-xs tabular-nums text-muted">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div
        className={`mx-auto max-w-xl px-4 pb-12 ${showProgress ? "pt-20" : "pt-8"}`}
      >
        <div
          key={currentStep.id}
          className={
            direction === "forward" ? "animate-slide-in" : "animate-fade-in"
          }
        >
          <StepComponent />
        </div>
      </div>
    </div>
  );
}
