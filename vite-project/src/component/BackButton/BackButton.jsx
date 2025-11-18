import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // กลับไปหน้าก่อนหน้า
  };

  return (
    <button 
      onClick={handleBackClick} 
      className=" btn-sm me-3 btn-back-custom" 
    >
      &larr; BACK
    </button>
  );
};

export default BackButton;