import React, { useEffect, useState } from "react";
import { ProfileForm } from "../../types/profile";
import { getProfile } from "../../api/profileService";

const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<ProfileForm | null>(null);
  const [state, setState] = useState<{ loading: boolean; error: boolean }>({
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setState({ loading: true, error: false });
      try {
        const profileData = await getProfile();
        setProfile(profileData);
        setState({ loading: false, error: false });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setState({ loading: false, error: true });
      }
    };

    fetchProfile();
  }, []);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error loading profile.</div>;

  return (
    <div>
      <h2>Profile Details</h2>
      <p>First Name: {profile?.firstName || "-"}</p>
      <p>Last Name: {profile?.lastName || "-"}</p>
      <p>Email: {profile?.email || "-"}</p>
      <p>Age: {profile?.age || "-"}</p>
    </div>
  );
};

export default ProfileView;
