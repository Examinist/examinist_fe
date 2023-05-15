import { IQuestionType, ITopic } from "./CourseSettings";

export interface IQuestion {
  id?: number;
  header: string;
  difficulty: DifficultyLevelEnum;
  question_type: IQuestionType;
  topic: ITopic;
  answer_type: AnswerTypeEnum;
  choices?: IChoice[];
  correct_answers?: ICorrectAnswer[];
}


export enum AnswerTypeEnum {
  SINGLE = "single_answer",
  MULTIPLE = "multiple_answers",
  TEXT = "text_answer",
  PDF = "pdf_answer",
}

export enum DifficultyLevelEnum {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}


export interface IChoice {
  id?: number;
  choice?: string;
  is_answer?: boolean;
  _destroy?: boolean;
}

export interface ICorrectAnswer {
  id?: number;
  answer: string;
}

export interface IFilterQuestionsParams{
  filter_by_header?: string;
  filter_by_topic_id?: string;
  filter_by_question_type_id?: string;
  filter_by_difficulty?: string;
  page: number;
}