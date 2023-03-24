import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import React from "react";
import theme from "../../../assets/theme";
import { CoursesImages } from "./CoursesImages";

export interface ICourse {
  title: string;
  code: string;
}
export default function CourseCard({ title, code }: ICourse) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs>
        <Card
          sx={{
            cursor: "pointer",
          }}
        >
          <CardActionArea 
            sx={{
                height: 250,
                width: 300,
              }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs>
                <CardMedia
                  component="img"
                  height="100"
                  width="100"
                  image={CoursesImages[Math.floor(Math.random() * CoursesImages.length)]}
                  alt=""
                />
              </Grid>

              <Grid item xs>
                <Typography
                  justifyContent="center"
                  alignContent="center"
                  variant="h5"
                  component="div"
                >
                  {code}
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" sx={{color:theme.palette.primary.main }}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}
