import { Box, List } from "@mui/material";
import CustomListItem, {
  IListItem,
} from "../../../components/CustomListItem/CustomListItem";

import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
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
  }
];


const manageMenuItems: IListItem[] = [
  {
    text: "Scheduling",
    icon: <ScheduleOutlinedIcon />,
    to: "scheduling",
  },
  {
    text: "Exams' Labs",
    icon: <MonitorOutlinedIcon />,
    to: "exams_labs",
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
