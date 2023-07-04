import { ICourse } from "./Course";
import { ITopic } from "./CourseSettings";
import { IBusyLab } from "./Lab";
import { AnswerTypeEnum, DifficultyLevelEnum } from "./Question";

export interface IStudentPortalStudentExam {
  id: number;
  grade?: number;
  status: StudentExamStatusEnum;
  title: string;
  total_score: number;
  scheduled_date: Date;
  ends_at: Date;
  duration: number;
  course: ICourse;
  busy_lab: IBusyLab;
}

export enum StudentExamStatusEnum {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  PENDING_GRADING = "pending_grading",
  GRADED = "graded",
}

export interface IStudentQuestionType {
  id: number;
  name: string;
}

export interface IStudentChoice {
  id: number;
  choice: string;
}

export interface IStudentQuestion {
  id: number;
  header: string;
  difficulty: DifficultyLevelEnum;
  answer_type: AnswerTypeEnum;
  question_type: IStudentQuestionType;
  topic: ITopic;
  choices: IStudentChoice[];
}

export interface IStudentAnswer {
  id: number;
  answer: string[];
  question?: IStudentQuestion;
  marked: boolean;
  solved: boolean;
}

export interface IStudentDetailedExam extends IStudentPortalStudentExam {
  answers: IStudentAnswer[];
}

export const StudentExamLocalStorageKey = 'student-exam-id'
