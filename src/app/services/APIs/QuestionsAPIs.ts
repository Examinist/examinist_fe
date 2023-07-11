import {
  AnswerTypeEnum,
  DifficultyLevelEnum,
  IChoice,
  ICorrectAnswer,
  IFilterQuestionsParams,
  IQuestion,
} from "../../types/Question";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockQuestions } from "./mockData/MockData";

export interface IQuestionPayload {
  header?: string;
  answer_type?: AnswerTypeEnum;
  difficulty?: DifficultyLevelEnum;
  question_type_id?: number;
  topic_id?: number;
  choices_attributes?: IChoice[];
  correct_answers_attributes?: ICorrectAnswer[];
}

interface IQuestionsListData extends IResponseData {
  number_of_pages: number;
  questions: IQuestion[];
}

interface IQuestionData extends IResponseData {
  question: IQuestion;
}

export interface IQuestionsListResponse extends IResponse<IQuestionsListData> {}
export interface IQuestionResponse extends IResponse<IQuestionData> {}

export const getQuestionsApi = async (
  course_id: number,
  filterParams?: IFilterQuestionsParams
) => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${course_id}/questions`,
      {
        params: filterParams,
      }
    );
    return response as IQuestionsListResponse;
  }
  return {
    data: { questions: mockQuestions, number_of_pages: 1 },
  } as IQuestionsListResponse;
};

export const createQuestionApi = async (
  course_id: any,
  data: IQuestionPayload
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(
    `${portal}/courses/${course_id}/questions`,
    data
  );
  return response as IQuestionResponse;
};

export const deleteQuestionApi = async (course_id: any, question_id: any) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(
    `${portal}/courses/${course_id}/questions/${question_id}`
  );
  return response as IQuestionResponse;
};

export const updateQuestionApi = async (
  course_id: any,
  question_id: any,
  data: IQuestionPayload
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(
    `${portal}/courses/${course_id}/questions/${question_id}`,
    data
  );
  return response as IQuestionResponse;
};
