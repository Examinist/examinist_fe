import React, { useContext } from "react";
import QuestionForm from "./components/QuestionForm";
import { useNavigate } from "react-router-dom";

export default function AddQuestion({
  onDone,
  creation,
}: {
  onDone: () => void;
  creation: boolean;
}) {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(-1);
  };

  return (
    <QuestionForm
      onSuccess={creation ? onDone : onSuccess}
      creation={creation}
    />
  );
}
