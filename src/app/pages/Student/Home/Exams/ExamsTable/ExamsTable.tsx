import {
  Box,
  Divider,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  addTime,
  getDateStr,
  getFullDateStr,
  getTimeStr,
} from "../../../../../utilities/Date";
import { IStudentPortalStudentExam } from "../../../../../types/StudentPortalStudentExam";

const cols = [
  "Title",
  "Course",
  "Scheduled Date",
  "Duration (mins)",
  "Start Time",
  "End Time",
  "Lab",
];

const row = (exam: IStudentPortalStudentExam) => [
  exam.title,
  exam.course.title + " - " + exam.course.code.toUpperCase(),
  getDateStr(exam.scheduled_date),
  exam.duration,
  getTimeStr(exam.scheduled_date),
  getTimeStr(addTime(exam.scheduled_date, exam.duration)),
  exam.busy_lab.name,
];
const fontSize = "16px";

const colsWithGrade = [
  "Title",
  "Course",
  "Scheduled Date",
  "Duration",
  "Grade",
];

const rowWithGrade = (exam: IStudentPortalStudentExam) => [
  exam.title,
  exam.course.title + " - " + exam.course.code.toUpperCase(),
  getFullDateStr(exam.scheduled_date),
  exam.duration,
  exam.grade ? exam.grade + "/" + exam.total_score : "NA",
];

interface IExamsTableProps {
  exams: IStudentPortalStudentExam[];
  onChangePage: (newPage: number) => void;
  pagesCount: number;
  isWithGrade: boolean;
}

export default function ExamsTable({
  exams,
  onChangePage,
  pagesCount,
  isWithGrade,
}: IExamsTableProps) {
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onChangePage(value);
  };

  const [tableState, setTableState] = React.useState({ cols: cols, row: row });

  React.useEffect(() => {
    if (isWithGrade) {
      setTableState({ cols: colsWithGrade, row: rowWithGrade });
    } else {
      setTableState({ cols: cols, row: row });
    }
  }, [isWithGrade]);

  return (
    <TableContainer component={Paper} sx={{ px: 2, py: 1, shadow: 0 }}>
      {exams.length === 0 && (
        <Box sx={{ m: 2, fontSize: { fontSize } }}> No Exams to Show.</Box>
      )}
      {exams.length !== 0 && (
        <>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontSize: 100 }}>
                <TableCell sx={{ fontSize: { fontSize } }}>ID</TableCell>
                {tableState.cols.map((col) => (
                  <TableCell
                    key={col}
                    align="right"
                    sx={{ fontSize: { fontSize } }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow
                  key={exam.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: { fontSize } }}
                  >
                    {exam.id}
                  </TableCell>
                  {tableState.row(exam).map((value) => (
                    <TableCell
                      key={value}
                      align="right"
                      sx={{ fontSize: { fontSize } }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Pagination count={pagesCount} onChange={handleChangePage} />
          </Box>
        </>
      )}
    </TableContainer>
  );
}
