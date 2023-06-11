import { IExam } from "./Exam";

export interface ISchedule{
    id: number;
    title: string;
}

export interface IBusyLab {
  id: number;
  name: string;
}

export interface IScheduledExam extends IExam{
    number_of_students: number;
    busy_labs: IBusyLab[];
}


export interface IDetailedSchedule extends ISchedule{
    exams: IScheduledExam[];
}