import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { ProfileForm } from "../../types/profile";
import { validateProfileForm } from "../../utils/validation";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Loader from "../Loader";

const ProfileFormComponent: React.FC = () => {
  // State for form data
  const { formState, setFormState, saveState, createProfile, fetchState } =
    useGlobalContext();

  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProfileForm, string>>
  >({});
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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationResult = validateProfileForm(formState);

    if (!validationResult.isValid) {
      setFieldErrors(validationResult.errors); // Set individual field errors
      return; // Stop submission if there are validation errors
    }
    const isSave = await createProfile();
    if (isSave) {
      navigate("/profile");
    }
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
