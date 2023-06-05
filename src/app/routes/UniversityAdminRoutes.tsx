import { Navigate, Route } from "react-router-dom";
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
