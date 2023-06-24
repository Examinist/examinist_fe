import { Box } from "@mui/system";
import React, { useState } from "react";
import theme from "../../../../../assets/theme";
import { IExam } from "../../../../types/Exam";
import { addTime, getTimeStr } from "../../../../utilities/Date";
import { Button, Stack } from "@mui/material";
import Countdown from "react-countdown";
import CustomCountDown from "./CountDown/CustomCountDown";
import { IStudentExam } from "../../../../types/StudentExam";

const fromToDateStr = (exam: IStudentExam) => {
  const from = getTimeStr(exam.scheduled_date);
  const to = getTimeStr(exam.ends_at);
  return from + " - " + to;
};

export default function NearestExam({ exam }: { exam: IStudentExam }) {
  const [started, setStarted] = useState<Boolean>(false);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        px: 4,
        py: 3,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
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
            fontSize: 17,
            fontWeight: 500,
            color: theme.palette.gray.dark,
          }}
        >
          {exam.course.title + " - " + exam.course.code.toUpperCase()}
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

      <Stack sx={{}}>
        <Box
          sx={{
            fontSize: 13,
            color: theme.palette.gray.dark,
          }}
        >
          Starts in
        </Box>
        <CustomCountDown
          toDate={exam.ends_at}
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
        disabled={!started}
      >
        Start Exam
      </Button>
    </Box>
  );
}
