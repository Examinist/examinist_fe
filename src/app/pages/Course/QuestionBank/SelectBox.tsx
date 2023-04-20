import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import theme from "../../../../assets/theme";

export interface ISelectBox {
  title: string;
  options: { name: string; value: string }[];
}

export default function SelectBox({ title, options }: ISelectBox) {
  const [option, setOption] = React.useState("");
  //add use state to save filters options
  
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 220, color: theme.palette.primary.main }}
      >
        <InputLabel
          sx={{ color: theme.palette.primary.main, position: "absolute" }}
          id="select"
        >
          {title}
        </InputLabel>
        <Select
          labelId="select"
          id="select"
          value={option}
          onChange={handleChange}
          label={title}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            ".MuiSvgIcon-root ": {
              fill: theme.palette.primary.main,
            },
            "&:hover": {
              "&& fieldset": {
                border: `1px solid ${theme.palette.primary.main}`,
              },
            },
          }}
        >
          {options.map((e) => (
            <MenuItem key={e.name} value={e.value}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
