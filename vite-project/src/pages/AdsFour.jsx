// src/components/AdsFour.js
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdsFour = () => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/step-5");
  };

  return (
    <div>
      <h4>ชำระเงิน</h4>
      <Button onClick={handleNextStep}>Next Step</Button>
    </div>
  );
};

export default AdsFour;
