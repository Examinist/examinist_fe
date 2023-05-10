export interface IQuestionType {
  id: number;
  name: string;
  easy_weight: number;
  medium_weight: number;
  hard_weight: number;
  is_deletable: boolean;
  ratio: number;
}


export interface IExamTemplate{
    id: number;
    easy: number;
    medium: number;
    hard: number;
    question_types: IQuestionType[];
}

export interface IEditExamTemplate{
    easy?: number;
    medium?: number;
    hard?: number;
    question_types_attributes?: {id: number, ratio: number}[];
}

export interface ITopic {
  id: number;
  name: string;
}

export enum DefaultQuestionTypesEnum {
  MCQ = "MCQ",
  T_F = "T/F",
  ESSAY = "Essay",
  SHORT_ANSWER = "Short_Answer",
}
