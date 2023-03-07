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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
const drawerWidth = 220;

export default function InstructorLayout() {
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
            <PersonIcon sx={{ mr: 1 }} />
            <Box
              sx={{
                color: "#6B6767",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              User Name
            </Box>
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
                      <ListItemText primary={text} />
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

        <Typography paragraph>Place holder</Typography>
        
      </Box>
    </Box>
  );
}
