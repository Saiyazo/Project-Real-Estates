import { useState } from "react";
import { useLocation, useOutletContext, NavLink } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "./pageStyle/card.css";

const DetailAD = () => {
  const { adRequests, setAdRequests } = useOutletContext();
  const location = useLocation();
  const adData = location.state?.ad;
  const [ad, setAd] = useState(adData);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  if (!ad) return <div>ไม่พบข้อมูลโฆษณา</div>;

  const statusColor = {
    ยกเลิก: { color: "#FF4C4C", bg: "#FFD6D6" },
    กำลังเผยแพร่: { color: "#32CD32", bg: "#D0FFD0" },
    รอการตรวจสอบ: { color: "#FFA500", bg: "#FFF4CC" },
    รอผู้ใช้แก้ไขข้อมูล: { color: "#1E90FF", bg: "#CCE5FF" },
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleSendMessage = () => {
    setAd({ ...ad, status: "รอผู้ใช้แก้ไขข้อมูล" });
    const updatedAds = adRequests.map((a) =>
      a.id === ad.id ? { ...a, status: "รอผู้ใช้แก้ไขข้อมูล" } : a
    );
    setAdRequests(updatedAds);
    setShowModal(false);
    alert(`ส่งข้อความไปยังผู้ใช้: ${ad.contact.name}\n${message}`);
  };

  const handlePublish = () => {
    setAd({ ...ad, status: "รอชำระเงิน" });
    const updatedAds = adRequests.map((a) =>
      a.id === ad.id ? { ...a, status: "รอชำระเงิน" } : a
    );
    setAdRequests(updatedAds);
    alert("โฆษณาถูกเปลี่ยนสถานะเป็น รอชำระเงิน เรียบร้อยแล้ว!");
  };

  return (
    <div className="p-4">
      <NavLink to="/PlaceAd">
        <button className="btn btn-outline-secondary mb-3">กลับ</button>
      </NavLink>
      <div className="d-flex">
        {ad.image && (
          <div >
            <h2>{ad.campaignDetails}</h2>
            <div className="AD-pic">
              <img src={ad.image} alt={ad.campaignDetails} />
            </div>

            <div>
              <h5>วันที่ส่งคำขอ</h5>
              <p>{ad.submittedAt}</p>
              <h5>ข้อมูลบริษัท / ผู้ติดต่อ</h5>
              <p>ชื่อบริษัท: {ad.companyName}</p>
              <p>ชื่อผู้ติดต่อ: {ad.contact.name}</p>
              <p>Email: {ad.contact.email}</p>
            </div>
          </div>
        )}

        <div>
          <h5>รายละเอียดโฆษณา</h5>
          <p>ประเภทโฆษณา: {ad.adType}</p>
          <p>แพ็กเกจ: {ad.package}</p>
          <p>ราคา: {ad.price}</p>
          <p>ประเภทอสังหา: {ad.propertyType}</p>
          <p>วันที่เริ่ม: {ad.startDate}</p>
          <p>วันที่สิ้นสุด: {ad.endDate}</p>
          <p>
            สถานะ:{" "}
            <span
              style={{
                color: statusColor[ad.status]?.color,
                backgroundColor: statusColor[ad.status]?.bg,
                padding: "5px 12px",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              {ad.status}
            </span>
          </p>

          {ad.status === "รอการตรวจสอบ" && (
            <>
              <Button variant="warning" onClick={handleModalShow}>
                แจ้งผู้ใช้แก้ไข
              </Button>
              <Button variant="success" onClick={handlePublish}>
                เผยแพร่โฆษณา
              </Button>
            </>
          )}
          {ad.status === "รอผู้ใช้แก้ไขข้อมูล" && (
            <>
              <Button variant="warning" onClick={handleModalShow}>
                แจ้งผู้ใช้แก้ไข
              </Button>
              <Button variant="success" onClick={handlePublish}>
                เผยแพร่โฆษณา
              </Button>
            </>
          )}
        </div>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>แจ้งผู้ใช้แก้ไขโฆษณา</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ระบุว่าต้องแก้ตรงไหน แล้วส่งกลับไป"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              ปิด
            </Button>
            <Button variant="primary" onClick={handleSendMessage}>
              ส่งข้อความ
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DetailAD;
