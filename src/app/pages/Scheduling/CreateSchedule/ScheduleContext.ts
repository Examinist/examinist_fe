import { createContext } from "react";
import { IExam } from "../../../types/Exam";


export interface IScheduleContext{
    title: string;
    exams: IExam[];
    setTitle: (title: string) => void;
    setExams: (exams: IExam[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const ScheduleContext = createContext<IScheduleContext>(null!);