import { IExamTemplate, IEditExamTemplate } from "../../types/CourseSettings";
import { IQuestionType, ITopic } from "../../types/Question";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import {
  mockExamTemplate,
  mockQuestionTypes,
  mockTopics,
} from "./mockData/MockData";

export interface IExamTemplateData extends IResponseData {
  exam_template: IExamTemplate;
}

export interface IQuestionTypesListData extends IResponseData {
  question_types: IQuestionType[];
}

export interface IQuestionTypeData extends IResponseData {
  question_type: IQuestionType;
}

export interface ITopicsListData extends IResponseData {
  topics: ITopic[];
}

export interface ITopicData extends IResponseData {
  topic: ITopic;
}
export interface IQuestionTypesListResponse
  extends IResponse<IQuestionTypesListData> {}
export interface IQuestionTypeResponse extends IResponse<IQuestionTypeData> {}
export interface ITopicsListResponse extends IResponse<ITopicsListData> {}
export interface ITopicResponse extends IResponse<ITopicData> {}
export interface IExamTemplateResponse extends IResponse<IExamTemplateData> {}

export const getQuestionTypesApi = async (course_id: any) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${course_id}/question_types`
    );
    return response as IQuestionTypesListResponse;
  } catch (error) {
    return {
      data: { question_types: mockQuestionTypes },
    } as IQuestionTypesListResponse;
  }
};

export const createQuestionTypeApi = async (
  course_id: any,
  data: IQuestionType
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(
    `${portal}/courses/${course_id}/question_types`,
    {
      name: data.name,
      easy_weight: data.easy_weight,
      medium_weight: data.medium_weight,
      hard_weight: data.hard_weight,
    }
  );
  return response as IQuestionTypeResponse;
};

export const updateQuestionTypeApi = async (
  course_id: any,
  data: IQuestionType
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(
    `${portal}/courses/${course_id}/question_types/${data.id}`,
    {
      name: data.name,
      easy_weight: data.easy_weight,
      medium_weight: data.medium_weight,
      hard_weight: data.hard_weight,
    }
  );
  return response as IQuestionTypeResponse;
};

export const deleteQuestionTypeApi = async (
  course_id: any,
  question_type_id: any
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(
    `${portal}/courses/${course_id}/question_types/${question_type_id}`
  );
  return response as IQuestionTypeResponse;
};

export const getTopicsApi = async (course_id: any) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${course_id}/topics`
    );
    return response as ITopicsListResponse;
  } catch (error) {
    return { data: { topics: mockTopics } } as ITopicsListResponse;
  }
};

export const createTopiceApi = async (
  course_id: any,
  data: { name: string }
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(
    `${portal}/courses/${course_id}/topics`,
    {
      name: data.name,
    }
  );
  return response as ITopicResponse;
};

export const updateTopicApi = async (course_id: any, data: ITopic) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(
    `${portal}/courses/${course_id}/topics/${data.id}`,
    {
      name: data.name,
    }
  );
  return response as ITopicResponse;
};

export const deleteTopicApi = async (course_id: any, topic_id: any) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(
    `${portal}/courses/${course_id}/topics/${topic_id}`
  );
  return response as ITopicResponse;
};

export const getExamTemplateApi = async (course_id: any) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${course_id}/exam_template`
    );
    return response as IExamTemplateResponse;
  } catch (error) {
    return {
      data: { exam_template: mockExamTemplate },
    } as IExamTemplateResponse;
  }
};

export const updateExamTemplateApi = async (
  course_id: any,
  data: IEditExamTemplate
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(
    `${portal}/courses/${course_id}/update_exam_template`,
    data
  );
  return response as IExamTemplateResponse;
};
