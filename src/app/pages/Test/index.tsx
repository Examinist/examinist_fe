import * as React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";


export default function SvgMaterialIcons() {
  return (
  <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon sx={{mr:1}} />
            <Box
              sx={{
                color: "#6B6767",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              User Name
        </Box>
    </Box>
  );
}
