import { createContext } from "react";
import { IStudentExam } from "../../../types/StudentExam";
import { IProctorPortalExam } from "../../../types/ProctorPortalExam";

export interface IProctorPortalExamContext {
  exam: IProctorPortalExam;
  studentsExams: IStudentExam[];
  setStudentsExams: React.Dispatch<React.SetStateAction<IStudentExam[]>>;
  changedStudentsIds: Set<number>;
  setChangedStudentsIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  studentsCount: number;
  assignedStudentsCount: number;
  setAssignedStudentsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ProctorPortalExamContext =
  createContext<IProctorPortalExamContext>(null!);
