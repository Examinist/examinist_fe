import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "../pages/Auth/Signin";
import Test from "../pages/Test";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
