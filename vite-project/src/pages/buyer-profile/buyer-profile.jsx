import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './buyer-profile.css'; 
import BackButton from '../../component/BackButton/BackButton';

import coverImage from '../../img/grey-bg.jpg'; 
import profileAvatar from '../../img/Buyer.jpg'; 

const BuyerProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
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
          className="menu-item" 
          style={{ 
            width: '100%', 
            textAlign: 'left', 
            border: 'none', 
            background: 'none',
            color: '#dc3545', // สีแดง
            cursor: 'pointer'
          }}
        >
          ออกจากระบบ
        </button>
        <hr />
      </div>
      
    </div>
  );
};

export default BuyerProfile;