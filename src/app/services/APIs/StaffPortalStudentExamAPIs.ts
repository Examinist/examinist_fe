import {
  IDetailedStudentExam,
  IStudentExam,
  StudentStatusEnum,
} from "../../types/StudentExam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import {
  mockDetailedStudentExam,
  mockStudentExams,
} from "./mockData/GradingMockData";

export interface IStudentAnswerPayload {
  id: number;
  score: number;
}

export interface IStudentExamPayload {
  student_status?: StudentStatusEnum;
  student_answers_attributes?: IStudentAnswerPayload[];
}

interface IStudentExamsListData extends IResponseData {
  number_of_pages: number;
  student_exams: IStudentExam[];
}

interface IStudentExamData extends IResponseData {
  student_exam: IDetailedStudentExam;
}

export interface IStudentExamsListResponse
  extends IResponse<IStudentExamsListData> {}
export interface IStudentExamResponse extends IResponse<IStudentExamData> {}

export const getStudentExamsApi = async (
  examId: number,
  page: number = -1,
  status?: string
) => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const response = await axiosInstance.get(
      `staff_portal/exams/${examId}/student_exams?page=${page}&filter_by_status=${
        status || ""
      }`
    );
    return response as IStudentExamsListResponse;
  }
  return {
    data: { student_exams: mockStudentExams, number_of_pages: 1 },
  } as IStudentExamsListResponse;
};

export const getStudentExamApi = async (
  examId: number,
  studentExamId: number
) => {
  if(import.meta.env.VITE_IS_SERVER_UP === "true"){
     const response = await axiosInstance.get(
       `staff_portal/exams/${examId}/student_exams/${studentExamId}`
     );
     return response as IStudentExamResponse;
  }
  else{
    return {
      data: { student_exam: mockDetailedStudentExam },
    } as IStudentExamResponse;
  }

};

export const updateStudentExamApi = async (
  examId: number,
  studentExamId: number,
  payload: IStudentExamPayload
) => {
  const response = await axiosInstance.patch(
    `staff_portal/exams/${examId}/student_exams/${studentExamId}`,
    { ...payload }
  );
  return response as IStudentExamResponse;
};
