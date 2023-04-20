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
