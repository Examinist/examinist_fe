import {
  IStudentAnswer,
  IStudentDetailedExam,
  IStudentPortalStudentExam,
} from "../../types/StudentPortalStudentExam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockStudentDetailedExam, mockStudentExams } from "./mockData/MockData";

export interface IStudentExamPayload {
  is_submitting: boolean;
  student_answers_attributes: IStudentAnswer[];
}
interface IStudentExamsListData extends IResponseData {
  number_of_pages: number;
  student_exams: IStudentPortalStudentExam[];
}

interface IStudentExamData extends IResponseData {
  student_exam: IStudentDetailedExam;
}

export interface IStudentExamsListResponse
  extends IResponse<IStudentExamsListData> {}

export interface IStudentExamResponse extends IResponse<IStudentExamData> {}

export const getStudentExamsApi = async (
  page: number = -1,
  status?: string
) => {
  //   const response = await axiosInstance.get(
  //     `student_portal/student_exams?page=${page}?filter_by_status=${status}`
  //   );
  //   return response as IStudentExamsListResponse;
  return {
    data: { student_exams: mockStudentExams, number_of_pages: 1 },
  } as IStudentExamsListResponse;
};

export const getStudentSixtyMinutesExamsApi = async (page: number = -1) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `student_portal/student_exams/sixty_minutes_exams?page=${page}`
  //     );
  //     return response as IStudentExamsListResponse;
  //   } catch (error) {
  //     return {data: {student_exams: mockStudentExams, number_of_pages: 1}} as IStudentExamsListResponse;
  //   }
  return {
    data: { student_exams: mockStudentExams, number_of_pages: 1 },
  } as IStudentExamsListResponse;
};

export const getStudentExamApi = async (id: number) => {
  // const response = await axiosInstance.get(`student_portal/student_exams/${id}`);
  // return response as IStudentExamResponse;
  return {
    data: { student_exam: mockStudentDetailedExam },
  } as IStudentExamResponse;
};

export const submitStudentExamApi = async (
  id: number,
  payload: IStudentExamPayload
) => {
  // const response = await axiosInstance.patch(
  //   `student_portal/student_exams/${id}`,
  //   payload
  // );
  // return response as IStudentExamResponse;
  return {
    data: { student_exam: mockStudentDetailedExam },
  } as IStudentExamResponse;
};
