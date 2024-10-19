// ToastContext.tsx
import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastType = "success" | "error";

interface ToastContextProps {
  showSuccessToast: (m: string) => void; // Function to show success toast
  showErrorToast: (m: string) => void; // Function to show error toast
  showDefaultToast: (m: string) => void; // Function to show default success toast
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: ToastType; duration?: number }[]
  >([]);
  const [nextId, setNextId] = useState(0);

  const addToast = (
    message: string,
    type: ToastType = "success",
    duration?: number
  ) => {
    setToasts((prev) => [{ id: nextId, message, type, duration }, ...prev]);
    setNextId((prev) => prev + 1);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccessToast = (message: string) => {
    addToast(message, "success", 3000);
  };

  const showErrorToast = (message: string) => {
    addToast(message, "error", 3000);
  };

  const showDefaultToast = (message: string) => {
    addToast(message); // No type specified, defaults to 'success'
  };

  return (
    <ToastContext.Provider
      value={{ showSuccessToast, showErrorToast, showDefaultToast }}
    >
      {children}
      <div className="fixed right-0 p-4 space-y-2 z-50">
        {toasts.map(
          (
            { id, message, type, duration },
            index // Pass the index here
          ) => (
            <Toast
              key={id}
              message={message}
              type={type}
              duration={duration}
              onClose={() => removeToast(id)}
              index={index} // Pass the index to Toast
            />
          )
        )}
      </div>
    </ToastContext.Provider>
  );
};
