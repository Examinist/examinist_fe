import React from "react";
import QuestionTypeForm from "./QuestionTypeForm";
import QuestionForm from "./QuestionForm/QuestionForm";

export default function AddQuestion() {
  return <QuestionForm questionType={"MCQ"} mode="new" />;
}
