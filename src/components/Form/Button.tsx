import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "py-2 px-4 rounded-lg transition-transform duration-150 ease-in-out focus:outline-none";

  const variantStyles = {
    primary: "bg-primary text-bg hover:bg-secondary", // Primary variant with a defined background
    secondary: "bg-secondary text-bg hover:bg-primary", // Secondary variant
    danger: "bg-error text-bg", // Danger variant
    success: "bg-success text-bg hover:bg-muted", // Success variant
  };

  return (
    <button {...props} className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </button>
  );
};

export default Button;
