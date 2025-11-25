import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { th } from "date-fns/locale";

const AdsTwo = ({
  startDate,
  setStartDate,
  setAdStep,
  AdsData,
  setAdsData,
}) => {
  const navigate = useNavigate();

  const [imageError, setImageError] = useState(""); // เพิ่ม useState สำหรับตรวจสอบข้อผิดพลาดของรูปภาพ

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงวันที่
  const handleChange = (date) => {
    setStartDate(date); // เก็บข้อมูลวันที่ใน App.jsx
  };

  // ฟังก์ชันตรวจสอบไฟล์รูปภาพ
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // ขนาดไฟล์เป็น MB
      if (fileSize > 5) {
        setImageError("ขนาดไฟล์เกิน 5MB");
      } else {
        setImageError(""); // ถ้าไฟล์ไม่เกินขนาดที่กำหนด
        setAdsData({ ...AdsData, image: file }); // เก็บไฟล์ใน AdsData
      }
    }
  };

  // ฟังก์ชันไปหน้า AdsThree
  const handleNext = () => {
    if (!startDate) {
      alert("กรุณาเลือกวันที่เริ่ม");
      return;
    }
    setAdStep(3); // เปลี่ยนขั้นตอนเป็น Step 3
    navigate("/ads-three"); // ไปที่หน้า AdsThree
  };

  return (
    <div className="m-auto" style={{ width: "30%" }}>
      <div>
        <div className="fs-4 mb-2 fw-bolder">เลือกวันที่แสดงผล</div>
        <Card className="p-4 mb-4 shadow-sm rounded">
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            dateFormat="d MMMM yyyy"
            className="form-control custom-datepicker"
            placeholderText="เลือกวันที่"
            locale={th} // ภาษาไทย
          />
        </Card>
      </div>

      <div>
        {/* อัพโหลดรูปภาพ */}
        <Form.Group className="mb-3">
          <div className="fs-4 mb-2 fw-bolder">เลือกประกาศของคุณ</div>
          <Form.Select className="mb-3">
            <option>อสังหา 1</option>
            <option>อสังหา 2</option>
            <option>อสังหา 3</option>
            <option>อสังหา 4</option>
          </Form.Select>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            style={{
              borderRadius: "10px", // กำหนดให้มีมุมมน
              padding: "20px", // ขยายพื้นที่
              backgroundColor: "#ffffff", // สีพื้นหลัง
              border: "2px dashed #ccc", // กรอบสีเทา
              cursor: "pointer",
            }}
          />
          {AdsData.image && (
            <div className="mt-3">
              <h5>ตัวอย่างรูปภาพ:</h5>
              <img
                src={URL.createObjectURL(AdsData.image)}
                alt="Uploaded Preview"
                style={{ width: "100%" }}
              />
            </div>
          )}
          {imageError && <Alert variant="danger">{imageError}</Alert>}
        </Form.Group>
      </div>

      <div className="text-end gap-2 d-flex justify-content-end">
        <div>
          <Button variant="secondary" onClick={() => navigate("/")}>
            กลับ
          </Button>
        </div>
        <div>
          {" "}
          <Button variant="primary" onClick={handleNext}>
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdsTwo;
