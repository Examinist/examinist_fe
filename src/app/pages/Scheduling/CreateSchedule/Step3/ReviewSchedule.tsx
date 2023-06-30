import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import theme from '../../../../../assets/theme';
import { ScheduleContext } from '../ScheduleContext';
import ScheduleReviewTable from '../../ScheduleTables/ScheduleReviewTable';

export default function ReviewSchedule() {
  const {exams, setExams} = React.useContext(ScheduleContext);
  return (
    <Box display="flex" sx={{ flexDirection: "column", gap: 3 }}>
      <Box display="flex">
        <Box
          sx={{
            fontSize: "1.7rem",
            fontWeight: "medium",
            px: 1,
            py: 2,
            color: theme.palette.gray.dark,
          }}
        >
          Review Schedule
        </Box>
        <Button
          variant="contained"
          sx={{
            ml: "auto",
            borderRadius: 3,
            boxShadow: 0,
            height: "fit-content",
            py: 1,
            px: 5,
            alignSelf: "center",
            fontWeight: 650,
          }}
        >
          Submit
        </Button>
      </Box>
      <Box display="flex"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "15px",
          }}>
          <ScheduleReviewTable examList={exams}></ScheduleReviewTable>
        </Box>
    </Box>
  );
}
