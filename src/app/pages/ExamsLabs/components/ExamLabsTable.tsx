import {
  Box,
  DialogContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IExam } from "../../../types/Exam";
import theme from "../../../../assets/theme";
import CustomDialog, {
  CustomDialogTitle,
} from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import React, { useState } from "react";
import UsersTable from "../../Course/CourseInfo/UsersTable";
import IUser, { IStudent } from "../../../types/User";
import {
  IStudentsListResponse,
  getStudentsInLabApi,
} from "../../../services/APIs/ControlAPIs";
import ExamLabsRow from "./ExamLabsRow";
import { IBusyLab } from "../../../types/Lab";
import useAlert from "../../../hooks/useAlert";
import { IErrorResponse } from "../../../services/Response";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

export default function ExamLabsTable({ exam }: { exam: IExam }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [studentsInLab, setStudentsInLab] = useState<IStudent[]>([]);
  const { setAlertState } = useAlert();
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleViewStudents = (lab: IBusyLab) => {
    setLoading(true);
    getStudentsInLabApi(exam.id, lab.id)
      .then(({ data }: IStudentsListResponse) => {
        setStudentsInLab(data.students);
        setDialogOpen(true);
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "15px",
        marginTop: "50px",
        px: "10px",
      }}
    >
      {loading ? (
        <CustomCircularProgress />
      ) : (
        <TableContainer sx={{ px: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontSize: "17px" }}>
                  Lab
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "17px" }}>
                  Proctor
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "17px" }}>
                  Students
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exam.busy_labs?.map((lab) => (
                <ExamLabsRow
                  key={lab.id}
                  lab={lab}
                  onViewStudents={handleViewStudents}
                ></ExamLabsRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CustomDialog fullWidth onClose={handleDialogClose} open={dialogOpen}>
        <CustomDialogTitle onClose={handleDialogClose}>
          <Box sx={{ mx: 2, my: 1 }}>Students ({studentsInLab.length})</Box>
        </CustomDialogTitle>
        <Divider></Divider>
        <DialogContent sx={{ p: 3, mx: 2, my: 1 }}>
          <UsersTable users={studentsInLab as IUser[]}></UsersTable>
        </DialogContent>
      </CustomDialog>
    </Box>
  );
}
