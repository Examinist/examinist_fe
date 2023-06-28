import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useImperativeHandle } from "react";
import theme from "../../../../../assets/theme";
import { ScheduleContext } from "../ScheduleContext";
import { useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import SchedulingTableRow from "../components/SchedulingTableRow";
import ScheduleTable from "../components/ScheduleTable";
import GenerateAutomaticScheduleDialog from "./GenerateAutomaticSchedule/GenerateAutomaticScheduleDialog";
import { IExam } from "../../../../types/Exam";
//const StyledTableCell = styled(TableCell)(({ theme }) => ({
//  [`&.${tableCellClasses.head}`]: {
//    borderBottom: "none",
//  },
//  [`&.${tableCellClasses.body}`]: {
//    borderBottom: "none",
//  },
//}));

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

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <ScheduleTable review={false} examList={exams}></ScheduleTable>
        </Box>
      </Box>
      {dialogOpen && (
        <GenerateAutomaticScheduleDialog
          isOpened={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onSuccessfulSubmit={(exams: IExam[]) => {
            console.log(exams);
          }}
        />
      )}
    </form>
  );
}
