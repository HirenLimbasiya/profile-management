export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  age: number | ""; // Allow age to be a number or an empty string
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
  };
}
