import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { IFormInput } from "../Fields";

interface ICustomDatePickerProps {
  label: string;
  name: keyof IFormInput;
}
export default function FormDatePicker({
  label,
  name,
}: ICustomDatePickerProps) {
  const { control, formState: {errors} } = useFormContext<IFormInput>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={label}
            {...field}
            minDate={dayjs(Date.now())}
            format="dddd, DD/MM/YYYY "
            slotProps={{
              textField: {
                error: errors[name] ? true : false,
                helperText: errors[name]?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
