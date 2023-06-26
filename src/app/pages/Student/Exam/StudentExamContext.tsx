import { createContext } from "react";
import {
  IStudentAnswer,
  IStudentDetailedExam,
} from "../../../types/StudentPortalStudentExam";

export interface IStudentExamContext {
  exam?: IStudentDetailedExam | null;
  setExam: React.Dispatch<React.SetStateAction<IStudentDetailedExam | null>>;
  changedAnswers: Set<number>;
  setChangedAnswers: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export const StudentExamContext = createContext<IStudentExamContext>(null!);
