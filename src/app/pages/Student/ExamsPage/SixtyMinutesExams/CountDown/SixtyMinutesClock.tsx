import { Box, Stack } from "@mui/system";
import React from "react";
import theme from "../../../../../../assets/theme";

interface IClockProps {
  minutes: number;
  seconds: number;
}
export default function SixtyMinutesClock({ minutes, seconds }: IClockProps) {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.gray.light,
        py: 0.7,
        px: 2,
        borderRadius: 3,
        gap: 2,
        width: 140,
        justifyContent: "center",
      }}
    >
      <Stack sx={{ alignItems: "center", width: 50 }}>
        <Box sx={{ fontWeight: 500, fontSize: 25 }}>
          {minutes.toString().padStart(2, "0")}
        </Box>
        <Box sx={{ fontSize: 10 }}>MINS</Box>
      </Stack>
      <Box sx={{ fontWeight: 500, fontSize: 25 }}> :</Box>
      <Stack sx={{ alignItems: "center", width: 50 }}>
        <Box sx={{ fontWeight: 500, fontSize: 25 }}>
          {seconds.toString().padStart(2, "0")}
        </Box>
        <Box sx={{ fontSize: 10 }}>SECS</Box>
      </Stack>
    </Box>
  );
}
