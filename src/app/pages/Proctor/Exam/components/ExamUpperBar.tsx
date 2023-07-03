import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { ProctorPortalExamContext } from "../ProctorPortalExamContext";
import HoursMinutesCountDown from "../../../Student/Exam/ExamUpperBar/CountDown/HoursMinutesCountDown";
import { addTime } from "../../../../utilities/Date";
import { Button } from "@mui/material";

export default function ExamUpperBar() {
  const { exam, changedStudentsIds } = useContext(ProctorPortalExamContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 2,
        border: 1,
        borderColor: theme.palette.gray.light,
        overFlow: "auto",
        zIndex: 1000,
      }}
    >
      <Stack>
        <Box
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.gray.dark,
          }}
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
          {exam.course.title + " - " + exam.course.code}
        </Box>
      </Stack>

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <HoursMinutesCountDown
          toDate={addTime(exam.scheduled_date, exam.duration)}
          onComplete={() => {}}
        />
      </Box>

      {changedStudentsIds.size > 0 && (
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            right: "0px",
            transform: "translateX(-10%)",
            borderRadius: 3,
            px: 3
          }}
        >
          Save Changes
        </Button>
      )}
    </Box>
  );
}
