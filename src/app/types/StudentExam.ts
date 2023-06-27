import { ExamStatusEnum, IExamQuestion } from "./Exam";
import { IStudent } from "./User";

export interface IStudentExam {
    id: number;
    status: ExamStatusEnum.PENDINGGRADING | ExamStatusEnum.GRADED;
    student_status: StudentStatusEnum;
    total_score: number;
    partial_score: number;
    total_graded_questions: number;
    partial_graded_questions: number;
    student: IStudent;
}

export interface IStudentAnswer{
    id: number;
    answers?: string[];
    score?: number;
    question: IExamQuestion;
}

export interface IDetailedStudentExam extends IStudentExam{
    answers: IStudentAnswer[];
}

export enum StudentStatusEnum{
    ATTENDED = "Attended",
    ABSENT = "Absent",
}