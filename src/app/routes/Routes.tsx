import { Route, Routes } from "react-router-dom";
import Signin from "../pages/SignIn";
import Test from "../pages/Test";
import UnAuthorized from "../pages/UnAuthorized/UnAuthorized";
import FacultyAdminRoutes from "./FacultyAdminRoutes";
import InstructorRoutes from "./InstructorRoutes";
import UniversityAdminRoutes from "./UniversityAdminRoutes";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/test" element={<Test />} />

      {InstructorRoutes()}
      {FacultyAdminRoutes()}
      {UniversityAdminRoutes()}

      <Route path="/unauthorized" element={<UnAuthorized />} />
    </Routes>
  );
};

export default AppRoutes;
