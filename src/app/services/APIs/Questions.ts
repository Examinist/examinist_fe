import {IEditQuestion, IFilterQuestionsParams, IQuestion } from "../../types/Question";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockQuestions } from "./mockData/MockData";

interface IQuestionsListData extends IResponseData {
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
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses/${course_id}/questions`, {
        params:filterParams
      });
    console.log(response);
    return response as IQuestionsListResponse;
  } catch (error) {
    return { data: { questions: mockQuestions }} as IQuestionsListResponse;
  }
};

export const createQuestionApi = async (
  course_id: any,
  data: IEditQuestion
) => {
  console.log(data);
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(
    `${portal}/courses/${course_id}/questions`,
    data
  );
  return response as IQuestionResponse;
};

export const deleteQuestionApi = async (
  course_id: any,
  question_type_id: any
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(
    `${portal}/courses/${course_id}/questions/${question_type_id}`
  );
  return response as IQuestionResponse;
};

