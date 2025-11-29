import React, { useState, useMemo } from "react";
import propertyListing from '../data/propertyListing';
import "../App.css";
import "./PropertyDetail.css"; 
import { useNavigate, useParams, Link } from "react-router-dom"; 



const formatPrice = (price) => {
    if (price === null || price === undefined) return 'N/A';
    return price.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const formatIncome = (value) => {
    return value.toLocaleString('th-TH', { maximumFractionDigits: 0 });
};
const extractRoomInfo = (listing) => {
    const roomDetails = listing.descriptionSections.find(s => s.sectionId === 'room_details');
    if (!roomDetails) return { bedrooms: '1', bathrooms: '1' };
    const body = roomDetails.body;
    const bedroomMatch = body.match(/(\d+)\s*ห้องนอน/);
    const bathroomMatch = body.match(/(\d+)\s*ห้องน้ำ/);
    return {
        bedrooms: bedroomMatch ? bedroomMatch[1] : '1',
        bathrooms: bathroomMatch ? bathroomMatch[1] : '1'
    };
};



const PropertyDetail = () => { 

  const navigate = useNavigate();
  const { id } = useParams(); 
  
  
  const property = useMemo(() => {
    
      return propertyListing.listings.find(item => String(item.id) === id); 
  }, [id]);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [monthly, setMonthly] = useState(0);
  const [income, setIncome] = useState(0);
  
  const images = property ? [property.thumbnail] : [];
  
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
  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
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
  


  
  if (!property) {
      return (
          <div className="detail-error-container p-10 text-center">
              <h1>ไม่พบรายการอสังหาริมทรัพย์</h1>
              <p>ขออภัย, รายการ ID: {id} อาจถูกลบไปแล้ว</p>
              <Link to="/" className="text-blue-500 underline mt-4 block">กลับสู่หน้าหลัก</Link>
          </div>
      );
  }
  
  
  const roomInfo = extractRoomInfo(property);
  const roomDetailsSection = property.descriptionSections.find(s => s.sectionId === 'room_details');
  const transportSection = property.descriptionSections.find(s => s.sectionId === 'transportation');
  
  return (
    <div className="home-container">
      
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            
            <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
                <img src={images[currentIndex]} alt={`View ${currentIndex}`} />
            </div>

            <button className="nav-btn left" onClick={prevImage}>
                ❮
            </button>
            <button className="nav-btn right" onClick={nextImage}>
                ❯
            </button>
            
            <div className="modal-counter">
                {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}


      <div className="gallery-grid">
        <div className="gallery-item large-item" onClick={() => openModal(0)}>
          <img src={property.thumbnail} alt={property.title} />
          <div className="hover-overlay">View</div>
        </div>

        <div className="gallery-column">
          
          <div className="gallery-item" onClick={() => openModal(0)}>
              <img src={property.thumbnail} alt={property.title} />
          </div>
          <div className="gallery-item" onClick={() => openModal(0)}>
              <img src={property.thumbnail} alt={property.title} />
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


          <div className="top-row">
            <div className="title-section">
              <h2 className="prop-title">{property.title}</h2> 
              <p className="prop-sub">{property.location?.district}</p>
            </div>

            <div className="price-section">
              <span className="price">฿ {formatPrice(property.price)}</span> 
            </div>
          </div>


          <div className="tag-row">
            <div className="tag active">{property.propertyType}</div>
            <div className="tag">{roomInfo.bedrooms} ห้องนอน</div> 
            <div className="tag">{roomInfo.bathrooms} ห้องน้ำ</div>
            <div className="tag">{property.unitSizeSqm} ตร.ม.</div>
          </div>


          {transportSection && (
              <div className="transport-row">
                  <div className="station">🚆 {transportSection.body}</div>
              </div>
          )}
      </div>

      <div className="agent-card">
            <img className="agent-img" src={property.thumbnail} alt="agent" />
            <div className="agent-info">
              <p className="agent-role">นายหน้า</p>
              <p className ="agent-name">Ms.Srisamorn Sornsamer</p>
              <div className="agent-status">
                <span className="verified">✔ ได้รับการยืนยันตัวตน</span>
                <span className="rating">⭐ 0.0</span>
              </div>
            </div>


            <button
              className="mini-navigate-btn"
              onClick={() => navigate("/AgentHome")} 
            >
              ➜
            </button>
      </div>

    <br />

      <div className="detail-wrapper">


        <div className="left-box">
          <h3 className="left-title">รายละเอียดโครงการ</h3>
          {property.descriptionSections.filter(s => s.sectionId !== 'room_details' && s.sectionId !== 'transportation').map((section, index) => (
              <div key={index}>
                  <h4 style={{marginTop: '10px', fontWeight: '600'}}>{section.sectionTitle}</h4>
                  <p style={{marginTop: '5px', fontSize: '15px'}}>{section.body}</p>
              </div>
          ))}
          
        </div>


        <div className="right-box">
          
          <h3 className="right-title">รายละเอียดห้องและเฟอร์นิเจอร์</h3>
          <p className="right-text">
            {roomDetailsSection?.body || 'ไม่มีรายละเอียดห้อง'}
          </p>

          <h3 className="right-title">สิ่งอำนวยความสะดวกและส่วนกลาง</h3>
          <p className="right-text">
            {property.descriptionSections.find(s => s.sectionId === 'amenities')?.body || 'ไม่มีข้อมูลสิ่งอำนวยความสะดวก'}
          </p>
        </div>
      </div>

      <br />

      <div className="dara-map">
        <button
          className="map"
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${property.location?.address}, ${property.location?.district}`,
              "_blank"
            )
          }
        >ดูแผนที่</button>
      </div>
        <br />
        <hr />


      <div className="loan-container">


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


          <div className="button-row">
            <button className="btn-primary" onClick={calculate}>คำนวณ</button>
            <button className="btn-reset" onClick={reset}>เริ่มใหม่</button>
          </div>
        </div>


        <div className="right-section">
          <h2 className="result-title">ผลการคำนวณเงินกู้</h2>

          <div className="result-row">
            <span>ยอดการผ่อนชำระ / เดือน</span>
            <span className="result-number">
              {formatIncome(monthly)}
            </span>
            <span className="result-unit">บาท</span>
          </div>

          <div className="divider"></div>

          <div className="result-row">
            <span>รายได้ขั้นต่ำ</span>
            <span className="result-number">
              {formatIncome(income)}
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

export default PropertyDetail;