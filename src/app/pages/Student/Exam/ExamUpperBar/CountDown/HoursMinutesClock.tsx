import { Box, Stack } from "@mui/system";
import React from "react";
import theme from "../../../../../../assets/theme";

interface IClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}
export default function HoursMinutesClock({ hours, minutes, seconds }: IClockProps) {
  return (
    <Box
      sx={{
        display: "flex",
        py: 0.7,
        px: 2,
        borderRadius: 3,
        justifyContent: "center",
      }}
    >
      Time Remaining: {hours} hrs : {minutes} mins : {seconds} secs
    </Box>
  );
}
