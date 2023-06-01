import { ICourse, ICourseGroup } from "../../../types/Course";
import {
  IExamTemplate,
  IQuestionType,
  ITopic,
} from "../../../types/CourseSettings";
import {
  ExamCreationModeEnum,
  ExamStatusEnum,
  IDetailedExam,
  IExam,
  IExamQuestionsGroup,
} from "../../../types/Exam";
import {
  AnswerTypeEnum,
  DifficultyLevelEnum,
  IQuestion,
} from "../../../types/Question";
import IUser from "../../../types/User";
import { UserRoleEnum } from "../../../types/User";
import { IExamPayload } from "../ExamAPIs";

export const mockInstructor: IUser = {
  username: "mockuser",
  first_name: "Mock",
  last_name: "User",
  role: UserRoleEnum.INSTRUCTOR,
  auth_token: "123456789",
};


export const mockCourses: ICourse[] = [
  {
    id: 6,
    title: "Group 1",
    code: "ccse345",
  },
  {
    id: 7,
    title: "Group 1",
    code: "ccse345",
  },
  {
    id: 8,
    title: "Group 1",
    code: "ccse345",
  },
  {
    id: 9,
    title: "Group 1",
    code: "ccse345",
  },
  {
    id: 10,
    title: "Group 1",
    code: "ccse345",
  },
  {
    id: 11,
    title: "Group 1",
    code: "ccse345",
  },
];

export const mockCourseGroups: ICourseGroup[] = [
  {
    id: 1,
    name: "Mock Group 1",
    students: [],
    instructors: [mockInstructor],
    end_date: new Date("2021-12-31"),
  },
  {
    id: 2,
    name: "Mock Group 2",
    students: [],
    instructors: [],
    end_date: new Date("2021-12-31"),
  },
];

export const mockCourseInfo = {
  id: 1,
  title: "Mock Course",
  code: "MOCK 123",
  credit_hours: 3,
  instructors: [mockInstructor],
  students: [],
};

export const mockQuestionTypes: IQuestionType[] = [
  {
    id: 1,
    name: "MCQ",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
    ratio: 25,
  },
  {
    id: 2,
    name: "T/F",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
    ratio: 25,
  },
  {
    id: 3,
    name: "Essay",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
    ratio: 25,
  },
  {
    id: 4,
    name: "Short Answer",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
    ratio: 25,
  },
  {
    id: 5,
    name: "Modelling",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: true,
    ratio: 0,
  },
];

export const mockExamTemplate: IExamTemplate = {
  id: 1,
  easy: 1,
  medium: 2,
  hard: 3,
  question_types: mockQuestionTypes,
};

export const mockTopics: ITopic[] = [
  {
    id: 1,
    name: "Topic 1",
  },
  {
    id: 2,
    name: "Topic 2",
  },
];

export const mockQuestions: IQuestion[] = [
  {
    id: 1,
    question_type: mockQuestionTypes[0],
    topic: mockTopics[0],
    difficulty: DifficultyLevelEnum.EASY,
    header: "Question 1",
    answer_type: AnswerTypeEnum.SINGLE,
    choices: [
      {
        id: 1,
        choice: "Choice 1",
        is_answer: true,
      },
      {
        id: 2,
        choice: "Choice 1",
        is_answer: false,
      },
    ],
  },
  {
    id: 4,
    question_type: mockQuestionTypes[0],
    topic: mockTopics[0],
    difficulty: DifficultyLevelEnum.EASY,
    header: "Question 2",
    answer_type: AnswerTypeEnum.SINGLE,
    choices: [
      {
        id: 1,
        choice: "Choice 1",
        is_answer: true,
      },
      {
        id: 2,
        choice: "Choice 1",
        is_answer: false,
      },
    ],
  },
  {
    id: 2,
    question_type: mockQuestionTypes[1],
    topic: mockTopics[1],
    difficulty: DifficultyLevelEnum.MEDIUM,
    header: "Question 2",
    answer_type: AnswerTypeEnum.SINGLE,
    choices: [
      {
        id: 1,
        choice: "True",
        is_answer: true,
      },
      {
        id: 2,
        choice: "False",
        is_answer: false,
      },
    ],
  },
  {
    id: 3,
    question_type: mockQuestionTypes[2],
    topic: mockTopics[1],
    difficulty: DifficultyLevelEnum.HARD,
    header: "Question 3",
    answer_type: AnswerTypeEnum.TEXT,
    correct_answers: [{ id: 1, answer: "Answer 1" }],
  },
];

export const mockExam: IExam = {
  id: 1,
  title: "Mock Exam",
  status: ExamStatusEnum.UNSCHEDULED,
  duration: 60,
  created_at: new Date("2021-01-01"),
  scheduled_date: new Date("2021-01-01"),
  creation_mode: ExamCreationModeEnum.MANUAL,
  creator: mockInstructor,
  course: mockCourses[0],
  total_score: 0,
};

export const mockExamsList: IExam[] = [
  {
    ...mockExam,
  },
  {
    ...mockExam,
    id: 2,
    status: ExamStatusEnum.SCHEDULED,
  },
  {
    ...mockExam,
    id: 3,
    status: ExamStatusEnum.ONGOING,
  },
  {
    ...mockExam,
    id: 4,
    status: ExamStatusEnum.PENDINGGRADING,
  },
  {
    ...mockExam,
    id: 5,
    status: ExamStatusEnum.GRADED,
  },
];

export const mockExamQuestions: IExamQuestionsGroup[] = [
  {
    "MCQ": [
      { id: 1, score: 2, question: mockQuestions[0] },
      { id: 2, score: 3, question: mockQuestions[1] },
    ],
  },
  {
    "T/F": [{ id: 3, score: 2, question: mockQuestions[3] }],
  },
];

export const mockDetailedExam: IDetailedExam = {
  ...mockExam,
  exam_questions: mockExamQuestions,
};

export const mockExamPayload: IExamPayload = {
  title: "Mock Exam",
  duration: 60,
  is_auto: false,
  course_id: 1,
  exam_questions_attributes: [
    { question_id: 1, score: 2 },
    { question_id: 2, score: 3 },
  ],
};

