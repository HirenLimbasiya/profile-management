import React, { useEffect, useState } from "react";
import { getProfile, saveProfile } from "../../api/profileService";
import { ProfileForm } from "../../types/profile";
import { validateProfileForm } from "../../utils/validation";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Loader from "../Loader";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

// Define a common type for loading and error state
type LoadingErrorState = {
  loading: boolean;
  error: boolean; // Change error to boolean
};

const ProfileFormComponent: React.FC = () => {
  // State for form data
  const [formState, setFormState] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  // State for fetching data
  const [fetchState, setFetchState] = useState<LoadingErrorState>({
    loading: true,
    error: false,
  });

  // State for saving data
  const [saveState, setSaveState] = useState<LoadingErrorState>({
    loading: false,
    error: false,
  });
  const navigate = useNavigate();

  // State for individual field errors
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProfileForm, string>>
  >({});

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setFetchState({ loading: true, error: false }); // Reset fetching state
      try {
        const profileData = await getProfile();
        setFormState(profileData);
        setFetchState({ loading: false, error: false }); // Set loading and error to false after successful fetch
      } catch (error) {
        console.error("Error fetching profile:", error);
        setFetchState({ loading: false, error: true }); // Set error state to true on failure
      }
    };

    fetchProfile();
  }, []);

  // Handle profile creation
  const handleProfileCreation = async () => {
    setSaveState({ loading: true, error: false }); // Reset saving state
    try {
      const newProfile = await saveProfile(formState);
      console.log("Profile created:", newProfile);
      setFormState({ firstName: "", lastName: "", email: "", age: "" }); // Reset form
      setSaveState({ loading: false, error: false }); // Set loading and error to false after successful save
      navigate("/profile");
    } catch (error) {
      console.error("Error creating profile:", error);
      setSaveState({ loading: false, error: true }); // Set error state to true on failure
    }
  };

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "age" ? (value ? Number(value) : "") : value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear field error when user starts typing
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationResult = validateProfileForm(formState);

    if (!validationResult.isValid) {
      setFieldErrors(validationResult.errors); // Set individual field errors
      setSaveState({ ...saveState, error: true }); // Set error state to true
      return; // Stop submission if there are validation errors
    }
    handleProfileCreation();
  };

  // Render loading states and error messages
  if (fetchState.loading) {
    return (
      <div>
        <Loader size={30} />
      </div>
    ); // Loader while fetching
  }

  return (
    <div>
      <Header />
      <h1>Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="first-name"
          label="First Name"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          error={fieldErrors.firstName} // Individual error for first name
          required
        />
        <Input
          id="last-name"
          label="Last Name"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          error={fieldErrors.lastName} // Individual error for last name
        />
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          error={fieldErrors.email} // Individual error for email
          required
        />
        <Input
          id="age"
          label="Age"
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
          error={fieldErrors.age} // Individual error for age
        />
        <Button type="submit" disabled={saveState.loading}>
          {" "}
          {/* Disable button while saving */}
          {saveState.loading ? <Loader size={5} /> : "Submit"}{" "}
          {/* Show loading text on button */}
        </Button>
      </form>
    </div>
  );
};

export default ProfileFormComponent;
