import { ICourse } from "./Course";
import { ExamStatusEnum } from "./Exam";
import { IBusyLab } from "./Lab";

export interface IProctorPortalExam{
    id: number;
    title: string;
    status: ExamStatusEnum;
    duration: number;
    has_models: boolean;
    scheduled_date: Date;
    course: ICourse;
    number_of_students: number;
    busy_labs: IBusyLab;
}