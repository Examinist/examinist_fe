export interface IQuestionType{
    id: number;
    name: string;
    easy_weight: number;
    medium_weight: number;
    hard_weight: number;
    is_deletable: boolean;
}

export interface IQuestion {
  questionType: string;
  topic: string;
  difficulty: string;
  header: string;
  answerType: AnswerTypeEnum;
  choices?: IChoice[];
  correctAnswer?: string[];
}

export enum AnswerTypeEnum{
    single = "single",
    multiple = "multiple",
    text = "text",
    pdf = "pdf",
}

export interface IChoice{
    id?: number;
    choice: string;
}
