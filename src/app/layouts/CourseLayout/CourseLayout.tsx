import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import theme from "../../../assets/theme";
import {Toolbar, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const rootPath = "/instructor/course/";
const defaultTab = "question-bank"; 
const getCurrentTab= (path: string) => {
  const arr = path.split("/");
  return (arr.length == 3 || arr[3] === '') ? defaultTab : arr[3];
};


const tabs = ["Question Bank", "Exams", "DashBoard", "Course Info", "Settings"]
export default function CourseLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [currTab, setCurrTab] = React.useState(getCurrentTab(location.pathname))
  const isFirstRender = () => location.pathname.split("/").length == 3;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const newTap = tabs[newValue].toLowerCase().replace(" ", "-");
    setCurrTab(newTap);
    navigate(rootPath + newTap);
    localStorage.setItem('course-tab', newValue.toString());
  };

  useEffect(() => {
    if (!isFirstRender()) {
      setValue(parseInt(localStorage.getItem("course-tab") || "0"));
    }
    navigate(rootPath + getCurrentTab(location.pathname));
  
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          borderBottom: 1,
          borderColor: theme.palette.gray.light,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: theme.palette.gray.dark,
            mt: "7px",
            mx: "30px",
          }}
        >
          CSE123
        </Typography>

        <Box sx={{ alignSelf: "flex-end", flexGrow: 1 }}>
          <Tabs value={value} onChange={handleChange} centered>
            {tabs.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, overflow: "auto", height: "100vh" }}
      >

        <Outlet/>
      </Box>
    </Box>
  );
}
