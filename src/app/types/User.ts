interface IUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  username: string;
  auth_token?: string;
  role: UserRoleEnum;
  university?: IUniversity;
}

export interface IStudent{
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  academic_id: string;
  role: string;
}

export interface IUniversity{
  id: number;
  name: string;
}

export enum UserPortalEnum {
  STUDENT = "student_portal",
  STAFF = "staff_portal",
  UNIVERSITY_ADMIN = "coordinator_portal",
}

export enum UserRoleEnum {
  INSTRUCTOR = "instructor",
  STUDENT = "student",
  UNIVERSITY_ADMIN = "university_admin",
  FACULTY_ADMIN = "admin",
  PROCTOR = "proctor",
}

export const userRoleToPathMap: Record<UserRoleEnum, string> = {
  [UserRoleEnum.INSTRUCTOR]: "/instructor",
  [UserRoleEnum.STUDENT]: "/student",
  [UserRoleEnum.UNIVERSITY_ADMIN]: "/university_admin",
  [UserRoleEnum.FACULTY_ADMIN]: "/faculty_admin",
  [UserRoleEnum.PROCTOR]: "/proctor",
};

export default IUser;
