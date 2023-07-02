import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import theme from "../../../assets/theme";
import { mockBusyLabs, mockExam } from "../../services/APIs/mockData/MockData";
import { ArrowBack } from "@mui/icons-material";
import ExamLabsTable from "./components/ExamLabsTable";
import { IExam } from "../../types/Exam";
import { IExamResponse, getExamApi } from "../../services/APIs/ExamAPIs";
import CustomCircularProgress from "../../components/CustomCircularProgress";

export default function ExamLabs() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const location = useLocation();
  const exam = location.state.exam as IExam;
  const navigate = useNavigate();

  const getEndTime = () => {
    if (exam) {
      var date = new Date(exam.scheduled_date);
      var result = new Date(date.setMinutes(date.getMinutes() + exam.duration));
      return result;
    } 
    return new Date();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "8%",
        pt: 4,
      }}
    >
      {loading ? (
        <CustomCircularProgress />
      ) : (
        exam && (
          <>
            <Box display="flex" sx={{ gap: 2 }}>
              <IconButton
                aria-label="back"
                size="large"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBack
                  sx={{ color: theme.palette.text.primary }}
                  fontSize="large"
                />
              </IconButton>
              <Box
                sx={{
                  fontSize: "1.9rem",
                  fontWeight: "medium",
                  paddingTop: "5px",
                }}
              >
                {exam.title}
              </Box>
            </Box>
            <Box
              sx={{
                fontSize: "20px",
                px: "6.5%",
                color: "#6B6767",
                fontWeight: "medium",
              }}
            >
              <Box>
                {"Course: " + exam.course.title + " - " + exam.course.code}
              </Box>
              <Box>
                {exam.scheduled_date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }) +
                  " - " +
                  getEndTime().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </Box>
            </Box>
            <ExamLabsTable exam={exam}></ExamLabsTable>
          </>
        )
      )}
    </Box>
  );
}
