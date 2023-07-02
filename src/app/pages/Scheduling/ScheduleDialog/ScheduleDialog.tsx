import React from "react";
import { IDetailedSchedule } from "../../../types/Schedule";
import EditScheduleDialog from "./EditScheduleDialog";
import ViewScheduleDialog from "./ViewScheduleDialog";
import { deleteScheduleApi } from "../../../services/APIs/ScheduleAPIs";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import CustomDialog from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";

export interface IScheduleDialogProps {
  schedule: IDetailedSchedule;
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

export default function ScheduleDialog({
  schedule,
  open,
  onClose,
  reload,
}: IScheduleDialogProps) {
  const [edit, setEdit] = React.useState(false);
  const { setAlertState } = useAlert();

  const handleClose = () => {
    onClose();
    setEdit(false);
  };

  const handleDelete = () => {
    deleteScheduleApi(schedule.id)
      .then(() => {
        setAlertState({
          open: true,
          severity: "success",
          message: "Schedule is deleted successfully",
        });
        onClose();
        reload();
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong",
        });
      });
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="lg"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          minHeight: "60vh",
        },
      }}
    >
      {edit ? (
        <EditScheduleDialog
          schedule={schedule}
          onClose={handleClose}
          onCancel={() => setEdit(false)}
        />
      ) : (
        <ViewScheduleDialog
          schedule={schedule}
          onClose={handleClose}
          onDelete={handleDelete}
          onEdit={() => setEdit(true)}
        />
      )}
    </CustomDialog>
  );
}
