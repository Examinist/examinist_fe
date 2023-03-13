import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import theme from "../../../assets/theme";

const tabs = ["Question Bank", "Exams", "DashBoard", "Course Info", "Settings"];

const tabUrl = (tabName: string) => tabName.toLowerCase().replace(" ", "-");

const activeTab = (path: string) => {
  for (const [i, tab] of tabs.entries()) {
    if (path.includes(tabUrl(tab))) return i;
  }
};

export default function CourseLayout() {
  const location = useLocation();
  const [currTab, setCurrTab] = React.useState(activeTab(location.pathname));

  const handleChangeTab = (event: React.SyntheticEvent, newTab: number) => {
    setCurrTab(newTab);
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          borderBottom: 1,
          borderColor: theme.palette.gray.light,
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
          <Tabs value={currTab} onChange={handleChangeTab} centered>
            {tabs.map((tab) => (
              <Tab key={tab} label={tab} component={Link} to={tabUrl(tab)} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, overflow: "auto", height: "100vh" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
