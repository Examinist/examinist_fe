import React from "react";
import QuestionTypeForm from "./QuestionTypeForm";
import QuestionForm from "./QuestionForm/QuestionForm";

export default function AddQuestion() {
  const [done, setDone] = React.useState(false);
  const [questionType, setQuestionType] = React.useState("");

  const handleNext = (questionType: string) => {
    setQuestionType(questionType);
    setDone(true);
  };
  return (
    <>
      {!done ? (
        <QuestionTypeForm onNext={handleNext} />
      ) : (
        <QuestionForm questionType={questionType} mode="new" />
      )}
    </>
  );
}
