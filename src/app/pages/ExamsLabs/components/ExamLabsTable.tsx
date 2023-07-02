import { Box, Button, DialogContent, Divider, List, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ProctorSelector from "./ProctorSelector";
import { IExam } from "../../../types/Exam";
import theme from "../../../../assets/theme";
import CustomDialog, { CustomDialogTitle } from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import React from "react";
import UsersTable from "../../Course/CourseInfo/UsersTable";
import { mockStudents } from "../../../services/APIs/mockData/MockData";
import IUser from "../../../types/User";

export default function ExamLabsTable({ exam }: { exam: IExam }) {
    const students = mockStudents;
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
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
                <TableRow key={lab.id} >
                  <TableCell align="left" sx={{ fontSize: "17px" }}>
                    {lab.name}
                  </TableCell>
                  <TableCell style={{ width: "50%" }} sx={{ fontSize: "17px" }}>
                    <ProctorSelector lab={lab}></ProctorSelector>
                  </TableCell>
                  <TableCell align="left" width="20%" sx={{ fontSize: "17px" }}>
                    <Button
                      onClick={handleDialogOpen}
                      sx={{
                        border: 1,
                        borderRadius: "15px",
                        textTransform: "none",
                        px:3
                      }}
                    >
                      View Students
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomDialog fullWidth onClose={handleDialogClose} open={dialogOpen}>
          <CustomDialogTitle onClose={handleDialogClose}>
            <Box sx={{ mx: 2, my: 1 }}>Students (50)</Box>
          </CustomDialogTitle>
          <Divider></Divider>
          <DialogContent sx={{ p: 3, mx: 2, my: 1 }}>
            <UsersTable users={students as IUser[]}></UsersTable>
          </DialogContent>
        </CustomDialog>
      </Box>
    );
}