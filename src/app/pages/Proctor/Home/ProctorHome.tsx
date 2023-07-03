import { Stack } from '@mui/system';
import React from 'react'
import UpcommingExams from './UpcommingExams/UpcommingExams';
import SixtyMinutesExams from './SixtyMinutesExams/SixtyMinutesExams';

export default function ProctorHome() {
  return (
    <Stack sx={{ px: 20, py: 4, gap: 3 }}>
      <SixtyMinutesExams />
      <UpcommingExams />
    </Stack>
  );
}
