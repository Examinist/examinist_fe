import { Stack } from '@mui/material'
import React from 'react'
import NearestExam from './NearestExams/NearestExam'
import { Upcoming } from '@mui/icons-material'
import UpcommingExams from './UpcommingExams/UpcommingExams'
import { mockExam } from '../../../services/APIs/mockData/MockData'
import NearestExams from './NearestExams/NearestExams'

export default function StudentExamsPage() {
  return (
    <Stack sx={{px: 20, py:4, gap: 3}}>
      <NearestExams/>
      <UpcommingExams />
    </Stack>
  )
}
