import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "../pageAdmin/pageStyle/dash.css";

const DashboardAdmin = () => {
  const changePage = useOutletContext()
  const { buyers, sellers, properties, complaints } = useOutletContext();

  const totalUsers = (buyers?.length || 0) + (sellers?.length || 0);
  const totalProperties = properties?.length || 0;
  const totalComplaints = complaints?.length || 0;

  return (
    <div className="p-4">
      <h1>แดชบอร์ด</h1>

      <div className="d-flex justify-content-between gap-3 mt-3 flex-wrap">
        <div className="card-1">
          <div className="card-header">
            <div>
              <h5>จำนวนผู้ใช้ทั้งหมด</h5>
              <h1>{totalUsers}</h1>
            </div>
            <i className="bi bi-people-fill"></i>
          </div>
          {/* Link ไปหน้า ManageUser */}
          <Link to="/ManageUser">
            ดูรายการบัญชีผู้ใช้ <i className="bi bi-arrow-right-short"></i>
          </Link>
        </div>

        <div className="card-2">
          <div className="card-header">
            <div>
              <h5>คำร้องเรียนทั้งหมด</h5>
              <h1>{totalComplaints}</h1>
            </div>
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <Link to="/ComplainUser">
            ดูคำร้องเรียน <i className="bi bi-arrow-right-short"></i>
          </Link>
        </div>

        <div className="card-3">
          <div className="card-header">
            <div>
              <h5>อสังหาริมทรัพย์ทั้งหมด</h5>
              <h1>{totalProperties}</h1>
            </div>
            <i className="bi bi-building"></i>
          </div>
          <Link to="/ManageAssets">
            ดูรายการอสังหาริมทรัพย์ <i className="bi bi-arrow-right-short"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
