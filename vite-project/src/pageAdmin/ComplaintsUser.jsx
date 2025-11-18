import { useEffect, useState } from "react";
import {fetchComplaints} from "../Data/DataComplaints"
import Table from 'react-bootstrap/Table';
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

      <p className="text-white bg-dark">---แก้---</p>
      {/**ปุ่มกดดูอะไรซักอย่าง*/}
      <div className="d-flex gap-2 p-2 m-1 border rounded mb-2">
        <button><h5>ทั้งหมด</h5></button>
        <button><h5>อยู่ระหว่างตรวจสอบ</h5></button>
        <button><h5>ใช้งานได้ปกติ</h5></button>
        <button><h5>ระงับการใช้งานชั่วคราว</h5></button>
        <button><h5>ระงับการใช้งานถาวร</h5></button>
      </div>
    {/**รายชื่อแบบร่ายยาว */}
    <p className="text-white bg-dark">---แก้---</p>
     <Table striped bordered hover>
      <thead>
        <tr>
          <th>ภาพ</th>
          <th>ไดดีคำร้อง</th>
          <th>หัวข้อการร้องเรียน</th>
          <th>วันที่ร้องเรียน</th> 
          <th>ประเภทคำร้องเรียน</th> 
          <th>สถานะคำร้อง</th> 
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        
        <tr>
          
          <td colSpan={3}>Larry the Bird</td>
          <td colSpan={3} className="text-end">@twitter</td>
        </tr>
      </tbody>
    </Table>
      
    </div>
  );
};

export default ComplainUser;
