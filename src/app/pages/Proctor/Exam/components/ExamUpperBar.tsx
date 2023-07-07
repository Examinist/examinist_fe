import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { ProctorPortalExamContext } from "../ProctorPortalExamContext";
import HoursMinutesCountDown from "../../../Student/Exam/ExamUpperBar/CountDown/HoursMinutesCountDown";
import { addTime } from "../../../../utilities/Date";
import { IconButton, LinearProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";

export default function ExamUpperBar() {
  const { exam, studentsCount, assignedStudentsCount } = useContext(
    ProctorPortalExamContext
  );
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        position: "sticky",
        top: 0,
        border: 1,
        borderColor: theme.palette.gray.light,
        overFlow: "auto",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 2 }}>
        <IconButton
          aria-label="back"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate("/proctor");
            localStorage.removeItem("exam");
          }}
        >
          <ArrowBackIosNewIcon
            sx={{ color: theme.palette.text.primary }}
            fontSize="inherit"
          />
        </IconButton>
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
          <Box
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: theme.palette.gray.dark,
            }}
          >
          {exam.busy_labs.name}
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
            onComplete={() => {
              navigate("/proctor");
              localStorage.removeItem("exam");
            }}
          />
        </Box>

        <Stack sx={{ ml: "auto", alignItems: "end", gap: 0.5 }}>
          {/* <Box
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: theme.palette.gray.dark,
            }}
          >
            {exam.busy_labs.name}
          </Box> */}
          <Box
            sx={{
              fontSize: 17,
              fontWeight: 400,
              color: theme.palette.gray.dark,
            }}
          >
          Assigned Students: {assignedStudentsCount + "/" + studentsCount}
          </Box>
        </Stack>
      </Box>
      <LinearProgress
        variant="determinate"
        color="success"
        value={(assignedStudentsCount / studentsCount) * 100}
      />
    </Box>
  );
}
