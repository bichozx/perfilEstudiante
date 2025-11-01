import React from "react";

export const ProfileEmptyCard = ({ message, buttonText, buttonAction }) => {
  const handleClick = () => {
    if (buttonAction) buttonAction();
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="profile-empty-card text-center p-5 rounded-4 shadow-lg">
        <h3 className="fw-bold text-light mb-3">{message.title}</h3>
        <p className="text-light opacity-75 mb-4">{message.subtitle}</p>
        {buttonText && (
          <button className="btn-gold-glow btn-lg px-4" onClick={handleClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
