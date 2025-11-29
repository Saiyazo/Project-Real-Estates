import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './buyer-profile.css';
import BackButton from '../../component/BackButton/BackButton';

import defaultCover from '/img/personImg/grey-bg.jpg';
import defaultAvatar from '/img/personImg/Buyer.jpg';
import emptyAvatar from '/img/personImg/person.jpg';

const BuyerProfileEdit = () => {
  const navigate = useNavigate();

  const [coverImg, setCoverImg] = useState(defaultCover);
  const [avatarImg, setAvatarImg] = useState(defaultAvatar);

  // ข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    name: 'Thammachart Longthote',
    phone: '081-234-5678',
    email: 'thammachartlongthote@gmail.com'
  });

  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleFormField = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
  };

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

  const handleSave = () => {
    console.log('Saving data...', formData, { coverImg, avatarImg });
    navigate('/buyer-profile');
  };

  return (
    <div className="buyer-profile-container container py-4">

      <div className="profile-header-edit">
        <BackButton />
      </div>

      {/* Images Section */}
      <div className="profile-images-section edit-mode">

        {/* Cover */}
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
          <input type="file" ref={coverInputRef} onChange={(e) => handleFileChange(e, 'cover')} hidden accept="image/*" />
        </div>

        {/* Avatar */}
        <div className="image-edit-wrapper avatar-wrapper">
          <img src={avatarImg} alt="Avatar" className="profile-avatar-img" />
          <div className="edit-overlay rounded-circle">
            <button className="btn-icon-edit sm" onClick={() => triggerFileInput(avatarInputRef)}>
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button className="btn-icon-delete sm" onClick={() => handleDeleteImage('avatar')}>
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
          <input type="file" ref={avatarInputRef} onChange={(e) => handleFileChange(e, 'avatar')} hidden accept="image/*" />
        </div>
      </div>

      <h3 className="user-name mb-4">{formData.name || 'Your Name'}</h3>

      {/* Form Section */}
      <div className="form-section px-3">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-bold">ชื่อ - นามสกุล</label>
          <input
            type="text"
            name="name"
            className="custom-input"
            value={formData.name}
            onChange={handleFormField} 
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label fw-bold">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            className="custom-input"
            value={formData.phone}
            onChange={handleFormField}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="form-label fw-bold">อีเมล</label>
          <input
            type="email"
            name="email"
            className="custom-input"
            value={formData.email}
            onChange={handleFormField} 
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>

    </div>
  );
};

export default BuyerProfileEdit;