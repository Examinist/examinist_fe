import {
  Box,
  Button,
} from "@mui/material";
import React, { useImperativeHandle } from "react";
import theme from "../../../../../assets/theme";
import { ScheduleContext } from "../ScheduleContext";
import { FormProvider, useForm } from "react-hook-form";
import GenerateAutomaticScheduleDialog from "./GenerateAutomaticSchedule/GenerateAutomaticScheduleDialog";
import { IExam } from "../../../../types/Exam";
import { IScheduleFormInput, mapToScheduleForm } from "./Fields";
import ScheduleEditTable from "../../ScheduleTables/ScheduleEditTable";

interface IScheduleExamsFormProps {
  reference: React.Ref<any>;
  onSuccess: () => void;
}

export default function ScheduleExamsForm({
  reference,
  onSuccess,
}: IScheduleExamsFormProps) {
  const { exams, setExams } = React.useContext(ScheduleContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const methods = useForm<IScheduleFormInput>({
    defaultValues:{
      list: mapToScheduleForm(exams),
    }
  });
  const { handleSubmit } = methods;
  const onSubmit = (input:IScheduleFormInput) => {
    console.log("Step2:",input)
    //onSuccess();
  };

  return (
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
