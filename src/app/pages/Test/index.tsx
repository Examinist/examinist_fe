import * as React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { Button, Card } from "@mui/material";
import theme from "../../../assets/theme";
import HoursMinutesCountDown from "../Student/Exam/ExamUpperBar/CountDown/HoursMinutesCountDown";
import { getDateStr, getFullDateStr } from "../../utilities/Date";

export default function test() {
  const now: Date = new Date(Date.now());

  return (
    <>
      {getFullDateStr(now)}
      <HoursMinutesCountDown
        toDate={new Date(2023, 6, 29, 18)}
        onComplete={() => {
          console.log("completed");
        }}
      />
    </>
  );
}
