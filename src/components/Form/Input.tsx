import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id}>
          {label}
          {!props.required && <span>(Optional)</span>}
        </label>
      )}
      <input {...props} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
