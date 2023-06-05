import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IExamsListResponse,
  getExamsApi,
} from "../../../services/APIs/ExamAPIs";
import { ExamStatusEnum, IExam } from "../../../types/Exam";
import { Box, CircularProgress } from "@mui/material";
import ExamCard from "../../../components/ExamsComponents/ExamCard";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import {
  ExamsReloadContext,
  IExamsReloadContext,
} from "../../../context/ExamsReloadContext";
import { IsAssignedContext } from "../../../layouts/CourseLayout/CourseLayout";

function getCourseExamAttributesList(exam: IExam) {
  var attrList: string[] = [];
  attrList = [
    exam.id.toString(),
    exam.title,
    exam.status,
    exam.creation_mode,
    exam.creator.first_name + " " + exam.creator.last_name,
    exam.created_at.toLocaleString(),
    exam.scheduled_date?.toLocaleString() ?? "Not Scheduled",
  ];
  return attrList;
}

export function getFilterType(tabName: string, exams: IExam[]) {
  switch (tabName) {
    case "Unscheduled":
      return exams.filter(
        (value) => value.status == ExamStatusEnum.UNSCHEDULED
      );
    case "Scheduled":
      return exams.filter((value) => value.status == ExamStatusEnum.SCHEDULED);
    case "On Going":
      return exams.filter((value) => value.status == ExamStatusEnum.ONGOING);
    case "Pending Grading":
      return exams.filter(
        (value) => value.status == ExamStatusEnum.PENDINGGRADING
      );
    case "Graded":
      return exams.filter((value) => value.status == ExamStatusEnum.GRADED);
    default:
      return exams;
  }
}

const tabs = [
  "All",
  "Unscheduled",
  "Scheduled",
  "On Going",
  "Pending Grading",
  "Graded",
];
let initialTableHeader = [
  "ID",
  "Title",
  "Status",
  "Creation Mode",
  "Creator",
  "Creation Date",
  "Scheduled Date",
];

export default function CourseExams() {
  const { courseId } = useParams<{ courseId: string }>();
  const [exams, setExams] = useState<IExam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableHeader, setTableHeader] = useState<string[]>(initialTableHeader);
  const { setAlertState } = useAlert();
  const isAssigned = useContext<boolean>(IsAssignedContext);

  const loadExams = () => {
    setIsLoading(true);
    getExamsApi(parseInt(courseId!))
      .then(({ data }: IExamsListResponse) => {
        setExams(data.exams);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
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
    if(isAssigned){
      setTableHeader([...tableHeader, "Action"])
    }
    loadExams();
  }, []);

  const contextValue: IExamsReloadContext = {
    reloadExams: loadExams,
  };



  return (
    <Box sx={{ px: 15, py: 5 }}>
      <Box
        sx={{
          fontSize: "2rem",
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
            attributesFunction={getCourseExamAttributesList}
            actionButton={isAssigned}
            allExams={false}
            filter={getFilterType}
          ></ExamCard>
        </ExamsReloadContext.Provider>
      )}
    </Box>
  );
}
