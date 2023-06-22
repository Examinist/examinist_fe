import { IExam } from "./Exam";

export interface ISchedule{
    id: number;
    title: string;
}

export interface IBusyLab {
  id: number;
  name: string;
}

export interface IDetailedSchedule extends ISchedule{
    exams: IExam[];
}