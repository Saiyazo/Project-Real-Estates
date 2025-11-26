import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './buyer-profile.css'; 
import BackButton from '../../component/BackButton/BackButton';

import coverImage from '/img/personImg/grey-bg.jpg'; 
import profileAvatar from '/img/personImg/Buyer.jpg'; 

const BuyerProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/LogoutHome'); //รอเขื่อมหน้าล็อกเอาท์
    navigate('/login'); //รอเขื่อมหน้าล็อกอิน
  };

  return (
    <div className="buyer-profile-container container py-4">
      
     
      <div className="profile-header">
        <BackButton />
      </div>

      <div className="profile-images-section">
        <img src={coverImage} alt="Cover" className="profile-cover-img" />
        <img src={profileAvatar} alt="Profile Avatar" className="profile-avatar-img" />
      </div>

      <h3 className="user-name">Thammachart Longthote</h3>

      <div className="settings-menu">
        <hr /> 
        <Link to="/edit-profile" className="menu-item">
          แก้ไขข้อมูลส่วนตัว
        </Link>

        <hr /> 
        <Link to="/change-password" className="menu-item">
          เปลี่ยนรหัสผ่าน 
        </Link>
        <hr /> 

        <hr /> 
        <button 
          onClick={handleLogout} 
          className="logout-button" 
        >
          ออกจากระบบ
        </button>
        <hr />
      </div>
      
    </div>
  );
};

export default BuyerProfile;