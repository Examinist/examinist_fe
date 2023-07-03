import { Button } from "@mui/material";
import React from "react";
import theme from "../../../assets/theme";
import GenerateAutomaticScheduleDialog from "../Scheduling/CreateSchedule/Step2/GenerateAutomaticSchedule/GenerateAutomaticScheduleDialog";
import { IExam } from "../../types/Exam";

export default function AutomaticScheduleTest() {
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  return (
    <div>
      AutomaticScheduleTest
      <Button
        variant="outlined"
        sx={{
          ml: "auto",
          borderRadius: 4,
          height: "fit-content",
          py: 1,
          px: 3,
          alignSelf: "center",
          fontWeight: 650,
          backgroundColor: theme.palette.background.paper,
        }}
        onClick={() => setDialogOpen(true)}
      >
        Generate Automatic Schedule
      </Button>
      {dialogOpen && (
        <GenerateAutomaticScheduleDialog
          isOpened={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          onSuccessfulSubmit={(exams: IExam[]) => {
            console.log(exams);
          }}
        />
      )}
    </div>
  );
}
