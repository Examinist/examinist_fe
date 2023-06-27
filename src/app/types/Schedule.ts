import { IExam } from "./Exam";

export interface ISchedule{
    id: number;
    title: string;
}

export interface IDetailedSchedule extends ISchedule{
    exams: IExam[];
}