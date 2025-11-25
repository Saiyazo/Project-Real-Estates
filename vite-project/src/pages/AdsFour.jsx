import { Button, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRcode from "../data/img/QR.png";

const AdsFour = ({
  price,
  selectedDuration,
  startDate,
  setAdStep,
  setActiveStep,
}) => {
  const navigate = useNavigate();

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + selectedDuration);

  const handleBack = () => {
    navigate("/ads-three");
  };

useEffect(
    () => {
      setAdStep(4);
    },
    [setAdStep],
    setActiveStep(0),
    [setActiveStep]
  );

  const handleSubmit = () => {
    navigate("/ads-five");
  };

  return (
    <div className="py-4 m-auto" style={{ width: "800px" }}>
      <div className="p-3 d-flex justify-content-between gap-4">
        <div style={{ width: "60%" }}>
          <div className="fw-bolder fs-3 mb-4">Ad Summary</div>
          <div className="d-flex justify-content-between fs-5">
            <div>แพ็กเกจ</div>
            <div className="fw-bolder">Premium Package</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between fs-5">
            <div>ระยะเวลา</div>
            <div className="fw-bolder">{selectedDuration} วัน</div>
          </div>
          <hr />
          <div className="d-flex justify-content-between fs-5">
            <div>ราคา</div>
            <div className="fw-bolder">{price} ฿</div>
          </div>
          <hr />
          {/* แสดงวันที่เริ่มและวันที่สิ้นสุดในรูปแบบ "วัน/เดือน/ปี" */}
          <div className="d-flex justify-content-between fs-5">
            <div>วันที่เริ่มและสิ้นสุด</div>
            <div className="fw-bolder">
              {new Date(startDate).toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              -{" "}
              {endDate.toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
          <hr />

          <div className="d-flex justify-content-between fs-5">
            <div>สถานะ</div>
            <div>
              <Badge
                pill
                bg="secondary"
                className="text-primary px-5 bg-opacity-25"
              >
                รอชำระ
              </Badge>
            </div>
          </div>
        </div>
        <div>
          {/* ใส่รูป QR */}
          <img
            src={QRcode}
            alt="QR Code"
            style={{ width: "280px", height: "350px" }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          variant="danger"
          onClick={handleBack}
          style={{ width: "120px" }}
        >
          ยกเลิกคำขอ
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          ยืนยันและชำระเงิน
        </Button>
      </div>
    </div>
  );
};

export default AdsFour;
