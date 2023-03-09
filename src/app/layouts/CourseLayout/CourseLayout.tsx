import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import theme from "../../../assets/theme";
import {Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const rootPath = "/instructor/course/";
const tabs = ["Question Bank", "Exams", "DashBoard", "Course Info", "Settings"]
export default function CourseLayout() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(rootPath + tabs[newValue].toLowerCase().replace(' ', ''))
    console.log(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          borderBottom: 1,
          borderColor: theme.palette.gray.main,
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
            {tabs.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
