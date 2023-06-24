import { IStudentExam } from "../../types/StudentExam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockStudentExams } from "./mockData/MockData";

interface IStudentExamsListData extends IResponseData {
  number_of_pages: number;
  student_exams: IStudentExam[];
}

export interface IStudentExamsListResponse
  extends IResponse<IStudentExamsListData> {}

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
