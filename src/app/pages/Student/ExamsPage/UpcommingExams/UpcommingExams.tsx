import { Box, Stack } from '@mui/system'
import React from 'react'
import ExamsTable from './ExamsTable/ExamsTable';
import { mockExamsList } from '../../../../services/APIs/mockData/MockData';

export default function UpcommingExams() {
  return (
    <Stack sx={{gap: 4}}>
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "medium",
          fontFamily: "montserrat",
        }}
      >
        Upcomming Exams
      </Box>
      <ExamsTable exams={mockExamsList}/>
    </Stack>
  );
}
