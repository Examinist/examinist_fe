import { Box, Grid } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CourseCard, { ICourse } from "../ListCourses/CourseCard";

const courses: ICourse[] = [
  {
    title: "Group 1",
    code: "ccse345",
  },
  {
    title: "Group 1",
    code: "ccse345",
  },
  {
    title: "Group 1",
    code: "ccse345",
  },
  {
    title: "Group 1",
    code: "ccse345",
  },
  {
    title: "Group 1",
    code: "ccse345",
  },
  {
    title: "Group 1",
    code: "ccse345",
  },
];

export default function Courses() {
  return (
    <div>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingBlock: 5,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {courses.map((course) => {
            return (
              <Grid item xs={4} sm={4} md={4}>
                <NavLink
                  to={"/instructor/courses/course"}
                  style={({ isActive }) => {
                    return {
                      textDecoration: "none",
                    };
                  }}
                >
                  <CourseCard title={course.title} code={course.code} />
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
