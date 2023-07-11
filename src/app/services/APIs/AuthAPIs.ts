import IUser, { UserPortalEnum, UserRoleEnum } from "../../types/User";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";
import { mockInstructor } from "./mockData/MockData";

export interface ISignInRequest {
  username: string;
  password: string;
}

interface ISignInResponseData extends IResponseData {
  staff?: IUser;
  student?: IUser;
  coordinator?: IUser;
}

export interface IUserInfoData extends IResponseData {
  user_info: IUser;
}

export interface ISignInResponse extends IResponse<ISignInResponseData> {}

export interface IGetUserInfoResponse extends IResponse<IUserInfoData> {}

const SignInAPI = async (data: ISignInRequest, portal: UserPortalEnum) => {
  console.log(import.meta.env.VITE_IS_SERVER_UP)
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const response = await axiosInstance.post(`/${portal}/sessions`, data);
    return response as ISignInResponse;
  } else {
    return {
      data: { status: "success", staff: mockInstructor },
    } as ISignInResponse;
  }
};

const logoutAPI = async () => {
  if (import.meta.env.VITE_IS_SERVER_UP === "true") {
    const portal = localStorage.getItem("portal");
    const response = await axiosInstance.delete(`/${portal}/sessions`);
    return response;
  } else {
    return {};
  }
};

const getUserProfileAPI = async () => {
  if(import.meta.env.VITE_IS_SERVER_UP === "true") {
     const portal = localStorage.getItem("portal");
     const resource =
       portal === UserPortalEnum.STAFF
         ? "staffs"
         : portal === UserPortalEnum.STUDENT
         ? "students"
         : "coordinators";
     const response = await axiosInstance.get(
       `/${portal}/${resource}/user_info`
     );
     return response as IGetUserInfoResponse;
  }
  else{
     return {
       data: { status: "success", user_info: mockInstructor },
     } as IGetUserInfoResponse;

  }
};

export { SignInAPI, getUserProfileAPI, logoutAPI };
