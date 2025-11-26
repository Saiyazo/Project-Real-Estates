import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      className=" btn-sm me-3 btn-back-custom" 
    >
      &larr; BACK
    </button>
  );
};

export default BackButton;