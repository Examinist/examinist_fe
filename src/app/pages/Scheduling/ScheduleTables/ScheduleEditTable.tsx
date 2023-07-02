import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "../../../../assets/theme";
import ScheduleEditRow from "./ScheduleEditRow";
import { useFieldArray, useFormContext } from "react-hook-form";
import { IScheduleFormInput } from "../CreateSchedule/Step2/Fields";
import { ILab } from "../../../types/Lab";
import { IExam } from "../../../types/Exam";

interface ISscheduleEditTableProps {
  exams: IExam[];
  labs: ILab[];
}

export default function ScheduleEditTable({
  exams,
  labs,
}: ISscheduleEditTableProps) {
  const header = [
    "ID",
    "Title",
    "Course",
    "No. of Students",
    "Duration",
    "Scheduled Date",
    "Start Time",
    "End Time",
    "Labs",
  ];
  const { control } = useFormContext<IScheduleFormInput>();
  const { fields } = useFieldArray({
    control,
    name: "list",
  });

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((value, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  color: theme.palette.gray.dark,
                  fontWeight: "medium",
                }}
              >
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => (
            <ScheduleEditRow
              labs={labs}
              key={field.id}
              value={exams[index]}
              index={index}
            ></ScheduleEditRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
