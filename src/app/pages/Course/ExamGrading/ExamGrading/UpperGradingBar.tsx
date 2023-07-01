import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import theme from "../../../../../assets/theme";
import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { gradeExamContext } from "../Models";
import { IStudent } from "../../../../types/User";

export default function UpperGradingBar({
  title,
  student,
}: {
  title: string;
  student: IStudent;
}) {
  const [submitWindowOpen, setSubmitWindowOpen] =
    React.useState<boolean>(false);
  const navigate = useNavigate();
  const { gradeState, setGradeState } = useContext(gradeExamContext);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: 1,
        borderBottomColor: theme.palette.gray.light,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ color: theme.palette.text.primary }}
              fontSize="inherit"
            />
          </IconButton>
          <Typography variant="h6" paragraph>
            {title}

            <br />
            {student.first_name +
              " " +
              student.last_name +
              " (" +
              student.academic_id +
              ")"}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 5,
            px: 3,
            fontWeight: 600,
          }}
          onClick={() => setSubmitWindowOpen(true)}
        >
          Save Changes
        </Button>
      </Box>
      <LinearProgress
        variant="determinate"
        color="success"
        sx={{
          height: 10,
          borderRadius: 0,
        }}
        value={((gradeState.questionsAnswered??0) / (gradeState.totalQuestions??1)) * 100}
      />
      {/* <SubmitExamDialog
        open={submitWindowOpen}
        onClose={() => setSubmitWindowOpen(false)}
      /> */}
    </Box>
  );
}
