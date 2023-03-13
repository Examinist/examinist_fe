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

export default function UserInfo() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
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
          Noha Ahmed
        </Typography>
        <Typography
          sx={{
            color: "#6B6767",
            fontSize: "0.7rem",
            fontWeight: "400px",
          }}
        >
          nohaahmed
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

      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ mx: 1.5, width: 130 }}>
          <MenuItem onClick={handleClose}>
            <AccountCircle style={{ marginRight: "20px", color: "#6B6767" }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout
                fontSize="small"
                style={{ marginRight: "20px", color: "#6B6767" }}
              />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      </Menu> */}
    </Box>
  );
}
