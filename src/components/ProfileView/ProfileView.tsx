import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom"; // Import Link for navigation

const ProfileView: React.FC = () => {
  const { fetchState, formState } = useGlobalContext();

  const getAvatarLetter = (name: string | undefined) => {
    return name ? name.charAt(0).toUpperCase() : "-";
  };

  if (fetchState.loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-bg text-text">
        Loading...
      </div>
    );
  }

  if (fetchState.error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-bg text-text">
        Error loading profile.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-bg text-text">
      <div className="bg-muted rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Profile Details
          {!formState?.firstName && (
            <span className="ml-3 text-xs">
              don't have any profile.{" "}
              <Link to="/profile-form" className="text-blue-500 underline">
                Create a new
              </Link>
            </span>
          )}
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-bg text-3xl font-bold border-4 border-bg transition-transform duration-300 hover:scale-105">
            {getAvatarLetter(formState?.firstName)}
          </div>
        </div>

        {/* Enhanced Styling for Labels and Values */}
        <div className="space-y-3">
          {renderDetail("First Name", formState?.firstName)}
          {renderDetail("Last Name", formState?.lastName)}
          {renderDetail("Email", formState?.email)}
          {renderDetail("Age", formState?.age)}
        </div>
      </div>
    </div>
  );
};

const renderDetail = (label: string, value: string | number | undefined) => (
  <div className="flex justify-between items-center border-b border-muted pb-2">
    <span className="font-semibold text-base text-secondary">{label}:</span>
    <span className="text-base text-accent">{value || "-"}</span>
  </div>
);

export default ProfileView;
