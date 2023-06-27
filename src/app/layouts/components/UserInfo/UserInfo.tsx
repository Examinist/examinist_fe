import { AccountCircle, ExpandMore, Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import IUser, { UserRoleEnum } from "../../../types/User";

const initials = (user: IUser) => {
  return user.first_name ? (user.first_name![0] + user.last_name![0]) : user.username[0];
};

const name = (user: IUser) => {
  return user.role === UserRoleEnum.UNIVERSITY_ADMIN ? user.username : user.first_name + " " + user.last_name;
}

const subInfo = (user: IUser) => {
  return user.role === UserRoleEnum.UNIVERSITY_ADMIN ? user.university?.name : user.username;
}

export default function UserInfo() {
  const { user} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", m: 3, mr: 1.5, mt: 2 }}>
      <Avatar sx={{}}> {initials(user!)}</Avatar>
      <Box sx={{ ml: 1.5 }}>
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: "400px",
          }}
        >
          {name(user!)}
        </Typography>
        <Typography
          sx={{
            color: "#6B6767",
            fontSize: "0.8rem",
            fontWeight: "800px",
          }}
        >
          {subInfo(user!)}
        </Typography>
        <Typography
          sx={{
            color: "#6B6767",
            fontSize: "0.7rem",
            fontWeight: "400px",
          }}
        >
         {user?.role.replace("_", " ")}
        </Typography>
      </Box>
      <Tooltip title="Log out" sx={{ marginLeft: "auto" }}>
        <IconButton color="primary" onClick={logout}>
          <Logout
            fontSize="small"
            style={{ marginLeft: "auto", color: "#6B6767" }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
