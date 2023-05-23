import React, { useContext } from "react";
import QuestionForm from "./components/QuestionForm";
import { useNavigate } from "react-router-dom";
import { IQuestion } from "../../../../types/Question";

export default function AddQuestion({
  onSuccess,
  onCancel
}: {
  onSuccess: (question?: IQuestion) => void;
  onCancel?: () => void;
}) {
  return (
    <QuestionForm
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
}
