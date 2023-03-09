import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import {Outlet } from "react-router-dom";
import InstructorMenu from "./components/InstructorMenu";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";

const drawerWidth = 250;

export default function InstructorLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
     <CustomAppBar/>

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
        <Toolbar />
        <InstructorMenu />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>

    </Box>
  );
}
