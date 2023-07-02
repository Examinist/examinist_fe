import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import theme from "../../../../assets/theme";
import { mockProctors } from "../../../services/APIs/mockData/MockData";
import React from "react";
import { IBusyLab } from "../../../types/Lab";

export default function ProctorSelector({
  lab,
}: {
  lab: IBusyLab | undefined;
}) {
  const proctors = mockProctors;
  const [proctorId, setProctorId] = React.useState<string>("");

  const handleChange = (event: any) => {
    setProctorId(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        gap: 2,
      }}
    >
      <FormControl style={{ width: "70%" }} size="small">
        <InputLabel>Select Proctor</InputLabel>
        <Select label="Select Proctor" value={proctorId} onChange={handleChange}>
          {proctors.map((proctor) => (
            <MenuItem value={proctor.id} key={proctor.id}>
              {proctor.first_name + " " + proctor.last_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {(lab?.proctor?.id == parseInt(proctorId) || proctorId === '') ? (
        <></>
      ) : (
        <Button
          sx={{
            border: 1,
            borderRadius: "15px",
            textTransform: "none",
            backgroundColor: "#1B84BF",
            color: theme.palette.background.paper,
            px: 3
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
}
