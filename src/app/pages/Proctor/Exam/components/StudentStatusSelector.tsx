import React, { useContext } from "react";
import {
  IStudentExam,
  StudentStatusEnum,
  studentStatusEnumToColorMap,
} from "../../../../types/StudentExam";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { ProctorPortalExamContext } from "../ProctorPortalExamContext";
import { Circle } from "@mui/icons-material";
import { updateStudentExamApi } from "../../../../services/APIs/StaffPortalStudentExamAPIs";
import { useParams } from "react-router";
import { IErrorResponse } from "../../../../services/Response";
import useAlert from "../../../../hooks/useAlert";

interface IStudentStatusSelector {
  studentExam: IStudentExam;
  index: number;
}
export default function StudentStatusSelector({
  studentExam,
  index,
}: IStudentStatusSelector) {
  const { studentsExams, setStudentsExams, setAssignedStudentsCount } =
    useContext(ProctorPortalExamContext);
  const [status, setStatus] = React.useState<string>(
    studentExam.student_status === null ? "" : studentExam.student_status
  );
  const { examId } = useParams<{ examId: string }>();
  const { setAlertState } = useAlert();

  const submitChange = (studentStatus: StudentStatusEnum) => {
    updateStudentExamApi(parseInt(examId!), studentExam.id, {
      student_status: studentStatus,
    }).catch(
      ({response: { data, statusText}}: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText || "Something went wrong",
          severity: "error",
        });
      }
    );
  };

  const handleChange = (event: any) => {
    let newStatus = event.target.value;
    setStatus(newStatus);
    let student = studentsExams[index];
    if (student.student_status === null) {
      setAssignedStudentsCount((prev) => prev + 1);
    }
    if (
      student.student_status === null ||
      student.student_status !== newStatus
    ) {
      let newStudentsExams = [...studentsExams];
      newStudentsExams[index].student_status = newStatus;
      setStudentsExams(newStudentsExams);
      submitChange(newStatus);
    }
  };

  const getColor = (status: string) => {
    return studentStatusEnumToColorMap[status as StudentStatusEnum];
  };
  return (
    <FormControl style={{ width: "200px" }} size="small">
      <InputLabel>Assign status</InputLabel>
      <Select
        label="Assign status"
        value={status}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Circle sx={{ fontSize: "12px", color: getColor(selected) }} />
            <Box>{selected.replace("_", " ")}</Box>
          </Box>
        )}
      >
        {Object.values(StudentStatusEnum).map((status) => (
          <MenuItem onClick={handleChange} value={status} key={status}>
            <ListItemIcon>
              <Circle sx={{ fontSize: "12px", color: getColor(status) }} />
            </ListItemIcon>
            <ListItemText> {status.replace("_", " ")}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
