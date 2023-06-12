import { Box, Button } from '@mui/material';
import React from 'react'
import theme from '../../../../../assets/theme';

export default function ScheduleExams() {
  return (
    <Box display="flex" sx={{ flexDirection: "column", gap: 3 }}>
      <Box display="flex">
        <Box
          sx={{
            fontSize: "1.7rem",
            fontWeight: "medium",
            p: 1,
            color: theme.palette.gray.dark,
          }}
        >
          Schedule Exams
        </Box>
        <Button
          variant="outlined"
          sx={{
            ml: "auto",
            borderRadius: 4,
            height: "fit-content",
            py: 1,
            px: 3,
            alignSelf: "center",
            fontWeight: 700,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          Generate Automatic Schedule
        </Button>
      </Box>
    </Box>
  );
}
