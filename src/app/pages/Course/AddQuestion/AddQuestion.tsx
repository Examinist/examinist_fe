import React, { useContext } from "react";
import QuestionForm from "./QuestionForm/QuestionForm";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {
  const navigate = useNavigate();
  const onSuccess = () =>{
    navigate(-1);
  }
  
  return <QuestionForm onSuccess={onSuccess} />;
}
