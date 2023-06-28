import { IStudentAnswer } from "../../../../../../types/StudentPortalStudentExam";

export default interface IAnswerProbs {
  answer: IStudentAnswer;
  onUpdate: (answer: string[]) => void;
}
