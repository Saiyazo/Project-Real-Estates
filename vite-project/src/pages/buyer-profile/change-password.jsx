import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './change-password.css'; 
import BackButton from '../../component/BackButton/BackButton';

const ChangePassword = () => {
  const navigate = useNavigate();

  // เก็บข้อมูลรหัสผ่านทั้ง 3 ช่อง
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // ตัวแปรเปิด/ปิดตา 
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // ฟังก์ชันอัปเดตข้อมูลเวลาพิมพ์
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันกดปุ่ม "เปลี่ยนรหัสผ่าน"
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // เช็คว่ารหัสผ่านใหม่ตรงกันไหม
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง');
      return;
    }

    console.log('Password Changed:', passwords);
    alert('เปลี่ยนรหัสผ่านสำเร็จ!');
    navigate('/buyer-profile');
  };

  return (
    <div className="change-password-container container">
      
      {/* ปุ่มย้อนกลับ */}
      <div className="header-nav">
        <BackButton />
      </div>

      {/* ไอคอนกุญแจ */}
      <div className="icon-header">
        <div className="lock-icon-wrapper">
          <i className="bi bi-lock-fill"></i>
        </div>
      </div>

      <h1 className="page-title">Change Password</h1>

      <form onSubmit={handleSubmit}>
        
        {/*รหัสผ่านเก่า */}
        <div className="input-group-custom">
          <input 
            type={showOldPass ? "text" : "password"}
            name="oldPassword"
            className="form-input"
            placeholder="รหัสผ่านเก่า"
            value={passwords.oldPassword}
            onChange={handleChange}
          />
          <i 
            className={`bi ${showOldPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'} input-icon-right`}
            onClick={() => setShowOldPass(!showOldPass)}
          ></i>
        </div>

        {/* รหัสผ่านใหม่ */}
        <div className="input-group-custom">
          <input 
            type={showNewPass ? "text" : "password"} 
            name="newPassword"
            className="form-input"
            placeholder="สร้างรหัสผ่านใหม่"
            value={passwords.newPassword}
            onChange={handleChange}
          />
          <i 
            className={`bi ${showNewPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'} input-icon-right`}
            onClick={() => setShowNewPass(!showNewPass)}
          ></i>
        </div>


        {/* ยืนยันรหัสผ่านใหม่ */}
        <div className="input-group-custom">
          <input 
            type={showConfirmPass ? "text" : "password"}
            name="confirmPassword"
            className="form-input"
            placeholder="ยืนยันรหัสผ่านใหม่"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
          <i 
            className={`bi ${showConfirmPass ? 'bi-eye-fill' : 'bi-eye-slash-fill'} input-icon-right`}
            onClick={() => setShowConfirmPass(!showConfirmPass)}
          ></i>
        </div>

        <button type="submit" className="submit-btn">
          เปลี่ยนรหัสผ่าน
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;