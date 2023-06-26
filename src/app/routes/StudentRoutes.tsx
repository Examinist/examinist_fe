import React from 'react'
import { Route } from 'react-router';
import StudentLayout from '../layouts/StudentLayout/StudentLayout';
import StudentExamsPage from '../pages/Student/ExamsPage/StudentExamsPage';
import StudentExam from '../pages/Student/Exam/StudentExam';

export default function StudentRoutes() {
  return (
    <Route>
      <Route path="student" element={<StudentLayout />}>
        <Route path="" element={<StudentExamsPage/>} />
      </Route>
      <Route path="student/exams/:examId" element={<StudentExam />} />
    </Route>
  );
}
