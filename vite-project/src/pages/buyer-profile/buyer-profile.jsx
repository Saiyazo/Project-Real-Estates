import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './buyer-profile.css'; 
import BackButton from '../../component/BackButton/BackButton';

import coverImageDefault from '/img/personImg/grey-bg.jpg'; 
import profileAvatarDefault from '/img/personImg/Buyer.jpg'; 

const BuyerProfile = () => {
    const navigate = useNavigate();

    const [currentCoverImage, setCurrentCoverImage] = useState(coverImageDefault);
    const [currentProfileAvatar, setCurrentProfileAvatar] = useState(profileAvatarDefault);

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/Logout');
    };


    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file); 
            setCurrentCoverImage(newUrl); 
            
            console.log('Cover Image selected:', file.name);
        }
    };
 
    const handleProfileAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file); 
            setCurrentProfileAvatar(newUrl); 
            
            console.log('Profile Avatar selected:', file.name);
        }
    };
    

    return (
        <div className="buyer-profile-container container py-4">
            
            <div className="profile-header">
                <BackButton />
            </div>

            <input 
                type="file" 
                id="cover-upload" 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleCoverImageChange}
            />
            <input 
                type="file" 
                id="avatar-upload" 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleProfileAvatarChange}
            />

            <div className="profile-images-section">
              
                <img 
                    src={currentCoverImage} 
                    alt="Cover" 
                    className="profile-cover-img" 
                    onClick={() => document.getElementById('cover-upload').click()}
                />

                <img 
                    src={currentProfileAvatar} 
                    alt="Profile Avatar" 
                    className="profile-avatar-img" 
                    onClick={() => document.getElementById('avatar-upload').click()}
                />
            </div>

            <h3 className="user-name">Thammachart Longthote</h3>
            <div className="wave-separator"></div> 

            <div className="settings-menu">
                
                <div className="menu-card-wrapper">
                    <Link to="/edit-profile" className="menu-item card-style">
                        <span><i className="bi bi-pencil me-3"></i>แก้ไขข้อมูลส่วนตัว</span>
                        <i className="bi bi-chevron-right arrow-icon"></i>
                    </Link>
                </div>

                <div className="menu-card-wrapper">
                    <Link to="/change-password" className="menu-item card-style">
                        <span><i className="bi bi-lock me-3"></i>เปลี่ยนรหัสผ่าน</span>
                        <i className="bi bi-chevron-right arrow-icon"></i>
                    </Link>
                </div>

                <div className="menu-card-wrapper">
                    <button 
                        onClick={handleLogout} 
                        className="logout-button card-style" 
                    >
                        <span><i className="bi bi-box-arrow-right me-3"></i>ออกจากระบบ</span>
                        <i className="bi bi-chevron-right arrow-icon"></i>
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default BuyerProfile;