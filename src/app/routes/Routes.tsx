import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Signin from "../pages/Auth/Signin";
import Courses from "../pages/ListCourses";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/test" element={<Test />} />

        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="test" element={<Test />} />
          <Route path="courses" element={<Courses />}></Route>
          <Route path="exams" element={<Test />} />
          <Route path="dashboard" element={<Test />} />
          <Route path="calendar" element={<Test />} />
          <Route path="exam-sessions" element={<Test />} />
          <Route path="pending-reports" element={<Test />} />
          <Route path="course" element={<CourseLayout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
