import { useEffect, useState } from "react";
import { fetchComplaints } from "../Data/DataComplaints";
import { Modal, Button } from "react-bootstrap";
import "./pageStyle/ComplaintBoard.css";

const statusColumns = [
  { key: "รอดำเนินการ", label: "รอดำเนินการ" },
  { key: "อยู่ระหว่างการตรวจสอบ", label: "อยู่ระหว่างการตรวจสอบ" },
  { key: "เสร็จสิ้น", label: "เสร็จสิ้น" },
];

const typeColumns = [
  { key: "ร้องเรียนประกาศ", label: "ประกาศ" },
  { key: "ร้องเรียนผู้ใช้", label: "ผู้ใช้" },
  { key: "ร้องเรียนแชต", label: "แชต" },
];

const ComplaintBoard = () => {
  const [complaints, setComplaints] = useState([]);
  const [viewBy, setViewBy] = useState("status");
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    setComplaints(fetchComplaints());
  }, []);

  const handleCheckClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "รอดำเนินการ":
        return <span className="badge bg-warning text-dark">{status}</span>;
      case "อยู่ระหว่างการตรวจสอบ":
        return <span className="badge bg-info text-dark">{status}</span>;
      case "เสร็จสิ้น":
        return <span className="badge bg-success">{status}</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const columns = viewBy === "status" ? statusColumns : typeColumns;

  return (
    <div className="p-4 pageAll">
      <h2 className="mb-3">ประวัติคำร้องเรียน</h2>
      <div className="d-flex gap-3 mb-4">
        <button
          className={`btn-custom ${
            viewBy === "status" ? "active-status" : "inactive"
          }`}
          onClick={() => setViewBy("status")}
        >
          แยกตามสถานะ
        </button>
        <button
          className={`btn-custom ${
            viewBy === "type" ? "active-type" : "inactive"
          }`}
          onClick={() => setViewBy("type")}
        >
          แยกตามประเภทคำร้องเรียน
        </button>
      </div>
      <div className="d-flex gap-3 ">
        {columns.map((col) => (
          <div key={col.key} style={{ flex: "0 0 32%", minWidth: "300px" }}>
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-white fw-bold text-center">
                {col.label}
              </div>
              <div className="card-body complaints-card-body">
                {complaints
                  .filter((c) =>
                    viewBy === "status"
                      ? c.status === col.key
                      : c.type === col.key
                  )
                  .map((item) => (
                    <div
                      className="card mb-3 complaint-card shadow-sm"
                      key={item.id}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="fw-bold">
                            {item.complaintNumber}
                          </span>
                          {getStatusBadge(item.status)}
                        </div>
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text text-muted mb-1">
                          <strong>ผู้ร้องเรียน:</strong> {item.reporter.role} ·{" "}
                          {item.reporter.name}
                        </p>
                        <p className="card-text text-muted mb-2">
                          <strong>ผู้ถูกร้องเรียน:</strong>{" "}
                          {item.GetReporter.role} · {item.GetReporter.name}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <small className="text-muted">{item.date}</small>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleCheckClick(item)}
                          >
                            {item.status === "เสร็จสิ้น"
                              ? "ดูการจัดการ"
                              : item.type === "ร้องเรียนประกาศ" 
                              ? "ตรวจสอบ"
                              : "ตรวจสอบ"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal แสดงรายละเอียดคำร้องเรียน */}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดคำร้องเรียน</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {selectedComplaint && (
            <div>
              <p>
                <strong>หมายเลขคำร้อง:</strong>{" "}
                {selectedComplaint.complaintNumber}
              </p>
              <p>
                <strong>ประเภท:</strong> {selectedComplaint.type}
              </p>
              <p>
                <strong>หัวข้อ:</strong> {selectedComplaint.title}
              </p>
              <p>
                <strong>รายละเอียด:</strong> {selectedComplaint.details}
              </p>
              <p>
                <strong>ผู้ร้องเรียน:</strong> {selectedComplaint.reporter.role}{" "}
                · {selectedComplaint.reporter.name}
              </p>
              <p>
                <strong>ผู้ถูกร้องเรียน:</strong>{" "}
                {selectedComplaint.GetReporter.role} ·{" "}
                {selectedComplaint.GetReporter.name}
              </p>
              <p>
                <strong>วันที่:</strong> {selectedComplaint.date}
              </p>
              <p>
                <strong>สถานะ:</strong> {selectedComplaint.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedComplaint && selectedComplaint.status !== "เสร็จสิ้น" && (
            <>
              {selectedComplaint.type === "ร้องเรียนประกาศ" ? (
                <>
                  <Button variant="primary" onClick={handleClose}>
                    เตือนผู้ใช้
                  </Button>
                  <Button variant="warning" onClick={handleClose}>
                    ระงับการใช้งานชั่วคราว
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    ระงับการใช้งานถาวร
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    ปฏิเสธการร้องเรียน
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleClose}>
                    เตือนผู้ใช้
                  </Button>
                  <Button variant="warning" onClick={handleClose}>
                    ระงับประกาศ
                  </Button>
                  <Button variant="danger" onClick={handleClose}>
                    ลบประกาศ
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    ปฏิเสธการร้องเรียน
                  </Button>
                </>
              )}
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComplaintBoard;
