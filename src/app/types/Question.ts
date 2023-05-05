export interface IQuestionType {
  id: number;
  name: string;
  easy_weight: number;
  medium_weight: number;
  hard_weight: number;
  is_deletable: boolean;
  ratio: number;
}

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

export interface ITopic {
  id: number;
  name: string;
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

export enum DefaultQuestionTypesEnum {
  MCQ = "MCQ",
  T_F = "T/F",
  ESSAY = "Essay",
  SHORT_ANSWER = "Short_Answer",
}

export interface IChoice {
  id?: number;
  choice: string;
  is_answer: boolean;
}

export interface ICorrectAnswer {
  id: number;
  answer: string;
  choice_id?: number;
}

export interface IFilterQuestionsParams{
  filter_by_header?: string;
  filter_by_topic_id?: string;
  filter_by_question_type_id?: string;
  filter_by_difficulty?: string;
  page: number;
}