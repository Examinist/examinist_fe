import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Signin from "../pages/SignIn";
import CourseInfo from "../pages/Course/CourseInfo/CourseInfo";
import CourseSettings from "../pages/Course/CourseSettings";
import QuestionTypes from "../pages/Course/CourseSettings/QuestionTypes/QuestionTypes";
import Template from "../pages/Course/CourseSettings/Template/Template";
import Topics from "../pages/Course/CourseSettings/Topics/Topics";
import Dashboard from "../pages/Course/DashBoard/DashBoard";
import Exams from "../pages/Course/Exams/Exams";
import QuestionBank from "../pages/Course/QuestionBank/QuestionBank";
import Courses from "../pages/ListCourses/ListCourses";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/test" element={<Test />} />

        <Route path="instructor" element={<InstructorLayout />}>
          <Route path="test" element={<Test />} />
          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path="course" element={<CourseLayout />}>
              <Route path="" element={<Navigate to="question-bank" />} />
              <Route path="question-bank" element={<QuestionBank />} />
              <Route path="exams" element={<Exams />} />
              <Route path="course-info" element={<CourseInfo />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings">
                <Route path="" element={<Navigate to="topics" />} />
                <Route path="question-types" element={<QuestionTypes />} />
                <Route path="topics" element={<Topics />} />
                <Route path="exam-template" element={<Template />} />
              </Route>
            </Route>
          </Route>
          <Route path="exams" element={<Test />} />
          <Route path="dashboard" element={<Test />} />
          <Route path="calendar" element={<Test />} />
          <Route path="exam-sessions" element={<Test />} />
          <Route path="pending-reports" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
