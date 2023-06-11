import { Navigate, Route, useNavigate } from "react-router-dom";
import Courses from "../pages/ListCourses/ListCourses";
import Test from "../pages/Test";
import { UserRoleEnum, userRoleToPathMap } from "../types/User";
import FacultyAdminLayout from "../layouts/FacultyAdminLayout/FacultyAdminLayout";
import AllExams from "../pages/AllExams/AllExams";
import Schedules from "../pages/Scheduling/Schedules";
import CourseRoutes from "./CourseRoutes";
import StudentExam from "../pages/Course/ExamGrading/StudentExam";
import CreateSchedule from "../pages/Scheduling/CreateSchedule/CreateSchedule";

const FacultyAdminRoutes = () => {
  return (
    <Route>
      <Route path="faculty_admin" element={<FacultyAdminLayout />}>
        <Route path="" element={<Navigate to="courses" />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          {CourseRoutes({ role: UserRoleEnum.FACULTY_ADMIN })}
        </Route>

        <Route path="exams" element={<AllExams />} />

        <Route path="dashboard" element={<Test />} />

        <Route path="calendar" element={<Test />} />

        <Route path="exam-sessions" element={<Test />} />

        <Route path="pending-reports" element={<Test />} />

        <Route path="scheduling">
          <Route index element={<Schedules />} />
          <Route path="new" element={<CreateSchedule />} />
        </Route>

        <Route path="users" element={<Test />} />
      </Route>
      <Route
        path={`${
          userRoleToPathMap[UserRoleEnum.FACULTY_ADMIN]
        }/courses/:courseId/exams/:examId/grading/:studentExamId`}
        element={<StudentExam />}
      />
    </Route>
  );
};

export default FacultyAdminRoutes;
