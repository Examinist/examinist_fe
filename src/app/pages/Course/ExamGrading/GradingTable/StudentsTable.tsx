import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import StudentRow from "./StudentRow";
import React, { useEffect } from "react";
import { setGradeTableContext } from "../Models";

interface IExamTableProp {
  tableHeader: string[];
  handleChangePage: (event: unknown, newPage: number) => void;
}

export default function StudentsTable({
  tableHeader,
  handleChangePage,
}: IExamTableProp) {
  const { gradeTableState, setGradeTableState } =
    React.useContext(setGradeTableContext);

  useEffect(() => {
    console.log("students", gradeTableState.studentsExams);
  }, [gradeTableState.studentsExams]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader.map((value, index) => (
                <TableCell
                  key={value}
                  sx={{
                    fontWeight: "bold",
                    color: "#6B6767",
                    fontSize: "1.1rem",
                  }}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gradeTableState.studentsExams?.map((student, index) => {
              return (
                <StudentRow key={student.id} student={student}></StudentRow>
              );
            })}
          </TableBody>
        </Table>
        {gradeTableState.studentsExams?.length == 0 && (
          <Box sx={{ p: 4, fontSize: "18wpx" }}>No exams to show</Box>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[gradeTableState.studentsExams?.length ?? 1]}
        component="div"
        count={gradeTableState.count ?? 1}
        rowsPerPage={gradeTableState.studentsExams?.length ?? 1}
        page={gradeTableState.pageNumber ?? 0}
        onPageChange={handleChangePage}
        labelDisplayedRows={({ from, to, count }) =>
          `page ${(gradeTableState?.pageNumber ?? 0) + 1} out of ${
            gradeTableState.totalPages
          } pages`
        }
      />
    </Paper>
  );
}
