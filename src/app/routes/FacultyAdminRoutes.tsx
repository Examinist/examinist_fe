import { Navigate, Route } from "react-router-dom";
import RoleGuard from "../components/RoleGuard/RoleGuard";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import CourseGroups from "../pages/Course/CourseInfo/CourseGroups/CourseGroups";
import GeneralInfo from "../pages/Course/CourseInfo/GeneralInfo/GeneralInfo";
import QuestionTypes from "../pages/Course/CourseSettings/QuestionTypes/QuestionTypes";
import Template from "../pages/Course/CourseSettings/Template/Template";
import Topics from "../pages/Course/CourseSettings/Topics/Topics";
import Dashboard from "../pages/Course/DashBoard/DashBoard";
import Exams from "../pages/Course/Exams/Exams";
import QuestionBank from "../pages/Course/QuestionBank/QuestionBank";
import Courses from "../pages/ListCourses/ListCourses";
import Test from "../pages/Test";
import { UserRoleEnum } from "../types/User";
import AddQuestion from "../pages/Course/AddQuestion/AddQuestion";
import FacultyAdminLayout from "../layouts/FacultyAdminLayout/FacultyAdminLayout";

const FacultyAdminRoutes = () => {
  return (
    <Route element={<RoleGuard allowedRole={UserRoleEnum.FACULTY_ADMIN} />}>
      <Route path="faculty_admin" element={<FacultyAdminLayout />}>
        <Route path="" element={<Navigate to="courses" />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path=":courseId" element={<CourseLayout />}>
            <Route path="" element={<Navigate to="course-info" />} />
            <Route path="question-bank">
              <Route path="" element={<QuestionBank />} />
              <Route path="add" element={<AddQuestion />}></Route>
            </Route>
            <Route path="exams" element={<Exams />} />
            <Route path="course-info">
              <Route path="" element={<Navigate to="general-info" />} />
              <Route path="general-info" element={<GeneralInfo />} />
              <Route path="course-groups" element={<CourseGroups />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings">
              <Route path="" element={<Navigate to="topics" />} />
              <Route path="question-types" element={<QuestionTypes />} />
              <Route path="topics" element={<Topics />} />
              <Route path="exam-template" element={<Template />} />
            </Route>
          </Route>
        </Route>
        <Route path="exams" element={<Exams />} />
        <Route path="dashboard" element={<Test />} />
        <Route path="calendar" element={<Test />} />
        <Route path="exam-sessions" element={<Test />} />
        <Route path="pending-reports" element={<Test />} />
        <Route path="scheduling" element={<Test />} />
        <Route path="users" element={<Test />} />
      </Route>
    </Route>
  );
};

export default FacultyAdminRoutes;
