import React, { useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdsOne = ({ setAdStep }) => {
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotData, setSlotData] = useState([
    {
      id: 1,
      name: "Slot 1",
      image:
        "https://i.pinimg.com/736x/d7/af/37/d7af37626ffb141124ebc74c0db9d4b1--construction-services-philippines.jpg",
      availability: "Available",
      prices: { 7: 2000, 14: 4000, 30: 10000 },
      selectedDuration: 7,
    },
    {
      id: 2,
      name: "Slot 2",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.dnjhHRgWhwfXIiMhCTQaWgHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
      availability: "Available",
      prices: { 7: 2500, 14: 5000, 30: 12000 },
      selectedDuration: 7,
    },
    {
      id: 3,
      name: "Slot 3",
      image:
        "https://www.infoyunik.com/wp-content/uploads/2016/04/RumahSehatKunciKebahagiaanKeluarga.jpg", // ใส่ URL ของรูปภาพที่ต้องการ
      availability: "Reserved",
      prices: { 7: 3000, 14: 6000, 30: 15000 },
      selectedDuration: 7,
    },
    {
      id: 4,
      name: "Slot 4",
      image:
        "https://1.bp.blogspot.com/-B7CXSb96wog/WGilO7TbdAI/AAAAAAAAAKc/U806SL828bIokUOXL58NNtNH_uTQ5pX7gCLcB/s1600/Foto%2Brumah%2Bmewah%2Bminimalis.png", // ใส่ URL ของรูปภาพที่ต้องการ
      availability: "Unavailable",
      prices: { 7: 1800, 14: 3500, 30: 9000 },
      selectedDuration: 7,
    },
  ]);

  const handleSlotSelect = (id) => {
    const updatedSlots = slotData.map((slot) =>
      slot.id === id
        ? { ...slot, availability: "Selected" }
        : { ...slot, availability: "Available" }
    );
    setSlotData(updatedSlots);
    setSelectedSlot(id); // Set selected slot
  };

  const handleNext = () => {
    if (selectedSlot === null) {
      alert("กรุณาเลือกแพ็กเกจ");
      return;
    }
    setAdStep(2); // เปลี่ยนขั้นตอนเป็น Step 2
    navigate("/ads-two"); // ไปยังหน้า AdsTwo
  };

  return (
    <Container className="py-4">
      <Row className="g-4">
        {slotData.map((slot) => (
          <Col xs={12} md={4} key={slot.id}>
            <Card
              className={`shadow-sm ${
                slot.availability === "Selected" ? "border-primary" : ""
              }`}
              style={{
                cursor:
                  slot.availability === "Available" ? "pointer" : "not-allowed",
              }}
            >
              {/* ใส่รูปภาพใน Card */}
              <Card.Img
                variant="top"
                src={slot.image}
                alt={slot.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{slot.name}</Card.Title>
                <Card.Text>สถานะ: {slot.availability}</Card.Text>
                <Card.Text>
                  Est. Visibility:{" "}
                  {slot.availability === "Available" ? "100%" : "50%"}
                </Card.Text>
                {Object.keys(slot.prices).map((duration) => (
                  <Row key={duration} className="mb-3">
                    {" "}
                    {/* เพิ่ม margin-bottom */}
                    <Col xs={12}>
                      <Button
                        variant={
                          slot.selectedDuration === parseInt(duration)
                            ? "primary"
                            : "outline-secondary"
                        }
                        className="w-100" // ทำให้ปุ่มเต็มความกว้าง
                        onClick={() => {
                          if (slot.availability === "Available") {
                            setSlotData(
                              slotData.map((s) =>
                                s.id === slot.id
                                  ? {
                                      ...s,
                                      selectedDuration: parseInt(duration),
                                    }
                                  : s
                              )
                            );
                          }
                        }}
                      >
                        {duration} Days - {slot.prices[duration]} ฿
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  variant={
                    slot.availability === "Available" ? "success" : "secondary"
                  }
                  className="mt-2 w-100"
                  onClick={() => handleSlotSelect(slot.id)}
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
