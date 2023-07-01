import { ICourse, ICourseGroup } from "../../../types/Course";
import {
  DefaultQuestionTypesEnum,
  IExamTemplate,
  IQuestionType,
  ITopic,
} from "../../../types/CourseSettings";
import {
  ExamCreationModeEnum,
  ExamStatusEnum,
  IDetailedExam,
  IExam,
  IExamQuestion,
  IExamQuestionsGroup,
} from "../../../types/Exam";
import { IBusyLab, ILab } from "../../../types/Lab";
import {
  AnswerTypeEnum,
  DifficultyLevelEnum,
  IQuestion,
} from "../../../types/Question";
import {
  IStudentAnswer,
  IStudentDetailedExam,
  IStudentPortalStudentExam,
  IStudentQuestion,
  IStudentQuestionType,
  StudentExamStatusEnum,
} from "../../../types/StudentPortalStudentExam";
import IUser, { IStaff, IStudent } from "../../../types/User";
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
        choice: "Choice 2",
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
        choice: "Choice 2",
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
  scheduled_date: new Date(),
  creation_mode: ExamCreationModeEnum.MANUAL,
  creator: mockInstructor,
  course: mockCourses[0],
  total_score: 0,
  has_models: false,
};

export const mockExamsList: IExam[] = [
  {
    ...mockExam,
  },
  {
    ...mockExam,
    id: 2,
    status: ExamStatusEnum.SCHEDULED,
    pending_labs_assignment: true,
  },
  {
    ...mockExam,
    id: 10,
    status: ExamStatusEnum.SCHEDULED,
    pending_labs_assignment: true,
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

// export let mockExamQuestions: Map<string, IExamQuestion[]> = new Map([
//   [
//     "MCQ",
//     [
//       { id: 1, score: 2, question: mockQuestions[0] },
//       { id: 2, score: 3, question: mockQuestions[1] },
//     ],
//   ],
//   ["T/F", [{ id: 3, score: 2, question: mockQuestions[3] }]],
// ]);

export const mockDetailedExam: IDetailedExam = {
  ...mockExam,
  exam_questions: [
    {
      MCQ: [
        { id: 1, score: 2, question: mockQuestions[0] },
        { id: 2, score: 3, question: mockQuestions[1] },
      ],
      "T/F": [
        { id: 3, score: 2, question: mockQuestions[0] },
        { id: 4, score: 3, question: mockQuestions[1] },
      ],
    },
  ],
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

export const mockLabs: ILab[] = [
  {
    id: 1,
    name: "Lab 1",
    capacity: 10,
  },
  {
    id: 2,
    name: "Lab 2",
    capacity: 10,
  },
  {
    id: 3,
    name: "Lab 3",
    capacity: 10,
  },
];

export const mockBusyLabs: IBusyLab[] = [
  {
    id: 1,
    name: "Lab 1",
  },
  {
    id: 2,
    name: "Lab 2",
  },
  {
    id: 3,
    name: "Lab 3",
  },
];

export const mockStudentExam: IStudentPortalStudentExam = {
  id: 1,
  status: StudentExamStatusEnum.UPCOMING,
  title: "Mock Exam",
  duration: 60,
  total_score: 40,
  scheduled_date: new Date(),
  ends_at: new Date(Date.now() + 120 * 60000),
  course: mockCourses[0],
  busy_lab: mockBusyLabs[0],
};

export const mockStudentExams: IStudentPortalStudentExam[] = [mockStudentExam];

export const mockStudentQuestionTypes: IStudentQuestionType[] = [
  {
    id: 1,
    name: DefaultQuestionTypesEnum.MCQ,
  },
  {
    id: 2,
    name: DefaultQuestionTypesEnum.T_F,
  },
  {
    id: 3,
    name: DefaultQuestionTypesEnum.SHORT_ANSWER,
  },
  {
    id: 4,
    name: DefaultQuestionTypesEnum.ESSAY,
  },
];

export const mockStudentQuestion: IStudentQuestion = {
  id: 1,
  header: "Lorem epsum dolor sit amet ? ",
  difficulty: DifficultyLevelEnum.EASY,
  answer_type: AnswerTypeEnum.SINGLE,
  question_type: mockStudentQuestionTypes[0],
  topic: mockTopics[0],
  choices: [
    { id: 1, choice: "Choice 1" },
    { id: 2, choice: "Choice 2" },
    { id: 3, choice: "Choice 3" },
  ],
};

export const mockStudentQuestions: IStudentQuestion[] = [
  mockStudentQuestion,
  {
    ...mockStudentQuestion,
    id: 2,
    answer_type: AnswerTypeEnum.MULTIPLE,
  },
  {
    ...mockStudentQuestion,
    id: 3,
    question_type: mockStudentQuestionTypes[1],
    choices: [
      { id: 1, choice: "True" },
      { id: 2, choice: "False" },
    ],
  },
  {
    ...mockStudentQuestion,
    id: 4,
    question_type: mockStudentQuestionTypes[2],
    answer_type: AnswerTypeEnum.TEXT,
  },
  {
    ...mockStudentQuestion,
    id: 5,
    question_type: mockStudentQuestionTypes[3],
    answer_type: AnswerTypeEnum.TEXT,
  },
];

export const mockStudentAnswer: IStudentAnswer = {
  id: 1,
  answers: [],
  marked: false,
  solved: false,
  question: mockStudentQuestions[0],
};

export const mockStudentAnswers: IStudentAnswer[] = [
  mockStudentAnswer,
  {
    ...mockStudentAnswer,
    id: 2,
    question: mockStudentQuestions[1],
  },
  {
    ...mockStudentAnswer,
    id: 3,
    question: mockStudentQuestions[2],
  },
  {
    ...mockStudentAnswer,
    id: 4,
    question: mockStudentQuestions[3],
  },
  {
    ...mockStudentAnswer,
    id: 5,
    question: mockStudentQuestions[4],
  },
  {
    ...mockStudentAnswer,
    id: 6,
    question: mockStudentQuestions[1],
  },
  {
    ...mockStudentAnswer,
    id: 7,
    question: mockStudentQuestions[2],
  },
  {
    ...mockStudentAnswer,
    id: 8,
    question: mockStudentQuestions[3],
  },
  {
    ...mockStudentAnswer,
    id: 9,
    question: mockStudentQuestions[4],
  },
];

export const mockStudentDetailedExam: IStudentDetailedExam = {
  ...mockStudentExam,
  ends_at: new Date(Date.now() + 120 * 60000),
  answers: mockStudentAnswers,
};

const mockStudent: IStudent = {
  id: 1,
  first_name: "Mock",
  last_name: "Student",
  username: "123456789",
  email: "",
  academic_id: "123456789",
  role: "student",
};

export const mockStudents: IStudent[] = [
  mockStudent,
  { ...mockStudent, id: 2 },
  { ...mockStudent, id: 3 },
  { ...mockStudent, id: 4 },
  { ...mockStudent, id: 5 },
];

const mockProctor: IStaff = {
  id: 1,
  first_name: "Mock",
  last_name: "Proctor",
  username: "mock_proctor",
  role: "proctor",
};

export const mockProctors: IStaff[] = [
  mockProctor,
  { ...mockProctor, id: 2 },
  { ...mockProctor, id: 3 },
  { ...mockProctor, id: 4 },
  { ...mockProctor, id: 5 },
];

export const mockScheduledExams: IExam[] = [
  {
    ...mockExam,
    id: 2,
    status: ExamStatusEnum.SCHEDULED,
    pending_labs_assignment: true,
    busy_labs: mockBusyLabs,
  },
  {
    ...mockExam,
    id: 10,
    status: ExamStatusEnum.SCHEDULED,
    pending_labs_assignment: true,
    busy_labs: [
      { ...mockBusyLabs[0], proctor: mockProctors[0] },
      mockBusyLabs[1],
      mockBusyLabs[2],
    ],
  },
  {
    ...mockExam,
    id: 10,
    status: ExamStatusEnum.SCHEDULED,
    pending_labs_assignment: false,
    busy_labs: [
      { ...mockBusyLabs[0], proctor: mockProctors[0] },
      { ...mockBusyLabs[1], proctor: mockProctors[1] },
      { ...mockBusyLabs[2], proctor: mockProctors[2] },
    ],
  },
];
