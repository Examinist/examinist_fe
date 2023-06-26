import { ExamStatusEnum } from "../../../types/Exam";
import { IStudentExam, StudentStatusEnum } from "../../../types/StudentExam";
import { IStudent } from "../../../types/User";

export const mockStudent: IStudent = {
    id: 1,
    first_name: "Mock",
    last_name: "Student",
    username: "123456789",
    email: "",
    academic_id: "123456789",
    role: "student",
}

export const mockStudentExam: IStudentExam = {
    id: 1,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ATTENDED,
    total_score: 10,
    partial_score: 3,
    total_graded_questions: 10,
    partial_graded_questions: 5,
    student: mockStudent,
}

export const mockStudentExams: IStudentExam[] = [
    mockStudentExam,
    {
        ...mockStudentExam,
        id: 2,
        status: ExamStatusEnum.GRADED,
        total_score: 10,
        partial_score: 10,
        total_graded_questions: 10,
        partial_graded_questions: 10,
    },
    {
        id: 3,
        status: ExamStatusEnum.PENDINGGRADING,
        student_status: StudentStatusEnum.ABSENT,
        total_score: 10,
        partial_score: 0,
        total_graded_questions: 0,
        partial_graded_questions: 0,
        student: mockStudent,
    }
]


