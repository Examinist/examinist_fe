export interface IQuestionType{
    id: number;
    name: string;
    easy_weight: number;
    medium_weight: number;
    hard_weight: number;
    is_deletable: boolean;
}

export interface IQuestion {
    id?: number;
  questionType: string;
  topic: string;
  difficulty: string;
  header: string;
  answerType: AnswerTypeEnum;
  choices?: IChoice[];
  correctAnswer?: string;
}

export enum AnswerTypeEnum{
    SINGLE = "single",
    MULTIPLE = "multiple",
    TEXT = "text",
    PDF = "pdf",
}

export enum DefaultQuestionTypesEnum{
    MCQ = "MCQ",
    T_F = "T/F",
    ESSAY = "Essay",
    SHORT_ANSWER = "Short_Answer",
}

export interface IChoice{
    id?: number;
    choice: string;
    isCorrect: boolean;
}

const mockQuestions: IQuestion[] = [
  {
    id: 1,
    questionType: DefaultQuestionTypesEnum.MCQ,
    topic: "Topic 1",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.SINGLE,
    choices: [
      { id: 1, choice: "Choice 1", isCorrect: true },
      { id: 2, choice: "Choice 2", isCorrect: false },
      { id: 3, choice: "Choice 3", isCorrect: false },
      { id: 4, choice: "Choice 4", isCorrect: false },
    ],
  },
  {
    id: 2,
    questionType: DefaultQuestionTypesEnum.MCQ,
    topic: "Topic 2",
    difficulty: "Hard",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.MULTIPLE,
    choices: [
      { id: 1, choice: "Choice 1", isCorrect: true },
      { id: 2, choice: "Choice 2", isCorrect: false },
      { id: 3, choice: "Choice 3", isCorrect: true },
      { id: 4, choice: "Choice 4", isCorrect: false },
    ],
  },
  {
    id: 3,
    questionType: DefaultQuestionTypesEnum.T_F,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.SINGLE,
    choices: [
      { id: 1, choice: "True", isCorrect: true },
      { id: 2, choice: "False", isCorrect: false },
    ],
  },
  {
    id: 4,
    questionType: DefaultQuestionTypesEnum.SHORT_ANSWER,
    topic: "Topic 2",
    difficulty: "Medium",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.TEXT,
    correctAnswer:
      "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum",
  },
  {
    id: 5,
    questionType: DefaultQuestionTypesEnum.ESSAY,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.TEXT,
    correctAnswer:
      "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum",
  },
  {
    id: 6,
    questionType: DefaultQuestionTypesEnum.ESSAY,
    topic: "Topic 2",
    difficulty: "Easy",
    header: "Lorem epsum Lorem epsum Lorem epsum Lorem epsum Lorem epsum?",
    answerType: AnswerTypeEnum.PDF,
    correctAnswer:
      "<link of pdf file>",
  },
];
