import { Box } from '@mui/material'
import React from 'react'
import HorizontalStepper from './Stepper'

export default function ManualExam() {
  return (
    <Box sx={{ width: "100%", px: 5,py:5 }}>
        <HorizontalStepper isAutomatic={false}/>
    </Box>
    )
}
