import React, { useContext } from "react";
import AddQuestionForm from "./components/AddQuestionForm";
import { useNavigate } from "react-router-dom";
import { IQuestion } from "../../../../types/Question";

export default function AddQuestion() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return <AddQuestionForm onSuccess={back} onCancel={back} />;
}
