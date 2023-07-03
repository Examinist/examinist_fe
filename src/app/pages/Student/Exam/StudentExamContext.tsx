import { createContext } from "react";
import {
  IStudentDetailedExam,
} from "../../../types/StudentPortalStudentExam";

export interface IStudentExamContext {
  exam?: IStudentDetailedExam | null;
  setExam: React.Dispatch<React.SetStateAction<IStudentDetailedExam | null>>;
  changedAnswers: Set<number>;
  setChangedAnswers: React.Dispatch<React.SetStateAction<Set<number>>>;
  questionsCount: number;
  solvedQuestionsCount: number;
  setSolvedQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const StudentExamContext = createContext<IStudentExamContext>(null!);
