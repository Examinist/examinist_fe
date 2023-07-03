import React from "react";
import {
  Typography,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import theme from "../../../../../assets/theme";
import { CustomDialogTitle } from "../../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import ScheduleReviewTable from "../../ScheduleTables/ScheduleReviewTable";
import { IDetailedSchedule } from "../../../../types/Schedule";

interface IViewScheduleDialogProps {
  schedule: IDetailedSchedule;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}
export default function ViewScheduleDialog({
  schedule,
  onClose,
  onDelete,
  onEdit,
}: IViewScheduleDialogProps) {
  return (
    <>
      <CustomDialogTitle onClose={onClose}>
        <Typography fontSize="24px" fontWeight="medium" sx={{ px: 2 }}>
          {schedule.title}
        </Typography>
      </CustomDialogTitle>
      <DialogContent dividers>
        <ScheduleReviewTable examList={schedule.exams}></ScheduleReviewTable>
      </DialogContent>
      <DialogActions sx={{ py: 5 }}>
        <Button
          sx={{
            color: "#FF4B4B",
            backgroundColor: theme.palette.white.main,
            border: 1,
            alignSelf: "center",
            borderRadius: "10px",
            width: "90px",
            fontWeight: "600",
            marginRight: 1,
          }}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.white.main,
            border: 1,
            alignSelf: "center",
            borderRadius: "10px",
            width: "90px",
            fontWeight: "600",
          }}
          onClick={onEdit}
        >
          Edit
        </Button>
      </DialogActions>
    </>
  );
}
