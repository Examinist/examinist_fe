import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { IExam } from "../../../../../types/Exam";
import {
  addTime,
  getDateStr,
  getTimeStr,
  timeOptions,
} from "../../../../../utilities/Date";

const cols = [
  "Title",
  "Course",
  "Duration (mins)",
  "Scheduled Date",
  "Start Time",
  "End Time",
  "Lab",
];

const row = (exam: IExam) => [
  exam.title,
  exam.course.title + " - " + exam.course.code.toUpperCase(),
  exam.duration,
  getDateStr(exam.scheduled_date),
  getTimeStr(exam.scheduled_date),
  getTimeStr(addTime(exam.scheduled_date, exam.duration)),
  "Lab A",
];
const fontSize = "16px";
export default function ExamsTable({ exams }: { exams: IExam[] }) {
  var d = new Date();
  var n = d.getTimezoneOffset();
  var today = new Date();
  if (today.isDstObserved()) {
    console.log("Daylight saving time!");
  } else {
    console.log("No daylight saving time!");
  }
  return (
    <TableContainer component={Paper} sx={{ px: 2, py: 1, borderRadius: 3 }}>
      {exams.length === 0 && (
        <Box sx={{ m: 2, fontSize: { fontSize } }}> No Exams to Show.</Box>
      )}
      {exams.length !== 0 && (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ fontSize: 100 }}>
              <TableCell sx={{ fontSize: { fontSize } }}>ID</TableCell>
              {cols.map((col) => (
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
                {row(exam).map((value) => (
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
      )}
    </TableContainer>
  );
}
