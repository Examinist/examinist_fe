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
import React, { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IFormInputs } from "../Fields";

export default function ChoicesMultipleAnswer() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<IFormInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices_attributes",
  });

  const [checked, setChecked] = React.useState<string[]>([]);
  return (
    <Box>
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
          Choices:
        </Typography>
        <Button
          onClick={() => append({ choice: "", is_answer: false })}
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
            checked={getValues(`choices_attributes.${index}.is_answer`)}
            onChange={() => {
              if (checked.includes(item.id)) {
                setChecked(checked.filter((num) => num !== item.id));
              } else {
                setChecked([...checked, item.id]);
              }
              setValue(
                `choices_attributes.${index}.is_answer`,
                !getValues(`choices_attributes.${index}.is_answer`)
              );
            }}
          />
          <TextField
            multiline
            variant="standard"
            {...register(`choices_attributes.${index}.choice`, {
              required: "Choice is required",
            })}
            placeholder="Write Choice"
            sx={{ mr: 2, width: "50%" }}
            error={errors.choices_attributes?.[index] ? true : false}
            helperText={errors.choices_attributes?.[index]?.choice?.message}
          />

          {fields.length > 2 && (
            <IconButton onClick={() => remove(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          )}
        </div>
      ))}
    </Box>
  );
}
