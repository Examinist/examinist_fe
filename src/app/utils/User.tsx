interface IUser {
  auth_token: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
}

export enum UserRoleEnum {
  INSTRUCTOR = "instructor",
  STUDENT = "student",
  UNIVERSITY_ADMIN = "university_admin",
  FACULTY_ADMIN = "faculty_admin",
  PROCTOR = "proctor",
}

export default IUser;
