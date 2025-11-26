import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Fav.css'; 
import initialFavoritesData from './FavData'; 
import BackButton from '../../component/BackButton/BackButton';

// ฟังก์ชันสำหรับกำหนด Class CSS ตามประเภทธุรกรรม (เพื่อเปลี่ยนสีตามเงื่อนไข)
const getTransactionBgClass = (transaction) => {
    switch (transaction) {
        case 'ขายและเช่า':
            // สีเขียวอมฟ้า: #3FC553
            return 'badge-transaction-both'; 
        case 'เช่า':
            // สีเหลือง/ส้ม: #FFBC05
            return 'badge-transaction-rent'; 
        case 'ขาย':
            // สีน้ำเงิน: #5A80FF
            return 'badge-transaction-sale'; 
        default:
            return 'bg-secondary';
    }
};

// สำหรับแสดง Badge ที่กำหนดสีตามเงื่อนไข
const renderBadges = (item) => {
    // กำหนด Class สำหรับปุ่มธุรกรรม (อันที่สอง)
    const transactionClass = getTransactionBgClass(item.transaction);
    
    return (
        <>
            {/* Badge แรก (Type เช่น คอนโด) ยังคงใช้สี primary ของ Bootstrap */}
            <Badge bg="primary" className="me-1">{item.type}</Badge>
            
            {/* Badge ที่สอง (Transaction เช่น ขาย/เช่า) ใช้ Class ที่สร้างขึ้นเพื่อให้ได้สีตามต้องการ */}
            {/* **หมายเหตุ:** ลบ 'bg="info"' ออก เพื่อให้ class ที่เรากำหนดใน CSS ทำงาน */}
            <Badge className={`me-2 ${transactionClass}`}>{item.transaction}</Badge>
        </>
    );
};

const Fav = () => {
    // 3. **ใช้ useState เพื่อสร้าง State สำหรับเก็บรายการโปรด**
    const [favorites, setFavorites] = useState(initialFavoritesData);

    // 4. **ฟังก์ชันสำหรับลบรายการโปรด**
    const handleRemoveFavorite = (idToRemove) => {
        // ใช้ filter เพื่อสร้าง Array ใหม่ โดยไม่รวมรายการที่มี id ตรงกัน
        const newFavorites = favorites.filter(item => item.id !== idToRemove);
        // อัปเดต State ซึ่งจะทำให้ Component ถูก Render ใหม่ และรายการที่ถูกลบจะหายไป
        setFavorites(newFavorites);
    };

    return (
        <div className="container py-4">
            {/* Header ส่วนบน: ปุ่ม BACK และหัวข้อ */}
            <div className="d-flex align-items-center mb-4">
                <BackButton />
                <h2 className="mb-0 mx-auto fw-normal text-center">รายการโปรด</h2>
            </div>
            
            {/* List of Favorite Items */}
            <div className="fav-list-container">
                {/* 5. **วนซ้ำรายการจาก State (favorites) แทน favoritesData เดิม** */}
                {favorites.map((item) => (
                    <Card key={item.id} className="mb-3 fav-card shadow-sm border-0">
                        <Card.Body className="d-flex p-3">
                            {/* 1. ส่วนรูปภาพ (ซ้าย) */}
                            <div className="fav-image-placeholder me-3 flex-shrink-0">
                                <i className="bi bi-image"></i>
                            </div>

                            {/* 2. ส่วนรายละเอียด (ขวา) */}
                            <div className="fav-details flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start mb-1">
                                    
                                    {/* Badges */}
                                    <div>{renderBadges(item)}</div>

                                    {/* Icon หัวใจ - 6. **เพิ่ม onClick event** */}
                                    <i 
                                        className="bi bi-heart-fill fs-5 fav-heart-icon"
                                        onClick={() => handleRemoveFavorite(item.id)} // เรียกใช้ฟังก์ชัน handleRemoveFavorite และส่ง id ของ item นี้ไป
                                    ></i>
                                </div>
                                
                                <h6 className="fw-semibold mb-1">{item.title}</h6>
                                
                                {/* Location */}
                                <div className="text-muted small mb-2">
                                    <i className="bi bi-geo-alt me-1"></i>
                                    {item.location}
                                </div>

                                {/* Price Details */}
                                <div className="mb-1">
                                    {item.priceBuy && 
                                        <span className="fw-bold me-2" style={{color: '#495057'}}>
                                            ซื้อ {item.priceBuy}
                                        </span>
                                    }
                                    {item.priceRent && 
                                        <span className="text-muted fw-bold">
                                            เช่า {item.priceRent}
                                        </span>
                                    }
                                </div>

                                {/* Detail Line */}
                                <div className="text-muted small">
                                    {item.details}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* **แสดงข้อความเมื่อไม่มีรายการโปรด** */}
            {favorites.length === 0 && (
                <div className="text-center text-muted mt-5">
                    <i className="bi bi-heartbreak fs-1 mb-3"></i>
                    <p className="lead">ไม่มีรายการโปรด</p>
                </div>
            )}
        </div>
    );
};

export default Fav;