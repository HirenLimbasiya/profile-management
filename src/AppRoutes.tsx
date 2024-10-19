import { Route, Routes } from "react-router-dom";
import ProfileFormPage from "./pages/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>From /</div>} />
      <Route path="/profile-form" element={<ProfileFormPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<div>From Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
