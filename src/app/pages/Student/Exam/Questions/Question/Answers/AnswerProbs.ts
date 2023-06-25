import { IStudentAnswer } from "../../../../../../types/StudentExam";

export default interface IAnswerProbs {
    answer: IStudentAnswer;
    onUpdate: (answer: string[]) => void;
}
