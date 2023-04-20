import { ICourse, ICourseGroup, ICourseInfo } from "../../types/Course";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

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

const mockCoursesListResponse: ICoursesListResponse = {
  data: {
    courses: [
      {
        id: 6,
        title: "Group 1",
        code: "ccse345",
      },
      {
        id: 7,
        title: "Group 1",
        code: "ccse345",
      },
      {
        id: 8,
        title: "Group 1",
        code: "ccse345",
      },
      {
        id: 9,
        title: "Group 1",
        code: "ccse345",
      },
      {
        id: 10,
        title: "Group 1",
        code: "ccse345",
      },
      {
        id: 11,
        title: "Group 1",
        code: "ccse345",
      },
    ],
  },
};
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

const getCoursesListApi = async (page: number = -1) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses`);
    return response as ICoursesListResponse;
  } catch (error) {
    return mockCoursesListResponse;
  }
};

const getCourseGeneralInfoAPI = async (courseId: string) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(`${portal}/courses/${courseId}`);
    return response as ICourseInfoResponse;
  } catch (error) {
    return mockCourseInfoResponse;
  }
};

const getCourseGroupsAPI = async (courseId: string) => {
  try {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.get(
      `${portal}/courses/${courseId}/course_groups`
    );
    return response as ICourseGroupsResponse;
  } catch (error) {
    return mockCourseGroupsResponse;
  }
};

export { getCourseGeneralInfoAPI, getCourseGroupsAPI, getCoursesListApi };
