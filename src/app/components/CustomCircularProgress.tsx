import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function CustomCircularProgress({
  message,
  height = "100vh",
}: {
  message?: string;
  height?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        gap: 5,
      }}
    >
      <CircularProgress />
      {message && <Box>{message}</Box>}
    </Box>
  );
}
