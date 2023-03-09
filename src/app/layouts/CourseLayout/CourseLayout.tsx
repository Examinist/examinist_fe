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
        justifyContent: "space-between",
        boxShadow: 4
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: theme.palette.gray.dark,
          mt: "7px",
          mx: "20px",
        }}
      >
        CSE123
      </Typography>

      <Box sx={{ alignSelf: "flex-end" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>

      <Button
        sx={{
          color: "white",
          fontSize: "1rem",
          my: "5px",
          mx: "20px",
        }}
        variant="contained"
      >
        Create Exam
      </Button>
    </Box>
  );
}
