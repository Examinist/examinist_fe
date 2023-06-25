import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "../../../../../assets/theme";
import React from "react";
import { ScheduleContext } from "../ScheduleContext";
import SchedulingTableRow from "./SchedulingTableRow";
import { IScheduleView } from "./ScheduleDateComponent";

interface IScheduleTableProps{
    review: boolean,
}

export default function ScheduleTable({review}: IScheduleTableProps){
    const header = ["ID", "Title", "Course", "Number of Students", "Duration", "Scheduled Date", "Start Time", "End Time", "Labs"];
    const { exams, setExams } = React.useContext(ScheduleContext);

    return(
        <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {header.map((value) =>
                    <TableCell
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
              {exams.map((value, index) =>
                <SchedulingTableRow value={value} review={review}></SchedulingTableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
    );
}