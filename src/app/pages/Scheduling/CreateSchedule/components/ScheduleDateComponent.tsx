import { TableCell } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IExam } from "../../../../types/Exam";
import React from "react";
import { Dayjs } from "dayjs";

export interface IScheduleView {
    review: boolean,
    exam: IExam,
}

export default function ScheduleDateComponent({ review, exam }: IScheduleView) {
    const [value, setValue] = React.useState<Date | null>(null);
    
    if (review) {
        return (
            <TableCell align="center">{exam.scheduled_date.toLocaleDateString()}</TableCell>
        );
    } else {
        return (
            <TableCell style={{ width: "160px", }}
                align="center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    slotProps={{ textField: { size: 'small' } }}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                fontSize: "13px"
                            }
                        }}
                        value={value}
                        onChange={(newValue) => {setValue(newValue)
                        console.log()}}></DatePicker>
                </LocalizationProvider>
            </TableCell>
        );
    }
}