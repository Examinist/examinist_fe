import React, { useContext } from "react";
import QuestionTypeForm from "./QuestionTypeForm";
import QuestionForm from "./QuestionForm/QuestionForm";
import { IsAssignedContext } from "../../../layouts/CourseLayout/CourseLayout";
import UnAuthorized from "../../UnAuthorized/UnAuthorized";

export default function AddQuestion() {
  const isAssigned = useContext(IsAssignedContext);
  if(!isAssigned) return <UnAuthorized/>;
  
  return <QuestionForm questionType={"MCQ"} mode="new" />;
}
