import { useState, useEffect } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./pageStyle/dash.css";

const PlaceAd = () => {
  const { adRequests, setAdRequests } = useOutletContext();
  const [search, setSearch] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numPages, setNumPages] = useState(1);
  const [showTableModal, setShowTableModal] = useState(false);

  // ตั้งค่าคอลัมน์ (ค่าเริ่มต้นโชว์ทั้งหมด)
  const [columns, setColumns] = useState({
    id: true,
    companyName: true,
    contact: true,
    adType: true,
    status: true,
    submittedAt: true,
    actions: true,
  });

  // อัปเดตสถานะจาก sessionStorage
  useEffect(() => {
    const changedAd = JSON.parse(sessionStorage.getItem("changedAd"));
    if (changedAd) {
      setAdRequests((prev) =>
        prev.map((ad) =>
          ad.id === changedAd.id ? { ...ad, status: changedAd.status } : ad
        )
      );
      sessionStorage.removeItem("changedAd");
    }
  }, []);

  // Filter data ตาม search
  const filteredData = adRequests.filter(
    (item) =>
      item.companyName.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    setNumPages(totalPages);
    if (curPage > totalPages) setCurPage(totalPages);
  }, [filteredData, itemsPerPage, curPage]);

  const FirstPage = (curPage - 1) * itemsPerPage;
  const LastPage = Math.min(curPage * itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(FirstPage, LastPage);

  // Map status ภาษาไทย -> CSS badge
  const statusBadge = {
    รอการตรวจสอบ: { color: "#b88a00", bg: "#fff1b9ff" },
    รอผู้ใช้แก้ไขข้อมูล: { color: "#005c99", bg: "#c4f0ffff" },
    รอชำระเงิน: { color: "#c15a00", bg: "#fcc99fff" },
    กำลังเผยแพร่: { color: "#17763a", bg: "#d4ffd4" },
    ประกาศหมดอายุ: { color: "#555555", bg: "#f0f0f0" },
    ยกเลิก: { color: "#7a1a05", bg: "#ffc8c8ff" },
  };

  // ฟังก์ชันจัดการปุ่ม
  const handleApprove = (id) => {
    setAdRequests((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: "กำลังเผยแพร่" } : ad))
    );
  };
  const handleReject = (id) => {
    setAdRequests((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, status: "ยกเลิก" } : ad))
    );
  };

  return (
    <div>
      <main className="flex-fill p-4 bg-light">
        <h1 className="mb-4">คำขอลงโฆษณา</h1>

        {/* Stats cards */}
        <div className="row g-3 mb-4">
          {[
            "รอการตรวจสอบ",
            "รอผู้ใช้แก้ไขข้อมูล",
            "รอชำระเงิน",
            "กำลังเผยแพร่",
            "ประกาศหมดอายุ",
          ].map((status) => (
            <div className="col-md-2" key={status}>
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <div className="text-muted small">{status}</div>
                  <div className="fs-3 fw-bold">
                    {adRequests.filter((ad) => ad.status === status).length}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-2">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <div className="text-muted small">รวมทั้งหมด</div>
                <div className="fs-3 fw-bold text-success">
                  {adRequests.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search + ปุ่ม */}
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="ค้นหา ID หรือ ชื่อบริษัท"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="btn-group">
            <button
              className="btn btn-outline-primary"
            >
              <i className="bi bi-calendar"></i>&nbsp;&nbsp;<span>ปฏิทิน</span>
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowTableModal(true)}
            >
              <i className="bi bi-gear"></i>&nbsp;&nbsp;
              <span>ตั้งค่าตาราง</span>
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => alert("คลิกเพิ่ม")}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                {columns.id && <th>ID</th>}
                {columns.companyName && <th>ชื่อบริษัท</th>}
                {columns.contact && <th>ติดต่อ</th>}
                {columns.adType && <th>ประเภทโฆษณา</th>}
                {columns.status && <th>สถานะ</th>}
                {columns.submittedAt && <th>วันที่ส่งคำขอ</th>}
                {columns.actions && <th>การจัดการ</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  {columns.id && <td>{item.id}</td>}
                  {columns.companyName && <td>{item.companyName}</td>}
                  {columns.contact && (
                    <td>
                      {item.contact.name} <br /> {item.contact.email}
                    </td>
                  )}
                  {columns.adType && <td>{item.adType}</td>}
                  {columns.status && (
                    <td>
                      <span
                        style={{
                          color: statusBadge[item.status].color,
                          backgroundColor: statusBadge[item.status].bg,
                          borderRadius: "8px",
                          padding: "10px",
                          display: "inline-block",
                          minWidth: "80px",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  )}
                  {columns.submittedAt && <td>{item.submittedAt}</td>}
                  {columns.actions && (
                    <td>
                      <NavLink to={"/DetailProperty"}>
                        <Button>ดูรายละเอียด</Button>
                      </NavLink>
                    </td>
                  )}
                </tr>
              ))}

              {/* Pagination */}
              <tr>
                <td
                  colSpan={
                    columns.id +
                    columns.companyName +
                    columns.contact +
                    columns.adType +
                    columns.status +
                    columns.submittedAt +
                    columns.actions
                  }
                >
                  แสดง {FirstPage + 1} - {LastPage} จาก {filteredData.length}{" "}
                  โฆษณา
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal ตั้งค่าตาราง */}
        <Modal
          show={showTableModal}
          onHide={() => setShowTableModal(false)}
          size="md"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>
              <i className="bi bi-table me-2"></i>
              ตั้งค่าตาราง
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">จำนวนรายการต่อหน้า</Form.Label>
                <Form.Select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="shadow-sm"
                >
                  {[5, 10, 20, 50].map((num) => (
                    <option key={num} value={num}>
                      {num} รายการต่อหน้า
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-bold mb-2">
                  คอลัมน์ที่จะแสดง
                </Form.Label>
                <div className="d-flex flex-column gap-2 p-2 border rounded shadow-sm">
                  {Object.keys(columns).map((col) => (
                    <Form.Check
                      key={col}
                      type="checkbox"
                      label={col}
                      checked={columns[col]}
                      onChange={(e) =>
                        setColumns({ ...columns, [col]: e.target.checked })
                      }
                    />
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowTableModal(false)}>
              บันทึกการตั้งค่า
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default PlaceAd;
