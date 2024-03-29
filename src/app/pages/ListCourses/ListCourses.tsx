import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ICourse } from "../../types/Course";
import CourseCard from "../ListCourses/CourseCard";
import {
  ICoursesListResponse,
  getCoursesListApi,
} from "../../services/APIs/CoursesAPIs";


export default function Courses() {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  useEffect(() => {
    getCoursesListApi().then(({ data }: ICoursesListResponse) => {
      setCourses(data.courses);
      setIsLoading(false);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          fontSize: "2.2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
          px: 12,
          py: 5,
        }}
      >
        Courses
      </Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{
            paddingBlockX: 4,
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            rowGap={{ xs: 2, md: 5 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {courses.map((course) => {
              return (
                <Grid key={course.id} item xs={4} sm={4} md={4}>
                  <NavLink
                    to={`./${course.id}`}
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
      )}
    </Box>
  );
}
