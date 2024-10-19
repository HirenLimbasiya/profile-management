// Toast.tsx
import React, { useEffect } from "react";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type?: ToastType; // Make type optional
  duration?: number;
  onClose: () => void;
  index: number; // New prop for index
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
  index, // Accept the index prop
}) => {
  // Default type to 'success'
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-800";
    }
  };

  // Calculate the bottom position using a negative index
  const bottomPosition = `${(index * 48) + (index * 18)}px`; // Adjust the multiplier for desired spacing

  return (
    <div
      className={`transition-opacity duration-300 fixed right-4 text-white p-4 rounded shadow-lg ${getToastStyle()} flex items-center justify-center h-12`} 
      style={{ bottom: bottomPosition }} // Set the bottom position using inline style
    >
      {message}
    </div>
  );
};

export default Toast;
