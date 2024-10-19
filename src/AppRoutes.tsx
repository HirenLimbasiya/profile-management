import { Route, Routes } from "react-router-dom";
import ProfileFormPage from "./pages/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import { useToggleTheme } from "./hooks/useToggleTheme";

const AppRoutes = () => {
  useToggleTheme()
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile-form" element={<ProfileFormPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
