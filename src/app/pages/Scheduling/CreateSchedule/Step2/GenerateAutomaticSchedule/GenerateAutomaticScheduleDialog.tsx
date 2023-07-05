import React, { useEffect } from "react";
import { IExam } from "../../../../../types/Exam";
import CustomDialog, {
  CustomDialogTitle,
} from "../../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import {
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
import { IFormInput, initialValues, schema } from "./Fields";
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

  const methods = useForm<IFormInput>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;
  const onSubmit: SubmitHandler<IFormInput> = (input: IFormInput) => {
    console.log("onSubmit", input);
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

  return loading ? (
    <CustomCircularProgress />
  ) : (
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
              <Box sx={{ fontSize: "17px", fontWeight: 500 }}>Exams' Labs</Box>
              <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
                <Box sx={{ fontWeight: 300 }}>
                  Select the Labs which can be assigned to the exams
                </Box>
                <LabsDropDown labs={labs} />
              </Stack>
            </Box>
          </DialogContent>

          <DialogActions>
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
            >
              Generate Schedule
            </Button>
          </DialogActions>
        </CustomDialog>
      </form>
    </FormProvider>
  );
}
