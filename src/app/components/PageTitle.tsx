import { Box } from "@mui/material";
import React from "react";

export default function PageTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        fontSize: "2rem",
        fontWeight: "medium",
        fontFamily: "montserrat",
      }}
    >
      {title}
    </Box>
  );
}
