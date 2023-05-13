import { ISignInInputs } from "../../pages/SignIn/components/SignInForm";
import IUser, { UserPortalEnum, UserRoleEnum } from "../../types/User";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

export interface ISignInRequest {
  username: string;
  password: string;
}

interface ISignInResponseData extends IResponseData {
  staff?: IUser;
  student?: IUser;
}

export interface IUserInfoData extends IResponseData {
  user_info: IUser;
}

export interface ISignInResponse extends IResponse<ISignInResponseData> {}

export interface IGetUserInfoResponse extends IResponse<IUserInfoData> {}

const signInMockResponse: ISignInResponse = {
  data: {
    status: "success",
    staff: {
      username: "mockuser",
      first_name: "Mock",
      last_name: "User",
      role: UserRoleEnum.INSTRUCTOR,
      auth_token: "123456789",
    },
  },
};

const userInfoMockResponse: IGetUserInfoResponse = {
  data: {
    status: "success",
    user_info: {
      username: "mockuser",
      first_name: "Mock",
      last_name: "User",
      role: UserRoleEnum.INSTRUCTOR,
      auth_token: "123456789",
    },
  },
};

const SignInAPI = async (data: ISignInRequest, portal: UserPortalEnum) => {
  try {
    const response = await axiosInstance.post(`/${portal}/sessions`, data);
    return response as ISignInResponse;
  } catch (error) {
    return signInMockResponse;
  }
};

const getUserProfileAPI = async () => {
  const token = localStorage.getItem("auth_token");
  // if (token == null) throw new Error();
  const portal = localStorage.getItem("portal");

  try {
    const response = await axiosInstance.get(`/${portal}/staffs/user_info`);
    return response as IGetUserInfoResponse;
  } catch {
    return userInfoMockResponse as IGetUserInfoResponse;
  }
};

export { SignInAPI, getUserProfileAPI };
