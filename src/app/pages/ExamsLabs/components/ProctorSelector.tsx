import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import theme from "../../../../assets/theme";
import { mockProctors } from "../../../services/APIs/mockData/MockData";
import React from "react";
import { IStaff } from "../../../types/User";
import { IExam } from "../../../types/Exam";
import { IDetailedBusyLab } from "../../../types/Lab";

export default function ProctorSelector({ lab }: { lab: IDetailedBusyLab | undefined }) {
    const proctors = mockProctors
    const [proctor, setProctor] = React.useState<number | null>(null)

    const handleChange = (event: any) => {
        setProctor(event.target.value)
    }

    return (
        <Box display="flex" flexDirection="row"
            sx={{
                gap: 2,
            }}>
            <FormControl style={{ width: "70%" }} size='small' >
                <InputLabel>Select Proctor</InputLabel>
                <Select
                    label="Select Proctor"
                    value={proctor}
                    onChange={handleChange}>
                    {proctors.map((value) =>
                        <MenuItem value={value.id}>{value.first_name + " " + value.last_name}</MenuItem>)}
                </Select>
            </FormControl>
            {lab?.proctor?.id == proctor ? <></> :
                <Button
                    sx={{
                        border: 1,
                        borderRadius: "15px",
                        textTransform: 'none',
                        backgroundColor: "#1B84BF",
                        color: theme.palette.background.paper,
                    }}>Save</Button>
            }
        </Box>
    )
}