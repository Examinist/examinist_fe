import React, { useContext } from "react";
import { IStudentExam, StudentStatusEnum, studentStatusEnumToColorMap } from "../../../../types/StudentExam";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
} from "@mui/material";
import { ProctorPortalExamContext } from "../ProctorPortalExamContext";
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";

interface IStudentStatusSelector {
  studentExam: IStudentExam;
  index: number;
}
export default function StudentStatusSelector({
  studentExam,
  index,
}: IStudentStatusSelector) {
  const {
    studentsExams,
    setStudentsExams,
    changedStudentsIds,
    setChangedStudentsIds,
    setAssignedStudentsCount,
  } = useContext(ProctorPortalExamContext);
  const [status, setStatus] = React.useState<string>(
    studentExam.student_status === null ? "" : studentExam.student_status
  );

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
      let newSet = new Set(changedStudentsIds);
      newSet.add(studentExam.id);
      setChangedStudentsIds(newSet);
      let newStudentsExams = [...studentsExams];
      newStudentsExams[index].student_status = newStatus;
      setStudentsExams(newStudentsExams);
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
            <Box>{selected.replace('_', " ")}</Box>
          </Box>
        )}
      >
        {Object.values(StudentStatusEnum).map((status) => (
          <MenuItem onClick={handleChange} value={status}>
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
