import { Dispatch, SetStateAction } from "react";
import { ITopic } from "../../../types/CourseSettings";
import { IExamQuestion } from "../../../types/Exam";
import { IQuestion } from "../../../types/Question";
import React from "react";

export interface IManualExamDetails {
  title?: string;
  duration?: number;
  is_auto?: boolean;
  has_models?: boolean;
  questions?: Map<string, IExamQuestion[]>;
}
export interface IAutomaticExamDetails extends IManualExamDetails {
  topics?: Map<number, number[]>;
}

export interface IQuestionsContext {
  questionsList: IQuestion[];
  setQuestionsList: Dispatch<SetStateAction<IQuestion[]>>;
}
export const QuestionsContext = React.createContext<IQuestionsContext>({
  questionsList: [],
  setQuestionsList: () => {},
});
