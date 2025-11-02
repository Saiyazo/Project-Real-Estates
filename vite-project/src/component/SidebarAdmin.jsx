import { Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import Raccoon from "../IMG/Raccoon.jpg";

const SidebarAdmin = () => {
  return (
    <div className="d-flex flex-column gap-2">
      {/* Profile */}
      <Button variant="outline-secondary" className="d-flex p-2 bg-light">
        <div
          className="border me-3"
          style={{
            backgroundImage: `url(${Raccoon})`,
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="text-muted">
          <span className="fw-semibold fs-5">Admin H.</span>
          <br />
          <span>view profile</span>
        </div>
      </Button>

      {/* Menu Buttons */}
      <div className="d-flex flex-column gap-2 mt-5 ">
        <Button variant="light" className="border d-flex justify-content-start align-items-center" onClick={()=>{}}>
          <i className="bi bi-columns-gap me-2 ms-3 fs-5"></i>หน้าแดชบอร์ดแอดมิน
        </Button>
        <Button variant="light" className="border d-flex justify-content-start align-items-center">
          <i className="bi bi-buildings me-2  ms-3 fs-5"></i>รายการอสังหาริทรัพย์
        </Button>
        <Button variant="light" className="border d-flex justify-content-start align-items-center">
          <i className="bi bi-envelope-paper me-2  ms-3 fs-5"></i>จัดการคำร้องเรียน
        </Button>
        <Button variant="light" className="border d-flex justify-content-start align-items-center">
          <i className="bi bi-people me-2  ms-3 fs-5"></i>จัดการผู้ใช้งาน
        </Button>
        {/**<Button variant="light" className="border d-flex justify-content-start align-items-center">
          <i className="bi bi-bell me-2  ms-3"></i>การแจ้งเตือน
        </Button>
         <Button variant="light" className="border d-flex justify-content-start align-items-center">
          <i className="bi bi-info-circle me-2  ms-3"></i>ช่วยเหลือ
        </Button>*/}
        <Button variant="light" className=" border d-flex justify-content-start align-items-center">
          <i className="bi bi-gear me-2  ms-3 fs-5"></i>ตั้งค่า
        </Button>
        <Button variant="light" className="btn btn-outline-danger border d-flex justify-content-start align-items-center">
          <i className="bi bi-box-arrow-left me-2  ms-3 fs-5"></i>ออกจากระบบ
        </Button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
