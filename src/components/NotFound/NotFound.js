import React from "react";

const NotFound = () => {
  const notFoundStyle = {
    textAlign: "center",
    padding: "20px 0",
  };
  return (
    <div style={notFoundStyle}>
      <h1>Page not found</h1>
      <h3>Error 400</h3>
    </div>
  );
};

export default NotFound;
