import {
  AnswerTypeEnum,
  DefaultQuestionTypesEnum,
  DifficultyLevelEnum,
  IChoice,
  ICorrectAnswer,
} from "../../../../types/Question";
import * as yup from "yup";


export interface IFormInputs {
  header: string;
  answer_type: AnswerTypeEnum;
  difficulty: DifficultyLevelEnum;
  question_type: string;
  topic: string;
  choices_attributes?: IChoice[];
  correct_answers_attributes?: ICorrectAnswer[];
}

export const initialValues: IFormInputs = {
  difficulty: DifficultyLevelEnum.EASY,
  header: "",
  topic: "",
  question_type: "",
  answer_type: AnswerTypeEnum.SINGLE,
  choices_attributes: [
    {
      choice: "",
      is_answer: false,
    },
    {
      choice: "",
      is_answer: false,
    },
  ],
};

export const schema = yup.object().shape({
  header: yup.string().required("Header is required"),
  topic: yup.string().required("Topic is required"),
  question_type: yup.string().required("Question type is required"),
  answer_type: yup.string().required("Answer type is required"),
  difficulty: yup.string().required("Difficulty is required"),
  correct_answers_attributes: yup.array().when("question_type", {
    is: (question_type: string) =>
      question_type === DefaultQuestionTypesEnum.MCQ ||
      question_type === DefaultQuestionTypesEnum.T_F,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.of(
          yup.object().shape({
            answer: yup.string().required("Correct Answer is required"),
          })
        ).length(1, "Only 1 correct answer is required")
  }),
  choices_attributes: yup.array().when("question_type", {
    is: (question_type: string) =>
      question_type === DefaultQuestionTypesEnum.MCQ ||
      question_type === DefaultQuestionTypesEnum.T_F,
    then: (schema) =>
      schema
        .of(
          yup.object().shape({
            choice: yup.string().required("Choice is required"),
            is_answer: yup.boolean(),
          })
        )
        .min(2, "Minimum 2 choices are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});


