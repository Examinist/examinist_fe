import { IStudentExam } from "../../types/StudentExam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockStudentExams } from "./mockData/GradingMockData";

interface IStudentExamsListData extends IResponseData {
  number_of_pages: number;
  student_exams: IStudentExam[];
}

export interface IStudentExamsListResponse extends IResponse<IStudentExamsListData> {}

export const getStudentExamsApi = async (examId: number,page: number = -1, status?: string) => {
    try {
      const response = await axiosInstance.get(
        `staff_portal/exams/${examId}/student_exams?page=${page}?filter_by_status=${status}`
      );
      return response as IStudentExamsListResponse;
    } catch (error) {
      return {data: {student_exams: mockStudentExams, number_of_pages: 1}} as IStudentExamsListResponse;
    }
};
