import { Box, Button } from "@mui/material";
import React, { useEffect, useImperativeHandle, useState } from "react";
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
import { dayjsToDate } from "../../../../utilities/Date";
import ConflictsDialog from "./ConflictsDialog";

interface IScheduleExamsFormProps {
  reference: React.Ref<any>;
  onSuccess: () => void;
}

export default function ScheduleExamsForm({
  reference,
  onSuccess,
}: IScheduleExamsFormProps) {
  const { exams, setExams, title, loading, setLoading } =
    React.useContext(ScheduleContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [conflictDialogState, setConflictDialogState] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });
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

  const handleSubmitSchedule = (
    input: IScheduleFormInput,
    forceSave: boolean,
    onError: (errorMessage: string) => void
  ) => {
    const schedulePayload: ISchedulePayload = {
      title: title,
      exams: input.list.map((formExam) => ({
        id: formExam.id,
        starts_at: dayjsToDate(formExam.date!, formExam.time!),
        _force: forceSave,
        busy_labs_attributes:
          formExam.labs?.map((labName) => ({
            lab_id: labs.find((lab) => lab.name === labName)?.id!,
          })) || [],
      })),
    };
    setLoading(true);
    setLoadingMessage("Creating schedule...");
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
        onError(data?.message || statusText || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        setLoadingMessage(undefined);
      });
  };

  const onSubmit = (input: IScheduleFormInput) => {
    setExams(mapToExam(input.list, exams, labs));

    handleSubmitSchedule(input, false, (errorMessage) => {
      setConflictDialogState({
        open: true,
        message: errorMessage,
      });
    });
  };

  const handleAutomaticScheduleSuccesfullSubmit = (exams: IExam[]) => {
    setDialogOpen(false);
    exams.forEach((exam) => {
      if (exam.labs) {
        exam.busy_labs = exam.labs.map((lab) => ({
          id: lab.id!,
          name: lab.name,
        }));
      }
    });
    setExams(exams);
    const { setValue } = methods;
    setValue("list", mapToScheduleForm(exams));
  };

  const handleCloseConflictDialog = () => {
    setConflictDialogState({ open: false, message: "" });
  };

  const handleConfirmConflictDialog = () => {
    handleSubmitSchedule(methods.getValues(), true, (errorMessage) => {
      setAlertState({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    });
    setConflictDialogState({ open: false, message: "" });
  };

  return loading ? (
    <CustomCircularProgress message={loadingMessage} height="60vh" />
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
              <ScheduleEditTable exams={exams} labs={labs}></ScheduleEditTable>
            </Box>
          </Box>
        </FormProvider>
      </form>
      {dialogOpen && (
        <GenerateAutomaticScheduleDialog
          isOpened={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onSuccessfulSubmit={handleAutomaticScheduleSuccesfullSubmit}
        />
      )}
      {conflictDialogState.open && (
        <ConflictsDialog
          open={conflictDialogState.open}
          onForceSave={handleConfirmConflictDialog}
          onModify={handleCloseConflictDialog}
          conflictMessage={conflictDialogState.message}
        />
      )}
    </>
  );
}
