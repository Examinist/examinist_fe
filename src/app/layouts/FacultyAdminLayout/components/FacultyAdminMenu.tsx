import { Box, Divider, List } from "@mui/material";
import CustomListItem, {
  IListItem,
} from "../../../components/CustomListItem/CustomListItem";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import theme from "../../../../assets/theme";

const menuItems: IListItem[] = [
  {
    text: "Courses",
    icon: <GridViewOutlinedIcon />,
    to: "courses",
  },
  {
    text: "Exams",
    icon: <QuizOutlinedIcon />,
    to: "exams",
  },
  {
    text: "Calendar",
    icon: <CalendarMonthOutlinedIcon />,
    to: "calendar",
  },

  {
    text: "Dashboard",
    icon: <TimelineOutlinedIcon />,
    to: "dashboard",
  },
];

const controlMenuItems: IListItem[] = [
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

const manageMenuItems: IListItem[] = [
  {
    text: "Scheduling",
    icon: <ScheduleOutlinedIcon />,
    to: "scheduling",
  },
  {
    text: "Users",
    icon: <PeopleAltOutlinedIcon />,
    to: "users",
  },
];

export default function FacultyAdminMenu() {
  return (
    <Box sx={{ overflow: "auto", px: "1rem", py: "0.5rem" }}>
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            <CustomListItem {...item} />
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
            <CustomListItem {...item} />
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
        Manage
      </Box>
      <List>
        {manageMenuItems.map((item) => (
          <div key={item.text}>
            <CustomListItem {...item} />
          </div>
        ))}
      </List>
    </Box>
  );
}
