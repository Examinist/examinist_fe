import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import HoursMinutesCountDown from "./CountDown/HoursMinutesCountDown";
import { Button, LinearProgress } from "@mui/material";

export default function UpperBar() {
  const {exam, questionsCount, solvedQuestionsCount} = useContext<IStudentExamContext>(StudentExamContext);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        borderBottomColor: theme.palette.gray.light,
      }}
    >
      <Box
        sx={{
          py: 1,
          display: "flex",
          alignItems: "center",
          px: 4,
          justifyContent: "space-between",
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
            {exam?.title}
          </Box>
          <Box
            sx={{
              fontSize: 17,
              fontWeight: 500,
              color: theme.palette.gray.dark,
            }}
          >
            {exam?.course.title + " - " + exam?.course.code}
          </Box>
        </Stack>
        {exam && (
          <>
            <HoursMinutesCountDown
              toDate={exam?.ends_at}
              onComplete={() => console.log("exam submit")}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 3,
                fontWeight: 600,
              }}
            >
              Submit
            </Button>
          </>
        )}
      </Box>
      <LinearProgress variant="determinate" color="success" value={(solvedQuestionsCount/questionsCount)*100} />
    </Box>
  );
}
