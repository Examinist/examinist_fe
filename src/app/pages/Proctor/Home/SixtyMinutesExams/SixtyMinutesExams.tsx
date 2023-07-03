import React, { useEffect, useState } from 'react'
import { IProctorPortalExam } from '../../../../types/ProctorPortalExam';
import { IExamsListResponse, getProctorSixtyMinutesExamsApi } from '../../../../services/APIs/ProctorAPIs';
import { Stack } from '@mui/system';
import SixtyMinutesExam from '../../../Student/Home/SixtyMinutesExams/SixtyMinuteExam';

const reloadPeriodMins = 1;
export default function SixtyMinutesExams() {
  const [exams, setExams] = useState<IProctorPortalExam[]>([]);

  const loadExams = () => {
    getProctorSixtyMinutesExamsApi().then(
      ({ data }: IExamsListResponse) => {
        setExams(data.exams);
      }
    );
  };

  useEffect(() => {
    loadExams();
    const interval = setInterval(() => {
      loadExams();
      console.log("exam is loaded");
    }, reloadPeriodMins * 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Stack sx={{ gap: 2 }}>
      {exams.map((exam) => (
        <div key={exam.id}>
          <SixtyMinutesExam exam={exam} />
        </div>
      ))}
    </Stack>
  );
}
