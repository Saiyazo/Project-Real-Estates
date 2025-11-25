import { useState } from "react";
import { useLocation, useOutletContext, NavLink } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

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
    รอชำระเงิน: { color: "#C15A00", bg: "#FCC99F" },
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleSendMessage = () => {
    setAd({ ...ad, status: "รอผู้ใช้แก้ไขข้อมูล" });
    setAdRequests(
      adRequests.map((a) =>
        a.id === ad.id ? { ...a, status: "รอผู้ใช้แก้ไขข้อมูล" } : a
      )
    );
    setShowModal(false);
    alert(`ส่งข้อความไปยังผู้ใช้: ${ad.contact.name}\n${message}`);
  };

  const handlePublish = () => {
    setAd({ ...ad, status: "รอชำระเงิน" });
    setAdRequests(
      adRequests.map((a) =>
        a.id === ad.id ? { ...a, status: "รอชำระเงิน" } : a
      )
    );
    alert("โฆษณาถูกเปลี่ยนสถานะเป็น รอชำระเงิน เรียบร้อยแล้ว!");
  };

  return (
    <div className="p-4">
      <div className="p-4">
        <NavLink to="/PlaceAd">
          <Button variant="outline-secondary" className="mb-3">
            กลับ
          </Button>
        </NavLink>

        <div className="d-flex gap-4">
          {/* ฝั่งรูป */}
          <div style={{ flex: "1 1 60%" }}>
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "400px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {ad.image ? (
                <img
                  src={ad.image}
                  alt={ad.campaignDetails}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span className="text-muted">ไม่มีรูป</span>
              )}
            </div>

            <div
              className="card mt-3 p-4"
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "1px solid #e0e0e0", // ขอบอ่อน
                backgroundColor: "#fdfdfd", // พื้นการ์ดอ่อน ๆ
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)", // เงาเบา ๆ
              }}
            >
              <h2
                className="mb-3"
                style={{ fontSize: "2rem", fontWeight: "700" }}
              >
                {ad.campaignDetails}
              </h2>
              <h4 className="mb-2 mt-2" style={{ fontSize: "1.3rem" }}>
                <strong>ID:</strong> {ad.id}
              </h4>
              <h4 className="mb-2 mt-2" style={{ fontSize: "1.3rem" }}>
                <strong>ชื่อบริษัท:</strong> {ad.companyName}
              </h4>
              <h4 className="mb-2 mt-2" style={{ fontSize: "1.3rem" }}>
                <strong>ชื่อโปรเจค:</strong> {ad.projectName}
              </h4>
              <h4 className="mb-2 mt-2" style={{ fontSize: "1.3rem" }}>
                <strong>ผู้ติดต่อ:</strong> {ad.contact.name}
              </h4>
              <h4 className="mb-2 mt-2" style={{ fontSize: "1.3rem" }}>
                <strong>Email:</strong> {ad.contact.email}
              </h4>
            </div>
          </div>

          {/* ฝั่งข้อมูล slot */}
          <div style={{ flex: "1 1 35%" }}>
            <div
              className="shadow p-4"
              style={{
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "60%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* ข้อมูลโฆษณา */}
              <div>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>Slot:</strong> {ad.slot}
                </p>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>ระยะเวลา:</strong> {ad.during}
                </p>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>ราคา:</strong> {ad.price}
                </p>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>วันที่เริ่ม:</strong> {ad.startDate}
                </p>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>วันที่สิ้นสุด:</strong> {ad.endDate}
                </p>
                <p
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: "500",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>สถานะ:</strong>{" "}
                  <span
                    style={{
                      color: statusColor[ad.status]?.color,
                      backgroundColor: statusColor[ad.status]?.bg,
                      padding: "8px 16px",
                      borderRadius: "15px",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      display: "inline-block",
                    }}
                  >
                    {ad.status}
                  </span>
                </p>
              </div>

              {/* ปุ่ม action */}
              {(ad.status === "รอการตรวจสอบ" ||
                ad.status === "รอผู้ใช้แก้ไขข้อมูล") && (
                <div className="d-flex gap-3 mt-2 mb-3">
                  <Button
                    variant="warning"
                    style={{ flex: 1, fontWeight: "400", fontSize: "1.15rem" }}
                    onClick={handleModalShow}
                  >
                    แจ้งผู้ใช้แก้ไข
                  </Button>
                  <Button
                    variant="success"
                    style={{ flex: 1, fontWeight: "400", fontSize: "1.15rem" }}
                    onClick={handlePublish}
                  >
                    เผยแพร่โฆษณา
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            แจ้งผู้ใช้แก้ไขโฆษณา
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ระบุว่าต้องแก้ตรงไหน แล้วส่งกลับไป"
            style={{
              fontSize: "1.1rem",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={handleModalClose}
            style={{
              fontSize: "1.1rem",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            ปิด
          </Button>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            style={{
              fontSize: "1.1rem",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            ส่งข้อความ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailAD;
