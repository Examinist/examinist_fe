import { Route } from "react-router";
import TopLayout from "../layouts/UpperLayout/TopLayout";
import StudentHome from "../pages/Student/Home/StudentHome";
import StudentPortalExam from "../pages/Student/Exam/StudentPortalExam";

export default function StudentRoutes() {
  return (
    <Route>
      <Route path="student" element={<TopLayout />}>
        <Route path="" element={<StudentHome />} />
      </Route>
      <Route path="student/exams/:examId" element={<StudentPortalExam />} />
    </Route>
  );
}
