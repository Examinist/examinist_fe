import {
  TableCell,
  TableRow,
} from "@mui/material";
import { ILab } from "../../../types/Lab";
import { IExam } from "../../../types/Exam";
import ScheduleDatePicker from "./ScheduleDatePicker";
import ScheduleTimePicker from "./ScheduleTimePicker";
import ScheduleLabsSelector from "./ScheduleLabsSelector";
import { get, useFormContext } from "react-hook-form";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";

interface IScheduleEditRowProps {
  value: IExam;
  index: number;
  labs: ILab[];
}

export default function ScheduleEditRow({
  value,
  index,
  labs,
}: IScheduleEditRowProps) {
 const { watch} = useFormContext<IScheduleFormInput>();
 const watchDate = watch(`list.${index}.time`);


  const addDuration = () => {
    if(watchDate ){
       const copyDate = new Date(watchDate.toDate());
       var newDate = new Date(
         copyDate.setMinutes(copyDate.getMinutes() + value.duration, 0, 0)
       );
       return newDate.toLocaleString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
       });
    }
    return "--:--";
   
  };

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
      <TableCell style={{ width: "200px" }} align="center">
        <ScheduleDatePicker index={index}></ScheduleDatePicker>
      </TableCell>
      <TableCell style={{ width: "180px" }} align="center">
        <ScheduleTimePicker index={index}></ScheduleTimePicker>
      </TableCell>
      <TableCell align="center">{addDuration()}</TableCell>
      <TableCell align="center" style={{ width: "200px" }}>
        <ScheduleLabsSelector index={index} labs={labs}></ScheduleLabsSelector>
      </TableCell>
    </TableRow>
  );
}
