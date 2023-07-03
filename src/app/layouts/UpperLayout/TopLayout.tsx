import { AppBar, CssBaseline, Divider, Drawer, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "../components/Logo/Logo";
import theme from "../../../assets/theme";
import { Outlet } from "react-router";
import TopUserInfo from "./TopUserInfo";

export default function TopLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        color="inherit"
        sx={{
          height: 63,
          boxShadow: 0,
          border: 1,
          borderColor: theme.palette.gray.main,
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Logo />
            <Box sx={{ ml: "auto" }}>
              <TopUserInfo />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
