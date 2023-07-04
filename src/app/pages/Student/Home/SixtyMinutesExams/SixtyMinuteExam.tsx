import { Box } from "@mui/system";
import React, { useState } from "react";
import theme from "../../../../../assets/theme";
import { IExam } from "../../../../types/Exam";
import { addTime, getTimeStr } from "../../../../utilities/Date";
import { Button, Stack } from "@mui/material";
import SixtyMinutesCustomCountDown from "./CountDown/SixtyMinutesCountDown";
import {
  IStudentPortalStudentExam,
  StudentExamStatusEnum,
} from "../../../../types/StudentPortalStudentExam";
import { useNavigate } from "react-router";
import { UserRoleEnum } from "../../../../types/User";

const fromToDateStr = (exam: any) => {
  const from = getTimeStr(exam.scheduled_date);
  const to = getTimeStr(addTime(exam.scheduled_date, exam.duration));
  return from + " - " + to;
};

export default function SixtyMinutesExam({
  exam,
  role,
  buttonText,
}: {
  exam: any;
  role: UserRoleEnum;
  buttonText: string;
}) {
  const [started, setStarted] = useState<Boolean>(false);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 4,
        py: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Stack sx={{ gap: "2px", alignSelf: "center" }}>
        <Box
          sx={{ fontSize: 20, fontWeight: 600, color: theme.palette.gray.dark }}
        >
          {exam.title}
        </Box>
        <Box
          sx={{
            fontSize: 18,
            fontWeight: 500,
            color: theme.palette.gray.dark,
          }}
        >
          {exam.course.title + " - " + exam.course.code.toUpperCase()}
        </Box>
        <Box
          sx={{
            fontSize: 17,
            fontWeight: 450,
            color: theme.palette.gray.dark,
          }}
        >
          {role === UserRoleEnum.PROCTOR ? exam.busy_labs.name : exam.busy_lab.name}
        </Box>
        <Box
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: theme.palette.gray.dark,
          }}
        >
          {fromToDateStr(exam)}
        </Box>
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Box
          sx={{
            fontSize: 13,
            color: theme.palette.gray.dark,
          }}
        >
          Starts in
        </Box>
        <SixtyMinutesCustomCountDown
          toDate={exam.scheduled_date}
          onComplete={() => setStarted(true)}
        />
      </Stack>

      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-end",
          backgroundColor: "#3FC164",
          borderRadius: 3,
          px: 3,
          fontWeight: 600,
        }}
        disabled={
          !started ||
          exam.status === StudentExamStatusEnum.PENDING_GRADING ||
          exam.status === StudentExamStatusEnum.GRADED
        }
        onClick={() => {
          navigate(`./exams/${exam.id}`, { state: { exam: exam } });
          if (role === UserRoleEnum.PROCTOR){
             localStorage.setItem("exam", JSON.stringify(exam));
          }
           
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
