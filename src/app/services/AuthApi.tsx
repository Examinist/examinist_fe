import axios, { AxiosError } from "axios";
import { ISignInInputs } from "../pages/SignIn/components/SignInForm";
import IUser, { UserPortalEnum } from "../utils/User";

interface IErrorMessage {
  message: string;
  status: string;
}

interface IGetUserProfileResponse {
  user: IUser;
}

const mockUser: IUser = {
  role: "instructor",
  username: "nohaahmed",
  first_name: "Noha",
  last_name: "Ahmed",
  auth_token: "",
};

const login = async (inputs: ISignInInputs) => {
  try {
    const response = await axios.post(`/${inputs.portal}/sessions`, inputs);
    const user = response.data.staff || response.data.student;
    localStorage.setItem("auth_token", user.auth_token);
    localStorage.setItem("portal", inputs.portal);
    return user;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const data = error.response.data as IErrorMessage;
      throw new Error(data.message);
    } else {
      throw error;
    }
  }
};

const getUserProfile = async () => {
  const token = localStorage.getItem("auth_token");
  if (token == null) throw new Error();

  const portal = localStorage.getItem("portal");
  try {
    const response = await axios.post(`/${portal}/sessions`, {
      username: "barton",
      password: "password",
    });
    const user = response.data.staff || response.data.student;
    return user;
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      const data = error.response.data as IErrorMessage;
      throw new Error(data.message);
    } else  {
      throw error;
    }
    //  return mockUser;
  }
};
export { login as loginAPI, getUserProfile };
