import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import DatePicker from "react-datepicker"; // นำเข้า DatePicker จาก react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // นำเข้า CSS ของ react-datepicker
import { useNavigate } from "react-router-dom";

const AdsTwo = ({ setAdStep }) => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date()); // ใช้ State สำหรับเก็บวันที่ที่เลือก
  const [formData, setFormData] = useState({
    adType: "",
    title: "",
    description: "",
    price: "",
    propertyType: "",
    location: "",
    image: null,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleNext = () => {
    // ตรวจสอบให้แน่ใจว่าได้กรอกข้อมูลครบถ้วน
    if (
      !formData.adType ||
      !formData.title ||
      !formData.description ||
      !formData.price
    ) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setAdStep(3); // เปลี่ยนขั้นตอนเป็น Step 3
    navigate("/ads-three"); // ไปยังหน้า AdsThree
  };

  return (
    <Container className="py-4">
      <h3>กรอกข้อมูลประกาศ</h3>
      <Row>
        {/* ปฏิทินเลือกวันที่ */}
        <Col xs={12} md={6}>
          <Card className="p-4 mb-4">
            <h5>เลือกวันที่แสดงผล</h5>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              placeholderText="เลือกวันที่"
            />
          </Card>
        </Col>

        {/* ฟอร์มกรอกข้อมูล */}
        <Col xs={12} md={6}>
          <Card className="p-4 mb-4">
            <Form>
              {/* เลือกประเภทประกาศ */}
              <Form.Group className="mb-3">
                <Form.Label>เลือกประเภทประกาศ</Form.Label>
                <Form.Select
                  value={formData.adType}
                  onChange={(e) => handleChange("adType", e.target.value)}
                >
                  <option value="">เลือกประเภทประกาศ</option>
                  <option value="slot 1">slot 1</option>
                  <option value="slot 2">slot 2</option>
                  <option value="slot 3">slot 3</option>
                  <option value="slot 4">slot 4</option>
                </Form.Select>
              </Form.Group>

              {/* ชื่อประกาศ */}
              <Form.Group className="mb-3">
                <Form.Label>ชื่อประกาศ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรอกชื่อประกาศ"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Form.Group>

              {/* รายละเอียด */}
              <Form.Group className="mb-3">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="กรอกรายละเอียด"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Form.Group>

              {/* ราคา */}
              <Form.Group className="mb-3">
                <Form.Label>ราคา</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="กรอกราคา"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </Form.Group>

              {/* ประเภทอสังหา */}
              <Form.Group className="mb-3">
                <Form.Label>ประเภทอสังหาฯ</Form.Label>
                <Form.Select
                  value={formData.propertyType}
                  onChange={(e) => handleChange("propertyType", e.target.value)}
                >
                  <option value="">เลือกประเภทอสังหาฯ</option>
                  <option value="คอนโด">คอนโด</option>
                  <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                  <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                </Form.Select>
              </Form.Group>

              {/* ทำเล */}
              <Form.Group className="mb-3">
                <Form.Label>ทำเล</Form.Label>
                <Form.Select
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                >
                  <option value="">เลือกทำเล</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="ภูเก็ต">ภูเก็ต</option>
                </Form.Select>
              </Form.Group>

              {/* อัพโหลดรูปภาพ */}
              <Form.Group className="mb-3">
                <Form.Label>อัพโหลดรูปภาพ</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              {/* ปุ่มถัดไป */}
              <div className="text-end">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/ads-one")}
                  className="me-2"
                >
                  กลับ
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  ถัดไป
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdsTwo;
