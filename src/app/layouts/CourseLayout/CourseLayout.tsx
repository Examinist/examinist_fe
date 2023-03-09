import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import theme from "../../../assets/theme";
import { Button, Typography } from "@mui/material";

export default function CourseLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        boxShadow: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: theme.palette.gray.dark,
          mt: "7px",
          mx: "30px",
        }}
      >
        CSE123
      </Typography>

      <Box sx={{ alignSelf: "flex-end", flexGrow: 1 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Question Bank" />
          <Tab label="Exams" />
          <Tab label="Analytics" />
          <Tab label="Course Info" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
    </Box>
  );
}
