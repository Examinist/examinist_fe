import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { mockExamsList } from "../../services/APIs/mockData/MockData";
import { ExamStatusEnum, IExam } from "../../types/Exam";
import ExamsLabsCard from "./components/ExamsLabsCard";
import { IExamsListResponse, getExamsApi } from "../../services/APIs/ExamAPIs";
import { IErrorResponse } from "../../services/Response";
import useAlert from "../../hooks/useAlert";
import CustomCircularProgress from "../../components/CustomCircularProgress";

export default function ExamsLabs() {
  const [exams, setExams] = useState<IExam[]>([]);
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getExamsApi(undefined, ExamStatusEnum.SCHEDULED)
      .then(({ data }: IExamsListResponse) => {
        setExams(data.exams);
      })
      .catch(({ response: { data, status, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ px: 12, py: 5 }}>
      <Box
        sx={{
          fontSize: "2.2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Exams' Labs
      </Box>
      {loading && <CustomCircularProgress />}
      {!loading &&
        (exams.length === 0 ? (
          <Box> No exams to show.</Box>
        ) : (
          exams.map((exam) => {
            return <ExamsLabsCard exam={exam} key={exam.id}></ExamsLabsCard>;
          })
        ))}
    </Box>
  );
}
