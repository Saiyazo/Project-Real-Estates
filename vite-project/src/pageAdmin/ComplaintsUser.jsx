import { useEffect, useState } from "react";
import {fetchComplaints} from "../Data/DataComplaints"
import Table from 'react-bootstrap/Table';
import './pageStyle/card.css'
const ComplainUser = () => {
  const complain = fetchComplaints()

  return (
    <div className="p-4 pageAll">
      <h1 className="mb-4">ประวัติการร้องเรียน</h1>

      {/* Search & Filters */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        {/* ช่อง Search */}
        <div className="flex-grow-1">
          <div className="input-group shadow-sm">
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
        <button className="btn btn-primary px-4">Search</button>
      </div>


      {/**ปุ่มกดดูอะไรซักอย่าง*/}
      <div className="d-flex gap-2 p-2 m-1 border rounded mb-2">
        <button className="btn-bar"><h5>ทั้งหมด</h5></button>
        <button className="btn-bar"><h5>อยู่ระหว่างตรวจสอบ</h5></button>
        <button className="btn-bar"><h5>ใช้งานได้ปกติ</h5></button>
        <button className="btn-bar"><h5>ระงับการใช้งานชั่วคราว</h5></button>
        <button className="btn-bar"><h5>ระงับการใช้งานถาวร</h5></button>
      </div>
    {/**รายชื่อแบบร่ายยาว */}
      
    </div>
  );
};

export default ComplainUser;
