import { ProfileForm } from "../types/profile";

export const LOCAL_STORAGE_KEY = "profile";

// Function to save a profile to local storage
export const setProfileToLocalStorage = (profile: ProfileForm) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
};

// Function to load a profile from local storage with error handling
export const getProfileFromLocalStorage = (): ProfileForm | null => {
  const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedProfile) return null;

  try {
    return JSON.parse(storedProfile);
  } catch (error) {
    console.error("Error parsing profile from local storage:", error);
    return null; // Return null if there's an error
  }
};

// Function to remove the profile from local storage
export const removeProfileFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
