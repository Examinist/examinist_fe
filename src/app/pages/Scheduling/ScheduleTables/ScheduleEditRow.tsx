import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TableCell, TableRow } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { mockLabs } from "../../../services/APIs/mockData/MockData";
import { ILab } from "../../../types/Lab";
import { IExam } from "../../../types/Exam";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTimePicker from "./ScheduleTimePicker";
import ScheduleLabsSelector from "./ScheduleLabsSelector";

interface IScheduleEditRowProps{
    value: IExam,
    index: number,
}

export default function ScheduleEditRow({value, index}:IScheduleEditRowProps){
        const addDuration = () => {
            const copyDate = new Date(value.scheduled_date)
            var newDate = new Date(copyDate.setMinutes(copyDate.getMinutes()+60,0,0))
            return newDate.toLocaleTimeString()
        }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{value.id}</TableCell>
            <TableCell align="center">{value.title}</TableCell>
            <TableCell align="center">{value.course.code}</TableCell>
            <TableCell align="center">{value.number_of_students == undefined ? 0 : value.number_of_students}</TableCell>
            <TableCell align="center">{value.duration}</TableCell>
            <TableCell style={{ width: "160px", }}
                align="center">
                <ScheduleDatePicker index={index}></ScheduleDatePicker>
            </TableCell>
            <TableCell style={{ width: "160px" }}
            align="center">
                <ScheduleTimePicker index={index}></ScheduleTimePicker>
            </TableCell>
            <TableCell align="center">{addDuration()}</TableCell>
            <TableCell  align="center">
                <ScheduleLabsSelector index={index}></ScheduleLabsSelector>
            </TableCell>
        </TableRow>
    );
}