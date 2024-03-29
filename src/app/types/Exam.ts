import { ICourse } from "./Course";
import { IBusyLab, ILab } from "./Lab";
import { IQuestion } from "./Question";
import IUser from "./User";

export interface IExam {
  id: number;
  title: string;
  status: ExamStatusEnum;
  duration: number;
  total_score: number;
  created_at: Date;
  scheduled_date: Date;
  creation_mode: ExamCreationModeEnum;
  creator: IUser;
  course: ICourse;
  number_of_students?: number;
  busy_labs?: IBusyLab[];
  has_models: boolean;
  pending_labs_assignment?: boolean;
  labs?: ILab[];
}

export interface IDetailedExam extends IExam {
  exam_questions: IExamQuestionsGroup[];
}

export interface IExamQuestionsGroup {
  [key: string]: IExamQuestion[];
}

export interface IExamQuestion {
  id?: number;
  score: number;
  question: IQuestion;
}

export enum ExamStatusEnum {
  ALL="all",
  UNSCHEDULED = "unscheduled",
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  PENDINGGRADING = "pending_grading",
  GRADED = "graded",
}

export enum ExamCreationModeEnum {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
}
