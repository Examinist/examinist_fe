import { IStaff, IStudent } from "../../types/User";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockProctors, mockStudents } from "./mockData/MockData";

interface IStudentsListData extends IResponseData {
  students: IStudent[];
}

interface IProctorsListData extends IResponseData {
  proctors: IStaff[];
}

export interface IStudentsListResponse extends IResponse<IStudentsListData> {}

export interface IProctorsListResponse extends IResponse<IProctorsListData> {}

export const getStudentsInLabApi = async (examId: number, busyLabId: number) => {
  try {
    const response = await axiosInstance.get(
      `staff_portal/busy_labs/${busyLabId}/students?exam_id=${examId}`
    );
    return response as IStudentsListResponse;
  } catch (error) {
    return {
      data: { students: mockStudents },
    } as IStudentsListResponse;
  }
};

export const getProctorsInLabApi = async (examId: number, busyLabId: number) => {
  try {
    const response = await axiosInstance.get(
      `staff_portal/busy_labs/${busyLabId}/available_proctors?exam_id=${examId}`
    );
    return response as IProctorsListResponse;
  } catch (error) {
    return {
      data: { proctors: mockProctors },
    } as IProctorsListResponse;
  }
};

export const assignProctorToLabApi = async (
  examId: number,
  busyLabId: number,
  staffId: number
) => {
  try {
    const response = await axiosInstance.patch(
      `staff_portal/busy_labs/${busyLabId}?exam_id=${examId}`,
      {
        staff_id: staffId,
      }
    );
    return response as IProctorsListResponse;
  } catch (error) {
    return {
      data: { proctors: mockProctors },
    } as IProctorsListResponse;
  }
};

