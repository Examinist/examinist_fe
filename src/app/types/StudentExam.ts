import { green, grey, orange, red, yellow } from "@mui/material/colors";
import { ExamStatusEnum, IExamQuestion } from "./Exam";
import { IStudent } from "./User";

export interface IStudentExam {
  id: number;
  status: ExamStatusEnum.PENDINGGRADING | ExamStatusEnum.GRADED;
  student_status: StudentStatusEnum | null;
  total_score: number;
  partial_score: number;
  total_graded_questions: number;
  partial_graded_questions: number;
  student: IStudent;
}

export interface IStudentAnswer {
  id: number;
  answer?: string[];
  score?: number|null;
  exam_question: IExamQuestion;
}

export interface IDetailedStudentExam extends IStudentExam {
  student_answers: IStudentAnswer[];
}

export enum StudentStatusEnum {
  ATTENDED = "attended",
  ABSENT = "absent",
  SICK_LEAVE = 'sick_leave',
  CHEATED = "cheated",
}

export const studentStatusEnumToColorMap: Record<StudentStatusEnum, string> = {
  [StudentStatusEnum.ATTENDED]: green[500],
  [StudentStatusEnum.ABSENT]: grey[500],
  [StudentStatusEnum.SICK_LEAVE]: yellow[700],
  [StudentStatusEnum.CHEATED]: red[500],
};