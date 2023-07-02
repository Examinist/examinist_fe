import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  IScheduleFormInput,
  mapToScheduleForm,
  schema,
} from "../CreateSchedule/Step2/Fields";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  DialogContent,
  Box,
  Button,
  TextField,
  DialogActions,
} from "@mui/material";
import theme from "../../../../assets/theme";
import {
  CustomDialogTitle,
} from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import ScheduleEditTable from "../ScheduleTables/ScheduleEditTable";
import { IDetailedSchedule } from "../../../types/Schedule";

interface IEditScheduleDialogProps {
  schedule: IDetailedSchedule;
  onClose: () => void;
  onCancel: () => void;
}
export default function EditScheduleDialog({
  schedule,
  onClose,
  onCancel,
}: IEditScheduleDialogProps) {
  const methods = useForm<IScheduleFormInput>({
    defaultValues: {
      list: mapToScheduleForm(schedule.exams),
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;
  const onSubmit = (input: IScheduleFormInput) => {
    console.log(input);
  };

  return (
    <>
      <CustomDialogTitle onClose={onClose}>
        <Typography fontSize="24px" fontWeight="medium" sx={{ px: 2 }}>
          Edit Schedule
        </Typography>
      </CustomDialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <TextField
              label="Schedule's  Title"
              value={schedule.title}
              variant="outlined"
              sx={{  mx: 2 , mb: 4, mt: 1, width: '90%'}}
            ></TextField>
            <ScheduleEditTable examList={schedule.exams}></ScheduleEditTable>
          </FormProvider>
        </form>
      </DialogContent>

      <DialogActions sx={{ py: 5 }}>
        <Button
          sx={{
            backgroundColor: theme.palette.white.main,
            border: 1,
            alignSelf: "center",
            borderRadius: "10px",
            px: 4,
            fontWeight: "600",
            mr: 1
          }}
            onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            alignSelf: "center",
            borderRadius: "10px",
            px: 2,
            fontWeight: "600",
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </>
  );
}
