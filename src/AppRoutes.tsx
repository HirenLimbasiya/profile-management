import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileFormComponent from "./components/ProfileForm/ProfileForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>From /</div>} />
      <Route path="/profile-form" element={<ProfileFormComponent />} />
      <Route path="/profile" element={<div>From Profile</div>} />
      <Route path="*" element={<div>From Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
