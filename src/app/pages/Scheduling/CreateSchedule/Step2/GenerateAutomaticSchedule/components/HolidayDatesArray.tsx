import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import theme from "../../../../../../../assets/theme";
import { Box } from "@mui/material";
import { FieldArrayPath, useFieldArray, useFormContext } from "react-hook-form";
import { IFormInput } from "../Fields";
import { getDateStr } from "../../../../../../utilities/Date";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function HolidayDatesArray() {
  const { control, getValues } = useFormContext<IFormInput>();
  const { fields, remove } = useFieldArray<IFormInput>({
    control,
    name: "holidayDates" as FieldArrayPath<IFormInput>,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 1,
        mb: 3,
        border: 1,
        borderColor: theme.palette.gray.main,
        shadow: 0,
        borderRadius: 4,
        minHeight: 40,
      }}
      component="ul"
    >
      {fields.map((field, index) => {
        return (
          <ListItem key={field.id}>
            <Chip
              label={getDateStr(getValues().holidayDates[index])}
              onDelete={() => remove(index)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
