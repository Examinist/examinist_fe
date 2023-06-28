import { IStaff } from "./User";

export interface IUniversity {
  id: number;
  name: string;
}

export interface IUniversityFaculty {
  id: number;
  faculty_name: string;
  admins: IStaff[];
}
