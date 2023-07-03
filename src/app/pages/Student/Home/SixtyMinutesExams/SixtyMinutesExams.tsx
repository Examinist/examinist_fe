import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import SixtyMinutesExam from "./SixtyMinuteExam";
import {
  IStudentExamsListResponse,
  getStudentSixtyMinutesExamsApi,
} from "../../../../services/APIs/StudentAPIs";
import { IStudentPortalStudentExam } from "../../../../types/StudentPortalStudentExam";
import { UserRoleEnum } from "../../../../types/User";

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
          <SixtyMinutesExam exam={exam} buttonText="Start Exam" role={UserRoleEnum.STUDENT}/>
        </div>
      ))}
    </Stack>
  );
}
