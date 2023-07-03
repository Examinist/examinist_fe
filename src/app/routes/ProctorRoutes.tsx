import React from 'react'
import { Route } from 'react-router';
import TopLayout from '../layouts/UpperLayout/TopLayout';
import ProctorHome from '../pages/Proctor/Home/ProctorHome';
import ProctorPortalExam from '../pages/Proctor/Exam/ProctorPortalExam';

export default function ProctorRoutes() {
  return (
    <Route>
      <Route path="proctor" element={<TopLayout />}>
        <Route path="" element={<ProctorHome />} />
      </Route>
      <Route path="proctor/exams/:examId" element={<ProctorPortalExam />} />
    </Route>
  );
}
