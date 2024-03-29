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
import { ILab } from "../../../../../../types/Lab";

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

export default function LabsDropDown({ labs }: { labs: ILab[] }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<IFormInput>();
  return (
    <Controller
      name="labs_ids"
      control={control}
      render={({ field }) => (
        <FormControl sx={{ mt: 1, width: "100%" }}>
          <InputLabel>Labs</InputLabel>
          <Select
            multiple
            {...field}
            sx={{ borderRadius: 4 }}
            input={<OutlinedInput label="Labs" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((s) => (
                  <Chip
                    key={s}
                    label={labs.find((lab) => lab.id === s)?.name}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            error={errors.labs_ids ? true : false}
          >
            {labs.map((lab) => (
              <MenuItem key={lab.id!} value={lab.id!} divider>
                <Checkbox checked={field.value.includes(lab.id!)} />
                <ListItemText
                  primary={lab.name}
                  secondary={`Capacity: ${lab.capacity}`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
