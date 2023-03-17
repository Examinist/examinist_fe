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
import theme from "../../../../assets/theme";
import useAuth from "../../../hooks/useAuth";

export default function UserInfo() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", m: 3, mr: 1.5, mt: 2 }}>
      <Avatar sx={{}}> NA </Avatar>
      <Box sx={{ ml: 1.5 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "400px",
          }}
        >
          {auth?.first_name + " " + auth?.last_name}
        </Typography>
        <Typography
          sx={{
            color: "#6B6767",
            fontSize: "0.7rem",
            fontWeight: "400px",
          }}
        >
          {auth?.username}
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
