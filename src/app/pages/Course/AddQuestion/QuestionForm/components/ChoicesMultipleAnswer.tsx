import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function ChoicesMultipleAnswer() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const [checked, setChecked] = React.useState<string[]>([]);
  return (
    <Box>
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
          Choices:
        </Typography>
        <Button
          onClick={() => append({ choice: "", checked: false })}
          variant="outlined"
          sx={{ ml: "auto", mr: 3, height: 1, borderRadius: 4 }}
          endIcon={<AddIcon />}
        >
          ADD
        </Button>
      </Box>

      {fields.map((item, index) => (
        <div
          key={item.id}
          style={{ marginBlock: "10px", display: "flex", marginBottom: "20px" }}
        >
          <Checkbox
            sx={{ mr: 2 }}
            checked={checked.includes(item.id)}
            onChange={() => {
              if (checked.includes(item.id)) {
                setChecked(checked.filter((num) => num !== item.id));
              } else {
                setChecked([...checked, item.id]);
              }
              setValue(
                `choices.${index}.checked`,
                !getValues(`choices.${index}.checked`)
              );
            }}
          />
          <TextField
            multiline
            variant="standard"
            {...register(`choices.${index}.choice`, {
              required: "Choice is required",
            })}
            placeholder="Write Choice"
            sx={{ mr: 2, width: "50%" }}
            error={errors.choices?.message ? true : false}
          />

          <IconButton onClick={() => remove(index)}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      ))}
    </Box>
  );
}
