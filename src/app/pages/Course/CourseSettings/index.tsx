import { Box, List, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../../../../assets/theme";
import MenuItem, { IMenuItem } from "../../../components/MenuItem/MenuItem";

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
  return (
    <Box sx={{ height: "100%", display: "flex" }}>
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
                <MenuItem {...item} />
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
