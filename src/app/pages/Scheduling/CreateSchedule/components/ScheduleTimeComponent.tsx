import { TableCell } from "@mui/material";
import { IScheduleView } from "./ScheduleDateComponent";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ScheduleTimeComponent({review, exam}: IScheduleView){
    if(review){
        return(
            <TableCell  align="center">{exam.scheduled_date.toLocaleString("en-US",{
                hour:"2-digit",
                minute:"2-digit",
              })}</TableCell>
        );
    }else{
        return(
            <TableCell style={{ width: "160px" }}
            align="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker slotProps={{ textField: { size: 'small' } }}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                fontSize: "13px"
                            }
                        }}></TimePicker>
                </LocalizationProvider>
            </TableCell>
        );
    }
}