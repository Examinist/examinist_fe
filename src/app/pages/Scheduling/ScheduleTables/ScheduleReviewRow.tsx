import { TableCell, TableRow } from "@mui/material"
import { IExam } from "../../../types/Exam"

interface IScheduleRowProps{
    value: IExam,
}

export default function ScheduleReviewRow({value}:IScheduleRowProps){
    const addDuration = () => {
        const copyDate = new Date(value.scheduled_date)
        var newDate = new Date(copyDate.setMinutes(copyDate.getMinutes()+60,0,0))
        return newDate.toLocaleTimeString()
    }

    var labs: string = "";
        value.busy_labs?.forEach((value) => labs.concat(value.name));

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{value.id}</TableCell>
            <TableCell align="center">{value.title}</TableCell>
            <TableCell align="center">{value.course.title+" - "+value.course.code}</TableCell>
            <TableCell align="center">{value.number_of_students == undefined ? 0 : value.number_of_students}</TableCell>
            <TableCell align="center">{value.duration}</TableCell>
            <TableCell align="center">{value.scheduled_date.toLocaleDateString()}</TableCell>
            <TableCell  align="center">{value.scheduled_date.toLocaleTimeString()}</TableCell>
            <TableCell align="center">{addDuration()}</TableCell>
            <TableCell  align="center">{labs}</TableCell>
        </TableRow>
    );
}