import React, { useState, useEffect } from "react";
import { Button, Badge, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QRcode from "../data/img/QR.png";

const AdsFive = ({
  price,
  selectedDuration,
  startDate,
  setAdStep,
  setActiveStep,
}) => {
  const [showModal, setShowModal] = useState(false); // ใช้สำหรับเปิด/ปิด Modal
  const navigate = useNavigate();

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + selectedDuration);

  useEffect(() => {
    // เมื่อหน้า AdsFive โหลดให้เปิด Modal ทันที
    setShowModal(true);
  }, []); // [] ทำให้ใช้เพียงแค่ครั้งเดียวเมื่อคอมโพเนนต์นี้โหลด

  useEffect(
    () => {
      setAdStep(5);
    },
    [setAdStep],
    setActiveStep(0),
    [setActiveStep]
  );

  const handleBack = () => {
    navigate("/ads-four");
  };

  const handleCloseModal = () => {
    setShowModal(false); // ปิด Modal
    navigate("/step-one");
    setAdStep(null);
  };

  const handleConfirmPayment = () => {
    setShowModal(false); // ปิด Modal
    navigate("/"); // ทำการยืนยันและไปหน้า
    setAdStep(null);
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
                ชำระเงินสำเร็จ
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
        <Button variant="primary" onClick={handleConfirmPayment}>
          ยืนยันและชำระเงิน
        </Button>
      </div>

      {/* Modal when confirmed */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title className="m-auto fw-bolder fs-2">เสร็จสิ้น</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div>โฆษณาจะเริ่มแสดงผล</div>
            <div className="d-flex gap-2 justify-content-center">
              <div>ในวันที่</div>
              <div>
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
          </div>
        </Modal.Body>
        <Modal.Footer className="m-auto">
          <Button variant="primary" onClick={handleCloseModal}>
            กลับหน้าแรก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdsFive;
