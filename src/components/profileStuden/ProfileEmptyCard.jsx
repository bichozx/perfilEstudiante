import React from "react";

export const ProfileEmptyCard = ({ message, buttonText, buttonAction }) => {
  

  const handleClick = () => {
    if (buttonAction) buttonAction();
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-lg rounded-4 p-4 text-center" style={{ maxWidth: "500px" }}>
        <h3 className="fw-bold text-primary mb-3">{message.title}</h3>
        <p className="text-muted mb-4">{message.subtitle}</p>
        {buttonText && (
          <button className="btn btn-primary btn-lg" onClick={handleClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
