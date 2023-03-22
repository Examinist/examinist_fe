import { Box, Typography } from '@mui/material';
import React from 'react'
import theme from '../../../../assets/theme';
import UsersAccordion, { User } from './UsersAccordion';


export interface ICourseGroup{
    name: string;
    instructors: User[];
    students: User[];
}
export default function CourseGroup({name, instructors, students}: ICourseGroup) {
  return (
    <div>
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: "medium",
          color: theme.palette.gray.dark
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <UsersAccordion title="Instructors" users={instructors} />
        <UsersAccordion title="Students" users={students} />
      </Box>
    </div>
  );
}
