import React from "react";

const PageNotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg text-text">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-muted rounded-md hover:bg-accent transition duration-150 ease-in-out"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFoundPage;
