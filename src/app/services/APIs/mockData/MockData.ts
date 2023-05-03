import { ICourse, ICourseGroup } from "../../../types/Course";
import { AnswerTypeEnum, DifficultyLevelEnum, IQuestion, IQuestionType, ITopic } from "../../../types/Question";

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
    instructors: [],
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
  instructors: [],
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
  },
  {
    id: 2,
    name: "T/F",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 3,
    name: "Essay",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 4,
    name: "Short Answer",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: false,
  },
  {
    id: 5,
    name: "Modelling",
    easy_weight: 1,
    medium_weight: 2,
    hard_weight: 3,
    is_deletable: true,
  },
];
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
    correct_answers: [{id: 1, answer: "Answer 1"}],
  },
];
