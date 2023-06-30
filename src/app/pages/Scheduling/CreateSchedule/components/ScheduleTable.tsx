import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "../../../../../assets/theme";
import React from "react";
import SchedulingTableRow from "./SchedulingTableRow";
import { IExam } from "../../../../types/Exam";
import * as yup from "yup";
import { IExamInputs } from "../Step2/Fields";

interface IScheduleTableProps{
    review: boolean,
    examList: IExam[],
}

export const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      scheduled_date: yup.date(),
      percent: yup.date(),
    })
  ),
});

const mapExamToFormInput=(items: IExam[])=>{
    var newList:IExamInputs[] = []
    items.forEach((value)=>{
      const item:IExamInputs={date:value.scheduled_date,time:value.scheduled_date,labs:value.busy_labs}
      newList.concat(item)
    })
    return newList;
}

export default function ScheduleTable({review, examList}: IScheduleTableProps){
    const header = ["ID", "Title", "Course", "Number of Students", "Duration", "Scheduled Date", "Start Time", "End Time", "Labs"];
    const [ exams, setExams ] = React.useState(examList);

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