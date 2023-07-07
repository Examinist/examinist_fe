import { Box, Card, CircularProgress, Tab, Tabs } from "@mui/material";
import StudentsTable from "./StudentsTable";
import { useEffect, useState } from "react";
import { IStudentExam } from "../../../../types/StudentExam";
import {
  IStudentExamsListResponse,
  getStudentExamsApi,
} from "../../../../services/APIs/StaffPortalStudentExamAPIs";
import { ExamStatusEnum } from "../../../../types/Exam";
import useAlert from "../../../../hooks/useAlert";
import React from "react";
import { IErrorResponse } from "../../../../services/Response";
import { useParams } from "react-router";
import { setGradeTableContext } from "../Models";

interface IExamCardProp {
  tabs: string[];
  tableHeader: string[];
}

export default function TableContainer({ tabs, tableHeader }: IExamCardProp) {
  const [currTab, selectTab] = useState(0);
  const { setAlertState } = useAlert();
  const { gradeTableState, setGradeTableState } =
    React.useContext(setGradeTableContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { examId } = useParams<{ examId: string }>();

  const handleChangePage = (event: unknown, newPage: number) => {
    loadStudents(newPage, gradeTableState.filterType ?? ExamStatusEnum.ALL);
  };
  const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    selectTab(newTab);
    getFilterType(tabs[newTab]);
  };
  const getFilterType = (tabName: string) => {
    switch (tabName) {
      case "All":
        loadStudents(0, ExamStatusEnum.ALL);
        return;
      case "Pending Grading":
        loadStudents(0, ExamStatusEnum.PENDINGGRADING);
        return;
      case "Graded":
        loadStudents(0, ExamStatusEnum.GRADED);
        return;
    }
    return;
  };
  const loadStudents = (pageNumber: number, type: ExamStatusEnum) => {
    setIsLoading(true);
    console.log("page ", pageNumber);
    (type == ExamStatusEnum.ALL
      ? getStudentExamsApi(parseInt(examId!), pageNumber + 1)
      : getStudentExamsApi(parseInt(examId!), pageNumber + 1, type)
    )
      .then(({ data }: IStudentExamsListResponse) => {
        setGradeTableState({
          studentsExams: data.student_exams,
          totalPages: data.number_of_pages,
          pageNumber: pageNumber,
          filterType: type,
          count: getCount(data.student_exams, data.number_of_pages),
        });
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
  const getCount = (student_exams: IStudentExam[], number_of_pages: number) => {
    console.log("student_exams ", student_exams.length);
    console.log("number_of_pages ", number_of_pages);

    const count = 20 * number_of_pages;
    console.log("count ", count);
    if (student_exams.length < 20) {
      console.log("pp ", 20 * (number_of_pages - 1) + student_exams.length);
      return 20 * (number_of_pages - 1) + student_exams.length;
    }
    console.log("shit ", count);
    return count;
  };

  useEffect(() => {
    loadStudents(0, ExamStatusEnum.ALL);
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        paddingRight: "24px",
        paddingLeft: "24px",
        paddingTop: "6px",
        borderRadius: "15px",
        paddingBottom: "24px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2 }}>
        <Tabs value={currTab} onChange={handleChangeTab}>
          {tabs.map((value, index) => (
            <Tab
              key={index}
              label={value}
              sx={{
                fontWeight: index == currTab ? "bold" : "medium",
                fontFamily: "montserrat",
                textTransform: "none",
                fontSize: "18px",
                color: index == currTab ? "#1B84BF" : "#969090",
              }}
            />
          ))}
        </Tabs>
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
        <>
          <StudentsTable
            tableHeader={tableHeader}
            handleChangePage={handleChangePage}
          ></StudentsTable>
        </>
      )}
    </Card>
  );
}
