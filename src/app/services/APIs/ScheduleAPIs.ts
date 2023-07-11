import { IExam } from "../../types/Exam";
import { IDetailedSchedule, ISchedule } from "../../types/Schedule";
import { fixExamDate } from "../../utilities/Date";
import axiosInstance from "../AxiosConfig";
import { IResponse } from "../Response";

export interface IScheduleLabPayload {
  lab_id?: number;
  id?: number;
  _destroy?: boolean;
}
export interface IScheduledExamPayload {
  id: number;
  starts_at: Date;
  _force: boolean;
  busy_labs_attributes: IScheduleLabPayload[];
}

export interface IAutomaticSchedulePayload {
  title: string;
  schedule_from: string;
  schedule_to: string;
  exam_starting_time: string;
  exam_ids: number[];
  lab_ids: number[];
  holiday_dates: string[];
  exam_week_days: string[];
}

export interface ISchedulePayload {
  title?: string;
  exams: IScheduledExamPayload[];
}

export interface IUpdateSchedulePayload {
  title?: string;
  exams_attributes: IScheduledExamPayload[];
}

interface ISchedulesListData {
  schedules: ISchedule[];
}

interface IScheduleData {
  schedule: IDetailedSchedule;
}

export interface ISchedulesListResponse extends IResponse<ISchedulesListData> {}
export interface IScheduleResponse extends IResponse<IScheduleData> {}

export const getSchedulesListApi = async () => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/schedules`);
    return response as ISchedulesListResponse;
  }
  return {
    data: {
      schedules: [],
    },
  } as ISchedulesListResponse;
};

export const addScheduleApi = async (schedule: ISchedulePayload) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(`${portal}/schedules`, schedule);
  return response as ISchedulesListResponse;
};

export const getScheduleApi = async (scheduleId: number) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.get(`${portal}/schedules/${scheduleId}`);
  response.data.schedule.exams = response.data.schedule.exams.map(
    (exam: IExam) => fixExamDate(exam)
  );
  return response as IScheduleResponse;
};

export const updateScheduleApi = async (
  scheduleId: number,
  schedule: IUpdateSchedulePayload
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.patch(
    `${portal}/schedules/${scheduleId}`,
    schedule
  );
  response.data.schedule.exams = response.data.schedule.exams.map(
    (exam: IExam) => fixExamDate(exam)
  );
  return response as IScheduleResponse;
};

export const deleteScheduleApi = async (scheduleId: number) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.delete(
    `${portal}/schedules/${scheduleId}`
  );
  response.data.schedule.exams = response.data.schedule.exams.map(
    (exam: IExam) => fixExamDate(exam)
  );
  return response as IScheduleResponse;
};

export const autoGenerateScheduleApi = async (
  payload: IAutomaticSchedulePayload
) => {
  const portal = localStorage.getItem("portal");
  const response = await axiosInstance.post(
    `${portal}/schedules/auto_generate`,
    payload
  );
  response.data.schedule.exams = response.data.schedule.exams.map(
    (exam: IExam) => fixExamDate(exam)
  );
  return response as IScheduleResponse;
};
