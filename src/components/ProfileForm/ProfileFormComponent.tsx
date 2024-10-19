import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { ProfileForm } from "../../types/profile";
import { validateProfileForm } from "../../utils/validation";
import Button from "../Form/Button";
import Input from "../Form/Input";
import Loader from "../Loader";

const ProfileFormComponent: React.FC = () => {
  const {
    saveState,
    createProfile,
    deleteProfile,
    fetchState,
    deleteState,
    formState,
  } = useGlobalContext();
  const [profileData, setProfileData] = useState<ProfileForm>(formState);

  useEffect(() => {
    setProfileData(formState);
  }, [formState]);

  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProfileForm, string>>
  >({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: name === "age" ? (value ? Number(value) : "") : value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationResult = validateProfileForm(profileData);

    if (!validationResult.isValid) {
      setFieldErrors(validationResult.errors);
      return;
    }

    const isSave = await createProfile(profileData);
    if (isSave) {
      navigate("/profile");
    }
  };

  const handleDelete = async () => {
    const isDeleted = await deleteProfile(); // Call the delete profile function
    if (isDeleted) {
      navigate("/profile"); // Redirect after deletion
    }
  };

  if (fetchState.loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-bg text-text">
        <Loader size={30} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-bg text-text">
      <div className="bg-muted rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Profile Form</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id="first-name"
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            error={fieldErrors.firstName}
            required
          />
          <Input
            id="last-name"
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            error={fieldErrors.lastName}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            required
          />
          <Input
            id="age"
            label="Age"
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            error={fieldErrors.age}
          />
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              type="submit"
              disabled={saveState.loading || deleteState.loading}
            >
              {saveState.loading ? (
                <Loader size={5} />
              ) : formState.firstName ? (
                "Update"
              ) : (
                "Submit"
              )}
            </Button>

            {formState.firstName && (
              <Button
                type="button"
                onClick={handleDelete}
                variant="danger" // Set variant to danger for delete button
                disabled={deleteState.loading || saveState.loading}
              >
                {deleteState.loading ? <Loader size={5} /> : "Delete"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileFormComponent;
