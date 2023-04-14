import { Box, Typography, TextField } from '@mui/material';
import React from 'react'
import MCQAnswer from './MCQAnswer';
import TFAnswer from './TFAnswer';
import ShortAnswer from './ShortAnswer';
import EssayAnswer from './EssayAnswer';

interface IAnswerProps {
    questionType: string;
}
export default function Answer({questionType}: IAnswerProps) {
  const renderAnswer = () => {
    if (questionType === "MCQ") {
       return (<MCQAnswer/>);
    } else if (questionType === "T/F") {
     return (<TFAnswer/>)
    } else if(questionType === "Short Answer"){
      return (<ShortAnswer/>)
    }
      else{
        return (<EssayAnswer/>);
      }
    }
  return (
    <Box
      sx={{
        background: "white",
        width: "100%",
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "500" }} color="#6B6767">
        Answer
      </Typography>
      {renderAnswer()}
    </Box>
  );
}
