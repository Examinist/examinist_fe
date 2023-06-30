import { Box, Button, Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Table, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import React, { useImperativeHandle } from "react";
import theme from "../../../../../assets/theme";
import { ScheduleContext } from "../ScheduleContext";
import { FormProvider, useForm } from "react-hook-form";
import ScheduleTable from "../components/ScheduleTable";

interface IScheduleExamsFormProps {
  reference: React.Ref<any>;
  onSuccess: () => void;
}
export default function ScheduleExamsForm({
  reference,
  onSuccess,
}: IScheduleExamsFormProps) {
  const { exams, setExams } = React.useContext(ScheduleContext);
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = () => {
    onSuccess();
  };

  return (
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
            >
              Generate Automatic Schedule
            </Button>
          </Box>
          <Box display="flex"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "15px",
            }}>
            <ScheduleTable review={false} examList={exams}></ScheduleTable>
          </Box>
        </Box>
      </FormProvider>
    </form>
  );
}
