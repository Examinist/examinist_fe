import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { IStudentExam } from "../../../types/StudentExam";
import useAlert from "../../../hooks/useAlert";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  IStudentExamsListResponse,
  getStudentExamsApi,
} from "../../../services/APIs/StaffPortalStudentExamAPIs";
import { IErrorResponse } from "../../../services/Response";
import CustomCircularProgress from "../../../components/CustomCircularProgress";
import {
  IProctorPortalExamContext,
  ProctorPortalExamContext,
} from "./ProctorPortalExamContext";
import { IProctorPortalExam } from "../../../types/ProctorPortalExam";
import ExamUpperBar from "./components/ExamUpperBar";
import { fixExamDate } from "../../../services/APIs/ProctorAPIs";
import StudentsTable from "./components/StudentsTable";

export default function ProctorPortalExam() {
  const [studentsExams, setStudentsExams] = useState<IStudentExam[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [assignedStudentsCount, setAssignedStudentsCount] = useState<number>(0);
  const [changedStudentsIds, setChangedStudentsIds] = useState<Set<number>>(
    new Set()
  );
  const { setAlertState } = useAlert();
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const location = useLocation();
  const exam: IProctorPortalExam = fixExamDate(
    JSON.parse(localStorage.getItem("exam")!) as IProctorPortalExam
  );

  useEffect(() => {
    setLoading(true);
    getStudentExamsApi(parseInt(examId!))
      .then(({ data }: IStudentExamsListResponse) => {
        console.log(data);
        setStudentsExams(data.student_exams);
        setStudentsCount(data.student_exams.length);
        setAssignedStudentsCount(
          data.student_exams.filter(
            (studentExam: IStudentExam) => studentExam.student_status !== null
          ).length
        );
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText || "Something went wrong",
          severity: "error",
        });
        navigate("/proctor");
      })
      .finally(() => setLoading(false));
  }, []);

  const contextValue: IProctorPortalExamContext = {
    exam: exam,
    studentsExams: studentsExams,
    setStudentsExams: setStudentsExams,
    studentsCount: studentsCount,
    assignedStudentsCount: assignedStudentsCount,
    setAssignedStudentsCount: setAssignedStudentsCount,
    changedStudentsIds: changedStudentsIds,
    setChangedStudentsIds: setChangedStudentsIds,
  };

  return (
    <Stack>
      <ProctorPortalExamContext.Provider value={contextValue}>
        <ExamUpperBar />
        <Stack sx={{my: 2, mx: 15, gap: 4}}>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "medium",
              fontFamily: "montserrat",
            }}
          >
            Students
          </Box>
          {loading ? <CustomCircularProgress /> : <StudentsTable/>}
        </Stack>
      </ProctorPortalExamContext.Provider>
    </Stack>
  );
}
