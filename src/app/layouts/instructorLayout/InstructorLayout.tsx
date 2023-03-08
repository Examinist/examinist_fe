import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { AccountCircle, ExpandMore, Logout, PersonAdd, Settings } from "@mui/icons-material";
import { NavLink, Outlet } from "react-router-dom";
const drawerWidth = 220;

export default function InstructorLayout() {
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
   setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
   setAnchorEl(null);
 };

 
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
            m: 1,
            borderRadius: 1,
          }}
          disableGutters
        >
          <Box
            sx={{
              color: "#1B84BF",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Examinist
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                color: "#6B6767",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Noha Ahmed
            </Box>

            <Box
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
                  <AccountCircle
                    style={{ marginRight: "20px", color: "#6B6767" }}
                  />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout
                      fontSize="small"
                      style={{ marginRight: "20px", color: "#6B6767" }}
                    />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

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
        <Box sx={{ overflow: "auto", p: "1rem" }}>
          <List>
            {["Courses", "Exams", "Dashboard", "Calendar"].map(
              (text, index) => (
                <Box
                  sx={{
                    color: "#6B6767",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <NavLink  
                        style={({isActive}) => {
                          return isActive ? { color: "red" } : {};
                        }}
                        to={text.toLowerCase()}
                      >
                        <ListItemText primary={text} />
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
                </Box>
              )
            )}
          </List>
          <Divider />
          <Box
            sx={{
              color: "#6B6767",
              pt: "1rem",
              pb: "0.5rem",
              pl: "1rem",
              fontWeight: "bold",
            }}
          >
            Control
          </Box>
          <List disablePadding>
            {["Exam Sessions", "Pending Reports"].map((text, index) => (
              <Box
                sx={{
                  color: "#6B6767",
                  fontWeight: "bold",
                }}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

