import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ProfileForm } from "../types/profile";
import { getProfile, saveProfile } from "../api/profileService"; // Ensure you have deleteProfileFromAPI
import {
  getProfileFromLocalStorage,
  setProfileToLocalStorage,
  removeProfileFromLocalStorage,
} from "../utils/localStorageUtils";

// Define the context type
interface GlobalContextType {
  formState: ProfileForm;
  setFormState: React.Dispatch<React.SetStateAction<ProfileForm>>;
  fetchState: LoadingErrorState;
  saveState: LoadingErrorState;
  deleteState: LoadingErrorState; // New state for delete action
  createProfile: (n: ProfileForm) => Promise<boolean>;
  deleteProfile: () => Promise<boolean>;
}

type LoadingErrorState = {
  loading: boolean;
  error: boolean;
};

// Create the context with a default value of `null` for initialization
const GlobalContext = createContext<GlobalContextType | null>(null);

// Define the provider component's props type
type GlobalProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const [fetchState, setFetchState] = useState<LoadingErrorState>({
    loading: true,
    error: false,
  });
  const [saveState, setSaveState] = useState<LoadingErrorState>({
    loading: false,
    error: false,
  });
  const [deleteState, setDeleteState] = useState<LoadingErrorState>({
    // New state for delete action
    loading: false,
    error: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setFetchState({ loading: true, error: false }); // Reset fetching state
      const profile = getProfileFromLocalStorage();
      if (profile) {
        setFormState(profile);
        setFetchState({ loading: false, error: false });
        return;
      }

      try {
        const profileData = await getProfile();
        setFormState(profileData);
        setFetchState({ loading: false, error: false });
        setProfileToLocalStorage(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setFetchState({ loading: false, error: true });
      }
    };

    fetchProfile();
  }, []);

  const createProfile = async (newProfile: ProfileForm) => {
    setSaveState({ loading: true, error: false });
    try {
      await saveProfile(newProfile);
      setFormState(newProfile);
      setSaveState({ loading: false, error: false });
      setProfileToLocalStorage(newProfile);
      return true;
    } catch (error) {
      console.error("Error creating profile:", error);
      setSaveState({ loading: false, error: true });
      return false;
    }
  };

  // Implement delete profile function
  const deleteProfile = async () => {
    const deleteData: ProfileForm = {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    };
    setDeleteState({ loading: true, error: false }); // Reset delete state
    try {
      await saveProfile(deleteData);
      setFormState(deleteData); // Reset form state
      removeProfileFromLocalStorage();
      setDeleteState({ loading: false, error: false });
      return true;
    } catch (error) {
      console.error("Error deleting profile:", error);
      setDeleteState({ loading: false, error: true }); // Set error state to true on failure
      return false;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        formState,
        setFormState,
        fetchState,
        saveState,
        deleteState,
        createProfile,
        deleteProfile,
      }} // Include deleteState
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
