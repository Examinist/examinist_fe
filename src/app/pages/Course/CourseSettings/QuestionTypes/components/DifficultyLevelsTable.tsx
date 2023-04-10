import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import DifficultyLevelRow from "./DifficultyLevelRow";
import { auto } from "@popperjs/core";
import theme from "../../../../../../assets/theme";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IDifficultyLevelsTable {
  easy_weight: number;
  medium_weight: number;
  hard_weight: number;
  edited: boolean;
  id: number;
  onCancel: () => void;
  updateQuestionTypes: (id: number, data: IDifficultyLevelsFormInputs) => void;
}

export interface IDifficultyLevelsFormInputs {
  easy: number;
  medium: number;
  hard: number;
}

const schema = yup.object({
  easy: yup.number().required("Weight is required."),
  medium: yup.number().required("Weight is required."),
  hard: yup.number().required("Weight is required."),
});

export default function DifficultyLevelsTable({
  easy_weight,
  medium_weight,
  hard_weight,
  edited,
  id,
  onCancel,
  updateQuestionTypes,
}: IDifficultyLevelsTable) {
  const onSubmit: SubmitHandler<IDifficultyLevelsFormInputs> = (
    inputs: IDifficultyLevelsFormInputs
  ) => {
    // console.log(inputs);
    updateQuestionTypes(id, inputs);
    onCancel();
  };

  const methods = useForm<IDifficultyLevelsFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      easy: easy_weight,
      medium: medium_weight,
      hard: hard_weight,
    },
  });

  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer>
          <Table sx={{}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ mt: 0, pt: 0 }}>Level</TableCell>
                <TableCell align="left" sx={{ pt: 0 }}>
                  Weight
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <DifficultyLevelRow
                level={"Easy"}
                weight={easy_weight}
                edited={edited}
              ></DifficultyLevelRow>

              <DifficultyLevelRow
                level={"Medium"}
                weight={medium_weight}
                edited={edited}
              ></DifficultyLevelRow>

              <DifficultyLevelRow
                level={"Hard"}
                weight={hard_weight}
                edited={edited}
              ></DifficultyLevelRow>
            </TableBody>
          </Table>

          {edited && (
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button variant="text" sx={{ m: 1 }} type="submit">
                Save
              </Button>
              <Button
                variant="text"
                color="secondary"
                sx={{ m: 1 }}
                onClick={() => {
                  reset();
                  onCancel();
                }}
              >
                cancel
              </Button>
            </Box>
          )}
        </TableContainer>
      </form>
    </FormProvider>
  );
}
