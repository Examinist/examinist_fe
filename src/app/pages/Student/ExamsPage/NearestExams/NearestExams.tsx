import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  mockExam,
  mockStudentExam,
} from "../../../../services/APIs/mockData/MockData";
import NearestExam from "./NearestExam";
import {
  IStudentExamsListResponse,
  getStudentSixtyMinutesExamsApi,
} from "../../../../services/APIs/StudentExamAPIs";
import { IStudentExam } from "../../../../types/StudentExam";

const reloadPeriodMins = 1;
export default function NearestExams() {
  const [exams, setExams] = useState<IStudentExam[]>([]);

  const loadExams = () => {
    getStudentSixtyMinutesExamsApi().then(
      ({ data }: IStudentExamsListResponse) => {
        setExams(data.student_exams);
      }
    );
  };

  useEffect(() => {
    loadExams();
    const interval = setInterval(() => {
      loadExams();
      console.log("exam is loaded")
    }, reloadPeriodMins*60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack sx={{ gap: 2 }}>
      {exams.map((exam) => (
        <div key={exam.id}>
          <NearestExam exam={exam} />
        </div>
      ))}
    </Stack>
  );
}
