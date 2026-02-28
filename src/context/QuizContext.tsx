"use client";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { showAchievement } from "~/components/quiz/AchievementToast";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type QuizAnswers = {
  valueSelection: string | null;
  attribution: string | null;
  babyName: string;
  babyBirthday: string | null;
  isNotBornYet: boolean;
  isFirstBorn: boolean | null;
  babyGender: string | null;
  caregiverRole: string | null;
  parentName: string;
  goals: string[];
  biggestStruggle: string | null;
  email: string;
  selectedPlan: "monthly" | "yearly";
};

export type StepId =
  | "welcome"
  | "attribution"
  | "baby-name"
  | "baby-birthday"
  | "first-born"
  | "baby-gender"
  | "caregiver"
  | "parent-name"
  | "affirmation"
  | "goals"
  | "struggle"
  | "problem-sleep"
  | "problem-feeding"
  | "problem-development"
  | "problem-stress"
  | "solution-bridge"
  | "building-plan"
  | "results-preview"
  | "social-proof"
  | "email-capture"
  | "paywall"
  | "success"
  | "thank-you";

export type StepDef = {
  id: StepId;
  phase: 1 | 2 | 3;
  condition?: (answers: QuizAnswers) => boolean;
};

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

const SLEEP_GOALS = ["night-wakeups", "nap-schedule", "faster-bedtime"];
const FEEDING_GOALS = ["feeding-routine"];
const DEV_GOALS = ["growth-milestones", "development-on-track"];
const STRESS_GOALS = ["less-stress", "more-energy"];

export const ALL_STEPS: StepDef[] = [
  { id: "welcome", phase: 1 },
  { id: "attribution", phase: 1 },
  { id: "baby-name", phase: 1 },
  { id: "baby-birthday", phase: 1 },
  { id: "first-born", phase: 1 },
  { id: "baby-gender", phase: 1 },
  { id: "caregiver", phase: 1 },
  { id: "parent-name", phase: 1 },
  { id: "affirmation", phase: 1 },
  { id: "goals", phase: 1 },
  { id: "struggle", phase: 1 },
  {
    id: "problem-sleep",
    phase: 2,
    condition: (a) => a.goals.some((g) => SLEEP_GOALS.includes(g)),
  },
  {
    id: "problem-feeding",
    phase: 2,
    condition: (a) => a.goals.some((g) => FEEDING_GOALS.includes(g)),
  },
  {
    id: "problem-development",
    phase: 2,
    condition: (a) => a.goals.some((g) => DEV_GOALS.includes(g)),
  },
  {
    id: "problem-stress",
    phase: 2,
    condition: (a) => a.goals.some((g) => STRESS_GOALS.includes(g)),
  },
  { id: "solution-bridge", phase: 2 },
  { id: "building-plan", phase: 3 },
  { id: "results-preview", phase: 3 },
  { id: "social-proof", phase: 3 },
  { id: "email-capture", phase: 3 },
  { id: "paywall", phase: 3 },
  { id: "success", phase: 3 },
  { id: "thank-you", phase: 3 },
];

/* ------------------------------------------------------------------ */
/*  Reducer                                                            */
/* ------------------------------------------------------------------ */

type QuizState = {
  currentStepId: StepId;
  answers: QuizAnswers;
  direction: "forward" | "backward";
};

type QuizAction =
  | { type: "GO_TO"; stepId: StepId; direction: "forward" | "backward" }
  | {
      type: "SET_ANSWER";
      key: keyof QuizAnswers;
      value: QuizAnswers[keyof QuizAnswers];
    };

const initialState: QuizState = {
  currentStepId: "welcome",
  answers: {
    valueSelection: null,
    attribution: null,
    babyName: "",
    babyBirthday: null,
    isNotBornYet: false,
    isFirstBorn: null,
    babyGender: null,
    caregiverRole: null,
    parentName: "",
    goals: [],
    biggestStruggle: null,
    email: "",
    selectedPlan: "yearly",
  },
  direction: "forward",
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "GO_TO":
      return {
        ...state,
        currentStepId: action.stepId,
        direction: action.direction,
      };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

type QuizContextType = {
  answers: QuizAnswers;
  currentStep: StepDef;
  currentIndex: number;
  activeSteps: StepDef[];
  progress: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  direction: "forward" | "backward";
  babyAge: { months: number; weeks: number; label: string } | null;
  babyDisplayName: string;
  parentDisplayName: string;
  setAnswer: <K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K],
  ) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const VALID_STEP_IDS = new Set<string>(ALL_STEPS.map((s) => s.id));

const DEV_ANSWERS: QuizAnswers = {
  valueSelection: "sleep",
  attribution: "google",
  babyName: "Luna",
  babyBirthday: "2025-08-15",
  isNotBornYet: false,
  isFirstBorn: true,
  babyGender: "girl",
  caregiverRole: "mom",
  parentName: "Alex",
  goals: [
    "night-wakeups",
    "nap-schedule",
    "feeding-routine",
    "growth-milestones",
    "less-stress",
  ],
  biggestStruggle: "nap-timing",
  email: "alex@example.com",
  selectedPlan: "yearly",
};

function getInitialState(stepParam: string | null): QuizState {
  if (stepParam && VALID_STEP_IDS.has(stepParam)) {
    return {
      currentStepId: stepParam as StepId,
      answers: DEV_ANSWERS,
      direction: "forward",
    };
  }
  return initialState;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(
    reducer,
    searchParams.get("step"),
    getInitialState,
  );
  const firedAchievements = useRef(new Set<string>());

  const activeSteps = useMemo(
    () => ALL_STEPS.filter((s) => !s.condition || s.condition(state.answers)),
    [state.answers],
  );

  const currentIndex = useMemo(() => {
    const idx = activeSteps.findIndex((s) => s.id === state.currentStepId);
    return idx >= 0 ? idx : 0;
  }, [activeSteps, state.currentStepId]);

  const currentStep = activeSteps[currentIndex]!;
  const totalSteps = activeSteps.length;
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  const babyAge = useMemo(() => {
    if (!state.answers.babyBirthday) return null;
    const birthday = new Date(state.answers.babyBirthday);
    const now = new Date();
    const diffMs = now.getTime() - birthday.getTime();
    if (diffMs < 0) return null;
    const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    const months = Math.floor(diffMs / (30.44 * 24 * 60 * 60 * 1000));
    if (months < 1)
      return {
        months: 0,
        weeks,
        label: `${weeks} week${weeks !== 1 ? "s" : ""} old`,
      };
    return {
      months,
      weeks,
      label: `${months} month${months !== 1 ? "s" : ""} old`,
    };
  }, [state.answers.babyBirthday]);

  const babyDisplayName = state.answers.babyName || "your baby";
  const parentDisplayName = state.answers.parentName || "there";

  const setAnswer = useCallback(
    <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
      dispatch({ type: "SET_ANSWER", key, value });
    },
    [],
  );

  const fireAchievement = useCallback(
    (
      id: string,
      config: {
        emoji: string;
        title: string;
        description: string;
        variant?: "teal" | "lavender" | "amber";
      },
    ) => {
      if (firedAchievements.current.has(id)) return;
      firedAchievements.current.add(id);
      setTimeout(() => showAchievement(config), 600);
    },
    [],
  );

  const nextStep = useCallback(() => {
    const steps = ALL_STEPS.filter(
      (s) => !s.condition || s.condition(state.answers),
    );
    const idx = steps.findIndex((s) => s.id === state.currentStepId);
    const next = steps[idx + 1];
    if (!next) return;

    const leavingId = state.currentStepId;
    const babyName = state.answers.babyName || "your baby";
    const parentName = state.answers.parentName || "there";
    const nextProgress = ((idx + 2) / steps.length) * 100;

    if (leavingId === "struggle") {
      fireAchievement("phase1-done", {
        emoji: "🌟",
        title: "Personalization complete!",
        description: `We already know ${babyName} so well`,
        variant: "teal",
      });
    }

    if (nextProgress >= 50 && ((idx + 1) / steps.length) * 100 < 50) {
      fireAchievement("halfway", {
        emoji: "🚀",
        title: "Halfway there!",
        description: `You're doing great, ${parentName}`,
        variant: "lavender",
      });
    }

    if (leavingId === "solution-bridge") {
      fireAchievement("phase2-done", {
        emoji: "🎓",
        title: "Routine expert unlocked!",
        description: "You're officially a baby routine expert",
        variant: "lavender",
      });
    }

    if (leavingId === "email-capture") {
      fireAchievement("email-captured", {
        emoji: "📬",
        title: "Smart move!",
        description: `${babyName}'s plan is on its way`,
        variant: "amber",
      });
    }

    dispatch({ type: "GO_TO", stepId: next.id, direction: "forward" });
  }, [state.answers, state.currentStepId, fireAchievement]);

  const prevStep = useCallback(() => {
    const steps = ALL_STEPS.filter(
      (s) => !s.condition || s.condition(state.answers),
    );
    const idx = steps.findIndex((s) => s.id === state.currentStepId);
    const prev = steps[idx - 1];
    if (prev)
      dispatch({ type: "GO_TO", stepId: prev.id, direction: "backward" });
  }, [state.answers, state.currentStepId]);

  const value: QuizContextType = {
    answers: state.answers,
    currentStep,
    currentIndex,
    activeSteps,
    progress,
    totalSteps,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === totalSteps - 1,
    direction: state.direction,
    babyAge,
    babyDisplayName,
    parentDisplayName,
    setAnswer,
    nextStep,
    prevStep,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
