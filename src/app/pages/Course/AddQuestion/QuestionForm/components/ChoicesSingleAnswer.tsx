import {
  Box,
  Button,
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
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function ChoicesSingleAnswer() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
    rules: { minLength: 2 },
  });
  return (
    <Box>
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <Typography sx={{ fontSize: "18px", py: 1 }} color="#6B6767">
          Choices:
        </Typography>
        <Button
          onClick={() => append({ choice: "" })}
          variant="outlined"
          sx={{ ml: "auto", mr: 3, height: 1, borderRadius: 4 }}
          endIcon={<AddIcon />}
        >
          ADD
        </Button>
      </Box>

      <Controller
        name="correctAnswer.0"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <RadioGroup {...field}>
            {fields.map((item, index) => (
              <div
                key={item.id}
                style={{
                  marginBlock: "10px",
                  display: "flex",
                  paddingLeft: "10px",
                }}
              >
                <FormControlLabel value={index} control={<Radio />} label="" />
                <TextField
                  variant="standard"
                  {...register(`choices.${index}.choice`, {
                    required: "Choice is required",
                  })}
                  placeholder="Write Choice"
                  sx={{ mr: 2, width: "50%" }}
                  // error={
                  //   errors?.choices?.[index]?.choice?.message
                  // }
                  
                />
             
                  <IconButton onClick={() => remove(index)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                
              </div>
            ))}
          </RadioGroup>
        )}
      ></Controller>
    </Box>
  );
}
