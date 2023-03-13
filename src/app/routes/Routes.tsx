import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Signin from "../pages/Auth/Signin";
import Topics from "../pages/Course/CourseSettings/Topics";
import Courses from "../pages/ListCourses";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signin />} />

        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="test" element={<Test />} />
          <Route path="courses" element={<Courses />}></Route>
          <Route path="exams" element={<Test />} />
          <Route path="dashboard" element={<Test />} />
          <Route path="calendar" element={<Test />} />
          <Route path="topics" element={<Topics />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
