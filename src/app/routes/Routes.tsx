import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import InstructorLayout from "../layouts/instructorLayout/InstructorLayout";
import Signin from "../pages/Auth/Signin";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/test" element={<Test />} />
        <Route path="/layout" element={<InstructorLayout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
