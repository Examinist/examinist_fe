import { Box, Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import theme from "../../../../assets/theme";
import MenuItem, { IMenuItem } from "../../../components/MenuItem/MenuItem";


const rootPath = "/instructor/course/settings";

const menuItems: IMenuItem[] = [
  {
    text: "Topics",
    to: "topics",
  },
  {
    text: "Question Types",
    to: "question-types",
  },
  {
    text: "Exam Template",
    to: "exam-template",
  },

];

export default function CourseSettings() {
  const navigate = useNavigate();
  const [currMenuItem, setCurrMenuItem] = useState(menuItems[0].to);
  useEffect(
    () =>{
      navigate("/instructor/course/settings/topics");
    },[]);
  const handleClick = (to:string)=>{
    setCurrMenuItem(to);
  }
  return (
    <Box sx={{ height: "100%", display:'flex' }}>
      <Box sx={{ width: "270px", borderRight: 1, borderColor: "#DDDDDD" }}>
        <Box
          sx={{
            backgroundColor: "Background",
            pt: 5,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: theme.palette.gray.dark,
            }}
          >
            Course Settings
          </Typography>
          <List>
            {menuItems.map((item) => (
              <div
                key={item.text}
                style={{ marginBlock: "20px", textAlign: "center" }}
              >
                <MenuItem {...item} selected={currMenuItem === item.to} handleClick={handleClick} />
              </div>
            ))}
          </List>
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* <Toolbar /> */}

        <Outlet />
      </Box>
    </Box>
  );
}
