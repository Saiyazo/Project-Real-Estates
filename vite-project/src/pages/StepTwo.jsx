import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StepTwo = ({ setActiveStep }) => {
  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false); // สำหรับแสดง modal เมื่อกดบันทึกแบบร่าง
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(2); // กำหนดให้เป็น step 2
  }, [setActiveStep]);

  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );
    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleNext = () => {
    if (images.length === 0) {
      alert("กรุณาอัปโหลดรูปภาพ");
      return;
    }
    // ไปยังหน้าถัดไป (StepThree)
    navigate("/step-three");
  };

  const handleSaveDraft = () => {
    setShowSaveDraftModal(true); // แสดง Modal เมื่อกดบันทึกแบบร่าง
  };

  const handleCloseSaveDraftModal = (redirect) => {
    setShowSaveDraftModal(false); // ปิด Modal
    if (redirect) {
      // หากเลือก "ภายหลัง", เปลี่ยนไปหน้าอื่นหรือทำอย่างอื่น
      navigate("/step-three");
    }
  };

  const handleBack = () => {
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

          <input
            type="file"
            id="mainImages-input"
            multiple
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleFiles}
          />

          <div
            className="border border-primary rounded d-flex flex-column justify-content-center align-items-center"
            style={{
              height: "200px",
              backgroundColor: "#e6f0ff",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("mainImages-input").click()}
          >
            <i
              className="bi bi-image"
              style={{ fontSize: "2rem", color: "#0d6efd" }}
            ></i>
            <p className="mt-2 text-primary">เพิ่มรูปภาพ</p>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() =>
                document.getElementById("mainImages-input").click()
              }
            >
              เพิ่มรูป
            </Button>
          </div>

          {images.length > 0 && (
            <Row className="mt-3">
              {images.map((img, idx) => (
                <Col xs={4} md={2} key={idx} className="mb-2">
                  <div
                    className="border rounded position-relative"
                    style={{ height: "100px", overflow: "hidden" }}
                  >
                    <img
                      src={URL.createObjectURL(img)}
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

        <div className="d-flex gap-2"> 
          <Button
            variant="outline-primary"
            className="px-4"
            onClick={handleSaveDraft}
          >
            บันทึกแบบร่าง
          </Button>{" "}
          <Button variant="primary" className="px-4" onClick={handleNext}>
            ถัดไป
          </Button>
        </div>
      </div>

      {/* Modal สำหรับบันทึกแบบร่าง */}
      <Modal
        show={showSaveDraftModal}
        onHide={() => setShowSaveDraftModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>บันทึกแบบร่างสำเร็จ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            ประกาศของคุณจะถูกเก็บไว้ในระบบ 30 วัน
          </div>
          <div className="text-center">คุณสามารถกลับมาแก้ไขได้ทุกเมื่อ</div>
          <div className="d-flex justify-content-center gap-1">
            <div>คุณต้องการกลับไปยังหน้า </div>
            <div className="fw-bolder">ประกาศของฉัน </div>
            <div>ไหม ?</div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => handleCloseSaveDraftModal(false)}
          >
            ภายหลัง
          </Button>
          <Button
            variant="primary"
            onClick={() => handleCloseSaveDraftModal(true)}
          >
            ดำเนินการต่อ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StepTwo;
