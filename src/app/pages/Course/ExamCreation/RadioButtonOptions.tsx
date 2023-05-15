import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ManualExamContext } from "./ManualExam";

export default function RadioButtonOptions() {
  const { examState, setExamState } = React.useContext(ManualExamContext);

  return (
    <FormControl sx={{ width: "60%" }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={examState.is_multiple_models}
        onChange={(e) => {
          setExamState({
            ...examState,
            is_multiple_models: e.target.value === "true" ? true : false,
          });
        }}
      >
        <FormControlLabel value={false} control={<Radio />} label="Single" />
        <FormControlLabel
          value={true}
          control={<Radio />}
          label="Multiple (Shuffle Questions)"
        />
      </RadioGroup>
    </FormControl>
  );
}
