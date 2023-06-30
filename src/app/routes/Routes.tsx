import { Route, Routes } from "react-router-dom";
import Signin from "../pages/SignIn";
import Test from "../pages/Test";
import UnAuthorized from "../pages/UnAuthorized/UnAuthorized";
import FacultyAdminRoutes from "./FacultyAdminRoutes";
import InstructorRoutes from "./InstructorRoutes";
import UniversityAdminRoutes from "./UniversityAdminRoutes";
import StudentRoutes from "./StudentRoutes";
import AutomaticScheduleTest from "../pages/Test/AutomaticScheduleTest";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/test" element={<Test />} />
      <Route path="/test2" element={<AutomaticScheduleTest />} />

      {InstructorRoutes()}
      {FacultyAdminRoutes()}
      {UniversityAdminRoutes()}
      {StudentRoutes()}

      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<div>Page not found.</div>} />
    </Routes>
  );
};

export default AppRoutes;
