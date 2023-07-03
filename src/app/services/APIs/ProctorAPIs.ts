import { IProctorPortalExam } from "../../types/ProctorPortalExam";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

interface IExamsListData extends IResponseData {
  exams: IProctorPortalExam[];
  number_of_pages: number;
}

export interface IExamsListResponse extends IResponse<IExamsListData> {}

export const fixExamDate = (exam: IProctorPortalExam) => {
  return {
    ...exam,
    scheduled_date: exam.scheduled_date && new Date(exam.scheduled_date),
  };
};

export const getProctorUpcommingExamsApi = async (page: number = -1) => {
  const response = await axiosInstance.get(`staff_portal/exams`, {
    params: {
      page: page,
    },
  });
  response.data.exams = response.data.exams.map((exam: IProctorPortalExam) =>
    fixExamDate(exam)
  );

  return response as IExamsListResponse;
};

export const getProctorSixtyMinutesExamsApi = async (page: number = -1) => {
  const response = await axiosInstance.get(
    `staff_portal/exams/sixty_minutes_exams?page=${page}`
  );
  response.data.exams = response.data.exams.map((exam: IProctorPortalExam) =>
    fixExamDate(exam)
  );

  return response as IExamsListResponse;
};
