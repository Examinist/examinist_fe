import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "../../../../../assets/theme";
import React from "react";
import SchedulingTableRow from "./SchedulingTableRow";
import { IExam } from "../../../../types/Exam";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IScheduleTableProps{
    review: boolean,
    examList: IExam[],
}

export interface IScheduleFormInput{
  list: IExam[],
}

const schema = yup.object().shape({
  list: yup.array().of(
    yup.object().shape({
      scheduled_date: yup.date(),
      percent: yup.date(),
    })
  ),
});

export default function ScheduleTable({review, examList}: IScheduleTableProps){
    const header = ["ID", "Title", "Course", "Number of Students", "Duration", "Scheduled Date", "Start Time", "End Time", "Labs"];
    const [ exams, setExams ] = React.useState(examList);

    const methods = useForm<IScheduleFormInput>({
      defaultValues:{
        list: exams,
      },
      resolver: yupResolver(schema)
    })

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