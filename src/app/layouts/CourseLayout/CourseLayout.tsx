import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import theme from "../../../assets/theme";
import { Toolbar, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const newTabUrl = (tabName: string) => tabName.toLowerCase().replace(" ", "-");

const tabs = ["Question Bank", "Exams", "DashBoard", "Course Info", "Settings"];
export default function CourseLayout() {
  const [currTab, setCurrTab] = React.useState(newTabUrl(tabs[0]));
  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrTab(newTabUrl(newTab));
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
          <Tabs value={currTab} onChange={handleChange} centered>
            {tabs.map((tab) => (
              <Tab
                key={tab}
                label={tab}
                component={NavLink}
                to={tab.toLowerCase().replace(" ", "-")}
              />
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
