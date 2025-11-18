// src/components/AdsThree.js
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdsThree = () => {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate("/step-4");
  };

  return (
    <div>
      <h4>ตรวจสอบข้อมูล</h4>
      <Button onClick={handleNextStep}>Next Step</Button>
    </div>
  );
};

export default AdsThree;
