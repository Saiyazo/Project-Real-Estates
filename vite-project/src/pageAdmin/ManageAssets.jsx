import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./pageStyle/dash.css";
import "./pageStyle/card.css";
import { Button } from "react-bootstrap";
import { fetchPropertys } from "../data/propertyS";
import { NavLink } from "react-router-dom";

const ManageAssets = () => {
  const [propertys, setPropertys] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numPages, setNumPages] = useState(1);

  // Search & Filter states
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPropertys();
      setPropertys(data);
    };
    fetchData();
  }, []);

  // Filtered properties
  const filteredPropertys = propertys.filter((p) => {
    // search filter
    const matchesSearch =
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.posterName.toLowerCase().includes(searchText.toLowerCase());

    // status filter
    const matchesStatus = statusFilter ? p.status === statusFilter : true;

    // type filter
    const matchesType = typeFilter ? p.type === typeFilter : true;

    // date filter
    const now = new Date();
    const postedDate = new Date(p.datePosted);
    let matchesDate = true;
    if (dateFilter === "วันนี้") {
      matchesDate = postedDate.toDateString() === now.toDateString();
    } else if (dateFilter === "สัปดาห์นี้") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      matchesDate = postedDate >= weekStart && postedDate <= weekEnd;
    } else if (dateFilter === "เดือนนี้") {
      matchesDate =
        postedDate.getMonth() === now.getMonth() &&
        postedDate.getFullYear() === now.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredPropertys.length / itemsPerPage) || 1;
    setNumPages(totalPages);
    if (curPage > totalPages) setCurPage(totalPages);
  }, [filteredPropertys, itemsPerPage]);

  const FirstPage = (curPage - 1) * itemsPerPage;
  const LastPage = Math.min(curPage * itemsPerPage, filteredPropertys.length);
  const property = filteredPropertys.slice(FirstPage, LastPage);

  // สถิติ
  const soldOut = propertys.filter((p) => p.status === "ขายแล้ว").length;
  const Publishing = propertys.filter(
    (p) => p.status === "กำลังเผยแพร่"
  ).length;
  const Negotiating = propertys.filter(
    (p) => p.status === "อยู่ระหว่างเจรจา"
  ).length;

  return (
    <div className="p-4 pageAll">
      <h1>รายการอสังหาริมทรัพย์</h1>

      {/* Stats */}
      <div className="stats-container">
        <div className="stats-card total">
          <h6>จำนวนอสังหาทั้งหมด</h6>
          <h3>{propertys.length}</h3>
        </div>

        <div className="stats-card publish">
          <h6>อสังหาที่กำลังเผยแพร่</h6>
          <h3>{Publishing}</h3>
        </div>

        <div className="stats-card sold">
          <h6>อสังหาที่ขายออก</h6>
          <h3>{soldOut}</h3>
        </div>

        <div className="stats-card nego">
          <h6>อสังหาที่อยู่ระหว่างการเจรจา</h6>
          <h3>{Negotiating}</h3>
        </div>
      </div>
      <nav className="navbar bg-light py-3 rounded-3 shadow-sm">
        <div className="d-flex w-100 px-2 align-items-center justify-content-between">
          <form
            className="d-flex flex-wrap align-items-center gap-3 w-100 justify-content-between"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="text-start d-flex align-items-center gap-2 flex-grow-1">
              <div className="flex-grow-1">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="ค้นหาอสังหา..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="btn btn-outline-primary px-4"
                type="submit"
                onClick={() => setCurPage(1)}
              >
                Search
              </button>
            </div>

            <div className="text-end d-flex align-items-center gap-2">
              {/* Status Filter */}
              <DropdownButton
                variant="outline-secondary"
                title={statusFilter || "สถานะ"}
              >
                <Dropdown.Item onClick={() => setStatusFilter("")}>
                  ทุกสถานะ
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter("ขายแล้ว")}>
                  ขายแล้ว
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setStatusFilter("กำลังเผยแพร่")}>
                  กำลังเผยแพร่
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStatusFilter("อยู่ระหว่างเจรจา")}
                >
                  อยู่ระหว่างเจรจา
                </Dropdown.Item>
              </DropdownButton>

              {/* Type Filter */}
              <DropdownButton
                variant="outline-secondary"
                title={typeFilter || "ประเภท"}
              >
                <Dropdown.Item onClick={() => setTypeFilter("")}>
                  ทุกประเภท
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("คอนโด")}>
                  คอนโด
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("บ้านเดี่ยว")}>
                  บ้านเดี่ยว
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("บ้านแฝด")}>
                  บ้านแฝด
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("ทาวน์โฮม")}>
                  ทาวน์โฮม
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("ที่ดินเปล่า")}>
                  ที่ดินเปล่า
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setTypeFilter("ที่ดินเปล่าพร้อมสิ่งปลูกสร้าง")}
                >
                  ที่ดินพร้อมสิ่งปลูกสร้าง
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTypeFilter("อพาร์ทเมนต์")}>
                  อพาร์ทเมนต์
                </Dropdown.Item>
              </DropdownButton>

              {/* Date Filter */}
              <DropdownButton
                variant="outline-secondary"
                title={dateFilter || "วันที่ลงประกาศ"}
              >
                <Dropdown.Item onClick={() => setDateFilter("")}>
                  ทุกวัน
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDateFilter("วันนี้")}>
                  วันนี้
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDateFilter("สัปดาห์นี้")}>
                  สัปดาห์นี้
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDateFilter("เดือนนี้")}>
                  เดือนนี้
                </Dropdown.Item>
              </DropdownButton>
              <Form>
                <Form.Select
                  className="w-250"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurPage(1);
                  }}
                >
                  <option value={10}>แสดงประกาศอสังหา 10 ประกาศ</option>
                  <option value={50}>แสดงประกาศอสังหา 50 ประกาศ</option>
                  <option value={100}>แสดงประกาศอสังหา 100 ประกาศ</option>
                </Form.Select>
              </Form>
            </div>
          </form>
        </div>
      </nav>
      {/* Table */}
      <div>
        <Table striped hover>
          <thead>
            <tr className="text-center align-middle">
              <th>ID</th>
              <th className="text-start">ชื่อสินทรัพย์</th>
              <th className="text-start">ชื่อผู้ขาย</th>
              <th>สถานะ</th>
              <th>วันที่ประกาศ</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>

          <tbody>
            {property.map((p, index) => (
              <tr key={p.id || index} className="text-center align-middle">
                <td>{p.listingNumber}</td>
                <td className="text-start">{p.title}</td>
                <td className="text-start">{p.posterName}</td>
                <td>
                  <div
                    style={{
                      color:
                        p.status === "ขายแล้ว"
                          ? "red"
                          : p.status === "กำลังเผยแพร่"
                          ? "green"
                          : p.status === "อยู่ระหว่างเจรจา"
                          ? "#795c36"
                          : "black",
                      backgroundColor:
                        p.status === "ขายแล้ว"
                          ? "#ffcccc"
                          : p.status === "กำลังเผยแพร่"
                          ? "#ccffcc"
                          : p.status === "อยู่ระหว่างเจรจา"
                          ? "#fff0b3"
                          : "white",
                      borderRadius: "8px",
                      padding: "3px 8px",
                      display: "inline-block",
                      minWidth: "80px",
                    }}
                  >
                    {p.status}
                  </div>
                </td>
                <td>{p.datePosted}</td>
                <td>
                  
                    <button className="btn btn-primary btn-sm">
                      ดูรายละเอียด
                    </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={3}>
                แสดง {FirstPage + 1} - {LastPage} จาก {filteredPropertys.length}{" "}
                อสังหา
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
                  {curPage} / {numPages}
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage((p) => p + 1)}
                  disabled={curPage === numPages}
                >
                  <i className="bi bi-arrow-right"></i>
                </Button>
                <Button
                  className="me-2"
                  variant="outline-primary"
                  onClick={() => setCurPage(numPages)}
                  disabled={curPage === numPages}
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

export default ManageAssets;
