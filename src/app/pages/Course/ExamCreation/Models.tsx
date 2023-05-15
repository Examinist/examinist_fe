import { ITopic } from "../../../types/CourseSettings";
import { IExamQuestion } from "../../../types/Exam";
import { IQuestion } from "../../../types/Question";


export interface IManualExamDetails {
  title?: string;
  duration?: number;
  is_auto?: boolean;
  is_multiple_models?: boolean;
  questions?: Map<string, IExamQuestion[]>;
}
export interface IAutomaticExamDetails extends IManualExamDetails {
  topics?: Map<string, ITopic[]>;
}
