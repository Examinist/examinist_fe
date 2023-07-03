import React from "react";
import { IExam } from "../../../types/Exam";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "../../../../assets/theme";
import ScheduleReviewRow from "./ScheduleReviewRow";

export interface IScheduleTableProps {
    examList: IExam[],
  }

export default function ScheduleReviewTable({examList}:IScheduleTableProps){
  const header = ["ID", "Title", "Course", "No. of Students", "Duration", "Scheduled Date", "Start Time", "End Time", "Labs"];
  const [exams, setExams] = React.useState(examList);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((value) =>
              <TableCell
              key={value}
                align="center"
                sx={{
                  color: theme.palette.gray.dark,
                  fontWeight: "medium"
                }}
              >{value}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {exams.map((value) =>
            <ScheduleReviewRow
            key={value.id}
            value={value}></ScheduleReviewRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}