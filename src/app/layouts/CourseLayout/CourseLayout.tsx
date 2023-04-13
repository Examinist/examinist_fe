import { MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import ITab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
import * as React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import theme from "../../../assets/theme";
import CustomTabs, { ITab } from "../../components/CustomTabs/CustomTabs";
import {
  ICourseInfoResponse,
  getCourseGeneralInfoAPI,
} from "../../services/APIs/CoursesAPIs";
import { ICourseInfo } from "../../types/Course";
import useAuth from "../../hooks/useAuth";

const tabs: ITab[] = [
  {
    name: "Course Info",
    menu: [
      { name: "General Info", to: "course-info/general-info" },
      { name: "Course Groups", to: "course-info/course-groups" },
    ],
  },
  { name: "Question Bank" },
  { name: "Exams" },
  { name: "DashBoard" },
  {
    name: "Settings",
    menu: [
      { name: "Topics", to: "settings/topics" },
      { name: "Question Types", to: "settings/question-types" },
      { name: "Exam Template", to: "settings/exam-template" },
    ],
  },
];

const checkIfAssigned = (instructors: any[], username: string) => {
  return instructors.some((instructor) => instructor.username === username); 
}

export const IsAssignedContext = React.createContext<boolean>(false);

export default function CourseLayout() {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseInfo, setCourseInfo] = React.useState<ICourseInfo | null>(null);
  const [isAssigned, setIsAssigned] = React.useState<boolean>(false);
  const { user } = useAuth();

  React.useEffect(() => {
    getCourseGeneralInfoAPI(courseId!).then(({ data }: ICourseInfoResponse) => {
      setCourseInfo(data.course_info);
      setIsAssigned(checkIfAssigned(data.course_info.instructors, user!.username));
    });
  }, []);

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
          {courseInfo?.code}
        </Typography>
        <Box sx={{ alignSelf: "flex-end", flexGrow: 1 }}>
          <CustomTabs tabs={tabs} />
        </Box>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, overflow: "auto", height: "100vh" }}
      >
        <IsAssignedContext.Provider value={true}>
          <Outlet />
        </IsAssignedContext.Provider>
      </Box>
  </Box>
  );
}
