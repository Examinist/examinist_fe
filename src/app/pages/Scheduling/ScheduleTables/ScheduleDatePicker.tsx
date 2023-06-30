import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";
import { Controller, useFormContext } from "react-hook-form";

export interface ISchedulePickerProps {
    index: number,
}

export default function ScheduleDatePicker({ index }: ISchedulePickerProps) {
    const { control, formState: { errors } } = useFormContext<IScheduleFormInput>();

    return (
        <Controller
            name={`list.${index}.date`}
            control={control}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        {...field}
                        slotProps={{
                            textField: {
                                size: 'small',
                                error: errors.list?.[index]?.date ? true : false,
                                helperText: errors.list?.[index]?.date?.message,
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-input": {
                                fontSize: "13px"
                            }
                        }}
                    ></DesktopDatePicker>
                </LocalizationProvider>
            )}
        />
    );
}