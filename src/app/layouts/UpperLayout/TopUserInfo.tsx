import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import IUser from "../../types/User";
import { Logout } from "@mui/icons-material";

const initials = (user: IUser) => {
  return user.first_name![0] + user.last_name![0];
};

export default function TopUserInfo() {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{}}> {initials(user!)}</Avatar>
      <Box sx={{ mx: 2 }}>
        <Box
          sx={{
            fontSize: "1.06rem",
            fontWeight: "semibold",
          }}
        >
          {user?.first_name + " " + user?.last_name}
        </Box>
        <Box
          sx={{
            color: "#6B6767",
            fontSize: "0.9rem",
            fontWeight: "800px",
          }}
        >
          {user?.username}
        </Box>
      </Box>
      <Tooltip title="Log out" sx={{ marginLeft: "auto" }}>
        <IconButton color="primary" onClick={logout}>
          <Logout style={{ marginLeft: "auto", color: "#6B6767" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
