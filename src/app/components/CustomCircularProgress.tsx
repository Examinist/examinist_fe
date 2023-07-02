import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function CustomCircularProgress({
  message,
}: {
  message?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        gap: 5,
      }}
    >
      <CircularProgress />
      {message && <Box>{message}</Box>}
    </Box>
  );
}
