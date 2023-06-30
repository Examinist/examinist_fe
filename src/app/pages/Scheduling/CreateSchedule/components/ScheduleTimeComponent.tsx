import { TableCell } from "@mui/material";
import { IScheduleView } from "./ScheduleDateComponent";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export default function ScheduleTimeComponent({review, exam}: IScheduleView){
    const [value,setValue] = React.useState<Date|null>(null)

    if(review){
        return(
            <TableCell  align="center">{exam.scheduled_date.toLocaleTimeString()}</TableCell>
        );
    }else{
        return(
            <TableCell style={{ width: "160px" }}
            align="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker 
                    value={value}
                    onChange={(newValue)=>setValue(newValue)}
                    slotProps={{ textField: { size: 'small' } }}
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