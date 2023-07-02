import React, { useState } from "react";
import { IDetailedSchedule } from "../../../types/Schedule";
import EditScheduleDialog from "./EditSchedule/EditScheduleDialog";
import ViewScheduleDialog from "./ViewSchedule/ViewScheduleDialog";
import {
  IScheduleResponse,
  IUpdateSchedulePayload,
  deleteScheduleApi,
  updateScheduleApi,
} from "../../../services/APIs/ScheduleAPIs";
import { IErrorResponse } from "../../../services/Response";
import useAlert from "../../../hooks/useAlert";
import CustomDialog from "../../Course/CourseSettings/QuestionTypes/components/CustomDialog";
import CustomCircularProgress from "../../../components/CustomCircularProgress";

export interface IScheduleDialogProps {
  initialSchedule: IDetailedSchedule;
  open: boolean;
  onClose: () => void;
  reload: () => void;
}

export default function ScheduleDialog({
  initialSchedule,
  open,
  onClose,
  reload,
}: IScheduleDialogProps) {
  const [edit, setEdit] = React.useState(false);
  const [schedule, setSchedule] = useState<IDetailedSchedule>(initialSchedule);
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleUpdate = (schedulePayload: IUpdateSchedulePayload) => {
    setLoading(true);
    updateScheduleApi(schedule.id, schedulePayload)
      .then(({ data: { schedule } }: IScheduleResponse) => {
        setAlertState({
          open: true,
          severity: "success",
          message: "Schedule is updated successfully",
        });
        reload();
        setEdit(false);
        setSchedule(schedule);
      })
      .catch(({ response: { data, statusText } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data.message || statusText || "Something went wrong",
        });
      })
      .finally(() => {
        setLoading(false);
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
      {loading && <CustomCircularProgress />}
      {!loading &&
        (edit ? (
          <EditScheduleDialog
            schedule={schedule}
            onClose={handleClose}
            onCancel={() => setEdit(false)}
            onUpdate={handleUpdate}
          />
        ) : (
          <ViewScheduleDialog
            schedule={schedule}
            onClose={handleClose}
            onDelete={handleDelete}
            onEdit={() => setEdit(true)}
          />
        ))}
    </CustomDialog>
  );
}
