import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonOptions() {
  return (
    <FormControl sx={{width:'60%'}}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="single" control={<Radio />} label="Single" />
        <FormControlLabel value="multiple" control={<Radio />} label="Multiple (Shuffle Questions)" />
      </RadioGroup>
    </FormControl>
  );
}
