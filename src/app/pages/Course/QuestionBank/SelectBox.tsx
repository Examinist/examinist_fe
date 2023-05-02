import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import theme from "../../../../assets/theme";
import { set } from "react-hook-form";

export interface IOption {
  name: string;
  value: any;
}
export interface ISelectBox {
  title: string;
  options: IOption[];
  onChange: (value: any) => void;
  onCancel: () => void;
}

export default function SelectBox({
  title,
  options,
  onChange,
  onCancel,
}: ISelectBox) {
  const [option, setOption] = React.useState("");
  //add use state to save filters options

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "All") {
      setOption(event.target.value);
      onCancel();
    } else {
      setOption(event.target.value);
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <FormControl
        sx={{ mb: 2, width: '100%', color: theme.palette.primary.main,  }}
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
            borderRadius: 3,
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
          <MenuItem value="All">All</MenuItem>

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
