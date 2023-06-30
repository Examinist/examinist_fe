import { TableCell, TableRow } from "@mui/material";
import { IExam } from "../../../../types/Exam";
import ScheduleDateComponent from "./ScheduleDateComponent";
import ScheduleTimeComponent from "./ScheduleTimeComponent";
import ScheduleLabComponent from "./ScheduleLabComponent";

interface IScheduleTableRow {
    value: IExam,
    review: boolean,
}

export default function ScheduleTableRow({ value, review }: IScheduleTableRow) {

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
            <ScheduleDateComponent review={review} exam={value}></ScheduleDateComponent>
            <ScheduleTimeComponent review={review} exam={value}></ScheduleTimeComponent>
            <TableCell align="center">{addDuration()}</TableCell>
            <ScheduleLabComponent review={review} exam={value}></ScheduleLabComponent>
        </TableRow >
    );
}