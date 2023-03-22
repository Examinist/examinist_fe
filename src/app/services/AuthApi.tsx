import axios from "axios";
import { SignInInputs } from "../pages/SignIn/components/SignInForm";
import IUser from "../utils/User";

interface IGetUserProfileResponse {
  user: IUser;
}

const login = async (inputs: any) => {
  // const response = await axios.post("/admin_portal/sessions", inputs);
  // return response.data;
  const user: IUser = {
    role: "instructor",
    username: "nohaahmed",
    first_name: "Noha",
    last_name: "Ahmed",
    auth_token: "1212398u798u7",
  };
  return new Promise<IGetUserProfileResponse>((resolve) => {
    setTimeout(() => resolve({ user }), 500);
  });
};

const getUserProfile = async () => {
  const token = localStorage.getItem("auth_token");
  if (token == null) throw new Error();

  const user: IUser = {
    role: "instructor",
    username: "nohaahmed",
    first_name: "Noha",
    last_name: "Ahmed",
    auth_token: "1212398u798u7",
  };
  return new Promise<IGetUserProfileResponse>((resolve) => {
    setTimeout(() => resolve({ user }), 500);
  });
};
export { login as loginAPI, getUserProfile };
