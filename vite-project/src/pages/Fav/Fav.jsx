import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Fav.css'; 
import favoritesData from './FavData'; 
import BackButton from '../../component/BackButton/BackButton';

// สำหรับแสดง Badge 
const renderBadges = (item) => (
    <>
        <Badge bg="primary" className="me-1">{item.type}</Badge>
        <Badge bg="info" className="me-2">{item.transaction}</Badge>
    </>
);

const Fav = () => {
    
  

    return (
        <div className="container py-4">
            {/* Header & ปุ่ม BACK */}
            <div className="d-flex align-items-center mb-4">
                <BackButton />
                <h2 className="mb-0 mx-auto fw-normal text-center">รายการโปรด</h2>
            </div>
            

            {/* List of Favorite Items */}
            <div className="fav-list-container">
                {favoritesData.map((item) => (
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

                                    {/* Icon หัวใจ */}
                                    <i className="bi bi-heart-fill text-danger fs-5 fav-heart-icon"></i>
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
        </div>
    );
};

export default Fav;
