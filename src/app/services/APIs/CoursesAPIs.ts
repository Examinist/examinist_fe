import { MenuItem } from '@mui/material';
import { ICourseGroup, ICourseInfo } from "../../types/Course";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

interface ICourseInfoData extends IResponseData {
  course_info: ICourseInfo;
}

interface ICourseGroupsData extends IResponseData {
  course_groups: ICourseGroup[];
}

export interface ICourseInfoResponse extends IResponse<ICourseInfoData> {}
export interface ICourseGroupsResponse extends IResponse<ICourseGroupsData> {}

const mockCourseInfoResponse: ICourseInfoResponse = {
  data: {
    course_info: {
      id: 1,
      title: "Mock Course",
      code: "MOCK 123",
      credit_hours: 3,
      instructors: [],
      students: [],
    },
  },
};

const mockCourseGroupsResponse: ICourseGroupsResponse = {
  data: {
    course_groups: [
      {
        id: 1,
        name: "Mock Group 1",
        students: [],
        instructors: [],
        end_date: new Date("2021-12-31"),
      },
      {
        id: 2,
        name: "Mock Group 2",
        students: [],
        instructors: [],
        end_date: new Date("2021-12-31"),
      },
    ],
  },
};


const getCourseGeneralInfoAPI = async (courseId: string) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/couses/${courseId}`);
    return response as ICourseInfoResponse;
  } catch (error) {
    return mockCourseInfoResponse;
  }
};

const getCourseGroupsAPI = async (courseId: string) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/couses/${courseId}/course_groups`);
    return response as ICourseGroupsResponse;
  } catch (error) {
    return mockCourseGroupsResponse;
  }
};



export { getCourseGeneralInfoAPI, getCourseGroupsAPI };
