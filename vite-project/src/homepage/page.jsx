import React, { useState } from "react";
import "../App.css";
import "./page.css";
import { useNavigate } from "react-router-dom";


import img1 from "../assets/img/1.png";
import img2 from "../assets/img/2.png";
import img3 from "../assets/img/3.png";
import img4 from "../assets/img/4.png";

const Home = () => {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // หมายเหตุ: เรียงลำดับตามที่ต้องการให้แสดงใน Slideshow
  // ถ้าต้องการให้รูปใหญ่ (img2) เป็นรูปแรก ให้วางไว้ตำแหน่ง 0
  const images = [img2, img1, img3]; 

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [monthly, setMonthly] = useState(0);
  const [income, setIncome] = useState(0);

  const calculate = () => {
    const P = Number(loan);
    const r = Number(rate) / 100 / 12;
    const n = Number(years) * 12;

    if (!P || !r || !n) return;

    const monthlyPay =
      P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setMonthly(monthlyPay);
    setIncome(monthlyPay / 0.4);
  };

  const reset = () => {
    setLoan("");
    setRate("");
    setYears("");
    setMonthly(0);
    setIncome(0);
  };




  return (
    <div className="home-container">
      
      {/* --- Modal / Popup Section --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            
            <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
                <img src={images[currentIndex]} alt={`View ${currentIndex}`} />
            </div>

            <button className="nav-btn left" onClick={prevImage}>
                &#10094;
            </button>
            <button className="nav-btn right" onClick={nextImage}>
                &#10095;
            </button>
            
            {/* ตัวบอกตำแหน่งรูป (Optional: เพิ่มความ Classic) */}
            <div className="modal-counter">
                {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      {/* --- Gallery Grid Layout --- */}
      <div className="gallery-grid">
        {/* รูปใหญ่ด้านซ้าย (Index 0 ตาม Array ใหม่) */}
        <div className="gallery-item large-item" onClick={() => openModal(0)}>
          <img src={images[0]} alt="Main View" />
          <div className="hover-overlay">View</div>
        </div>

        {/* รูปเล็กด้านขวา (Index 1 และ 2) */}
        <div className="gallery-column">
          <div className="gallery-item" onClick={() => openModal(1)}>
            <img src={images[1]} alt="Sub View 1" />
          </div>
          <div className="gallery-item" onClick={() => openModal(2)}>
            <img src={images[2]} alt="Sub View 2" />
          </div>
        </div>
      </div>

      <div className="btn-wrap">
  <div className="actions-right">

    <button className="btn-fav">
      <label className="like-wrap">
        <input type="checkbox" id="fav" />
        <span className="heart"></span>
      </label>
      <span className="fav-text">รายการโปรด</span>
    </button>

    <button className="btn-share" onClick={openPopup}>แชร์</button>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <h3 className="popup-title">แชร์สำเร็จ!</h3>
            <p className="popup-text">ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว 🎉</p>
          </div>
        </div>
      )}
  </div>
</div>
<br />

      <div className="property-card">

  {/* ส่วนหัวชื่อ + ราคา */}
  <div className="top-row">
    <div className="title-section">
      <h2 className="prop-title">ไลฟ์ แอท รัชดา - สุทธิสาร</h2>
      <p className="prop-sub">ห้วยขวาง</p>
    </div>

    <div className="price-section">
      <span className="price">฿ 3,750,000</span>
    </div>
  </div>

  {/* แท็กข้อมูล */}
  <div className="tag-row">
    <div className="tag active">Condo</div>
    <div className="tag">1 ห้องนอน</div>
    <div className="tag">1 ห้องน้ำ</div>
    <div className="tag">40.59 ตร.ม.</div>
  </div>

  {/* ข้อมูลการเดินทาง */}
  <div className="transport-row">
    <div className="station">🚆 MRT ห้วยขวาง ~0.2 km.</div>
    <div className="station">🚆 ป้ายรถเมล์เด่นชัย ~0.2 km.</div>
    <div className="station">🚆 รถไฟฟ้าประชาสงเคราะห์ ~5.5 km.</div>
  </div>
</div>

<div className="agent-card">
      <img className="agent-img" src={img4} alt="agent" />
      <div className="agent-info">
        <p className="agent-role">นายหน้า</p>
        <p className="agent-name">Ms.Srisamorn Sornsamer</p>
        <div className="agent-status">
          <span className="verified">✔ ได้รับการยืนยันตัวตน</span>
          <span className="rating">⭐ 0.0</span>
        </div>
      </div>

      {/* ปุ่มเล็กชิดขวา */}
      <button
        className="mini-navigate-btn"
        onClick={() => navigate("/page/home")}
      >
        ➜
      </button>
    </div>

  <br />

      <div className="detail-wrapper">

  {/* LEFT BOX */}
  <div className="left-box">
    <h3 className="left-title">สถานที่ใกล้เคียงอื่น ๆ</h3>

    <div className="left-list">
      <div className="left-item">
        <span>🚆 MRT ลาดพร้าว</span>
        <span className="distance">0.2 กม.</span>
      </div>

      <div className="left-item">
        <span>🚆 MRT รัชดาภิเษก</span>
        <span className="distance">0.6 กม.</span>
      </div>

      <div className="left-item">
        <span>🚆 MRT ภาวนา</span>
        <span className="distance">0.8 กม.</span>
      </div>

      <div className="left-item">
        <span>🚆 ยูเนี่ยน มอลล์</span>
        <span className="distance">1.7 กม.</span>
      </div>

      <div className="left-item">
        <span>🏬 เทสโก้ โลตัส ลาดพร้าว</span>
        <span className="distance">0.8 กม.</span>
      </div>
    </div>
  </div>

  {/* RIGHT DETAILS */}
  <div className="right-box">

    <h3 className="right-title">รายละเอียดห้องและเฟอร์นิเจอร์</h3>
    <p className="right-text">
      ห้องขนาด 40.59 ตร.ม. ประกอบด้วย 1 ห้องนอน 1 ห้องน้ำที่กว้างขวาง พร้อมเฟอร์นิเจอร์แบบบิวท์อิน (Built-in)
      พร้อมฟังก์ชันเครื่องใช้ครบชุด เหมาะสำหรับผู้ที่ต้องการความเป็นส่วนตัวและรักการทำอาหาร
    </p>

    <h3 className="right-title">สิ่งอำนวยความสะดวกและส่วนกลาง</h3>
    <p className="right-text">
      โครงการมีฟิตเนส สระว่ายน้ำขนาดใหญ่ Co-working space ระบบรักษาความปลอดภัย 24 ชั่วโมง
      รวมถึงกล้องวงจรปิดครอบคลุมโครงการทั้งหมด
    </p>
  </div>
</div>

      <br />

<div className="dara-map">
  <button
    className="map"
    onClick={() =>
      window.open(
        "https://www.google.com/maps?q=ลาดพร้าว MRT",
        "_blank"
      )
    }
  >ดูแผนที่</button>
</div>
    <br />
    <br />
    <hr />

      <div className="loan-container">

      {/* LEFT */}
      <div className="left-section">
        <h2 className="form-title">อัตราการผ่อนชำระ</h2>

        <div className="form-group">
          <label>วงเงินกู้</label>
          <input
            type="number"
            value={loan}
            onChange={(e) => setLoan(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>อัตราดอกเบี้ย</label>
          <div className="rate-row">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <span className="unit">%</span>
          </div>
        </div>

        <div className="form-group">
          <label>ระยะเวลา</label>
          <div className="rate-row">
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
            <span className="unit">ปี</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button className="btn-primary" onClick={calculate}>คำนวณ</button>
          <button className="btn-reset" onClick={reset}>เริ่มใหม่</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right-section">
        <h2 className="result-title">ผลการคำนวณเงินกู้</h2>

        <div className="result-row">
          <span>ยอดการผ่อนชำระ / เดือน</span>
          <span className="result-number">
            {monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
          <span className="result-unit">บาท</span>
        </div>

        <div className="divider"></div>

        <div className="result-row">
          <span>รายได้ขั้นต่ำ</span>
          <span className="result-number">
            {income.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
          <span className="result-unit">บาท</span>
        </div>

        <p className="note">
          *ผลลัพธ์จากการคำนวณเป็นเพียงตัวเลขประมาณการ
        </p>
      </div>
    </div>

    </div>
  );
};

export default Home;