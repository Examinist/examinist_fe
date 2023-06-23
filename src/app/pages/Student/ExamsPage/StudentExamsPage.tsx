import { Stack } from '@mui/material'
import React from 'react'
import NearestExam from './NearestExam/NearestExam'
import { Upcoming } from '@mui/icons-material'
import UpcommingExams from './UpcommingExams/UpcommingExams'

export default function StudentExamsPage() {
  return (
    <Stack sx={{px: 20, py:4}}>
      <NearestExam />
      <UpcommingExams />
    </Stack>
  )
}
