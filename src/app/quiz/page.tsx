import { Suspense } from "react";
import { QuizProvider } from "~/context/QuizContext";
import QuizContainer from "~/components/quiz/QuizContainer";

export default function QuizPage() {
  return (
    <Suspense>
      <QuizProvider>
        <QuizContainer />
      </QuizProvider>
    </Suspense>
  );
}
