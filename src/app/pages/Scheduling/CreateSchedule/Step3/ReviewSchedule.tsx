import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import theme from "../../../../../assets/theme";
import { ScheduleContext } from "../ScheduleContext";
import ScheduleReviewTable from "../../ScheduleTables/ScheduleReviewTable";
import useAlert from "../../../../hooks/useAlert";
import {
  ISchedulePayload,
  addScheduleApi,
} from "../../../../services/APIs/ScheduleAPIs";
import { IErrorResponse } from "../../../../services/Response";
import CustomCircularProgress from "../../../../components/CustomCircularProgress";
import { useNavigate } from "react-router-dom";

export default function ReviewSchedule() {
  const { exams, title } = React.useContext(ScheduleContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setAlertState } = useAlert();
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    const schedulePayload: ISchedulePayload = {
      title: title,
      exams: exams.map((exam) => ({
        id: exam.id,
        starts_at: exam.scheduled_date,
        _force: false,
        busy_labs_attributes:
          exam.busy_labs?.map((lab) => ({ lab_id: lab.id })) || [],
      })),
    };
    console.log(schedulePayload);
    setLoading(true);
    addScheduleApi(schedulePayload)
      .then(() => {
        setAlertState({
          open: true,
          severity: "success",
          message: "Schedule is created successfully",
        });
        navigate("./..");
      })
      .catch(({ response: { status, statusText, data } }: IErrorResponse) => {
        setAlertState({
          open: true,
          severity: "error",
          message: data?.message || statusText || "Something went wrong",
        });
        
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return loading ? (

    <CustomCircularProgress message="Please wait while the schedule is being submitted." />
  ) : (
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
          Review Schedule
        </Box>
        <Button
          variant="contained"
          sx={{
            ml: "auto",
            borderRadius: 3,
            boxShadow: 0,
            height: "fit-content",
            py: 1,
            px: 5,
            alignSelf: "center",
            fontWeight: 650,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      <Box
        display="flex"
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "15px",
        }}
      >
        <ScheduleReviewTable examList={exams}></ScheduleReviewTable>
      </Box>
    </Box>
  );
}
