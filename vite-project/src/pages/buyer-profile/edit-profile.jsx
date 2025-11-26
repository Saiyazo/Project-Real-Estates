import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './buyer-profile.css';
import BackButton from '../../component/BackButton/BackButton';

// Default images import
import defaultCover from '/img/personImg/grey-bg.jpg';
import defaultAvatar from '/img/personImg/Buyer.jpg';
import emptyAvatar from '/img/personImg/person.jpg';

const BuyerProfileEdit = () => {
  const navigate = useNavigate();
  
  const [coverImg, setCoverImg] = useState(defaultCover);
  const [avatarImg, setAvatarImg] = useState(defaultAvatar);

  // ข้อมูล Form
  const [formData, setFormData] = useState({
    name: 'Thammachart Longthote',
    phone: '081-234-5678',
    email: 'thammachartlongthote@gmail.com'
  });

  // State สำหรับ Modal
  const [showModal, setShowModal] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // --- Image Functions ---
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === 'cover') setCoverImg(previewUrl);
      if (type === 'avatar') setAvatarImg(previewUrl);
    }
  };

  const handleDeleteImage = (type) => {
    if (type === 'cover') setCoverImg(defaultCover);
    if (type === 'avatar') setAvatarImg(emptyAvatar);
  };

  const triggerFileInput = (ref) => ref.current.click();

  // --- Form Functions ---
  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  };

  const openEditModal = (field) => {
    setShowModal(field);
    setTempValue('');
    setOtpSent(false);
    setOtpValue('');
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleRequestOtp = () => {
    if (!tempValue) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    setOtpSent(true);
    
    // แจ้งเตือน OTP 
    setTimeout(() => {
        alert(`OTP สำหรับทดสอบคือ: 123456\nส่งไปยัง: ${tempValue}`);
    }, 500);
  };

  const handleVerifyOtp = () => {
    if (otpValue !== '123456') { 
      alert('รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      return;
    }
    
    // อัปเดตข้อมูลจริง
    setFormData(prev => ({
      ...prev,
      [showModal]: tempValue
    }));
    
    alert('ยืนยันตัวตนสำเร็จ! ข้อมูลของคุณได้รับการอัปเดตแล้ว');
    closeModal();
  };

  const handleSave = () => {
    console.log('Saving data...', formData, { coverImg, avatarImg });
    navigate('/buyer-profile');
  };

  return (
    <div className="buyer-profile-container container py-4">
      
      {/* Header (ใช้ Class เดียวกับหน้า View แต่ไม่มี Border เพราะแก้ใน CSS แล้ว) */}
      <div className="profile-header-edit">
        <BackButton />
      </div>

      {/* Images Section */}
      <div className="profile-images-section edit-mode">
        {/* Cover Image */}
        <div className="image-edit-wrapper cover-wrapper">
          <img src={coverImg} alt="Cover" className="profile-cover-img" />
          <div className="edit-overlay">
            <button className="btn-icon-edit" onClick={() => triggerFileInput(coverInputRef)}>
              <i className="bi bi-pencil-fill"></i> แก้ไข
            </button>
            <button className="btn-icon-delete" onClick={() => handleDeleteImage('cover')}>
              <i className="bi bi-trash-fill"></i> ลบ
            </button>
          </div>
          <input type="file" ref={coverInputRef} onChange={(e) => handleFileChange(e, 'cover')} style={{ display: 'none' }} accept="image/*" />
        </div>

        {/* Avatar Image */}
        <div className="image-edit-wrapper avatar-wrapper">
          <img src={avatarImg} alt="Profile Avatar" className="profile-avatar-img" />
          <div className="edit-overlay rounded-circle">
            <button className="btn-icon-edit sm" onClick={() => triggerFileInput(avatarInputRef)}>
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button className="btn-icon-delete sm" onClick={() => handleDeleteImage('avatar')}>
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
          <input type="file" ref={avatarInputRef} onChange={(e) => handleFileChange(e, 'avatar')} style={{ display: 'none' }} accept="image/*" />
        </div>
      </div>

      <h3 className="user-name mb-4">{formData.name || 'Your Name'}</h3>

      <div className="form-section px-3">
        
        {/* Name Field */}
        <div className="mb-3">
          <label className="form-label fw-bold">ชื่อ - นามสกุล</label>
          <input 
            type="text" 
            className="custom-input" 
            placeholder="ชื่อ - นามสกุล"
            value={formData.name}
            onChange={handleNameChange}
          />
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <div className="input-label-group">
            <label className="form-label fw-bold mb-0">เบอร์โทรศัพท์</label>
            <span className="change-link" onClick={() => openEditModal('phone')}>
              <i className="bi bi-pencil-square me-1"></i>เปลี่ยน
            </span>
          </div>
          <div className="position-relative">
            <input 
              type="tel" 
              className="custom-input" 
              value={formData.phone}
              disabled
            />
            <i className="bi bi-check-circle-fill verified-badge" title="ยืนยันแล้ว"></i>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <div className="input-label-group">
            <label className="form-label fw-bold mb-0">อีเมล</label>
            <span className="change-link" onClick={() => openEditModal('email')}>
              <i className="bi bi-pencil-square me-1"></i>เปลี่ยน
            </span>
          </div>
          <div className="position-relative">
            <input 
              type="email" 
              className="custom-input" 
              value={formData.email}
              disabled
            />
            <i className="bi bi-check-circle-fill verified-badge" title="ยืนยันแล้ว"></i>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          บันทึกการเปลี่ยนแปลง
        </button>

      </div>

      {/* OTP Verification Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-custom" onClick={e => e.stopPropagation()}>
            <h4 className="modal-title">
              {showModal === 'phone' ? 'เปลี่ยนเบอร์โทรศัพท์' : 'เปลี่ยนอีเมล'}
            </h4>
            
            {!otpSent ? (
              // Step 1: Input New Value
              <>
                <p className="text-muted mb-3">
                   กรุณากรอก{showModal === 'phone' ? 'เบอร์โทรศัพท์' : 'อีเมล'}ใหม่ที่ต้องการใช้งาน
                </p>
                <input 
                  type={showModal === 'phone' ? 'tel' : 'email'}
                  className="custom-input mb-3"
                  placeholder={showModal === 'phone' ? 'เบอร์โทรศัพท์ใหม่' : 'อีเมลใหม่'}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  autoFocus
                />
                <button className="modal-btn btn-primary-custom" onClick={handleRequestOtp}>
                  ขอรหัสยืนยัน (OTP)
                </button>
              </>
            ) : (
              // Step 2: Input OTP
              <>
                <p className="text-muted mb-3">
                  กรุณากรอกรหัส OTP 6 หลักที่ส่งไปยัง <br/> 
                  <strong>{tempValue}</strong>
                </p>
                <input 
                  type="text"
                  className="custom-input mb-3 text-center"
                  placeholder="------"
                  maxLength="6"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  autoFocus
                />
                <button className="modal-btn btn-primary-custom" onClick={handleVerifyOtp}>
                  ยืนยันและบันทึก
                </button>
                <div className="mt-3">
                  <span className="change-link text-muted small" onClick={() => setOtpSent(false)}>
                    แก้ไขข้อมูลใหม่
                  </span>
                </div>
              </>
            )}
            
            <button className="modal-btn btn-secondary-custom mt-2" onClick={closeModal}>
              ยกเลิก
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BuyerProfileEdit;