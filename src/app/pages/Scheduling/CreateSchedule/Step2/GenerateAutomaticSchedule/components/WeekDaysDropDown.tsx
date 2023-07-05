import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { IFormInput } from "../Fields";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, ListItemText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function WeekDaysDropDown() {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormInput>();

  return (
    <Controller
      name="exam_week_days"
      control={control}
      render={({ field }) => (
        <FormControl sx={{ mt: 1, width: "100%" }}>
          <InputLabel>Week Days</InputLabel>
          <Select
            multiple
            {...field}
            sx={{ borderRadius: 4 }}
            input={<OutlinedInput label="Week Days" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            error={errors.exam_week_days ? true : false}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={field.value.includes(day)} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
