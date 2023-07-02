import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Typography,
  DialogContent,
  Box,
  Button,
  TextField,
  DialogActions,
} from "@mui/material";
import theme from "../../../../../assets/theme";
import { CustomDialogTitle } from "../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import ScheduleEditTable from "../../ScheduleTables/ScheduleEditTable";
import { IDetailedSchedule } from "../../../../types/Schedule";
import { IEditScheduleFormInput, getSchedulePayload, schema } from "./Fields";
import { mapToScheduleForm } from "../../CreateSchedule/Step2/Fields";
import { IScheduleResponse, IUpdateSchedulePayload, updateScheduleApi } from "../../../../services/APIs/ScheduleAPIs";
import {
  ILabsListResponse,
  getLabsListApi,
} from "../../../../services/APIs/LabsAPIs";
import { ILab } from "../../../../types/Lab";
import useAlert from "../../../../hooks/useAlert";
import CustomCircularProgress from "../../../../components/CustomCircularProgress";
import { IErrorResponse } from "../../../../services/Response";

interface IEditScheduleDialogProps {
  schedule: IDetailedSchedule;
  onClose: () => void;
  onCancel: () => void;
  onUpdate: (schedulePayload: IDetailedSchedule) => void;
}
export default function EditScheduleDialog({
  schedule,
  onClose,
  onCancel,
  onUpdate,
}: IEditScheduleDialogProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [labs, setLabs] = React.useState<ILab[]>([]);
  const { setAlertState } = useAlert();

  const methods = useForm<IEditScheduleFormInput>({
    defaultValues: {
      title: schedule.title,
      list: mapToScheduleForm(schedule.exams),
    },
    resolver: yupResolver(schema),
  });

   const handleUpdate = (schedulePayload: IUpdateSchedulePayload) => {
     setLoading(true);
     updateScheduleApi(schedule.id, schedulePayload)
       .then(({ data: { schedule } }: IScheduleResponse) => {
         setAlertState({
           open: true,
           severity: "success",
           message: "Schedule is updated successfully",
         });
          onUpdate(schedule);
       })
       .catch(({ response: { data, statusText } }: IErrorResponse) => {
         setAlertState({
           open: true,
           severity: "error",
           message: data.message || statusText || "Something went wrong",
         });
       })
       .finally(() => {
         setLoading(false);
       });
   };

  useEffect(() => {
    setLoading(true);
    getLabsListApi()
      .then(({ data }: ILabsListResponse) => {
        setLabs(data.labs);
      })
      .catch((error) => {
        setAlertState({
          open: true,
          severity: "error",
          message:
            "Error occurred while fetching labs list, please try again later",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { handleSubmit, register } = methods;
  const onSubmit = (input: IEditScheduleFormInput) => {
    console.log(input);
    const schedulePayload: IUpdateSchedulePayload = getSchedulePayload(
      input,
      schedule,
      labs
    );
    console.log(schedulePayload);
    handleUpdate(schedulePayload);
  };

  return (
    <>
      <CustomDialogTitle onClose={onClose}>
        <Typography fontSize="24px" fontWeight="medium" sx={{ px: 2 }}>
          Edit Schedule
        </Typography>
      </CustomDialogTitle>
      {loading ? (
        <CustomCircularProgress />
      ) : (
        <>
          <DialogContent dividers>
            <form onSubmit={handleSubmit(onSubmit)} id="edit-schedule-form">
              <FormProvider {...methods}>
                <TextField
                  label="Schedule's  Title"
                  {...register("title")}
                  variant="outlined"
                  sx={{ mx: 2, mb: 4, mt: 1, width: "90%" }}
                ></TextField>
                <ScheduleEditTable
                  labs={labs}
                  exams={schedule.exams}
                ></ScheduleEditTable>
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
                mr: 1,
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
              form="edit-schedule-form"
              type="submit"
            >
              Save Changes
            </Button>
          </DialogActions>
        </>
      )}
    </>
  );
}
