import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Fav.css'; 
import propertyListingData from '../../data/propertyListing'; 
import BackButton from '../../component/BackButton/BackButton';

const getDealClass = (transaction) => {
    switch (transaction) {
        case 'ขาย': return 'deal-sale';
        case 'เช่า': return 'deal-rent';
        case 'ขายและเช่า': return 'deal-sale-rent';
        default: return 'bg-secondary text-white';
    }
};

const transformListings = (data) => {
    if (!data || !data.listings) return [];

    const filteredData = data.listings.filter((_, index) => {
        return index < 2 || index > 10;
    });

    return filteredData.map(item => {
        const formattedPrice = item.price ? item.price.toLocaleString() : "-";
    
        // หาราคาเช่า 
        let rentPriceVal = item.rentPrice || 0;

        if (!rentPriceVal && item.dealType === 'ขายและเช่า' && item.descriptionSections) {
            const priceSection = item.descriptionSections.find(s => s.sectionId === 'price_options');
            if (priceSection) {
                const rentMatch = priceSection.body.match(/ราคาเช่า:\s*([\d,]+)/);
                if (rentMatch) {
                    rentPriceVal = parseInt(rentMatch[1].replace(/,/g, ''));
                }
            }
        }

        const formattedRentPrice = rentPriceVal ? rentPriceVal.toLocaleString() : "-";

        // ข้อมูลห้อง
        const bedMatch = item.description ? item.description.match(/(\d+)\s*ห้องนอน/) : null;
        const bathMatch = item.description ? item.description.match(/(\d+)\s*ห้องน้ำ/) : null;
        const bed = bedMatch ? bedMatch[1] : "-";
        const bath = bathMatch ? bathMatch[1] : "-";

        let priceBuy = null;
        let priceRent = null;

        if (item.dealType === 'ขาย') {
            priceBuy = `฿${formattedPrice}`;
        } else if (item.dealType === 'เช่า') {
            priceRent = `฿${formattedPrice} /ด.`;
        } else if (item.dealType === 'ขายและเช่า') {
            priceBuy = `฿${formattedPrice}`;
            priceRent = `฿${formattedRentPrice} /ด.`;
        }

        return {
            id: item.id,
            type: item.propertyType,
            transaction: item.dealType,
            title: item.title,
            location: item.location.district, 
            priceBuy: priceBuy,
            priceRent: priceRent,
            details: `${bed} ห้องนอน ${bath} ห้องน้ำ | ${item.unitSizeSqm} ตร.ม.`,
            imageUrl: item.thumbnail
        };
    });
};

const Fav = () => {
    const [favorites, setFavorites] = useState(transformListings(propertyListingData));


    const handleRemoveFavorite = (idToRemove) => {
        const newFavorites = favorites.filter(item => item.id !== idToRemove);
        setFavorites(newFavorites);
    };

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center mb-4">
                <BackButton />
            </div>
            
            <div className="fav-list-container">
                {favorites.map((item) => (
                    <Card key={item.id} className="fav-card">
                        <Card.Body className="d-flex p-3">
                            
                            <div className="fav-image-placeholder me-3 flex-shrink-0">
                                {item.imageUrl ? (
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title} 
                                        onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}}
                                    />
                                ) : null}
                                <div style={{ width: '100%', height: '100%', display: item.imageUrl ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-image text-muted fs-2"></i>
                                </div>
                            </div>

                            <div className="fav-details flex-grow-1 d-flex flex-column justify-content-between">
                                
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="fav-tags-container">
                                        <span className="fav-tag fav-tag-type">{item.type}</span>
                                        <span className={`fav-tag ${getDealClass(item.transaction)}`}>
                                            {item.transaction}
                                        </span>
                                    </div>
                                    <i 
                                        className="bi bi-heart-fill fs-5 fav-heart-icon"
                                        onClick={() => handleRemoveFavorite(item.id)}
                                        title="ลบรายการ"
                                    ></i>
                                </div>
                                
                                <div>
                                    <h6 className="fav-title text-truncate">{item.title}</h6>
                                    <div className="fav-location">
                                        <i className="bi bi-geo-alt-fill text-primary"></i>
                                        {item.location}
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-end mt-2">
                                    <div className="fav-details-text">
                                        <i className="bi bi-house-door me-1"></i>{item.details}
                                    </div>
                                    
                                    <div className="price-container">
                                        {item.transaction === 'ขายและเช่า' ? (
                                            <div className="d-flex flex-column align-items-end">
                                                <div>
                                                    <span className="price-label">ราคาขาย</span>
                                                    <span className="fav-price-buy">{item.priceBuy}</span>
                                                </div>
                                                <div>
                                                    <span className="price-label">ราคาเช่า</span>
                                                    <span className="fav-price-rent">{item.priceRent}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {item.transaction === 'เช่า' ? (
                                                    <span className="fav-price-rent">{item.priceRent}</span>
                                                ) : (
                                                    <span className="fav-price-buy">{item.priceBuy}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {favorites.length === 0 && (
                <div className="text-center text-muted mt-5 py-5">
                    <i className="bi bi-heartbreak fs-1 mb-3 d-block" style={{opacity: 0.5}}></i>
                    <p className="lead">ไม่มีรายการโปรด</p>
                </div>
            )}
        </div>
    );
};

export default Fav;
