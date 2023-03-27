import { Box, Typography } from '@mui/material';
import React from 'react'
import theme from '../../../../assets/theme';
import { ICourseGroup } from '../../../types/Course';
import SimpleInfo from './SimpleInfo';
import UsersAccordion from './UsersAccordion';



export default function CourseGroup({name, end_date, instructors, students}: ICourseGroup) {
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
        <SimpleInfo title="End Data" content={end_date.toString()}></SimpleInfo>
        <UsersAccordion title="Instructors" users={instructors} />
        <UsersAccordion title="Students" users={students} />
      </Box>
    </div>
  );
}
