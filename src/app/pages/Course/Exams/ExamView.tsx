import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import theme from "../../../../assets/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IErrorResponse } from "../../../services/Response";
import { IExamResponse, getExamApi } from "../../../services/APIs/ExamAPIs";
import { IDetailedExam } from "../../../types/Exam";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ExamViewList from "./ExamViewList";

export default function ExamView() {
  const location = useLocation();
  const examId = location.state?.examId;
  const [isLoading, setIsLoading] = useState(true);
  const [detailedExam, setDetailedExam] = useState<IDetailedExam>(null!);
  const navigate = useNavigate();

  useEffect(() => {
    getExamApi(examId)
      .then(({ data }: IExamResponse) => {
        setDetailedExam(data.exam);
        setIsLoading(false);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {});
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.default,
        py: 5,
        px: 5,
      }}
    >
      <>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              backgroundColor: theme.palette.white.main,
              py: 5,
              px: 10,
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
                <ArrowBackIosNewIcon sx={{color:theme.palette.text.primary}} fontSize="inherit" />
              </IconButton>
              <h1 style={{ flexGrow: 1, textAlign: "center" }}>
                {detailedExam?.title}
              </h1>
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                color={theme.palette.gray.dark}
                sx={{ fontWeight: 500 }}
              >
                Course : {detailedExam?.course.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color={theme.palette.gray.dark}
                sx={{ fontWeight: 500 }}
              >
                Creator : {detailedExam?.creator.first_name}{" "}
                {detailedExam?.creator.last_name}
              </Typography>
              <Typography
                variant="subtitle1"
                color={theme.palette.gray.dark}
                sx={{ fontWeight: 500 }}
              >
                Duration : {detailedExam?.duration}
              </Typography>
            </Box>
           <ExamViewList exam={detailedExam}/>
          </Box>
        )}
      </>
    </Box>
  );
}
