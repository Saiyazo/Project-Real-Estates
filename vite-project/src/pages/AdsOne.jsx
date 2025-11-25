import React, { useState } from "react";
import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Import slotData จากไฟล์ JSON
import { slotData } from "../data/DataAds"; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์

const AdsOne = ({
  setAdStep,
  setPrice,
  selectedDuration,
  setSelectedDuration,
}) => {
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState(null); // เก็บ slot ที่เลือก
  const [slotDataState, setSlotData] = useState(slotData); // ใช้ข้อมูลจาก JSON

  // เมื่อคลิกเลือก Slot
  const handleSlotSelect = (id, price, duration) => {
    // อัปเดตสถานะของ slot
    const updatedSlots = slotDataState.map((slot) =>
      slot.id === id
        ? { ...slot, availability: "Selected", selectedDuration: duration }
        : { ...slot, availability: "Available" }
    );
    setSlotData(updatedSlots);
    setSelectedSlot(id); // เก็บ slot ที่เลือก
    setPrice(price); // ส่งข้อมูลราคาที่เลือกไปที่ App.jsx
  };

  // เมื่อเลือก duration หรือระยะเวลา
  const handleDurationSelect = (slot, duration) => {
    const updatedSlot = { ...slot, selectedDuration: duration };
    setSlotData(slotDataState.map((s) => (s.id === slot.id ? updatedSlot : s)));
    setSelectedDuration(duration); // เก็บระยะเวลาที่เลือก
    setPrice(updatedSlot.prices[duration]); // ส่งราคาไปที่ App.jsx
  };

  const handleNext = () => {
    if (selectedSlot === null || selectedDuration === null) {
      alert("กรุณาเลือกแพ็กเกจและระยะเวลา");
      return;
    }
    setAdStep(2);
    navigate("/ads-two"); // ไปยังหน้า AdsTwo
  };

  return (
    <Container className="py-4" style={{ width: "1000px" }}>
      <Row className="g-4">
        {slotDataState.map((slot) => (
          <Col xs={12} md={4} key={slot.id}>
            <Card
              className={`shadow-sm ${
                slot.availability === "Selected" ? "border-primary" : ""
              }`}
              style={{
                cursor:
                  slot.availability === "Available" ? "pointer" : "not-allowed",
                width: "300px",
              }}
            >
              <Card.Img
                variant="top"
                src={slot.image}
                alt={slot.name}
                style={{ height: "120px", objectFit: "cover" }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center fs-5 mb-2 fw-bold">
                  {slot.name}
                  <Badge bg="success">{slot.availability}</Badge>
                </div>
                {Object.keys(slot.prices).map((duration) => (
                  <Row key={duration} className="mb-3">
                    <Col xs={12}>
                      <Button
                        variant={
                          slot.selectedDuration === parseInt(duration)
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="w-100"
                        onClick={() => {
                          if (slot.availability === "Available") {
                            handleDurationSelect(slot, parseInt(duration)); // เลือกระยะเวลา
                          }
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <div>{duration} Days</div>{" "}
                          <div>{slot.prices[duration]} ฿</div>
                        </div>
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  variant={
                    slot.availability === "Available" ? "success" : "secondary"
                  }
                  className="mt-2 w-100"
                  onClick={() =>
                    handleSlotSelect(
                      slot.id,
                      slot.prices[slot.selectedDuration],
                      slot.selectedDuration
                    )
                  }
                  disabled={slot.availability !== "Available"}
                >
                  {slot.availability === "Selected"
                    ? "Selected"
                    : "Select Slot"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4 text-end">
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          className="me-2"
        >
          กลับ
        </Button>
        <Button variant="primary" onClick={handleNext}>
          ถัดไป
        </Button>
      </div>
    </Container>
  );
};

export default AdsOne;
