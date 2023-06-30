import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import RoleGuard from "../components/RoleGuard/RoleGuard";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Courses from "../pages/ListCourses/ListCourses";
import Test from "../pages/Test";
import { UserRoleEnum, userRoleToPathMap } from "../types/User";
import AllExams from "../pages/AllExams/AllExams";
import CourseRoutes from "./CourseRoutes";
import StudentExam from "../pages/Course/ExamGrading/ExamGrading/StudentExam";

const InstructorRoutes = () => {
  return (
    <Route element={<RoleGuard allowedRole={UserRoleEnum.INSTRUCTOR} />}>
      <Route path="instructor" element={<InstructorLayout />}>
        <Route path="" element={<Navigate to="courses" />} />
        <Route path="test" element={<Test />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          {CourseRoutes({ role: UserRoleEnum.INSTRUCTOR })}
        </Route>
        <Route path="exams" element={<AllExams />} />
        <Route path="dashboard" element={<Test />} />
        <Route path="calendar" element={<Test />} />
        <Route path="exam-sessions" element={<Test />} />
        <Route path="pending-reports" element={<Test />} />
      </Route>
      <Route // Testing Grading Layout
        path={`${userRoleToPathMap[UserRoleEnum.INSTRUCTOR]}/courses/:courseId/exams/:examId/grading/:studentExamId`}
        element={<StudentExam />}
      />
    </Route>
  );
};

export default InstructorRoutes;
