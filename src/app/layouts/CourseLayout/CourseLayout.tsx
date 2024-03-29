import { IconButton, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import ITab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import * as React from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
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
import CreateExamButton from "./CreateExam";
import { userRoleToPathMap } from "../../types/User";

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
  {
    name: "Settings",
    menu: [
      { name: "Topics", to: "settings/topics" },
      { name: "Question Types", to: "settings/question-types" },
      { name: "Exam Template", to: "settings/exam-template" },
    ],
  },
];

const unAssignedAdminTabs: ITab[] = [
  { name: "General Info" },
  { name: "Course Groups" },
  { name: "Exams" },
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
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoaded(false);
    getCourseGeneralInfoAPI(courseId!).then(({ data }: ICourseInfoResponse) => {
      setCourseInfo(data.course_info);
      setIsAssigned(checkIfAssigned(data.course_info.instructors, user!.username));
    })
    .finally(() => setIsLoaded(true));
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => {
              navigate(`${userRoleToPathMap[user!.role]}/courses`);
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ color: theme.palette.text.primary }}
              fontSize="inherit"
            />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: theme.palette.gray.dark,
              mr: "30px",
            }}
          >
            {courseInfo?.code}
          </Typography>
        </Box>

        <Box sx={{ alignSelf: "flex-end", flexGrow: 1 }}>
          {isLoaded && (
            <CustomTabs tabs={isAssigned ? tabs : unAssignedAdminTabs} />
          )}
        </Box>
        {isLoaded && isAssigned && <CreateExamButton />}
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, overflow: "auto", height: "100vh" }}
      >
        <IsAssignedContext.Provider value={isAssigned}>
          {isLoaded && <Outlet />}
        </IsAssignedContext.Provider>
      </Box>
    </Box>
  );
}
