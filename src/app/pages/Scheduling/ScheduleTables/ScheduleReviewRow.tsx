import { TableCell, TableRow } from "@mui/material";
import { IExam } from "../../../types/Exam";
import { getDateStr, getTimeStr } from "../../../utilities/Date";

interface IScheduleRowProps {
  value: IExam;
}

export default function ScheduleReviewRow({ value }: IScheduleRowProps) {
  const addDuration = () => {
    const copyDate = new Date(value.scheduled_date);
    var newDate = new Date(
      copyDate.setMinutes(copyDate.getMinutes() + value.duration, 0, 0)
    );
    return getTimeStr(newDate);
  };

  var labs: string =
    value.busy_labs?.map((value) => value.name).join(", ") || "";

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{value.id}</TableCell>
      <TableCell align="center">{value.title}</TableCell>
      <TableCell align="center" style={{ width: "160px" }}>
        {value.course.title + " - " + value.course.code}
      </TableCell>
      <TableCell align="center" style={{ width: "100px" }}>
        {value.number_of_students == undefined ? 0 : value.number_of_students}
      </TableCell>
      <TableCell align="center">{value.duration}</TableCell>
      <TableCell align="center">{getDateStr(value.scheduled_date)}</TableCell>
      <TableCell align="center">{getTimeStr(value.scheduled_date)}</TableCell>
      <TableCell align="center">{addDuration()}</TableCell>
      <TableCell align="center">{labs}</TableCell>
    </TableRow>
  );
}
