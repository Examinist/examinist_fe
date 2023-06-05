import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ManualExamContext } from "./ManualExam";
import { AutomaticExamContext } from "./AutomaticExam";

export default function RadioButtonOptions({ isAutomatic = false }) {
  const { examState, setExamState } = React.useContext(ManualExamContext);
  const { automaticExamState, setAutomaticExamState } =
    React.useContext(AutomaticExamContext);

  return (
    <FormControl sx={{ width: "60%" }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={(isAutomatic ? automaticExamState : examState).has_models}
        onChange={(e) => {
          isAutomatic
            ? setAutomaticExamState({
                ...automaticExamState,
                has_models: e.target.value === "true" ? true : false,
              })
            : setExamState({
                ...examState,
                has_models: e.target.value === "true" ? true : false,
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
