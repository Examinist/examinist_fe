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
import UniversityAdminLayout from "../layouts/UniversityAdminLayout/UniversityAdminLayout";
import FacultyAdmins from "../pages/FacultyAdmins/FacultyAdmins";
import UniversityLabs from "../pages/UniversityLabs/UniversityLabs";

const UniversityAdminRoutes = () => {
  return (
    <Route path="university_admin" element={<UniversityAdminLayout />}>
      <Route path="" element={<Navigate to="faculty_admins" />} />
        <Route path="faculty_admins" element={<FacultyAdmins />} />
        <Route path="university_labs" element={<UniversityLabs />} />
    </Route>
  );
};

export default UniversityAdminRoutes;
