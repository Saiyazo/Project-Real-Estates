import React from "react";
import "../App.css";
import "./home.css";
import img4 from "../assets/img/4.png";


const Home = () => {

  const images = [img4]; 
  
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="profile-card">

          {/* Cover */}
          <div className="cover-image"></div>

          {/* Profile Section */}
          <div className="profile-section">
            <div className="avatar-wrapper">
              <img src={img4} alt="Profile" className="avatar" />

            </div>

            {/* Name */}
            <div className="text-center">
              <h1 className="name">Ms.Srisamorn Sornsamer</h1>

              <div className="verified-row">
                <span className="material-icon">✔ ได้รับการยืนยันตัวตน</span>
              </div>

            </div>

            {/* Buttons */}
            <div className="action-buttons">
  <button className="btn normal-btn">
  <span className="material-icons text‑blue‑500">call</span>
  098‑123‑XXXX
</button>

              <button className="btn normal-btn">
                <span className="material-icons text-blue-500 -rotate-12">แชท</span>
              </button>

              <button className="btn normal-btn">
                <span className="material-icons">แชร์</span>
              </button>

              <button className="btn danger-btn">
                <span className="material-icons">รายงาน</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="home-page">
      <div className="left-panel">
        <div className="card section about-me">
          <h3 className="card-title">เรื่องเกี่ยวกับฉัน</h3>
          <p>-</p>
        </div>
        <div className="card section basic-info">
          <h3 className="card-title">ข้อมูลเบื้องต้น</h3>
          <ul className="info-list">
            <li>เป็นสมาชิกมา 1 ปี</li>
            <li>www.sjkdfhsidhf.com</li>
          </ul>
        </div>
        <div className="card section current-announcements">
          <h3 className="card-title">ประกาศปัจจุบัน (0)</h3>
          <div className="empty-state">ไม่มีรายการประกาศ</div>
        </div>
      </div>

      <div className="right-panel">
        <div className="card section all-announcements">
          <h3 className="card-title">ประกาศทั้งหมด</h3>
          <div className="stats-container">
            <div className="stat-card stat-sale">
              <span className="stat-number">0</span>
              <span className="stat-label">ประกาศขาย</span>
            </div>
            <div className="stat-card stat-rent">
              <span className="stat-number">0</span>
              <span className="stat-label">ประกาศเช่า</span>
            </div>
            <div className="stat-card stat-sold">
              <span className="stat-number">0</span>
              <span className="stat-label">ขายแล้ว</span>
            </div>
          </div>
        </div>
        <div className="card section reviews">
          <div className="reviews-header">
            <h3 className="card-title">รีวิวทั้งหมด</h3>
            <button className="btn-write-review">เขียนรีวิว</button>
          </div>
          <div className="empty-state">ไม่มีรีวิว</div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Home;
