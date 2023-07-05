import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { Controller, Field, FieldName, FieldPath, useFormContext } from "react-hook-form";
import { IFormInput } from "../Fields";
import dayjs from "dayjs";

interface IFromTimePickerProps {
  label?: string;
  name: keyof IFormInput ;
}
export default function FormTimePicker({ label, name }: IFromTimePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimePicker
         sx={{width: 'fit-content'}}
            label={label}
            {...field}
            
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
