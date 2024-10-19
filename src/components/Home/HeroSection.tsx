import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate("/profile-form")
  }
  return (
    <div className="bg-bg text-text flex flex-col justify-center items-center h-[calc(100vh-60px)] px-8">
      <h1 className="text-4xl font-bold mb-2">Welcome to the</h1>
      <h1 className="text-4xl font-bold text-primary mb-4">
        Profile Management Application
      </h1>
      <p className="text-lg mb-8">
        Manage your profile easily and efficiently.
      </p>
      <button className="bg-primary text-bg py-2 px-4 rounded-lg shadow-md transition-transform hover:scale-105" onClick={navigateToForm}>
        Manage Profile
      </button>
    </div>
  );
};

export default HeroSection;
