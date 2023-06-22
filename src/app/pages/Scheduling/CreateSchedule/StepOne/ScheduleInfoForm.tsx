import React, { useEffect, useImperativeHandle } from "react";
import { ScheduleContext } from "../ScheduleContext";
import { IFormInputs, schema } from "./Fields";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../../../../assets/theme";
import ExamsTable from "./ExamsTable";
import {
  getExamsApi,
  IExamsListResponse,
} from "../../../../services/APIs/ExamAPIs";
import { IErrorResponse } from "../../../../services/Response";
import { ExamStatusEnum, IExam } from "../../../../types/Exam";
import useAlert from "../../../../hooks/useAlert";

interface IScheduleInfoFormProps {
  reference: React.Ref<any>;
  onSuccess: () => void;
}
export default function ScheduleInfoForm({
  reference,
  onSuccess,
}: IScheduleInfoFormProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [unScheduledExams, setUnScheduledExams] = React.useState<IExam[]>([]);
  const { setAlertState } = useAlert();
  const { title, setTitle, exams, setExams } =
    React.useContext(ScheduleContext);

  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  useEffect(() => {
    getExamsApi(undefined, ExamStatusEnum.UNSCHEDULED)
      .then(({ data }: IExamsListResponse) => {
        setUnScheduledExams(data.exams);
      })
      .catch(({ response: { statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          message: data?.message || statusText,
          severity: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const methods = useForm<IFormInputs>({
    defaultValues: {
      title: title,
      exams_ids: exams.map((exam) => exam.id),
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IFormInputs) => {
    console.log("form data", data);
    setTitle(data.title);
    setExams(
      unScheduledExams.filter((exam) => data.exams_ids.includes(exam.id))
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <Box display="flex" sx={{ flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              fontSize: "1.7rem",
              fontWeight: "medium",
              px: 1,
              py: 2,
              color: theme.palette.gray.dark,
            }}
          >
            Schedule's Info
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "15px",
              py: 3,
              px: 5,
            }}
          >
            <Box display="flex" sx={{ gap: 5 }}>
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                  color: theme.palette.gray.dark,
                }}
              >
                Title :
              </Box>
              <TextField
                sx={{ width: "60%", ml: 2 }}
                variant="outlined"
                size="small"
                placeholder="Schedule's title"
                {...register("title")}
                error={errors.title?.message ? true : false}
                helperText={errors.title?.message}
              />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "15px",
              pt: 3,
              pb: 7,
              px: 5,
            }}
          >
            <Box display="flex" sx={{ gap: 5 }}>
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                  color: theme.palette.gray.dark,
                  alignSelf: "center",
                }}
              >
                Select Exams:
              </Box>
              {errors.exams_ids && (
                <Box
                  sx={{
                    alignSelf: "center",
                    color: theme.palette.red.dark,
                    ml: 3,
                  }}
                >
                  {errors.exams_ids.message}
                </Box>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <ExamsTable exams={unScheduledExams} />
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </form>
  );
}
