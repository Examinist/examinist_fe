import { Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TableCell, TableRow } from "@mui/material";
import { IExam } from "../../../../types/Exam";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { ILab } from "../../../../types/Lab";
import { mockLabs } from "../../../../services/APIs/mockData/MockData";
import ScheduleDateComponent from "./ScheduleDateComponent";
import ScheduleTimeComponent from "./ScheduleTimeComponent";
import ScheduleLabComponent from "./ScheduleLabComponent";

interface IScheduleTableRow {
    value: IExam,
    review: boolean,
}

export default function ScheduleTableRow({ value, review }: IScheduleTableRow) {

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{value.id}</TableCell>
            <TableCell align="center">{value.title}</TableCell>
            <TableCell align="center">{value.course.code}</TableCell>
            <TableCell align="center">{value.number_of_students == undefined ? 0 : value.number_of_students}</TableCell>
            <TableCell align="center">{value.duration}</TableCell>
            <ScheduleDateComponent review={review} exam={value}></ScheduleDateComponent>
            <ScheduleTimeComponent review={review} exam={value}></ScheduleTimeComponent>
            <TableCell align="center">{value.duration}</TableCell>
            <ScheduleLabComponent review={review} exam={value}></ScheduleLabComponent>
        </TableRow >
    );
}