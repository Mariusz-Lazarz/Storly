import React from "react";

function NotFound() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
