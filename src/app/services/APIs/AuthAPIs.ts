import { ISignInInputs } from "../../pages/SignIn/components/SignInForm";
import IUser, { UserPortalEnum, UserRoleEnum } from "../../types/User";
import axiosInstance from "../AxiosConfig";
import { IResponse, IResponseData } from "../Response";

export interface ISignInRequest {
  username: string;
  password: string;
}

interface IUserResponseData extends IResponseData {
  staff?: IUser;
  student?: IUser;
}

export interface ISignInResponse extends IResponse<IUserResponseData> {}

export interface IGetUserProfileResponse extends IResponse<IUserResponseData> {}

const mockResponse: ISignInResponse = {
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

const SignInAPI = async (data: ISignInRequest, portal: UserPortalEnum) => {
  try {
    const response = await axiosInstance.post(`/${portal}/sessions`, data);
    return response as ISignInResponse;
  } catch (error) {
    return mockResponse;
  }
};

const getUserProfileAPI = async () => {
  const token = localStorage.getItem("auth_token");
  if (token == null) throw new Error();
  const portal = localStorage.getItem("portal");

  try {
    const response = await axiosInstance.post(`/${portal}/sessions`, {
      username: "gerard",
      password: "password",
    });
    return response as IGetUserProfileResponse;
  } catch {
    return mockResponse;
  }
};

export { SignInAPI, getUserProfileAPI };
