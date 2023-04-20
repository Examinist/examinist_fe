import { IQuestionType } from "../../types/Question";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

export interface IQuestionTypesListData extends IResponseData {
  question_types: IQuestionType[];
}

export interface IQuestionTypeData extends IResponseData {
  question_type: IQuestionType;
}

export interface IQuestionTypesListResponse
  extends IResponse<IQuestionTypesListData> {}
export interface IQuestionTypeResponse extends IResponse<IQuestionTypeData> {}

const mockQuestionTypesResponse: IQuestionTypesListResponse = {
  data: {
    question_types: [
      {
        id: 1,
        name: "MCQ",
        easy_weight: 1,
        medium_weight: 2,
        hard_weight: 3,
        is_deletable: false,
      },
      {
        id: 2,
        name: "T/F",
        easy_weight: 1,
        medium_weight: 2,
        hard_weight: 3,
        is_deletable: false,
      },
      {
        id: 3,
        name: "Essay",
        easy_weight: 1,
        medium_weight: 2,
        hard_weight: 3,
        is_deletable: false,
      },
      {
        id: 4,
        name: "Short Answer",
        easy_weight: 1,
        medium_weight: 2,
        hard_weight: 3,
        is_deletable: false,
      },
      {
        id: 5,
        name: "Modelling",
        easy_weight: 1,
        medium_weight: 2,
        hard_weight: 3,
        is_deletable: true,
      },
    ],
  },
};

export const getQuestionTypesApi = async (course_id: any) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${course_id}/question_types`
    );
    return response as IQuestionTypesListResponse;
  } catch (error) {
    return mockQuestionTypesResponse;
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
