import { useEffect, useState } from "react";
import { Table, Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { fetchSellers } from "../Data/Sellers";
import { fetchBuyers } from "../Data/buyer";
import "./pageStyle/dash.css";
import "./pageStyle/card.css";

const ManageUser = () => {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");

  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [numPages, setNumPages] = useState(1);

  // ดึงข้อมูลผู้ใช้
  useEffect(() => {
    const fetchData = async () => {
      const DataSelle = await fetchSellers();
      const DataBuy = await fetchBuyers();
      setSellers(DataSelle);
      setBuyers(DataBuy);
    };
    fetchData();
  }, []);

  // รวมผู้ใช้ทั้งหมด
  const allUsers = [
    ...buyers.map((u) => ({ ...u, role: "ผู้ซื้อ/ผู้เช่า" })),
    ...sellers.map((u) => ({ ...u, role: "ผู้ขาย/นายหน้า" })),
  ];

  // กรองตาม search / role / status
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase()) ||
      u.phone.includes(searchText);
    const matchesRole = roleFilter === "ทั้งหมด" || u.role === roleFilter;
    const matchesStatus =
      statusFilter === "ทั้งหมด" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const firstIndex = (curPage - 1) * itemsPerPage;
  const lastIndex = Math.min(curPage * itemsPerPage, filteredUsers.length);
  const pagedUsers = filteredUsers.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (curPage > totalPages) setCurPage(totalPages);
  }, [filteredUsers, itemsPerPage, totalPages, curPage]);

  // นับผู้ใช้งานใหม่ในเดือนนี้
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const newUsersThisMonth = allUsers.filter((u) => {
    const join = new Date(u.joinDate);
    return (
      join.getMonth() + 1 === currentMonth && join.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="p-4 pageAll">
      <h1>รายการบัญชีผู้ใช้</h1>

      {/* Stats */}
      <div className="stats-container mb-3">
        <div className="stats-card total">
          <h6>จำนวนผู้ซื้อ/ผู้เช่า</h6>
          <h3>{buyers.length}</h3>
        </div>

        <div className="stats-card publish">
          <h6>จำนวนผู้ขาย/นายหน้า</h6>
          <h3>{sellers.length}</h3>
        </div>

        <div className="stats-card sold">
          <h6>ผู้ใช้งานใหม่ในเดือนนี้</h6>
          <h3>{newUsersThisMonth}</h3>
        </div>

        <div className="stats-card nego">
          <h6>ผู้ใช้ที่ถูกระงับ</h6>
          <h3>{allUsers.filter((u) => u.status !== "ปกติ").length}</h3>
        </div>
      </div>
      <nav className="navbar bg-light py-3 rounded-3 shadow-sm mb-3">
        <div className="d-flex w-100 align-items-center justify-content-between flex-wrap gap-3">
          <div className="flex-grow-1">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="ค้นหา ID , ชื่อ , อีเมล , หรือเบอร์โทร..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

         
            <DropdownButton
              variant="outline-secondary"
              title={roleFilter === "ทั้งหมด" ? "บทบาทผู้ใช้" : roleFilter}
              onSelect={(val) => setRoleFilter(val)}
              className="mb-0"
              style={{ height: "38px" }} // เท่ากับความสูงปุ่ม default
            >
              <Dropdown.Item eventKey="ทั้งหมด">ทั้งหมด</Dropdown.Item>
              <Dropdown.Item eventKey="ผู้ซื้อ/ผู้เช่า">
                ผู้ซื้อ/ผู้เช่า
              </Dropdown.Item>
              <Dropdown.Item eventKey="ผู้ขาย/นายหน้า">
                ผู้ขาย/นายหน้า
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              variant="outline-secondary"
              title={
                statusFilter === "ทั้งหมด" ? "สถานะการใช้งาน" : statusFilter
              }
              onSelect={(val) => setStatusFilter(val)}
              className="mb-0"
              style={{ height: "38px" }}
            >
              <Dropdown.Item eventKey="ทั้งหมด">ทั้งหมด</Dropdown.Item>
              <Dropdown.Item eventKey="ปกติ">ปกติ</Dropdown.Item>
              <Dropdown.Item eventKey="ถูกระงับชั่วคราว">
                ถูกระงับชั่วคราว
              </Dropdown.Item>
              <Dropdown.Item eventKey="ถูกแบน">ถูกแบน</Dropdown.Item>
            </DropdownButton>

            <Form className="mb-0">
              <Form.Select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurPage(1);
                }}
                style={{ height: "38px", width: "180px" }} // ความสูงเท่ากับปุ่ม
              >
                <option value={7}>แสดงผู้ใช้ 7 คน</option>
                <option value={10}>แสดงผู้ใช้ 10 คน</option>
                <option value={50}>แสดงผู้ใช้ 50 คน</option>
                <option value={100}>แสดงผู้ใช้ 100 คน</option>
              </Form.Select>
            </Form>
      
        </div>
      </nav>

      <div>
        <Table striped hover>
          <thead>
            <tr className="text-center align-middle">
              <th>ภาพ</th>
              <th>ชื่อ - Email</th>
              <th>เบอร์โทร</th>
              <th>บทบาท</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {pagedUsers.map((user) => (
              <tr key={user.id} className="text-center align-middle">
                <td>
                  <img src={user.avatar} className="proFile-user" />
                </td>
                <td className="text-start">
                  <h5>{user.name}</h5>
                  <span>{user.email}</span>
                </td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <div
                    className="text-center"
                    style={{
                      color:
                        user.status === "ถูกแบน"
                          ? "red"
                          : user.status === "ปกติ"
                          ? "green"
                          : "#795c36",
                      backgroundColor:
                        user.status === "ถูกแบน"
                          ? "#ffcccc"
                          : user.status === "ปกติ"
                          ? "#ccffcc"
                          : "#fff0b3",
                      borderRadius: "8px",
                      padding: "3px 8px",
                      display: "inline-block",
                      minWidth: "80px",
                    }}
                  >
                    {user.status}
                  </div>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={3}>
                แสดง {firstIndex + 1} - {lastIndex} จาก {filteredUsers.length}{" "}
                ผู้ใช้
              </td>
              <td colSpan={3} className="text-end">
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage(1)}
                  disabled={curPage === 1}
                >
                  หน้าแรก
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage((p) => p - 1)}
                  disabled={curPage === 1}
                >
                  <i className="bi bi-arrow-left"></i>
                </Button>
                <Button className="me-2" variant="outline-primary">
                  {curPage} / {totalPages}
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage((p) => p + 1)}
                  disabled={curPage === totalPages}
                >
                  <i className="bi bi-arrow-right"></i>
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage(totalPages)}
                  disabled={curPage === totalPages}
                >
                  หน้าสุดท้าย
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUser;
