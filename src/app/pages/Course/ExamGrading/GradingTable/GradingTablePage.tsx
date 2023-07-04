import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ExamStatusEnum, IExam } from "../../../../types/Exam";
import { Box } from "@mui/system";
import useAlert from "../../../../hooks/useAlert";
import { IErrorResponse } from "../../../../services/Response";

import { IExamResponse, getExamApi } from "../../../../services/APIs/ExamAPIs";
import {
  IGradeTable,
  IGradingTableContext,
  setGradeTableContext,
} from "../Models";
import React from "react";
import TableContainer from "./TableContainer";
import theme from "../../../../../assets/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CircularProgress, IconButton } from "@mui/material";

const tabs = ["All", "Pending Grading", "Graded"];
let initialTableHeader = [
  "Student",
  "Student Status",
  "Grading Status",
  "Questions Graded",
  "Score",
  "Grade",
];

export default function GradingTablePage() {
  const { examId } = useParams<{ examId: string }>();
  const [tableHeader, setTableHeader] = useState<string[]>(initialTableHeader);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [gradeTableState, setGradeTableState] = React.useState<IGradeTable>({
    totalPages: 1,
    pageNumber: 1,
    filterType: ExamStatusEnum.ALL,
    studentsExams: [],
  });

  const contextValue: IGradingTableContext = {
    gradeTableState: gradeTableState,
    setGradeTableState: setGradeTableState,
  };

  useEffect(() => {
    setIsLoading(true);
    getExamApi(parseInt(examId!))
      .then(({ data }: IExamResponse) => {
        setTitle(data.exam.title);
      })
      .catch(({ response: { status, statusText } }: IErrorResponse) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box sx={{ px: 15, py: 5 }}>
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
        <>
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
            <h1 style={{ flexGrow: 1, textAlign: "start" }}>{title}</h1>
          </Box>

          <setGradeTableContext.Provider value={contextValue}>
            <TableContainer
              tabs={tabs}
              tableHeader={tableHeader}
            ></TableContainer>
          </setGradeTableContext.Provider>
        </>
      )}
    </Box>
  );
}
