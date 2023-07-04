import React, { useContext } from "react";
import {
  IStudentAnswer,
  IStudentDetailedExam,
} from "../../../../../types/StudentPortalStudentExam";
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
import { YellowSwitch } from "./YellowSwitch";
import { yellow } from "@mui/material/colors";
import {
  IStudentExamPayload,
  IStudentExamResponse,
  submitStudentExamApi,
} from "../../../../../services/APIs/StudentAPIs";
import { useParams } from "react-router";

interface IQuestionCardProps {
  answer: IStudentAnswer;
  index: number;
}

export default function QuestionCard({ answer, index }: IQuestionCardProps) {
  const {
    exam,
    setExam,
    setSolvedQuestionsCount,
    saveChanges,
  } = useContext<IStudentExamContext>(StudentExamContext);
  const [marked, setMarked] = React.useState<boolean>(answer.marked);


  const updateAnswer = (newAnswer: string[]) => {
    const newExam: IStudentDetailedExam = { ...exam! };
    newExam.answers[index].answer = newAnswer;
    if (
      (newAnswer.length === 0 || newAnswer[0] === "") &&
      newExam.answers[index].solved
    ) {
      newExam.answers[index].solved = false;
      setSolvedQuestionsCount((prev) => prev - 1);
    } else if (
      newAnswer.length !== 0 &&
      newAnswer[0] !== "" &&
      !newExam.answers[index].solved
    ) {
      newExam.answers[index].solved = true;
      setSolvedQuestionsCount((prev) => prev + 1);
    }
    setExam(newExam);
    const payload: IStudentExamPayload = {
      is_submitting: false,
      student_answers_attributes: [newExam.answers[index]],
    };
    saveChanges(payload);
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
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        {marked ? (
          <Box
            sx={{
              width: "80px",
              backgroundColor: yellow[600],
              borderRadius: 4,
              fontSize: "12px",
              textAlign: "center",
              py: 0.5,
              ml: 0,
            }}
          >
            Marked
          </Box>
        ) : (
          <Box
            sx={{
              width: "80px",
            }}
          />
        )}
        <QuestionTypeTag
          questionType={answer.question?.question_type.name!}
          answerType={answer.question?.answer_type!}
        />
        <Box
          sx={{
            width: "80px",
          }}
        />
      </Box>
      <Box sx={{ fontWeight: 500 }}>
        Q{index + 1}. {answer.question?.header}
      </Box>
      <Box>{renderAnswer()}</Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Box>
          Mark
          <YellowSwitch
            checked={marked}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMarked(event.target.checked);
              const newExam: IStudentDetailedExam = { ...exam! };
              newExam.answers[index].marked = event.target.checked;
              setExam(newExam);
              const payload: IStudentExamPayload = {
                is_submitting: false,
                student_answers_attributes: [newExam.answers[index]],
              };
              saveChanges(payload);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
