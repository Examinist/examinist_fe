import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import UserInfo from "../components/UserInfo/UserInfo";
import { Divider } from "@mui/material";
import FacultyAdminMenu from "./components/FacultyAdminMenu";

const drawerWidth = 260;

export default function FacultyAdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ ml: 3, mt: 1 }}>
          <Logo />
        </Box>
        <FacultyAdminMenu />
        <Box sx={{ mt: "auto" }}>
          <Divider />
          <UserInfo />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
