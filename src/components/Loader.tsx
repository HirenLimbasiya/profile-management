import React from "react";

interface LoaderProps {
  size?: number; // Optional size prop
}

const Loader: React.FC<LoaderProps> = ({ size = 50 }) => {
  // Calculate the border size as a percentage of the loader size
  const borderSize = size * 0.1; // 10% of the loader size

  return (
    <div
      className={`rounded-full animate-spin`}
      style={{
        width: size,
        height: size,
        border: `${borderSize}px solid var(--color-muted)`, // Light grey for light mode
        borderTop: `${borderSize}px solid var(--color-primary)`, // Blue for light mode
      }}
    />
  );
};

export default Loader;
