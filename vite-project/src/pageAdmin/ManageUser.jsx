import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./pageStyle/dash.css";
import BlockUser from "../component/blockUser";

const ManageUser = () => {
  return (
    <div className="p-4 pageAll">
      <h1>จัดการบัญชีผู้ใช้</h1>
      <nav className="navbar bg-light py-3 rounded-3 shadow-sm">
        <div className="d-flex w-100 px-2 align-items-center justify-content-between">
          <form
            className="d-flex flex-wrap align-items-center gap-3 w-100 justify-content-between"
            role="search"
          >
            <div className="text-start d-flex align-items-center gap-2 flex-grow-1">
              {/* ช่อง Search */}
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

              <button className="btn btn-primary px-4" type="submit">
                Search
              </button>
            </div>

            <div className="text-end d-flex align-items-center gap-2">
              {/* สถานะ */}
              <DropdownButton
                variant="outline-secondary"
                id="dropdown-status"
                title="สถานะ"
              >
                <Dropdown.Item>ขายแล้ว</Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item>รอการตรวจสอบ</Dropdown.Item>
              </DropdownButton>

              {/* ประเภท*/}
              <DropdownButton
                variant="outline-secondary"
                id="dropdown-type"
                title="ประเภท"
              >
                <Dropdown.Item>คอนโด</Dropdown.Item>
                <Dropdown.Item>บ้านเดี่ยว</Dropdown.Item>
                <Dropdown.Item>ทาวน์โฮม</Dropdown.Item>
              </DropdownButton>

              {/* วันที่ลงประกาศ*/}
              <DropdownButton
                variant="outline-secondary"
                id="dropdown-date"
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
      <br />
      <h5>บัญชีผู้ใช้ที่ถูกรายงาน</h5>
      <div className="d-flex">
        {/**ก้อนการ์ดผู้ใช้ */}
        
        <BlockUser/>
      </div>
      <div className="mt-3">
        <h5>บัญชีผู้ใช้ทั้งหมด</h5>
        <TableUser/>

      </div>
    </div>
  );
};

export default ManageUser;
