import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Signin from "../pages/Auth/Signin";
import CourseInfo from "../pages/Course/CourseInfo";
import CourseSettings from "../pages/Course/CourseSettings";
import QuestionTypes from "../pages/Course/CourseSettings/QuestionTypse";
import Template from "../pages/Course/CourseSettings/Template";
import Topics from "../pages/Course/CourseSettings/Topics";
import Dashboard from "../pages/Course/DashBoard";
import Exams from "../pages/Course/Exams";
import QuestionBank from "../pages/Course/QuestionBank";
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
          <Route path="course" element={<CourseLayout />}>
            <Route path="settings" element={<CourseSettings />}>
              <Route path="question-types" element={<QuestionTypes />} />
              <Route path="topics" element={<Topics />} />
              <Route path="exam-template" element={<Template />} />
            </Route>
            <Route path="question-bank" element={<QuestionBank />} />
            <Route path="exams" element={<Exams />} />
            <Route path="course-info" element={<CourseInfo />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
