import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import GraphAll from "../component/Graph4Dash.jsx";
import "../pageAdmin/pageStyle/dash.css";
import "../component/cssforBTN/Tab.css";
import Blockcomplain from "../component/BlockComplain.jsx";
import BlockAsang from "../component/blockRsangha.jsx";

const DashboardAdmin = () => {
  const { buyers, sellers, properties, complaints, adRequests } =
    useOutletContext();

  const totalUsers = (buyers?.length || 0) + (sellers?.length || 0);
  const totalProperties = properties?.length || 0;
  const totalComplaints = complaints?.length || 0;
  const totalAdRequests = adRequests?.length || 0;
  
  const totalComplaintsDone = complaints?.filter(
    (c) => c.status === "เสร็จสิ้น"
  ).length || 0;

  return (
    <div className="p-4 pageAll">
      <h1>แดชบอร์ด</h1>
      {/**แถบ */}
      <div className="d-flex justify-content-between gap-3 mt-3 flex-wrap">
        {/* ManageUser */}
        <div className="card-1">
          <div className="card-header">
            <div>
              <h5>จำนวนผู้ใช้ทั้งหมด</h5>
              <h1>{totalUsers}</h1>
            </div>
            <i className="bi bi-people-fill"></i>
          </div>

          <NavLink
            to="/ManageUser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ดูรายการบัญชีผู้ใช้ <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>

        {/*complaint เขียนไงนะ ใครเขียนถูกฝากแก้ด้วย */}
        <div className="card-2">
          <div className="card-header">
            <div>
              <h5>คำร้องเรียนทั้งหมด</h5>
              <h1>{totalComplaints}</h1>
            </div>
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <NavLink to="/ComplainUser">
            ดูคำร้องเรียน <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
         {/*อสงขัย at all */}
        <div className="card-4">
          <div className="card-header">
            <div>
              <h5>คำร้องเรียนที่เสร็จสิ้น</h5>
              <h1>{totalComplaintsDone}</h1>
            </div>
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <NavLink to="/ComplainUser">
            ดูคำร้องเรียน <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
        {/*อสงขัย at all */}
        <div className="card-3">
          <div className="card-header">
            <div>
              <h5>อสังหาริมทรัพย์ทั้งหมด</h5>
              <h1>{totalProperties}</h1>
            </div>
            <i className="bi bi-building"></i>
          </div>
          <NavLink to="/ManageAssets">
            ดูรายการอสังหาริมทรัพย์ <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
        {/*อสงขัย at all */}
        <div className="card-5">
          <div className="card-header">
            <div>
              <h5>ติดต่อลงโฆษณาทั้งหมด</h5>
              <h1>{totalAdRequests}</h1>
            </div>
            <i class="bi bi-megaphone-fill"></i>
          </div>
          <NavLink to="/PlaceAd">
            ดูรายการอสังหาริมทรัพย์ <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
      </div>{" "}
      
      {/*กราฟเบิ้มๆ*/}
      <GraphAll/>

      
      {/*คำร้องเรียนคับพรี่จ๋า */}
      <div className="border p-3 rounded-2 mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>คำร้องเรียนใหม่</h5>
          <NavLink
            to="/ComplainUser"
            className="text-decoration-none text-primary"
          >
            ดูประวัติคำร้องเรียน <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
        <hr />
        {/**ข้อมูลคำร้องใหม่ */}
        <Blockcomplain/>
      </div>


      {/*อสังหาที่พึ่งประกาศสดๆร้อนๆ */}
      <div className="border p-3 rounded-2 mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h5>ประกาศขายอสังหาใหม่</h5>
          <NavLink
            to="/ManageAssets"
            className="text-decoration-none text-primary"
          >
            ดูรายการอสังหาริมทรัพย์ทั้งหมด{" "}
            <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
        <hr />
        {/**ข้อมูลพวกอสังที่ประกาศใหม่ */}
        <BlockAsang/>
      </div>
    </div>
  );
};

export default DashboardAdmin;
