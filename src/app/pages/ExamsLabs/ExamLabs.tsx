import { Box, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import React from 'react'
import theme from '../../../assets/theme';
import { mockExam } from '../../services/APIs/mockData/MockData';
import { ArrowBack } from '@mui/icons-material';

export default function ExamLabs() {
  const navigate = useNavigate();
  const exam = mockExam;

  const getDurationTime = () => {
    var date = new Date(exam.scheduled_date)
    var result = new Date(date.setMinutes(date.getMinutes() + exam.duration))
    return result
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        //rowGap: "1rem",
        px: "5%",
        pt: 4,
      }}
    >
      <Box display="flex" sx={{ gap: 2 }}>
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBack
            sx={{ color: theme.palette.text.primary }}
            fontSize="large"
          />
        </IconButton>
        <Box
          sx={{
            fontSize: "1.9rem",
            fontWeight: "medium",
            paddingTop: "5px",
          }}
        >
          {exam.title}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button>Save Changes</Button>
        </Box>
      </Box>
      <Box
        sx={{
          fontSize: "20px",
          px: "6.5%",
          color: "#6B6767",
          fontWeight: "medium"
        }}>
        <Box>{"Course: " + exam.course.title + " - " + exam.course.code}</Box>
        <Box>
          {exam.scheduled_date.toLocaleString('en-US', {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) + " - " + getDurationTime().toLocaleTimeString('en-US', {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Box>
      </Box>
    </Box>
  )
}
