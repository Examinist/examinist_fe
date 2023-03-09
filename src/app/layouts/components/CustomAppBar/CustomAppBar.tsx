import { AppBar, Toolbar } from '@mui/material';
import React from 'react'
import Logo from '../Logo/logo';
import UserMenu from '../UserMenu/UserMenu';

export default function CustomAppBar() {
  return (
    <AppBar
      style={{ background: "#fff" }}
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
