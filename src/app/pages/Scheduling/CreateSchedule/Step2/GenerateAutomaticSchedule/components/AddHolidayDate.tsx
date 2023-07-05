import { Box, Button, Chip, ListItem, Stack } from "@mui/material";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FieldArrayPath, useFieldArray, useFormContext } from "react-hook-form";
import { IFormInput } from "../Fields";
import theme from "../../../../../../../assets/theme";
import { getDateStr } from "../../../../../../utilities/Date";

export default function AddHolidayDate() {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { control, getValues } = useFormContext<IFormInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "holiday_dates" as FieldArrayPath<IFormInput>,
  });

  const handleAdd = () => {
    console.log(dayjs(value).toDate());
    if (
      !getValues()
        .holiday_dates.map((date) => getDateStr(date))
        .includes(getDateStr(dayjs(value).toDate()))
    ) {
      append(dayjs(value).toDate());
    }
    setValue(null);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: 10,
          my: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={dayjs(Date.now())}
            format="dddd, DD/MM/YYYY"
            label="Holiday Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <Button
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, py: 1, px: 3 }}
          onClick={handleAdd}
        >
          + Add
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 1,
          mb: 3,
          border: 1,
          borderColor: theme.palette.gray.main,
          shadow: 0,
          borderRadius: 4,
          minHeight: 40,
          gap: 0.5,
        }}
        component="ul"
      >
        {fields.map((field, index) => {
          return (
            <Chip
              key={field.id}
              label={getDateStr(getValues().holiday_dates[index])}
              onDelete={() => remove(index)}
            />
          );
        })}
        {fields.length === 0 && (
          <Box sx={{ fontWeight: 250, px: 1 }}>No holiday dates added.</Box>
        )}
      </Box>
    </Box>
  );
}
