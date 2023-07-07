import React, { useContext, useEffect } from "react";
import { IExam } from "../../../../../types/Exam";
import CustomDialog, {
  CustomDialogTitle,
} from "../../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import {
  Alert,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
} from "@mui/material";
import LabsDropDown from "./components/LabsDropDown";
import FormTimePicker from "./components/FormTimePicker";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IFormInput, initialValues, mapInput, schema } from "./Fields";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDatePicker from "./components/FormDatePicker";
import WeekDaysDropDown from "./components/WeekDaysDropDown";
import AddHolidayDate from "./components/AddHolidayDate";
import {
  getLabsListApi,
  ILabsListResponse,
} from "../../../../../services/APIs/LabsAPIs";
import { ILab } from "../../../../../types/Lab";
import useAlert from "../../../../../hooks/useAlert";
import CustomCircularProgress from "../../../../../components/CustomCircularProgress";
import { IScheduleContext, ScheduleContext } from "../../ScheduleContext";
import {
  IAutomaticSchedulePayload,
  IScheduleResponse,
  autoGenerateScheduleApi,
} from "../../../../../services/APIs/ScheduleAPIs";
import { IErrorResponse } from "../../../../../services/Response";

interface IGenerateAutomaticScheduleDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  onSuccessfulSubmit: (exams: IExam[]) => void;
}
export default function GenerateAutomaticScheduleDialog({
  isOpened,
  handleClose,
  onSuccessfulSubmit,
}: IGenerateAutomaticScheduleDialogProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [labs, setLabs] = React.useState<ILab[]>([]);
  const { setAlertState } = useAlert();
  const { exams, title } = useContext<IScheduleContext>(ScheduleContext);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const methods = useForm<IFormInput>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;
  const onSubmit: SubmitHandler<IFormInput> = (input: IFormInput) => {
    console.log("onSubmit", input);
    const payload: IAutomaticSchedulePayload = mapInput(input, title, exams);
    console.log("payload", payload);
    setErrorMessage(undefined);
    setLoading(true);
    autoGenerateScheduleApi(payload)
      .then(({ data }: IScheduleResponse) => {
        setAlertState({
          open: true,
          severity: "success",
          message: "Schedule is generated successfully",
        });
        console.log("data", data);
        onSuccessfulSubmit(data.schedule.exams);
      })
      .catch(({ response: { data, status, statusText } }: IErrorResponse) => {
        setErrorMessage(
          data?.message ||
            statusText ||
            "Error occurred while generating schedule, please try again later"
        );
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} id="auto-schedule">
        <CustomDialog
          fullWidth
          maxWidth="md"
          onClose={() => {
            handleClose();
            reset();
          }}
          aria-labelledby="customized-dialog-title"
          open={isOpened}
        >
          <CustomDialogTitle onClose={handleClose}>
            <Box>Generate Automatic Schedule</Box>
          </CustomDialogTitle>
          {loading ? (
            <CustomCircularProgress />
          ) : (
            <DialogContent dividers>
              <Box sx={{ px: 2 }}>
                <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
                  Time Table Window
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "left",
                    my: 2,
                    pl: 2,
                  }}
                >
                  <FormDatePicker label="From" name="schedule_from" />
                  <Box sx={{ alignSelf: "center" }}>__</Box>
                  <FormDatePicker label="To" name="schedule_to" />
                </Box>
              </Box>

              <Divider />

              <Box sx={{ pt: 3, px: 2 }}>
                <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
                  Holiday Dates
                </Box>
                <Box sx={{ pr: "10%", pl: 2 }}>
                  <AddHolidayDate />
                </Box>
              </Box>

              <Divider />

              <Box sx={{ pt: 3, px: 2 }}>
                <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
                  Exam Week Days
                </Box>
                <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
                  <Box sx={{ fontWeight: 300 }}>
                    Select week days on which exams can be scheduled.
                  </Box>
                  <WeekDaysDropDown />
                </Stack>
              </Box>

              <Divider />

              <Box sx={{ pt: 3, px: 2 }}>
                <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
                  Exam Starting Time
                </Box>
                <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 2 }}>
                  <Box sx={{ fontWeight: 300 }}>
                    Select the time which all exams should start at.
                  </Box>

                  <FormTimePicker label="Time" name="exam_starting_time" />
                </Stack>
              </Box>

              <Divider />

              <Box sx={{ pt: 3, px: 2 }}>
                <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
                  Exams' Labs
                </Box>
                <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
                  <Box sx={{ fontWeight: 300 }}>
                    Select the Labs which can be assigned to the exams
                  </Box>
                  <LabsDropDown labs={labs} />
                </Stack>
              </Box>
            </DialogContent>
          )}

          <DialogActions>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
              {errorMessage && (
                <Alert severity="error" sx={{ flexGrow: 2, borderRadius: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  mx: 2,
                  my: 0.5,
                  fontWeight: 600,
                  border: 1,
                }}
                type="submit"
                form="auto-schedule"
                disabled={loading}
              >
                Generate Schedule
              </Button>
            </Box>
          </DialogActions>
        </CustomDialog>
      </form>
    </FormProvider>
  );
}
