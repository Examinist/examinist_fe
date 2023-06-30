import { DesktopTimePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";
import { ISchedulePickerProps } from "./ScheduleDatePicker";

export default function ScheduleTimePicker({index}:ISchedulePickerProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext<IScheduleFormInput>();

    return (
        <Controller
            name={`list.${index}.time`}
            control={control}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopTimePicker
                        {...field}
                        slotProps={{ textField: { size: 'small',
                        error: errors.list?.[index]?.time ? true : false,
                        helperText: errors.list?.[index]?.time?.message, } }}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                fontSize: "13px"
                            }
                        }}></DesktopTimePicker>
                </LocalizationProvider>
            )}
        />
    );
}