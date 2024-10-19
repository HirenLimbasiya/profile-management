import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ProfileForm } from "../types/profile";
import { getProfile, saveProfile } from "../api/profileService";

// Define the context type
interface GlobalContextType {
  formState: ProfileForm;
  setFormState: React.Dispatch<React.SetStateAction<ProfileForm>>;
  fetchState: LoadingErrorState;
  saveState: LoadingErrorState;
  createProfile: () => Promise<boolean>;
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

  const createProfile = async () => {
    setSaveState({ loading: true, error: false }); // Reset saving state
    try {
      await saveProfile(formState);
      setFormState({ firstName: "", lastName: "", email: "", age: "" }); // Reset form
      setSaveState({ loading: false, error: false }); // Set loading and error to false after successful save
      // navigate("/profile");
      return true
    } catch (error) {
      console.error("Error creating profile:", error);
      setSaveState({ loading: false, error: true }); // Set error state to true on failure
      return false
    }
  };

  return (
    <GlobalContext.Provider
      value={{ formState, setFormState, fetchState, saveState, createProfile }}
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
