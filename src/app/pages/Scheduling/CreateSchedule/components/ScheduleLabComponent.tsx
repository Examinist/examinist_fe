import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TableCell } from "@mui/material";
import { IScheduleView } from "./ScheduleDateComponent";
import React from "react";
import { ILab } from "../../../../types/Lab";
import { mockLabs } from "../../../../services/APIs/mockData/MockData";

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

export default function ScheduleLabComponent({ review, exam }: IScheduleView) {

    if (review) {
        var labs: string = "";
        exam.busy_labs?.forEach((value) => labs.concat(value.name));
        return (
            <TableCell  align="center">{labs}</TableCell>
        );
    } else {
        const [labs, chooseLabs] = React.useState<ILab[]>([]);
        const handleChoose = (event: SelectChangeEvent<typeof labs>) => {
            const {
                target: { value },
            } = event;
            // chooseLabs(
            // On autofill we get a stringified value.
            //    typeof value === 'string' ? value.split(',') : value,
            //);
        };
        return (
            <TableCell  align="center">
                <FormControl size="small">
                    <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: "13px" }}>Select lab</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        multiple
                        value={labs}
                        onChange={handleChoose}
                        input={<OutlinedInput label="Select Lab" />}
                        //renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        sx={{ width: "120px" }}
                    >
                        {mockLabs.map((name, index) => (
                            <MenuItem key={name.id} value={name.id}>
                                <Checkbox checked={labs.indexOf(name) > -1} />
                                <ListItemText primary={name.name} primaryTypographyProps={{ fontSize: "14px", fontWeight: "medium" }} />
                                <ListItemText primary={"Capacity: " + name.capacity} primaryTypographyProps={{ fontSize: "14px", fontWeight: "semi-bold" }} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
        );
    }
}