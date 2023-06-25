import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import { IStudentExamContext, StudentExamContext } from "../StudentExamContext";
import HoursMinutesCountDown from "./CountDown/HoursMinutesCountDown";
import { Button } from "@mui/material";

export default function UpperBar() {
  const {exam} = useContext<IStudentExamContext>(StudentExamContext);

  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        alignItems: "center",
        px: 4,
        justifyContent: "space-between",
        borderBottomColor: theme.palette.gray.light,
      }}
    >
      <Stack>
        <Box
          sx={{ fontSize: 20, fontWeight: 600, color: theme.palette.gray.dark }}
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
  );
}
