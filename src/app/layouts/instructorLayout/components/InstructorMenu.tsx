import { Box, Divider, List } from "@mui/material";
import CustomListItem, {
  IListItem,
} from "../../../components/CustomListItem/CustomListItem";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

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
];


export default function InstructorMenu() {
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
