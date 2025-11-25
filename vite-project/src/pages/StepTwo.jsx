import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StepTwo = ({ setActiveStep, setAdStep }) => {
  const [images, setImages] = useState([]); // เก็บไฟล์รูปภาพ
  const navigate = useNavigate();

  // การเปลี่ยนแปลง activeStep
  useEffect(() => {
    setActiveStep(2);
    setAdStep(0);
  }, [setActiveStep, setAdStep]);

  // ฟังก์ชันเพิ่มรูปภาพ
  const Addimg = (event) => {
    const files = Array.from(event.target.files); // เปลี่ยนไฟล์ที่เลือกเป็น Array
    const validFiles = files.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setImages((prev) => [...prev, ...validFiles]); // เพิ่มไฟล์ใหม่ไปยัง images
  };

  // การไปหน้า Step ถัดไป
  const handleNext = () => {
    if (images.length === 0) {
      alert("กรุณาอัปโหลดรูปภาพ");
      return;
    }
    navigate("/step-three");
  };

  const handleBack = () => {
    setActiveStep(1);
    navigate("/step-one");
  };

  return (
    <Container className="py-4">
      <Card className="mb-4 p-4 shadow-sm border-0">
        <Form.Group>
          <Form.Label className="fw-bold d-flex justify-content-between">
            <span>
              <i className="bi bi-image"></i> เพิ่มรูปภาพ{" "}
              <span className="text-danger">*</span>
            </span>
          </Form.Label>

          {/* Input ซ่อนอยู่ ซึ่งจะถูกคลิกผ่าน JavaScript */}
          <input
            type="file"
            id="mainImages-input"
            multiple
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={Addimg} // เมื่อเลือกไฟล์ใหม่
          />

          <div
            className="border border-primary rounded d-flex flex-column justify-content-center align-items-center"
            style={{
              height: "200px",
              backgroundColor: "#e6f0ff",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("mainImages-input").click()} // เมื่อคลิกที่ div นี้จะไปคลิก input แทน
          >
            <i
              className="bi bi-image"
              style={{ fontSize: "2rem", color: "#0d6efd" }}
            ></i>
            <p className="mt-2 text-primary">เพิ่มรูปภาพ</p>
          </div>

          {/* แสดงรูปที่เพิ่ม */}
          {images.length > 0 && (
            <Row className="mt-3">
              {images.map((img, idx) => (
                <Col xs={4} md={2} key={idx}>
                  <div
                    className="border rounded position-relative"
                    style={{ height: "100px", overflow: "hidden" }}
                  >
                    <img
                      src={URL.createObjectURL(img)} // แสดงรูปจาก URL ที่สร้างขึ้น
                      alt={img.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Form.Group>
      </Card>

      <div className="d-flex justify-content-between">
        <Button
          type="button"
          variant="secondary"
          className="px-4"
          onClick={handleBack}
        >
          ย้อนกลับ
        </Button>

        <Button
          variant="primary"
          className="px-4"
          onClick={handleNext}
          style={{ width: "150px" }}
        >
          ถัดไป
        </Button>
      </div>
    </Container>
  );
};

export default StepTwo;
