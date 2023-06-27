import { Box, CircularProgress } from "@mui/material";
import ExamCard from "../../components/ExamsComponents/ExamCard";
import { IExam } from "../../types/Exam";
import { mockExamsList } from "../../services/APIs/mockData/MockData";
import { getFilterType } from "../Course/Exams/CourseExams";
import { useEffect, useState } from "react";
import useAlert from "../../hooks/useAlert";
import { IExamsListResponse, getExamsApi } from "../../services/APIs/ExamAPIs";
import { IErrorResponse } from "../../services/Response";
import React from "react";
import {
  ExamsReloadContext,
  IExamsReloadContext,
} from "../../context/ExamsReloadContext";
import { fullDateOptions } from "../../utilities/Date";

function getAllExamsAttributesList(exam: IExam) {
  var attrList: string[] = [];
  attrList = [
    exam.id.toString(),
    exam.title,
    exam.status,
    exam.course.title,
    exam.creator.first_name + " " + exam.creator.last_name,
    exam.created_at.toLocaleString(undefined, fullDateOptions),
    exam.scheduled_date?.toLocaleString(undefined, fullDateOptions) || "Not Scheduled",
  ];
  return attrList;
}

export default function AllExams() {
  const [exams, setExams] = useState<IExam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setAlertState } = useAlert();
  const tabs = [
    "All",
    "Unscheduled",
    "Scheduled",
    "On Going",
    "Pending Grading",
    "Graded",
  ];
  const tableHeader = [
    "ID",
    "Title",
    "Status",
    "Course",
    "Creator",
    "Creation Date",
    "Scheduled Date",
    "Actions",
  ];

  const loadExams = () => {
    setIsLoading(true);
    getExamsApi()
      .then(({ data }: IExamsListResponse) => {
        setExams(data.exams);
      })
      .catch(({ response: { statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadExams();
  }, []);

  const contextValue: IExamsReloadContext = {
    reloadExams: loadExams,
  };

  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2.2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          pb: 4,
        }}
      >
        Exams
      </Box>
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
        <ExamsReloadContext.Provider value={contextValue}>
          <ExamCard
            tabs={tabs}
            tableHeader={tableHeader}
            rows={exams}
            attributesFunction={getAllExamsAttributesList}
            actionButton={true}
            allExams={true}
            filter={getFilterType}
          ></ExamCard>
        </ExamsReloadContext.Provider>
      )}
    </Box>
  );
}
