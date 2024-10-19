import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {" "}
      {/* Margin bottom for spacing */}
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-text mb-1" // Use text color from config
        >
          {label}
          {!props.required && <span className="text-muted"> (Optional)</span>}
        </label>
      )}
      <input
        {...props}
        className={`block w-full border rounded-md shadow-sm 
          ${
            error ? "border-error" : "border-secondary"
          } // Use border color from config
          focus:border-text focus:ring-2 focus:ring-text
          transition duration-150 ease-in-out px-3 py-2 bg-bg text-text 
          outline-none`} // Remove default focus outline
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}{" "}
      {/* Error message styling */}
    </div>
  );
};

export default Input;
