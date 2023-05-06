import React, { useContext } from "react";
import QuestionTypeForm from "./QuestionTypeForm";
import QuestionForm from "./QuestionForm/QuestionForm";
import { IsAssignedContext } from "../../../layouts/CourseLayout/CourseLayout";
import UnAuthorized from "../../UnAuthorized/UnAuthorized";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {
  const navigate = useNavigate();
  const onSuccess = () =>{
    navigate(-1);
  }
  
  return <QuestionForm onSuccess={onSuccess} />;
}
