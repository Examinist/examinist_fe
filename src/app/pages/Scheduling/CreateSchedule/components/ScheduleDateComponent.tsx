import { TableCell } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IExam } from "../../../../types/Exam";

export interface IScheduleView{
    review: boolean,
    exam: IExam,
}

export default function ScheduleDateComponent({review, exam}: IScheduleView){
    if(review){
        return(
            <TableCell  align="center">{exam.scheduled_date.toLocaleString("en-US",{
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}</TableCell>
        );
    }else{
        return(
            <TableCell style={{ width: "160px", }}
            align="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker slotProps={{ textField: { size: 'small' } }}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                fontSize: "13px"
                            }
                        }}></DatePicker>
                </LocalizationProvider>
            </TableCell>
        );
    }
}