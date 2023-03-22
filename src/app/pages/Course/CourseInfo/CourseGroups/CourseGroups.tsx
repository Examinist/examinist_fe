import { Box } from "@mui/material";
import React from "react";
import CourseGroup, { ICourseGroup } from "../CourseGroup";

const groups: ICourseGroup[] = [
  {
    name: "Group 1",
    instructors: [
      { name: "Yousry Taha", username: "yousrytaha" },
      { name: "Marwan Torki", username: "marwantorki" },
    ],
    students: [
      { name: "Yasmine Hassan", username: "yasminehassan" },
      { name: "Menna Samir", username: "mennasamir" },
      { name: "Noha Ahmed", username: "nohaahmed" },
    ],
  },
  {
    name: "Group 2",
    instructors: [
      { name: "Yousry Taha", username: "yousrytaha" },
      { name: "Marwan Torki", username: "marwantorki" },
    ],
    students: [
      { name: "Yasmine Hassan", username: "yasminehassan" },
      { name: "Menna Samir", username: "mennasamir" },
      { name: "Noha Ahmed", username: "nohaahmed" },
    ],
  },
];

export default function CourseGroups() {
  return (
    <div>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Course Groups
      </Box>
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        {groups.map((group) => (
          <div key={group.name}>
            <CourseGroup {...group} />
          </div>
        ))}
      </Box>
    </div>
  );
}
