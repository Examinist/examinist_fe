import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionForm from "./components/QuestionForm";

export default function EditQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const onSuccess = () => {
    navigate(-1);
  };

  return <QuestionForm onSuccess={onSuccess} question={location.state.question} />;
}
