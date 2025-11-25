import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QRcode from "../data/img/QR.png"

const AdsFour = ({ price, selectedDuration, startDate }) => {
  const navigate = useNavigate();

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + selectedDuration);

  return (
    <div className="py-4 m-auto" style={{ width: "800px" }}>
      <div className="p-3">
        <div>
          <div className="fw-bolder fs-3 mb-2">Ad Summary</div>
          <span>แพ็กเกจ:</span>{" "}
          <span className="fw-bolder">Premium Package</span>
          <div>ระยะเวลา: {selectedDuration}</div>
          <p>ราคา: {price} ฿</p>
          {/* แสดงวันที่เริ่มและวันที่สิ้นสุดในรูปแบบ "วัน/เดือน/ปี" */}
          <p>
            วันที่เริ่มและสิ้นสุด{" "}
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
          </p>
          <p>สถานะ: รอการชำระ</p>
        </div>
        <div>
          {/* ใส่รูป QR */}
          <img
            src={QRcode}
            alt="QR Code"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={() => navigate("/ads-three")}>
          ยกเลิกคำขอ
        </Button>
        <Button variant="primary" onClick={() => alert("การชำระเงินสำเร็จ!")}>
          ยืนยันและชำระเงิน
        </Button>
      </div>
    </div>
  );
};

export default AdsFour;
