import { ICourse, ICourseGroup, ICourseInfo } from "../../types/Course";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import {
  mockCourseGroups,
  mockCourseInfo,
  mockCourses,
} from "./mockData/MockData";

interface ICoursesListData extends IResponseData {
  courses: ICourse[];
}
interface ICourseInfoData extends IResponseData {
  course_info: ICourseInfo;
}

interface ICourseGroupsData extends IResponseData {
  course_groups: ICourseGroup[];
}

export interface ICoursesListResponse extends IResponse<ICoursesListData> {}
export interface ICourseInfoResponse extends IResponse<ICourseInfoData> {}
export interface ICourseGroupsResponse extends IResponse<ICourseGroupsData> {}

const getCoursesListApi = async (page: number = -1) => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses`);
    return response as ICoursesListResponse;
  }
  return {
    data: {
      courses: mockCourses,
    },
  } as ICoursesListResponse;
};

const getCourseGeneralInfoAPI = async (courseId: string) => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses/${courseId}`);
    return response as ICourseInfoResponse;
  }
  return {
    data: {
      course_info: mockCourseInfo,
    },
  } as ICourseInfoResponse;
};

const getCourseGroupsAPI = async (courseId: string) => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${courseId}/course_groups`
    );
    return response as ICourseGroupsResponse;
  }
  return {
    data: {
      course_groups: mockCourseGroups,
    },
  } as ICourseGroupsResponse;
};

export { getCourseGeneralInfoAPI, getCourseGroupsAPI, getCoursesListApi };
