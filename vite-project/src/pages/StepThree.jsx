import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StepThree = ({ setActiveStep }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    floor: "",
    usableArea: "",
    bedrooms: "",
    bathrooms: "",
    highlights: [],
    facilities: [],
  });

  const highlightOptions = [
    "โครงการติดถนนใหญ่",
    "ทรัพย์มือ 1",
    "ทรัพย์ NPA",
    "เลี้ยงสัตว์ได้",
    "จดทะเบียนบริษัทได้",
  ];

  const facilityOptions = [
    "เครื่องครัว",
    "เตียงนอน",
    "ทีวี",
    "Wi-Fi",
    "เครื่องซักผ้า",
    "เครื่องปรับอากาศ",
    "เครื่องทำน้ำอุ่น",
    "ตู้เย็น",
  ];

  useEffect(() => {
    setActiveStep(3); // ให้ header ไปอยู่ step 3
  }, [setActiveStep]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData((prev) => {
      const selected = prev[field];
      const isSelected = selected.includes(value);
      return {
        ...prev,
        [field]: isSelected
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const { title, description, floor, usableArea, bedrooms, bathrooms } =
      formData;

    if (
      !title ||
      !description ||
      !floor ||
      !usableArea ||
      !bedrooms ||
      !bathrooms
    ) {
      alert("กรุณากรอกช่องที่มีเครื่องหมาย * ให้ครบ");
      return;
    }

    // TODO: ส่ง formData ไปเก็บ global / backend ตามที่ต้องการ

    // ไปหน้า StepFour (กำหนด path ตามที่คุณใช้จริง)
    navigate("/step-four");
  };

  const handleBack = () => {
    navigate("/step-two");
  };

  const [showModal, setShowModal] = useState(false); // สำหรับการแสดง Modal
  const [showSaveDraftModal, setShowSaveDraftModal] = useState(false); // สำหรับแสดง modal เมื่อกดบันทึกแบบร่าง

  const handleSaveDraft = () => {
    setShowSaveDraftModal(true); // แสดง Modal เมื่อกดบันทึกแบบร่าง
  };

  const handleCloseSaveDraftModal = (redirect) => {
    setShowSaveDraftModal(false);
    if (redirect) {
      navigate("/step-four");
    }
  };

  return (
    <div className="m-auto" style={{ width: "58%" }}>
      <Container className="cont">
        <Card className="card" style={{ border: "none" }}>
          {" "}
          {/* ลบกรอบของ Card */}
          <Form onSubmit={handleNext}>
            {/* หัวข้อประกาศ */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-megaphone"></i> หัวข้อประกาศ{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกหัวข้อ"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Form.Group>

            {/* รายละเอียด */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">
                <i className="bi bi-file-earmark-text"></i> รายละเอียด{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="กรอกรายละเอียด"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Group>

            {/* ชั้นที่ / พื้นที่ใช้สอย / ห้องนอน / ห้องน้ำ */}
            <Row className="mb-4 g-3">
              <Col xs={12} md={3}>
                <Form.Label className="fw-bold">
                  ชั้นที่ <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.floor}
                  onChange={(e) => handleChange("floor", e.target.value)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-bold">
                  พื้นที่ใช้สอย <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.usableArea}
                  onChange={(e) => handleChange("usableArea", e.target.value)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-bold">
                  ห้องนอน <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => handleChange("bedrooms", e.target.value)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Label className="fw-bold">
                  ห้องน้ำ <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => handleChange("bathrooms", e.target.value)}
                />
              </Col>
            </Row>

            {/* จุดเด่นทรัพย์ */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">จุดเด่นทรัพย์</Form.Label>
              <Row className="g-2 mt-1">
                {highlightOptions.map((label) => (
                  <Col xs={12} md={3} key={label}>
                    <Button
                      type="button"
                      variant={
                        formData.highlights.includes(label)
                          ? "primary"
                          : "outline-secondary"
                      }
                      className="w-100 rounded-pill"
                      onClick={() => toggleArrayField("highlights", label)}
                    >
                      {label}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {/* สิ่งอำนวยความสะดวก */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">สิ่งอำนวยความสะดวก</Form.Label>
              <Row className="g-2 mt-1">
                {facilityOptions.map((label) => (
                  <Col xs={12} md={3} key={label}>
                    <Button
                      type="button"
                      variant={
                        formData.facilities.includes(label)
                          ? "primary"
                          : "outline-secondary"
                      }
                      className="w-100 rounded-pill"
                      onClick={() => toggleArrayField("facilities", label)}
                    >
                      {label}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Form.Group>

            {/* ปุ่มด้านล่าง */}
            <Row className="mt-4">
              <Col xs={12} md={6}>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-4"
                  onClick={handleBack}
                >
                  ย้อนกลับ
                </Button>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-md-end gap-2 mt-3 mt-md-0"
              >
                {/* Save Draft Modal */}
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
                    <div className="text-center">
                      คุณสามารถกลับมาแก้ไขได้ทุกเมื่อ
                    </div>
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
                <Button
                  variant="outline-secondary"
                  onClick={handleSaveDraft}
                  className="ms-2"
                  style={{ width: "130px" }}
                >
                  บันทึกแบบร่าง
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ width: "130px" }}
                >
                  ถัดไป
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default StepThree;
