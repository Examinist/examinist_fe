import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ExamGrading() {
  const navigate = useNavigate();
  return (
    <div>
      <div>ExamGrading</div>
      <Button onClick={()=>{navigate('./10')}}>View Student Exam</Button>
    </div>
  );
}
