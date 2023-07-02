import { ISchedule } from "../../types/Schedule";
import axiosInstance from "../AxiosConfig";
import { IResponse } from "../Response";

export interface IScheduleLabPayload {
  lab_id: number;
  id?: number;
  _destroy?: boolean;
}
export interface IScheduledExamPayload {
  id: number;
  starts_at: Date;
  _force: boolean;
  busy_labs_attributes: IScheduleLabPayload[];
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
  schedule: ISchedule;
}

export interface ISchedulesListResponse extends IResponse<ISchedulesListData> {}
export interface IScheduleResponse extends IResponse<IScheduleData> {}

export const getSchedulesListApi = async () => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/schedules`);
    return response as ISchedulesListResponse;
  } catch (error) {
    return {
      data: {
        schedules: [],
      },
    } as ISchedulesListResponse;
  }
};

export const addScheduleApi = async (schedule: ISchedulePayload) => {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.post(`${portal}/schedules`, schedule);
    return response as ISchedulesListResponse;
  // try {
  //   const portal = localStorage.getItem("portal");
  //   const response = await axiosInstance.post(`${portal}/schedules`, schedule);
  //   return response as ISchedulesListResponse;
  // } catch (error) {
  //   return {
  //     data: {
  //       schedule: {},
  //     },
  //   } as IScheduleResponse;
  // }
};

export const getScheduleApi = async (scheduleId: number) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/schedules/${scheduleId}`
    );
    return response as IScheduleResponse;
  } catch (error) {
    return {
      data: {
        schedule: {},
      },
    } as IScheduleResponse;
  }
};

export const updateScheduleApi = async (
  scheduleId: number,
  schedule: IUpdateSchedulePayload
) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.put(
      `${portal}/schedules/${scheduleId}`,
      schedule
    );
    return response as IScheduleResponse;
  } catch (error) {
    return {
      data: {
        schedule: {},
      },
    } as IScheduleResponse;
  }
};


export const deleteScheduleApi = async (scheduleId: number) => {
    try {
        const portal = localStorage.getItem("portal");
        const response = await axiosInstance.delete(
        `${portal}/schedules/${scheduleId}`
        );
        return response as IScheduleResponse;
    } catch (error) {
        return {
        data: {
            schedule: {},
        },
        } as IScheduleResponse;
    }
}