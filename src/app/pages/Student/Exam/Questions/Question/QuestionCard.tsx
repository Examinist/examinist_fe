import React, { useContext } from "react";
import {
  IStudentAnswer,
  IStudentDetailedExam,
} from "../../../../../types/StudentExam";
import { Box, Stack } from "@mui/system";
import theme from "../../../../../../assets/theme";
import QuestionTypeTag from "./QuestionTypeTag";
import { DefaultQuestionTypesEnum } from "../../../../../types/CourseSettings";
import { AnswerTypeEnum } from "../../../../../types/Question";
import MCQMultipleAnswers from "./Answers/MCQMultipleAnswers";
import MCQSingleAnswer from "./Answers/MCQSingleAnswer";
import TF from "./Answers/TF";
import TextAnswer from "./Answers/TextAnswer";
import {
  IStudentExamContext,
  StudentExamContext,
} from "../../StudentExamContext";

interface IQuestionCardProps {
  answer: IStudentAnswer;
  index: number;
}

export default function QuestionCard({ answer, index }: IQuestionCardProps) {
  const { exam, setExam, changedAnswers, setChangedAnswers } =
    useContext<IStudentExamContext>(StudentExamContext);
  const updateAnswer = (newAnswer: string[]) => {
    const newExam: IStudentDetailedExam = { ...exam! };
    newExam.answers[index].answers = newAnswer;
    setExam(newExam);
    const newSet: Set<number> = new Set(changedAnswers);
    newSet.add(index);
    setChangedAnswers(newSet);
  };

  const renderAnswer = () => {
    const answerType = answer.question?.answer_type!;
    switch (answer.question?.question_type.name) {
      case DefaultQuestionTypesEnum.MCQ:
        return answerType === AnswerTypeEnum.MULTIPLE ? (
          <MCQMultipleAnswers answer={answer} onUpdate={updateAnswer} />
        ) : (
          <MCQSingleAnswer answer={answer} onUpdate={updateAnswer} />
        );
      case DefaultQuestionTypesEnum.T_F:
        return <TF answer={answer} onUpdate={updateAnswer} />;
      case DefaultQuestionTypesEnum.SHORT_ANSWER:
        return <TextAnswer answer={answer} onUpdate={updateAnswer} />;
      default:
        return <TextAnswer answer={answer} onUpdate={updateAnswer} />;
    }
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 3,
        py: 2,
        gap: 1,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <QuestionTypeTag
          questionType={answer.question?.question_type.name!}
          answerType={answer.question?.answer_type!}
        />
      </Box>
      <Box sx={{ fontWeight: 500 }}>
        Q{index + 1}. {answer.question?.header}
      </Box>
      <Box>{renderAnswer()}</Box>
    </Stack>
  );
}
