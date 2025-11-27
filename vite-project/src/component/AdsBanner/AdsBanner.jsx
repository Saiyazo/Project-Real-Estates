// src/component/AdsBanner/AdsBanner.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
// 🚨 (1) ต้อง Import useNavigate
import { useNavigate } from 'react-router-dom'; 
import './AdsBanner.css';

import bannerImg1 from '/img/AdsBannerImg/AdsBanner1.jpg';
import bannerImg2 from '/img/AdsBannerImg/AdsBanner2.jpg';
import bannerImg3 from '/img/AdsBannerImg/AdsBanner3.jpg';
import bannerImg4 from '/img/AdsBannerImg/AdsBanner4.jpg';

// 🚨 (2) กำหนด ID ของอสังหาฯ ที่ต้องการ (รายการที่ 1, 3, 9, 13)
const DUMMY_BANNERS = [
    { id: 1, src: bannerImg1, alt: 'ไลฟ์แอทรัชดา', propertyId: 'CONDO-001' },  
    { id: 2, src: bannerImg2, alt: 'ไนท์บริดจ์', propertyId: 'CONDO-003' },     
    { id: 3, src: bannerImg3, alt: 'ไดมอนสุขุมวิท', propertyId: 'CONDO-009' },  
    { id: 4, src: bannerImg4, alt: 'SuphalaiLoft', propertyId: 'CONDO-010' }, 
];

const AdsBanner = ({ banners = DUMMY_BANNERS, interval = 5000 }) => {
    // 🚨 (3) เรียกใช้ useNavigate Hook
    const navigate = useNavigate(); 
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = useMemo(() => banners.length, [banners]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const nextSlideLogic = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, [totalSlides]);

    useEffect(() => {
        if (totalSlides < 2) return;
        const slideInterval = setInterval(nextSlideLogic, interval);
        return () => clearInterval(slideInterval);
    }, [interval, totalSlides, nextSlideLogic]);

    if (totalSlides === 0) return null;

    return (
        <div className="ads-banner-container">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`slide-item ${index === currentIndex ? 'active' : ''}`}
                    // 🚨 (4) เปลี่ยน onClick ให้ใช้ navigate ไปที่ Detail Page
                    onClick={() => navigate(`/property/${banner.propertyId}`)} 
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src={banner.src}
                        alt={banner.alt}
                        className="banner-image"
                    />
                </div>
            ))}

            {totalSlides > 1 && (
                <>
                    <button className="banner-control prev" onClick={prevSlide}>
                        <span className="arrow-icon left"></span>
                    </button>

                    <button
                        className="banner-control next"
                        onClick={nextSlideLogic} 
                    >
                        <span className="arrow-icon right"></span>
                    </button>
                </>
            )}

            {totalSlides > 1 && (
                <div className="banner-dots">
                    {banners.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdsBanner;