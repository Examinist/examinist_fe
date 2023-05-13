import { Box, Divider, List } from "@mui/material";
import CustomListItem, {
  IListItem,
} from "../../../components/CustomListItem/CustomListItem";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MonitorOutlinedIcon from "@mui/icons-material/MonitorOutlined";

const menuItems: IListItem[] = [
  {
    text: "Faculty Admins",
    icon: <PeopleAltOutlinedIcon />,
    to: "faculty_admins",
  },
  {
    text: "University Labs",
    icon: <MonitorOutlinedIcon />,
    to: "university_labs",
  },
];


export default function UniversityAdminMenu() {
  return (
    <Box sx={{ overflow: "auto", px: "1rem", py: "0.5rem" }}>
      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            <CustomListItem {...item} />
          </div>
        ))}
      </List>
    </Box>
  );
}
