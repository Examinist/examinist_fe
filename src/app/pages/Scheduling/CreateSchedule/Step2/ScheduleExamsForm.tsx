import { Box, Button } from "@mui/material";
import React, { useEffect, useImperativeHandle } from "react";
import theme from "../../../../../assets/theme";
import { ScheduleContext } from "../ScheduleContext";
import { FormProvider, useForm } from "react-hook-form";
import GenerateAutomaticScheduleDialog from "./GenerateAutomaticSchedule/GenerateAutomaticScheduleDialog";
import { IExam } from "../../../../types/Exam";
import {
  IScheduleFormInput,
  mapToExam,
  mapToScheduleForm,
  schema,
} from "./Fields";
import ScheduleEditTable from "../../ScheduleTables/ScheduleEditTable";
import { mockLabs } from "../../../../services/APIs/mockData/MockData";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILab } from "../../../../types/Lab";
import {
  getLabsListApi,
  ILabsListResponse,
} from "../../../../services/APIs/LabsAPIs";
import useAlert from "../../../../hooks/useAlert";
import {
  ISchedulePayload,
  addScheduleApi,
} from "../../../../services/APIs/ScheduleAPIs";
import { IErrorResponse } from "../../../../services/Response";
import { useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../../components/CustomCircularProgress";

interface IScheduleExamsFormProps {
  reference: React.Ref<any>;
  onSuccess: () => void;
}

export default function ScheduleExamsForm({
  reference,
  onSuccess,
}: IScheduleExamsFormProps) {
  const { exams, setExams, title, loading, setLoading } = React.useContext(ScheduleContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = React.useState<
    string | undefined
  >();
  const [labs, setLabs] = React.useState<ILab[]>([]);
  const { setAlertState } = useAlert();
  const navigate = useNavigate();

  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const methods = useForm<IScheduleFormInput>({
    defaultValues: {
      list: mapToScheduleForm(exams),
    },
    resolver: yupResolver(schema),
  });

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

  const { handleSubmit } = methods;

  const onSubmit = (input: IScheduleFormInput) => {
    setExams(mapToExam(input.list, exams, labs));
    const schedulePayload: ISchedulePayload = {
      title: title,
      exams: exams.map((exam) => ({
        id: exam.id,
        starts_at: exam.scheduled_date,
        _force: false,
        busy_labs_attributes:
          exam.busy_labs?.map((lab) => ({ lab_id: lab.id })) || [],
      })),
    };
    setLoading(true);
    setLoadingMessage("Creating schedule...")
    addScheduleApi(schedulePayload)
      .then(() => {
        setAlertState({
          open: true,
          severity: "success",
          message: "Schedule is created successfully",
        });
        navigate("./..");
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data?.message || statusText || "Something went wrong",
        });
      })
      .finally(() => {
        setLoading(false);
        setLoadingMessage(undefined);
      });
  };

  return loading ? (
    <CustomCircularProgress message={loadingMessage} />
  ) : (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box display="flex" sx={{ flexDirection: "column", gap: 3 }}>
            <Box display="flex">
              <Box
                sx={{
                  fontSize: "1.7rem",
                  fontWeight: "medium",
                  px: 1,
                  py: 2,
                  color: theme.palette.gray.dark,
                }}
              >
                Schedule Exams
              </Box>
              <Button
                variant="outlined"
                sx={{
                  ml: "auto",
                  borderRadius: 4,
                  height: "fit-content",
                  py: 1,
                  px: 3,
                  alignSelf: "center",
                  fontWeight: 650,
                  backgroundColor: theme.palette.background.paper,
                }}
                onClick={() => setDialogOpen(true)}
              >
                Generate Automatic Schedule
              </Button>
            </Box>
            <Box
              display="flex"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "15px",
              }}
            >
              <ScheduleEditTable examList={exams}></ScheduleEditTable>
            </Box>
          </Box>
        </FormProvider>
      </form>
      {dialogOpen && (
        <GenerateAutomaticScheduleDialog
          isOpened={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onSuccessfulSubmit={(exams: IExam[]) => {
            console.log(exams);
          }}
        />
      )}
    </>
  );
}
