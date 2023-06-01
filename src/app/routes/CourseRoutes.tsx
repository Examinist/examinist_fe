import { Dashboard, Grading } from "@mui/icons-material";
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import CourseGroups from "../pages/Course/CourseInfo/CourseGroups/CourseGroups";
import GeneralInfo from "../pages/Course/CourseInfo/GeneralInfo/GeneralInfo";
import QuestionTypes from "../pages/Course/CourseSettings/QuestionTypes/QuestionTypes";
import Template from "../pages/Course/CourseSettings/Template/Template";
import Topics from "../pages/Course/CourseSettings/Topics/Topics";
import AutomaticExam from "../pages/Course/ExamCreation/AutomaticExam";
import ManualExam from "../pages/Course/ExamCreation/ManualExam";
import CourseExams from "../pages/Course/Exams/CourseExams";
import ExamView from "../pages/Course/Exams/ExamView";
import QuestionBank from "../pages/Course/QuestionBank/QuestionBank";
import AddQuestion from "../pages/Course/QuestionForms/AddQuestion/AddQuestion";
import EditQuestion from "../pages/Course/QuestionForms/EditQuestion/EditQuestion";
import ExamEdit from "../pages/Course/ExamEditing/ExamEdit";
import ExamGrading from "../pages/Course/ExamGrading/ExamGrading";
import { UserRoleEnum, userRoleToPathMap } from "../types/User";


interface CourseRoutesProps {
  role: UserRoleEnum;
}

export default function CourseRoutes({role}: CourseRoutesProps) {
  return (
    <Route path=":courseId" element={<CourseLayout />}>
      <Route path="" element={<Navigate to="course-info" />} />
      <Route path="question-bank">
        <Route path="" element={<QuestionBank />} />
        <Route path="add" element={<AddQuestion />} />
        <Route path=":questionId/edit" element={<EditQuestion />} />
      </Route>
      <Route path="create-exam">
        <Route path="manual-creation" element={<ManualExam />}></Route>
        <Route path="automatic-creation" element={<AutomaticExam />} />
      </Route>
      <Route path="exams">
        <Route path="" element={<CourseExams />} />
        <Route path=":examId">
          <Route path="" element={<ExamView />} />
          <Route path="edit" element={<ExamEdit />} />
          <Route path="grading" element={<ExamGrading />} />
        </Route>
      </Route>
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

      {role === UserRoleEnum.FACULTY_ADMIN && (
        <>
          <Route path="general-info" element={<GeneralInfo />} />
          <Route path="course-groups" element={<CourseGroups />} />
        </>
      )}

    </Route>
  );
}
