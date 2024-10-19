import React, { createContext, useState, useContext, ReactNode } from "react";
import { ProfileForm } from "../types/profile";

// Define the context type
type GlobalContextType = {
  formState: ProfileForm;
  setFormState: React.Dispatch<React.SetStateAction<ProfileForm>>;
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

  return (
    <GlobalContext.Provider value={{ formState, setFormState }}>
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
