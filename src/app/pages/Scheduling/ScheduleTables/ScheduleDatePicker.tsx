import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

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
              format="ddd, DD/MM/YYYY"
              minDate={dayjs(Date.now())}
              {...field}
              slotProps={{
                textField: {
                  size: "small",
                  error: errors.list?.[index]?.date ? true : false,
                  helperText: errors.list?.[index]?.date?.message,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "13px",
                },
              }}
            ></DesktopDatePicker>
          </LocalizationProvider>
        )}
      />
    );
}