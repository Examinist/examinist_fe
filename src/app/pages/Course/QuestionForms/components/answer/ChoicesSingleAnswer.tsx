import {
  Box,
  Button,
  IconButton,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { IFormInputs } from "../../Fields";
import { IChoice } from "../../../../../types/Question";

export default function ChoicesSingleAnswer() {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<IFormInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices_attributes",
    rules: { minLength: 2 },
  });

 const {  append: appendDeleted } = useFieldArray({
   control,
   name: "deleted_choices_attributes",
 });

  const [checked, setChecked] = React.useState<string>("");
  const handleDelete = (index: number) => {
    if (getValues(`choices_attributes.${index}`).id) {
      appendDeleted({id: getValues(`choices_attributes.${index}`).id!, _destroy: true})
    } 
     remove(index);
  };

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

      {fields
        .map((item, index) => (
          <div
            key={item.id}
            style={{
              marginBlock: "10px",
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <Radio
              value={item.id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (checked !== e.target.value) {
                  setValue(
                    `choices_attributes`,
                    getValues(`choices_attributes`)?.map((choice: IChoice) => {
                      return { ...choice, is_answer: false };
                    })
                  );
                  setValue(`choices_attributes.${index}.is_answer`, true);
                  setChecked(e.target.value);
                }
              }}
              checked={getValues(`choices_attributes.${index}.is_answer`)}
              sx={{ mr: 2 }}
            />
            <TextField
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
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </div>
        ))}
    </Box>
  );
}
