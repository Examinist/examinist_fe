import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ExamsTable from "./ExamsTable/ExamsTable";
import {
  mockExamsList,
  mockStudentExam,
  mockStudentExams,
} from "../../../../services/APIs/mockData/MockData";
import {
  IStudentPortalStudentExam,
  StudentExamStatusEnum,
} from "../../../../types/StudentPortalStudentExam";
import ExamsTabs from "./ExamsTabs";
import {
  IStudentExamsListResponse,
  getStudentExamsApi,
} from "../../../../services/APIs/StudentExamAPIs";
import { set } from "react-hook-form";
import { IErrorResponse } from "../../../../services/Response";
import useAlert from "../../../../hooks/useAlert";
import { CircularProgress } from "@mui/material";

interface IExamsParams {
  page: number;
  status: string;
  isWithGrade: boolean;
}

export default function StudentExams() {
  const [examsParams, setExamsParams] = useState<IExamsParams>({
    page: 1,
    status: StudentExamStatusEnum.UPCOMING,
    isWithGrade: false,
  });

  const [exams, setExams] = useState<IStudentPortalStudentExam[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAlertState } = useAlert();

  useEffect(() => {
    setLoading(true);
    getStudentExamsApi(examsParams.page, examsParams.status)
      .then(({ data }: IStudentExamsListResponse) => {
        setExams(data.student_exams);
        console.log(data);
        setPageCount(data.number_of_pages);
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [examsParams]);

  return (
    <Stack sx={{ gap: 4 }}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Exams
      </Box>
      <Box>
        <ExamsTabs
          onChange={(newValue) =>
            setExamsParams({
              ...examsParams,
              status: newValue,
              isWithGrade:
                newValue === StudentExamStatusEnum.GRADED ||
                newValue === StudentExamStatusEnum.PENDING_GRADING,
            })
          }
        />
        {loading ? (
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
          <ExamsTable
            isWithGrade={examsParams.isWithGrade}
            exams={exams}
            pagesCount={pageCount}
            onChangePage={(newPage) =>
              setExamsParams({ ...examsParams, page: newPage })
            }
          />
        )}
      </Box>
    </Stack>
  );
}
