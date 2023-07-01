import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { ILab } from "../../../types/Lab";
import { mockLabs } from "../../../services/APIs/mockData/MockData";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";
import { Controller, useFormContext } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "220px",
        },
    },
};

export default function ScheduleLabsSelector({ index }: { index: number }) {
    const {
        control,
        formState: { errors },
    } = useFormContext<IScheduleFormInput>();

    return (
        <Controller
            name={`list.${index}.labs`}
            control={control}
            render={({ field }) => (
                <FormControl size="small">
                    <InputLabel sx={{ fontSize: "13px" }}>Select lab</InputLabel>
                    <Select
                        multiple
                        {...field}
                        input={<OutlinedInput label="Select Lab" />}
                        renderValue={(selected) => selected.map((ind) => mockLabs.find((val) => val.id == ind)?.name).join(", ")}
                        MenuProps={MenuProps}
                        sx={{
                            width: "120px",
                            fontSize: "13px"
                        }}
                    >
                        {mockLabs.map((lab) => (
                            <MenuItem key={lab.id} value={lab.id}>
                                <ListItemText primary={lab.name} primaryTypographyProps={{ fontSize: "14px", fontWeight: "medium" }}
                                    secondary={"Capacity: " + lab.capacity} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
}