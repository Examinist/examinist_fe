import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../../assets/theme";
import { useNavigate } from "react-router-dom";
import { IDetailedSchedule, ISchedule } from "../../types/Schedule";

import {
  IScheduleResponse,
  ISchedulesListResponse,
  getScheduleApi,
  getSchedulesListApi,
} from "../../services/APIs/ScheduleAPIs";
import useAlert from "../../hooks/useAlert";
import { IErrorResponse } from "../../services/Response";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import ScheduleDialog from "./ScheduleDialog/ScheduleDialog";

export default function Schedules() {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [chosen, setChosen] = React.useState(0);
  const { setAlertState } = useAlert();
  const [chosenSchedule, setChosenSchedule] = useState<IDetailedSchedule>();

  const loadSchedules = () => {
    setLoading(true);
    getSchedulesListApi()
      .then(({ data }: ISchedulesListResponse) => {
        setSchedules(data.schedules);
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

  const handleClose = () => {
    setOpen(false);
    setChosen(0);
  };

  const handleClickOpen = (index: number) => {
    setLoading(true);
    getScheduleApi(schedules[index].id)
      .then(({ data }: IScheduleResponse) => {
        setChosenSchedule(data.schedule);
        setChosen(index);
        setOpen(true);
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

  const navigate = useNavigate();

  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <Box sx={{ px: 12, py: 5 }}>
      <Box display="flex">
        <Box
          sx={{
            fontSize: "2.3rem",
            fontWeight: "medium",
            fontFamily: "montserrat",
          }}
        >
          Schedules
        </Box>
        <Button
          variant="outlined"
          sx={{
            color: "#1B84BF",
            backgroundColor: theme.palette.white.main,
            ml: "auto",
            border: 1,
            fontSize: "14px",
            fontWeight: "650",
            height: "fit-content",
            py: 1,
            px: 4,
            alignSelf: "center",
            borderRadius: "20px",
          }}
          onClick={() => {
            navigate("./new");
          }}
        >
          Create Schedule
        </Button>
      </Box>
      {schedules.length === 0 ? (
        <Box sx={{my: 3, mx: 1, fontSize: '17px'}}> No schedules to show.</Box>
      ) : (
        <Box
          display="flex"
          sx={{
            marginTop: "25px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "15px",
          }}
        >
          <List sx={{ width: "100%" }}>
            {schedules.map((value, index) => (
              <div key={value.id}>
                <ListItemButton
                  sx={{ paddingX: "25px" }}
                  onClick={() => handleClickOpen(index)}
                >
                  <ListItemText
                    primary={value.title}
                    primaryTypographyProps={{ fontSize: "19px" }}
                  ></ListItemText>
                </ListItemButton>
                {index != schedules.length - 1 ? <Divider></Divider> : <></>}
              </div>
            ))}
          </List>
        </Box>
      )}
      {open && (
        <ScheduleDialog
          reload={loadSchedules}
          initialSchedule={chosenSchedule!}
          open={open}
          onClose={handleClose}
        ></ScheduleDialog>
      )}
    </Box>
  );
}
