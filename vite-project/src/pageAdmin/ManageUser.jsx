import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./pageStyle/dash.css";
import './pageStyle/card.css'
import { fetchSellers } from "../Data/Sellers";
import { fetchBuyers } from "../Data/buyer";
import { useEffect, useState } from "react";

const ManageUser = () => {
const [sellers,setSellers] = useState([])
const [buyers,setBuyers] = useState([])

useEffect(() => {
    const fetchData = async () => {
      const DataSelle = await fetchSellers();
      const DataBuy = await fetchBuyers()
      setSellers(DataSelle);
      setBuyers(DataBuy)
    };
    fetchData();
  }, []);

  const allUser = (buyers?.length || 0) + (sellers?.length || 0)



  return (
    <div className="p-4 pageAll">
      <h1>รายการบัญชีผู้ใช้</h1>
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
                    placeholder="ค้นหา ID , ชื่อ , อีเมล , หรือเบอร์โทร..."
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
                title="บทบาทผู้ใช้"
              >
                <Dropdown.Item>ผู้ซื้อ/เช่า</Dropdown.Item>
                <Dropdown.Item>ผู้ขาย/นายหน้า</Dropdown.Item>
              </DropdownButton>

              {/* สถานะ*/}
              <DropdownButton
                variant="outline-secondary"
                id="dropdown-type"
                title="สถานะ"
              >
                <Dropdown.Item>ปกติ</Dropdown.Item>
                <Dropdown.Item>ถูกระงับการใช้งานชั่วคราว</Dropdown.Item>
                <Dropdown.Item>ถูกแบน</Dropdown.Item>
              </DropdownButton>
            </div>
          </form>
        </div>
      </nav>
      <br />
      <div className="stats-container">
        <div className="stats-card total">
          <h6>ผู้ใช้งานทั้งหมด</h6>
          <h3>{allUser}</h3>
        </div>

        <div className="stats-card publish">
          <h6>ผู้ใช้งานใหม่</h6>
          <h3></h3>
        </div>

        <div className="stats-card sold">
          <h6>ผู้ขายที่ยืนยันตัวตนแล้ว</h6>
          <h3></h3>
        </div>

        <div className="stats-card nego">
          <h6>ผู้ใช้ที่ถูกระงับ</h6>
          <h3></h3>
        </div>
      </div>
      
      <div className="mt-3">
        <h5>บัญชีผู้ใช้ทั้งหมด</h5>
      </div>
    </div>
  );
};

export default ManageUser;
