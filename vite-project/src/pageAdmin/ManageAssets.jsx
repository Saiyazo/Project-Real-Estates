import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { fetchPropertys } from "../Data/propertyS";
import "./pageStyle/dash.css";

const ManageAssets = () => {
  const [propertys, setPropertys] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPropertys();
      setPropertys(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(propertys.length / itemsPerPage) || 1;
    setNumPages(totalPages);
    if (curPage > totalPages) setCurPage(totalPages);
  }, [propertys, itemsPerPage]);

  const dateOfProperty = propertys
    .slice()
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  const FirstPage = (curPage - 1) * itemsPerPage;
  const LastPage = Math.min(curPage * itemsPerPage, propertys.length);
  const property = dateOfProperty.slice(FirstPage, LastPage);

  return (
    <div className="p-4 pageAll">
      <h1>รายการอสังหาริมทรัพย์</h1>

      <nav className="navbar bg-light py-3 rounded-3 shadow-sm">
        <div className="d-flex w-100 px-2 align-items-center justify-content-between">
          <form className="d-flex flex-wrap align-items-center gap-3 w-100 justify-content-between">
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
                  />
                </div>
              </div>
              <button className="btn btn-outline-primary px-4" type="submit">
                Search
              </button>
            </div>

            <div className="text-end d-flex align-items-center gap-2">
              <DropdownButton variant="outline-secondary" title="สถานะ">
                <Dropdown.Item>ขายแล้ว</Dropdown.Item>
                <Dropdown.Item>พึ่งประกาศ</Dropdown.Item>
                <Dropdown.Item>รอการตรวจสอบ</Dropdown.Item>
              </DropdownButton>

              <DropdownButton variant="outline-secondary" title="ประเภท">
                <Dropdown.Item>คอนโด</Dropdown.Item>
                <Dropdown.Item>บ้านเดี่ยว</Dropdown.Item>
                <Dropdown.Item>ทาวน์โฮม</Dropdown.Item>
              </DropdownButton>

              <DropdownButton
                variant="outline-secondary"
                title="วันที่ลงประกาศ"
              >
                <Dropdown.Item>วันนี้</Dropdown.Item>
                <Dropdown.Item>สัปดาห์นี้</Dropdown.Item>
                <Dropdown.Item>เดือนนี้</Dropdown.Item>
              </DropdownButton>
            </div>
          </form>
        </div>
      </nav>

      <div className="mt-4">
        <Form>
          <div className="d-flex mb-3 align-items-center justify-content-between">
            <Form.Select
              className="w-25"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurPage(1);
              }}
            >
              <option value={5}>จำนวน 5 อสังหาที่แสดง</option>
              <option value={10}>จำนวน 10 อสังหาที่แสดง</option>
              <option value={50}>จำนวน 50 อสังหาที่แสดง</option>
              <option value={100}>จำนวน 100 อสังหาที่แสดง</option>
            </Form.Select>
          </div>
        </Form>

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
                          : p.status === "กำลังเผยแพร้"
                          ? "green"
                          : p.status === "อยู่ระหว่างการเจรจา"
                          ? "#795c36"
                          : "black",
                      backgroundColor:
                        p.status === "ขายแล้ว"
                          ? "#ffcccc"
                          : p.status === "กำลังเผยแพร้"
                          ? "#ccffcc"
                          : p.status === "อยู่ระหว่างการเจรจา"
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
                แสดง {FirstPage + 1} - {LastPage} จาก {propertys.length} อสังหา
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
