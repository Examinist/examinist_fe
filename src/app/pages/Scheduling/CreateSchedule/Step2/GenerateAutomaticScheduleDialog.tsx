import React from "react";
import { IExam } from "../../../../types/Exam";
import CustomDialog, { CustomDialogTitle } from "../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import { Box } from "@mui/material";

interface IGenerateAutomaticScheduleDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  onSuccessfulSubmit: (exams: IExam[]) => void;
}
export default function GenerateAutomaticScheduleDialog({
  isOpened,
  handleClose,
  onSuccessfulSubmit,
}: IGenerateAutomaticScheduleDialogProps) {
  return (
    <CustomDialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpened}
    >
      <CustomDialogTitle onClose={handleClose}>
        <Box sx={{ mx: 2, my: 1 }}>
          Generate Automatic Schedule
        </Box>
      </CustomDialogTitle>
    </CustomDialog>
  );
}
