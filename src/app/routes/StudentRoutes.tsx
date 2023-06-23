import React from 'react'
import { Route } from 'react-router';
import StudentLayout from '../layouts/StudentLayout/StudentLayout';
import StudentExamsPage from '../pages/Student/ExamsPage/StudentExamsPage';

export default function StudentRoutes() {
  return (
    <Route>
      <Route path="student" element={<StudentLayout />}>
        <Route path="" element={<StudentExamsPage/>} />
      </Route>
    </Route>
  );
}
