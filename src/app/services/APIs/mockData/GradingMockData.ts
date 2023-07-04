import { ExamStatusEnum } from "../../../types/Exam";
import {
  IDetailedStudentExam,
  IStudentExam,
  StudentStatusEnum,
} from "../../../types/StudentExam";
import { IStudent } from "../../../types/User";
import { mockDetailedExam, mockQuestions } from "./MockData";

export const mockStudent: IStudent = {
  id: 1,
  first_name: "Mock",
  last_name: "Student",
  username: "123456789",
  email: "",
  academic_id: "123456789",
  role: "student",
};

export const mockStudentExam: IStudentExam = {
  id: 1,
  status: ExamStatusEnum.PENDINGGRADING,
  student_status: StudentStatusEnum.ATTENDED,
  total_score: 10,
  partial_score: 3,
  total_graded_questions: 4,
  partial_graded_questions: 5,
  student: mockStudent,
};

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
  },
  {
    id: 4,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.SICK_LEAVE,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 5,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.CHEATED,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 6,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 7,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 8,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 9,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 10,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 10,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 11,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 11,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 12,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 12,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
  {
    id: 13,
    status: ExamStatusEnum.PENDINGGRADING,
    student_status: StudentStatusEnum.ABSENT,
    total_score: 13,
    partial_score: 0,
    total_graded_questions: 0,
    partial_graded_questions: 0,
    student: mockStudent,
  },
];

export const mockDetailedStudentExam: IDetailedStudentExam = {
  ...mockStudentExam,
  student_answers: [
    {
      id: 1,
      exam_question: {
        id: 1,
        score: 3,
        question: mockQuestions[0],
      },
      answer: ["Choice 1"],
      score: 3,
    },
    {
      id: 2,
      exam_question: {
        id: 2,
        score: 3,
        question: mockQuestions[1],
      },
      answer: ["Choice 2"],
      score: 0,
    },
    {
      id: 3,
      exam_question: {
        id: 3,
        score: 3,
        question: mockQuestions[2],
      },
      answer: ["true"],

      score: 0,
    },
    {
      id: 4,
      exam_question: {
        id: 3,
        score: 3,
        question: mockQuestions[3],
      },
      answer: ["Student Answer"],
      score: null,
    },
  ],
};
