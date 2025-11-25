import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

const StepFour = ({ setActiveStep }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false); // สำหรับแสดง modal เมื่อกดบันทึกแบบร่าง
  const [showSuccessModal, setShowSuccessModal] = useState(false); // สำหรับแสดง modal เมื่อประกาศสำเร็จ
  const [formData, setFormData] = useState({
    salePrice: "",
    rentPrice: "",
    acceptCreditCard: false,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // เพิ่มการตรวจสอบข้อมูลก่อนแสดง Modal
    if (!formData.salePrice && !formData.rentPrice) {
      alert("กรุณากรอกราคา");
      return;
    }

    // แสดง Modal เมื่อกดปุ่ม "ประกาศ"
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = (redirect) => {
    setShowSuccessModal(false);
    setActiveStep(null);
    if (redirect) {
      navigate("/ads-one"); // ปรับไปหน้าสำเร็จ (หรือหน้าถัดไปตามต้องการ)
    }
  };

  useEffect(() => {
    setActiveStep(4); // เปลี่ยนสถานะของ activeStep ไปยัง Step 4
  }, [setActiveStep]);

  const handleBack = () => {
    navigate("/step-three");
  };

  // เปิด Modal เมื่อกด "บันทึกแบบร่าง"
  const handleSaveDraft = () => {
    setShowSaveDraftModal(true);
  };

  // ปิด Modal และไปยังหน้าอื่นหรือกลับไปหน้าเดิม
  const handleCloseSaveDraftModal = (redirect) => {
    setShowSaveDraftModal(false);
    if (redirect) {
      navigate("/step-five"); // ปรับเปลี่ยนไปยังหน้าถัดไปตามต้องการ
    }
  };

  return (
    <Container className="py-4" style={{ width: "60%" }}>
      <Card className="p-4 shadow-sm border-0">
        <Form onSubmit={handleSubmit}>
          {/* ตั้งราคาโปรโมชัน */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">ตั้งราคาโปรโมชัน</Form.Label>

            <Form.Label className="d-block">ราคาขาย</Form.Label>
            <Form.Control
              type="number"
              value={formData.salePrice}
              onChange={(e) => handleChange("salePrice", e.target.value)}
              placeholder="กรอกราคาขาย"
            />

            <Form.Label className="d-block mt-3">ราค่าเช่า</Form.Label>
            <Form.Control
              type="number"
              value={formData.rentPrice}
              onChange={(e) => handleChange("rentPrice", e.target.value)}
              placeholder="กรอกราค่าเช่า"
            />
          </Form.Group>

          {/* รับบัตรเครดิต */}
          <Form.Group className="mb-4 d-flex justify-content-between">
            <Form.Label className="fw-bold">รับบัตรเครดิต</Form.Label>
            <Form.Check
              type="switch"
              id="creditCardSwitch"
              label=""
              checked={formData.acceptCreditCard}
              onChange={(e) =>
                handleChange("acceptCreditCard", e.target.checked)
              }
              className="mb-3 fs-4"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              type="button"
              variant="secondary"
              className="px-4"
              onClick={handleBack}
            >
              ย้อนกลับ
            </Button>
            <div className="text-end d-flex gap-1">
              <Button
                variant="outline-primary"
                className="px-4"
                onClick={handleSaveDraft}
                style={{ width: "150px" }}
              >
                บันทึกแบบร่าง
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-4"
                style={{ width: "150px" }}
              >
                ประกาศ
              </Button>
            </div>
          </div>
        </Form>
      </Card>

      {/* Modal สำหรับบันทึกแบบร่าง */}
      <Modal
        show={showSaveDraftModal}
        onHide={() => setShowSaveDraftModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title className="m-auto fw-bolder">
            บันทึกแบบร่างสำเร็จ
          </Modal.Title>
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
      {/* Modal สำหรับประกาศสำเร็จ */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title className="m-auto fw-bolder">ประกาศสำเร็จ</Modal.Title>
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
        <Modal.Footer className="m-auto">
          <Button
            variant="primary"
            onClick={() => handleCloseSuccessModal(true)}
            style={{ width: "450px" }}
          >
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StepFour;
