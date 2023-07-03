import { IStaff } from "./User";

export interface ILab {
  id?: number;
  name: string;
  capacity: number;
}

export interface IBusyLab {
  id: number;
  name: string;
  proctor?: IStaff;
}

