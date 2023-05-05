import { IQuestionType } from "./Question";

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