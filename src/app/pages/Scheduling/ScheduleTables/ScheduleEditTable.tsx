import React, { useEffect } from "react";
import { IScheduleTableProps } from "./ScheduleReviewTable";
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
import useAlert from "../../../hooks/useAlert";
import {
  ILabsListResponse,
  getLabsListApi,
} from "../../../services/APIs/LabsAPIs";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

export default function ScheduleEditTable({ examList }: IScheduleTableProps) {
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
  const [exams, setExams] = React.useState(examList);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [labs, setLabs] = React.useState<ILab[]>([]);
  const { setAlertState } = useAlert();
  const { control } = useFormContext<IScheduleFormInput>();
  const { fields } = useFieldArray({
    control,
    name: "list",
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

  return ( loading ? <CustomCircularProgress /> :
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
