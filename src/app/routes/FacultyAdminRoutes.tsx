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
import AddQuestion from "../pages/Course/QuestionForms/AddQuestion/AddQuestion";
import FacultyAdminLayout from "../layouts/FacultyAdminLayout/FacultyAdminLayout";
import AllExams from "../pages/AllExams/AllExams";
import Scheduling from "../pages/Scheduling/Scheduling";
import SchedulingLayout from "../layouts/SchedulingLayout/SchedulingLayout";
import SchedulingExams from "../pages/Scheduling/SchedulingExams/SchedulingExams";
import TimeTables from "../pages/Scheduling/TimeTables/TimeTables";
import EditQuestion from "../pages/Course/QuestionForms/EditQuestion/EditQuestion";
import ManualExam from "../pages/Course/ExamCreation/ManualExam";
import AutomaticExam from "../pages/Course/ExamCreation/AutomaticExam";
import AllExams from "../pages/AllExams/AllExams";
import Scheduling from "../pages/Scheduling/Scheduling";
import SchedulingLayout from "../layouts/SchedulingLayout/SchedulingLayout";
import SchedulingExams from "../pages/Scheduling/SchedulingExams/SchedulingExams";
import TimeTables from "../pages/Scheduling/TimeTables/TimeTables";
import EditQuestion from "../pages/Course/QuestionForms/EditQuestion/EditQuestion";

const FacultyAdminRoutes = () => {
  return (
    <Route>
      <Route path="faculty_admin" element={<FacultyAdminLayout />}>
        <Route path="" element={<Navigate to="courses" />} />

        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path=":courseId" element={<CourseLayout />}>
            <Route path="" element={<Navigate to="course-info" />} />
            <Route path="question-bank">
              <Route path="" element={<QuestionBank />} />
              <Route path="add" element={<AddQuestion />}></Route>
              <Route path=":questionId/edit" element={<EditQuestion />} />
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
            <Route path="create-exam">
              <Route path="manual-creation" element={<ManualExam />}></Route>
              <Route path="automatic-creation" element={<AutomaticExam />} />
            </Route>
            <Route path="general-info" element={<GeneralInfo />} />
            <Route path="course-groups" element={<CourseGroups />} />
          </Route>
        </Route>

        <Route path="exams" element={<AllExams />} />

        <Route path="dashboard" element={<Test />} />

        <Route path="calendar" element={<Test />} />

        <Route path="exam-sessions" element={<Test />} />

        <Route path="pending-reports" element={<Test />} />

        <Route path="scheduling" element={<SchedulingLayout />}>
          <Route path="" element={<Navigate to="exams" />} />
          <Route path="exams" element={<SchedulingExams />} />
          <Route path="time-tables" element={<TimeTables />} />
        </Route>

        <Route path="users" element={<Test />} />
      </Route>
    </Route>
  );
};

export default FacultyAdminRoutes;
