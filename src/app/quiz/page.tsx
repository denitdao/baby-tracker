import { QuizProvider } from "~/context/QuizContext";
import QuizContainer from "~/components/quiz/QuizContainer";

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizContainer />
    </QuizProvider>
  );
}
