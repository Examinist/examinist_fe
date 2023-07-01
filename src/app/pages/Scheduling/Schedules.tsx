import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import React from "react";
import theme from "../../../assets/theme";
import { useNavigate } from "react-router-dom";
import { IDetailedSchedule, ISchedule } from "../../types/Schedule";
import { mockExamsList } from "../../services/APIs/mockData/MockData";
import ScheduleReviewTable from "./ScheduleTables/ScheduleReviewTable";
import ScheduleEditTable from "./ScheduleTables/ScheduleEditTable";
import ScheduleExamsDialog from "./ScheduleExamsDialog";

export default function Schedules() {
  const schedules: IDetailedSchedule[] = [{ id: 1, title: "CSE222", exams: mockExamsList }, { id: 2, title: "CSE223", exams: mockExamsList }]
  const [open, setOpen] = React.useState(false);
  const [chosen, setChosen] = React.useState(0);

  const handleClickOpen = (index: number) => {
    setOpen(true);
    setChosen(index);
  };

  const navigate = useNavigate();

  

  //needs list padding right & left
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
          onClick={() => { navigate("./new") }}
        >
          Create Schedule
        </Button>
      </Box>
      <Box display="flex"
        sx={{
          marginTop: "25px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "15px",
        }}>
        <List sx={{ width: "100%" }}>
          {schedules.map((value, index) => (
            <div key={value.id}>
              <ListItemButton sx={{ paddingX: "25px" }}
                onClick={() => handleClickOpen(index)}>
                <ListItemText primary={value.title} primaryTypographyProps={{ fontSize: "19px", }}></ListItemText>
              </ListItemButton>
              {index != schedules.length - 1 ? <Divider></Divider> : <></>}
              <ScheduleExamsDialog schedule={schedules[chosen]} open={open} setOpen={setOpen} setChosen={setChosen}></ScheduleExamsDialog>
            </div>
          ))}
        </List>
      </Box>
    </Box>
  );
}
