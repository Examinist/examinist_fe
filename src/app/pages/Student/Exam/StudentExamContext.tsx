import { createContext } from "react";
import {
  IStudentDetailedExam,
} from "../../../types/StudentPortalStudentExam";
import { IStudentExamPayload } from "../../../services/APIs/StudentAPIs";

export interface IStudentExamContext {
  exam?: IStudentDetailedExam | null;
  setExam: React.Dispatch<React.SetStateAction<IStudentDetailedExam | null>>;
  questionsCount: number;
  solvedQuestionsCount: number;
  setSolvedQuestionsCount: React.Dispatch<React.SetStateAction<number>>;
  saveChanges: (payload: IStudentExamPayload) => void;
}

export const StudentExamContext = createContext<IStudentExamContext>(null!);
