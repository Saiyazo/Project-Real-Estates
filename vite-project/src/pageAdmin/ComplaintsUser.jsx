import { useEffect, useState } from "react";
import { fetchComplaints } from "../data/DataComplaints";
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
  const [showWarningInput, setShowWarningInput] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [showSuspendInput, setShowSuspendInput] = useState(false);
  const [suspendDays, setSuspendDays] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setSelectedComplaint(null);
    setShowWarningInput(false);
    setWarningText("");
    setShowSuspendInput(false);
    setSuspendDays("");
  };

   const updateComplaintStatus = (id, action = "") => {
    setComplaints((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, status: "เสร็จสิ้น", actionTaken: action } : c
      );

      return updated.sort((a, b) => {
        if (a.id === id) return -1;
        if (b.id === id) return 1;
        return 0;
      });
    });
    handleClose();
  };

  useEffect(() => {
    setComplaints(fetchComplaints());
  }, []);

  const handleCheckClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
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

      <div className="d-flex gap-3">
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

      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดคำร้องเรียน</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#fcfcfc",
            borderRadius: "12px",
          }}
        >
          {selectedComplaint && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    marginBottom: "15px",
                  }}
                >
                  รายละเอียดคำร้องเรียน
                </h3>

                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>หมายเลขคำร้อง:</strong>{" "}
                  {selectedComplaint.complaintNumber}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>ประเภท:</strong> {selectedComplaint.type}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>หัวข้อ:</strong> {selectedComplaint.title}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>รายละเอียด:</strong> {selectedComplaint.details}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>ผู้ร้องเรียน:</strong>{" "}
                  {selectedComplaint.reporter.role} ·{" "}
                  {selectedComplaint.reporter.name}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>ผู้ถูกร้องเรียน:</strong>{" "}
                  {selectedComplaint.GetReporter.role} ·{" "}
                  {selectedComplaint.GetReporter.name}
                </p>
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>วันที่:</strong> {selectedComplaint.date}
                </p>

                {/* แก้ไขภาพประกอบ */}
                <p style={{ fontSize: "1.15rem", marginBottom: "8px" }}>
                  <strong>ภาพประกอบ :</strong>
                </p>
                <div
                  className="border mt-2"
                  style={{
                    width: "80%",
                    minHeight: "300px",
                    maxHeight: "500px",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#fafafa",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    overflow: "hidden",
                  }}
                >
                  {selectedComplaint.images &&
                  selectedComplaint.images.length > 0 ? (
                    <img
                      src={selectedComplaint.images[0]}
                      alt="ภาพประกอบ"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        borderRadius: "12px",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#999" }}>ไม่มีภาพประกอบ</span>
                  )}
                </div>

                <p style={{ fontSize: "1.15rem", marginTop: "10px" }}>
                  <strong>สถานะ:</strong>{" "}
                  <span
                    style={{
                      color:
                        selectedComplaint.status === "รอดำเนินการ"
                          ? "#FFA500"
                          : selectedComplaint.status === "อยู่ระหว่างการตรวจสอบ"
                          ? "#0D6EFD"
                          : "#32CD32",
                      backgroundColor:
                        selectedComplaint.status === "รอดำเนินการ"
                          ? "#FFF9E5"
                          : selectedComplaint.status === "อยู่ระหว่างการตรวจสอบ"
                          ? "#E5F6FF"
                          : "#E6FFED",
                      padding: "5px 14px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    {selectedComplaint.status}
                  </span>
                </p>
              </div>

              {/* กล่องพิมพ์ข้อความเตือน */}
              {showWarningInput && (
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: "#fff8e6",
                    borderRadius: "12px",
                    border: "1px solid #ffe0a3",
                    marginTop: "10px",
                  }}
                >
                  <h5 style={{ fontWeight: "600" }}>พิมพ์ข้อความเตือนผู้ใช้</h5>
                  <textarea
                    className="form-control mt-2"
                    rows={4}
                    placeholder="กรอกข้อความที่ต้องการเตือนผู้ใช้..."
                    value={warningText}
                    onChange={(e) => setWarningText(e.target.value)}
                  ></textarea>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowWarningInput(false);
                        setWarningText("");
                      }}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        updateComplaintStatus(
                          selectedComplaint.id,
                          "ส่งคำเตือนผู้ใช้"
                        );
                        setShowWarningInput(false);
                      }}
                    >
                      ส่งคำเตือน
                    </Button>
                  </div>
                </div>
              )}

              {/* กล่องเลือกจำนวนวันระงับ */}
              {showSuspendInput && (
                <div
                  style={{
                    padding: "15px",
                    backgroundColor: "#ffecec",
                    borderRadius: "12px",
                    border: "1px solid #ffb3b3",
                    marginTop: "10px",
                  }}
                >
                  <h5 style={{ fontWeight: "600" }}>
                    เลือกจำนวนวันที่ต้องการระงับประกาศ
                  </h5>
                  <select
                    className="form-select mt-2"
                    value={suspendDays}
                    onChange={(e) => setSuspendDays(e.target.value)}
                  >
                    <option value="">-- เลือกจำนวนวัน --</option>
                    <option value="1">1 วัน</option>
                    <option value="3">3 วัน</option>
                    <option value="7">7 วัน</option>
                    <option value="14">14 วัน</option>
                    <option value="30">30 วัน</option>
                  </select>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowSuspendInput(false);
                        setSuspendDays("");
                      }}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (!suspendDays) return;
                        updateComplaintStatus(
                          selectedComplaint.id,
                          `ระงับประกาศ ${suspendDays} วัน`
                        );
                        setShowSuspendInput(false);
                        setSuspendDays("");
                      }}
                    >
                      ยืนยันระงับ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer>
          {selectedComplaint ? (
            selectedComplaint.status !== "เสร็จสิ้น" ? (
              selectedComplaint.type === "ร้องเรียนประกาศ" ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowWarningInput(true);
                      setShowSuspendInput(false);
                      setWarningText("");
                      setSuspendDays("");
                    }}
                  >
                    เตือนผู้ใช้
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setShowWarningInput(false);
                      setWarningText("");
                      setShowSuspendInput(true);
                      setSuspendDays("");
                    }}
                  >
                    ระงับการใช้งานชั่วคราว
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      updateComplaintStatus(selectedComplaint.id, "ระงับถาวร")
                    }
                  >
                    ระงับการใช้งานถาวร
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    ปฏิเสธการร้องเรียน
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowWarningInput(true);
                      setShowSuspendInput(false);
                      setWarningText("");
                      setSuspendDays("");
                    }}
                  >
                    เตือนผู้ใช้
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setShowWarningInput(false);
                      setWarningText("");
                      setShowSuspendInput(true);
                      setSuspendDays("");
                    }}
                  >
                    ระงับประกาศ
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      updateComplaintStatus(selectedComplaint.id, "ลบประกาศ")
                    }
                  >
                    ลบประกาศ
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    ปฏิเสธการร้องเรียน
                  </Button>
                </>
              )
            ) : (
              <div style={{ width: "100%" }}>
                {selectedComplaint?.actionTaken && (
                  <span>จัดการโดย: {selectedComplaint.actionTaken}</span>
                )}
              </div>
            )
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComplaintBoard;
