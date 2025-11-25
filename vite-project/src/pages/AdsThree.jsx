import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdsThree = ({ setAdStep, AdsData, setActiveStep }) => {
  const navigate = useNavigate();

  const [imageError, setImageError] = useState(""); // เก็บข้อผิดพลาดของรูปภาพ
  const [imagePreview, setImagePreview] = useState(null); // เก็บตัวอย่างรูปภาพ

  useEffect(() => {
    // ตรวจสอบขนาดของไฟล์รูปภาพเมื่อมีการเปลี่ยนแปลง
    if (AdsData.image) {
      const file = AdsData.image;
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);

      // ตรวจสอบข้อผิดพลาด เช่น ขนาดไฟล์เกิน 5MB หรือไฟล์ไม่ใช่ .jpg หรือ .png
      if (file.size > 5 * 1024 * 1024) {
        setImageError("ขนาดไฟล์เกิน 5MB");
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImageError("ไฟล์ต้องเป็น .jpg หรือ .png เท่านั้น");
      } else {
        setImageError(""); // ไม่มีข้อผิดพลาด
        reader.readAsDataURL(file);
      }
    }
  }, [AdsData.image]);

  const handleBack = () => {
    navigate("/ads-two");
  };

  useEffect(
    () => {
      setAdStep(3);
    },
    [setAdStep],
    setActiveStep(0),
    [setActiveStep]
  );

  const handleSubmit = () => {
    if (imageError) {
      alert("กรุณาตรวจสอบรูปภาพก่อนดำเนินการต่อ");
      return;
    }
    navigate("/ads-four");
  };

  return (
    <Container className="py-4" style={{ width: "1000px" }}>
      <div className="fs-1 fw-bolder mb-4">ตัวอย่างโฆษณาของคุณ</div>
      <Row>
        {/* ตัวอย่างโฆษณา */}
        <Col className="mb-4">
          <Card className="shadow-sm rounded-2 p-3 fs-5">
            <img
              src={imagePreview || "https://via.placeholder.com/150"}
              alt="Property"
              className="img-fluid mb-3"
            />
          </Card>
        </Col>
      </Row>

      {/* การตรวจสอบรูปภาพ */}
      <Row>
        <Col>
          <div className="fs-1 fw">การตรวจสอบและตอบกลับโดยผู้ดูแล</div>
          <Card className="shadow-sm rounded p-3">
            {imageError && (
              <Alert variant="danger">
                <strong>คำเตือน: </strong>
                {imageError}
              </Alert>
            )}

            {/* สถานะการตรวจสอบ */}
            <p
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: imageError ? "red" : "green", // เปลี่ยนสีตามสถานะ
              }}
            >
              <span className="text-black">สถานะการตรวจสอบ: </span>{" "}
              {imageError ? "แก้ไขข้อมูล" : "ผ่านการตรวจสอบ"}
            </p>

            {/* ข้อความแจ้งเตือนหากมีข้อผิดพลาด */}
            {imageError && (
              <Alert variant="danger">
                <strong>ข้อผิดพลาด: </strong>ไฟล์รูปภาพไม่ตรงกับที่ต้องการ
              </Alert>
            )}
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button
          variant="danger"
          onClick={handleBack}
          style={{ width: "120px" }}
        >
          ยกเลิกคำขอ
        </Button>
        <Button
          style={{ width: "120px" }}
          variant="primary"
          onClick={handleSubmit}
          disabled={imageError !== ""}
        >
          ถัดไป
        </Button>
      </div>
    </Container>
  );
};

export default AdsThree;
