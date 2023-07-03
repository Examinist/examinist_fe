import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { ProctorPortalExamContext } from "../ProctorPortalExamContext";
import theme from "../../../../../assets/theme";
import StudentStatusSelector from "./StudentStatusSelector";

const fontSize = "1.1rem";
export default function StudentsTable() {
  const { studentsExams } = useContext(ProctorPortalExamContext);
  return (
    <TableContainer
      sx={{
        backgroundColor: theme.palette.white.main,
        py: 2,
        px: 2,
        borderRadius: 4,
        overflowY: "auto",
      }}
    >
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ mt: 0, pt: 0, fontSize: fontSize }}>
              Name
            </TableCell>
            <TableCell align="left" sx={{ pt: 0, fontSize: fontSize }}>
              username
            </TableCell>
            <TableCell align="left" sx={{ pt: 0, fontSize: fontSize }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsExams.length > 0 &&
            studentsExams.map((studentExam, index) => (
              <TableRow
                key={studentExam.student.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="left"
                  sx={{ fontSize: fontSize, width: "30%" }}
                >
                  {`${studentExam.student.first_name} ${studentExam.student.last_name}`}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: fontSize, width: "20%" }}
                >
                  {studentExam.student.username}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ fontSize: fontSize, width: "30%" }}
                >
                  <StudentStatusSelector
                    studentExam={studentExam}
                    index={index}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {studentsExams.length === 0 && (
        <Box sx={{ py: 3 }}>No students to show.</Box>
      )}
    </TableContainer>
  );
}
