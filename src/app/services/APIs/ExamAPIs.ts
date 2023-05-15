import { get } from "react-hook-form";
import { ExamStatusEnum, IDetailedExam } from "../../types/Exam";
import { IExam } from "../../types/Exam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockDetailedExam, mockExamsList } from "./mockData/MockData";


export interface IExamPayload {
  title?: string;
  duration?: number;
  course_id?: number;
  is_auto?: boolean;
  is_multiple_models?: boolean;
  exam_questions_attributes?: IExamQuestionPayload[];
}

export interface IExamQuestionPayload {
  id?: number;
  score?: number;
  question_id?: number;
  _destroy?: boolean;
}

interface ExamsListData extends IResponseData {
  exams: IExam[];
}

interface IDetailedExamData extends IResponseData {
  exam: IDetailedExam;
}

export interface IExamsListResponse extends IResponse<ExamsListData> {}
export interface IExamResponse extends IResponse<IDetailedExamData> {}

export const getExamsApi = async (
  course_id?: number,
  status?: ExamStatusEnum,
  page: number = -1
) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/exams`, {
      params: {
        course_id: course_id,
        status: status,
        page: page,
      },
    });
    return response as IExamsListResponse;
  } catch (error) {
    return { data: { exams: mockExamsList } } as IExamsListResponse;
  }
};

export const getExamApi = async (exam_id: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/exams/${exam_id}`);
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
};

const createExamApi = async (exam: IExamPayload) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/exams`, { exam });
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
}

const updateExamApi = async (exam_id: number, exam: IExamPayload) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.put(`${portal}/exams/${exam_id}`, { exam });
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: mockDetailedExam } } as IExamResponse;
  }
} 

const deleteExamApi = async (exam_id: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.delete(`${portal}/exams/${exam_id}`);
    return response as IExamResponse;
  } catch (error) {
    return { data: { exam: {} } } as IExamResponse;
  }
}

