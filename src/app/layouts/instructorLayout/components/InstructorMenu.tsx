import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "../../../../assets/theme";
import MenuItem, { IMenuItem } from "../../../components/MenuItem/MenuItem";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

const menuItems: IMenuItem[] = [
  {
    text: "Courses",
    icon: <GridViewOutlinedIcon />,
    to: "courses",
  },
  {
    text: "Calendar",
    icon: <CalendarMonthOutlinedIcon />,
    to: "calendar",
  },
  {
    text: "Exams",
    icon: <QuizOutlinedIcon />,
    to: "exams",
  },
  {
    text: "Dashboard",
    icon: <TimelineOutlinedIcon />,
    to: "dashboard",
  },
];

const controlMenuItems: IMenuItem[] = [
  {
    text: "Exam Sessions",
    icon: <MonitorOutlinedIcon />,
    to: "exam-sessions",
  },
  {
    text: "Pending Reports",
    icon: <PendingActionsOutlinedIcon />,
    to: "pending-reports",
  },
];

const getCurrentMenuItem = (path: string) => {
  const arr = path.split("/");
  return arr[2];
};
export default function InstructorMenu() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(
    getCurrentMenuItem(location.pathname)
  );
  const handleClick = (to: string) => {
    setSelectedItem(to);
  };

  return (
    <Box sx={{ overflow: "auto", px: "1rem", py: "0.5rem" }}>
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            <MenuItem
              {...item}
              handleClick={handleClick}
              selected={selectedItem === item.to}
            />
          </div>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          color: theme.palette.gray.dark,
          pt: "1rem",
          pl: "1rem",
          fontWeight: "medium",
        }}
      >
        Control
      </Box>
      <List>
        {controlMenuItems.map((item) => (
          <div key={item.text}>
            <MenuItem
              {...item}
              handleClick={handleClick}
              selected={selectedItem === item.to}
            />
          </div>
        ))}
      </List>
    </Box>
  );
}
