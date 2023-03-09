import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import theme from "../../../../assets/theme";
import Logo from "../Logo/Logo";
import UserMenu from "../UserMenu/UserMenu";

export default function CustomAppBar() {
  return (
    <AppBar
      style={{ background: "#fff" }}
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        border: 1,
        borderColor: theme.palette.gray.main,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          ml: 2,
          mr: 1,
          borderRadius: 1,
        }}
        disableGutters
      >
        <Logo />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
