import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const ProfileView: React.FC = () => {
  // const [profile, setProfile] = useState<ProfileForm | null>(null);
  // const [state, setState] = useState<{ loading: boolean; error: boolean }>({
  //   loading: true,
  //   error: false,
  // });

  const { fetchState, formState } = useGlobalContext();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     setState({ loading: true, error: false });
  //     try {
  //       const profileData = await getProfile();
  //       setProfile(profileData);
  //       setState({ loading: false, error: false });
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //       setState({ loading: false, error: true });
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const getAvatarLetter = (name: string | undefined) => {
    return name ? name.charAt(0).toUpperCase() : "-";
  };

  if (fetchState.loading) return <div>Loading...</div>;
  if (fetchState.error) return <div>Error loading profile.</div>;

  return (
    <div>
      <h2>Profile Details</h2>

      <div style={styles.avatar}>{getAvatarLetter(formState?.firstName)}</div>

      <p>First Name: {formState?.firstName || "-"}</p>
      <p>Last Name: {formState?.lastName || "-"}</p>
      <p>Email: {formState?.email || "-"}</p>
      <p>Age: {formState?.age || "-"}</p>
    </div>
  );
};

const styles = {
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#fff",
    marginBottom: "10px",
  },
};

export default ProfileView;
