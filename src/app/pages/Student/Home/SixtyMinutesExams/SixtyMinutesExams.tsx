import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  mockExam,
  mockStudentExam,
} from "../../../../services/APIs/mockData/MockData";
import SixtyMinutesExam from "./SixtyMinuteExam";
import {
  IStudentExamsListResponse,
  getStudentSixtyMinutesExamsApi,
} from "../../../../services/APIs/StudentExamAPIs";
import { IStudentPortalStudentExam } from "../../../../types/StudentPortalStudentExam";

const reloadPeriodMins = 1;
export default function SixtyMinutesExams() {
  const [exams, setExams] = useState<IStudentPortalStudentExam[]>([]);

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
