// src/components/Loader.tsx

import React from "react";

interface LoaderProps {
  size?: number; // Optional size prop
}

const Loader: React.FC<LoaderProps> = ({ size = 50 }) => {
  const loaderStyle = {
    width: size,
    height: size,
    border: "5px solid #f3f3f3", // Light grey
    borderTop: "5px solid #3498db", // Blue
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return <div style={loaderStyle} />;
};

export default Loader;