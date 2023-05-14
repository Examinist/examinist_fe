import { MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import ITab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import theme from "../../../assets/theme";
import CustomTabs, { ITab } from "../../components/CustomTabs/CustomTabs";
import {
  ICourseInfoResponse,
  getCourseGeneralInfoAPI,
} from "../../services/APIs/CoursesAPIs";
import { ICourseInfo } from "../../types/Course";
import useAuth from "../../hooks/useAuth";

const tabs: ITab[] = [{ name: "Exams" }, { name: "Time Tables" }];

export default function SchedulingLayout() {
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
        <Box sx={{ alignSelf: "flex-end", flexGrow: 1 }}>
          <CustomTabs tabs={tabs} />
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
