import React, { useEffect } from 'react';
import CustomDialog, { CustomDialogTitle } from './CustomDialog';
import { DialogContent, Typography, DialogActions, Button, TextField, Box, DialogContentText } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import DifficultyLevelsTable from './DifficultyLevelsTable';
import { IQuestionType } from '../../../../../types/Question';

interface IQuestionTypeFormDialogProps {
    open: boolean;
    onClose: () => void;
    initialValues: IQuestionType | null; 
    onUpdate: any;
}

export interface IQuestionTypeForm {
  name: string;
  easy: number;
  medium: number;
  hard: number;
}


const schema = yup.object({
  name: yup.string().required("name is required"),
  easy: yup.number().min(0).required("Weight is required."),
  medium: yup.number().min(0).required("Weight is required."),
  hard: yup.number().min(0).required("Weight is required."),
});

export default function QuestionTypeFormDialog({open, onClose, initialValues, onUpdate}: IQuestionTypeFormDialogProps) {
  console.log(initialValues);
  const isNew = initialValues === null;
    const onSubmit: SubmitHandler<IQuestionTypeForm> = (
      inputs: IQuestionTypeForm
    ) => {
     console.log(inputs);
     console.log(initialValues);
      const questionType: IQuestionType = {
        id: initialValues?.id || 0,
        name: inputs.name,
        easy_weight: inputs.easy,
        medium_weight: inputs.medium,
        hard_weight: inputs.hard,
        is_deletable: isNew? true : initialValues?.is_deletable,
    };
    onUpdate(questionType, isNew);
    handleClose();
    };


    const methods = useForm<IQuestionTypeForm>({
      resolver: yupResolver(schema),
      defaultValues:{
        name: initialValues?.name,
        easy: initialValues?.easy_weight,
        medium: initialValues?.medium_weight,
        hard: initialValues?.hard_weight,
      }
    });

    const {
      handleSubmit,
      register,
      reset,
      formState: { errors },
    } = methods;

    const handleClose = ()=>{
       reset();
      onClose();
    }


  return (
    <FormProvider {...methods}>
      <CustomDialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomDialogTitle onClose={handleClose}>
            <Box sx={{mx: 2, my: 1}}>
              {isNew ? "Add Question Type" : "Edit Question Type"}
            </Box>
          </CustomDialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
              autoComplete='off'
                variant="standard"
                sx={{ m: 3 }}
                label="Question Type"
                placeholder="Question Type"
                {...register("name")}
                error={errors.name?.message ? true : false}
                helperText={errors.name?.message}
              />

              <DialogContentText sx={{ mx: 2, mb: 3 }}>
                Set the difficulty level weights for this question type. Notice
                that this weight is used for the automatic exam generation
                algorithm as a measure of the question estimated solving time.
                <br />
                e.g. if you set the easy weight to 1, the question is estimated
                to take 1 minute.
              </DialogContentText>

              <DifficultyLevelsTable edited={true}></DifficultyLevelsTable>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Save changes</Button>
          </DialogActions>
        </form>
      </CustomDialog>
    </FormProvider>
  );
}
