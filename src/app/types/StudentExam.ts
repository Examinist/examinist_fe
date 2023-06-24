import { ICourse } from "./Course";
import { IBusyLab } from "./Lab";

export interface IStudentExam {
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
