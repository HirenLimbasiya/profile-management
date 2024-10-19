import { ProfileForm, ValidationResult } from "../types/profile";

export const validateProfileForm = (
  formState: ProfileForm
): ValidationResult => {
  const errors: ValidationResult["errors"] = {};

  // Validate firstName
  if (!formState.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (formState.firstName.length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  // Validate email
  if (!formState.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate age
  if (formState.age !== "") {
    if (
      isNaN(Number(formState.age)) ||
      Number(formState.age) < 0 ||
      !Number.isInteger(Number(formState.age))
    ) {
      errors.age = "Please enter a valid age.";
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors }; // Return individual errors
};
