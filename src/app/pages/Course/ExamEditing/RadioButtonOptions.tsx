import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { examContext } from "../ExamCreation/Models";
import { updateContext } from "./EditExam";

export default function RadioButtonOptions({ isAutomatic = false }) {
  const { examState, setExamState } = React.useContext(examContext);
  const { updateState, setUpdateState } = React.useContext(updateContext);
  return (
    <FormControl sx={{ width: "60%" }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={examState.has_models}
        onChange={(e) => {
          setExamState({
            ...examState,
            has_models: e.target.value === "true" ? true : false,
          });

          setUpdateState({
            ...updateState,
            models: true,
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
