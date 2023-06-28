import React from "react";
import { IExam } from "../../../../../types/Exam";
import CustomDialog, {
  CustomDialogTitle,
} from "../../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import { Box, Button, DialogActions, DialogContent, Divider, Stack } from "@mui/material";
import CustomDatePicker from "./components/CustomDatePicker";
import ChipsArray from "./components/ChipsArray";
import ChipsDropDown from "./components/ChipsDropDown";
import CustomTimePicker from "./components/CustomTimePicker";

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
        <Box>Generate Automatic Schedule</Box>
      </CustomDialogTitle>
      <DialogContent dividers>
        <Box sx={{ px: 2 }}>
          <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
            Time Table Window
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "left",
              my: 2,
              pl: 2,
            }}
          >
            <CustomDatePicker label="From" />
            <Box sx={{ alignSelf: "center" }}>__</Box>
            <CustomDatePicker label="To" />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ pt: 3, px: 2 }}>
          <Box sx={{ fontSize: "17px", fontWeight: 500 }}>Holiday Dates</Box>
          <Box sx={{ pr: "10%", pl: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: 10,
                my: 2,
              }}
            >
              <CustomDatePicker label="From" />
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 4, py: 1, px: 3 }}
              >
                + Add
              </Button>
            </Box>
            <ChipsArray />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ pt: 3, px: 2 }}>
          <Box sx={{ fontSize: "17px", fontWeight: 500 }}>Exam Week Days</Box>
          <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
            <Box sx={{ fontWeight: 300 }}>
              Select week days on which exams can be scheduled.
            </Box>
            <ChipsDropDown />
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ pt: 3, px: 2 }}>
          <Box sx={{ fontSize: "17px", fontWeight: 500 }}>
            Exam Starting Time
          </Box>
          <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
            <Box sx={{ fontWeight: 300 }}>
              Select the time which all exams should start at.
            </Box>
            <CustomTimePicker label="Time" />
          </Stack>
        </Box>

        <Divider />

        <Box sx={{ pt: 3, px: 2 }}>
          <Box sx={{ fontSize: "17px", fontWeight: 500 }}>Exams' Labs</Box>
          <Stack sx={{ pl: 2, pr: "10%", my: 2, gap: 1 }}>
            <Box sx={{ fontWeight: 300 }}>
              Select the Labs which can be assigned to the exams
            </Box>
            <ChipsDropDown />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" sx={{borderRadius: 3, mx: 2, my: 0.5, fontWeight:600, border: 1}} >Generate Schedule</Button>
      </DialogActions>
    </CustomDialog>
  );
}
