import React, { useState, useMemo, useCallback } from 'react';
import propertyListing from '../data/propertyListing';
import './BuyerHome.css';
import FilterBar from '../component/FilterBar/FilterBar';
import AdsBanner from '../component/AdsBanner/AdsBanner';
import { useNavigate } from 'react-router-dom';

// --- Helper Functions Grouped --- 
const formatPrice = (price) => {
    if (price === null) return 'N/A';
    return price.toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const calculatePricePerSqm = (price, size) => {
    if (!price || !size) return 'N/A';
    const rawPrice = price / size;
    return Number.isFinite(rawPrice) ? rawPrice.toFixed(0) : 'N/A';
};
const extractRoomInfo = (listing) => {
    const roomDetails = listing.descriptionSections.find(s => s.sectionId === 'room_details');
    if (!roomDetails) return { bedrooms: '1', bathrooms: '1' };
    const body = roomDetails.body;
    const bedroomMatch = body.match(/(\d+)\s*ห้องนอน/);
    const bathroomMatch = body.match(/(\d+)\s*ห้องน้ำ/);
    return {
        bedrooms: bedroomMatch ? bedroomMatch[1] : '1',
        bathrooms: bathroomMatch ? bathroomMatch[1] : '1'
    };
};
const getDealTypeClass = (dealType) => {
    if (dealType === 'ขาย') return 'sale';
    if (dealType === 'เช่า') return 'rent';
    if (dealType === 'ขายและเช่า') return 'sale-rent';
    return 'default';
}
const parsePriceRange = (rangeStr) => {
    if (!rangeStr) return { min: 0, max: Infinity };
    const cleanStr = rangeStr.replace(/,/g, '').toLowerCase();

    if (cleanStr.includes('น้อยกว่า')) {
        return { min: 0, max: parseInt(cleanStr.match(/\d+/)[0]) };
    }
    if (cleanStr.includes('มากกว่า')) {
        let minVal = parseInt(cleanStr.match(/\d+/)[0]);
        if (cleanStr.includes('ล้าน')) {
            minVal *= 1000000;
        }
        return { min: minVal, max: Infinity };
    }
    if (cleanStr.includes('-')) {
        const parts = cleanStr.split('-').map(p => p.trim());
        let min = parseFloat(parts[0]);
        let max = parseFloat(parts[1]);

        if (parts[0].includes('ล้าน')) min *= 1000000;
        else if (parts[0].includes('แสน')) min *= 100000;

        if (parts[1].includes('ล้าน')) max *= 1000000;
        else if (parts[1].includes('แสน')) max *= 100000;

        return { min, max };
    }
    return { min: 0, max: Infinity };
};


// --- CARD COMPONENT ---
const PropertyCard = ({ property, navigate }) => { 
    const { bedrooms, bathrooms } = useMemo(() => extractRoomInfo(property), [property]);

    const rawPricePerSqm = calculatePricePerSqm(property.price, property.unitSizeSqm);
    const numericPricePerSqm = Number(rawPricePerSqm);
    const formattedPricePerSqm = Number.isFinite(numericPricePerSqm)
        ? formatPrice(Math.round(numericPricePerSqm))
        : 'N/A';

    const dealTypeStr = property.dealType || '';
    const isDualPrice = dealTypeStr.includes('เช่า') && dealTypeStr.includes('ขาย');
    let rentPrice = null;

    if (isDualPrice) {
        const priceSection = (property.descriptionSections || []).find(s => s.sectionId === 'price_options');
        if (priceSection && typeof priceSection.body === 'string') {
            const rentMatch = priceSection.body.match(/(ราคาเช่า|ค่าเช่า)[\s\S]*?([\d,]+)/i); 
            rentPrice = rentMatch 
                ? Number(rentMatch[2].replace(/,/g, '')) 
                : null;
        }
    }

    const priceDisplay = formatPrice(property.price);
    const dealTypeClass = getDealTypeClass(dealTypeStr);

    const handleCardClick = () => {
     navigate(`/property/${property.id}`);
    };

    return (
        <div 
            className="property-card-item styled-card"
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="card-thumbnail-container">
                <img src={property.thumbnail} alt={property.title} className="card-thumbnail" />
            </div>
            <div className="card-info">
                <h3 className="card-title">{property.title}</h3>
                <p className="card-location">{property.location?.district}</p>
                
                <div className="main-tags-row tags-row-1"> 
                    <span className="tag property-type-tag blue-bg">{property.propertyType}</span>
                    <span className={`tag deal-type-tag ${dealTypeClass}`}>{property.dealType}</span>
                </div>

                <div className="main-tags-row tags-row-2">
                    <span className="tag room-tag bedroom-tag">🛏️ {bedrooms} ห้องนอน</span>
                    <span className="tag room-tag bathroom-tag">🚽 {bathrooms} ห้องน้ำ</span>
                </div>
                
                <div className="main-tags-row tags-row-3"> 
                    {property.unitSizeSqm !== null && property.unitSizeSqm !== undefined && (
                        <span className="tag size-tag">{property.unitSizeSqm} ตร.ม.</span>
                    )}
                    
                    {formattedPricePerSqm !== 'N/A' && (
                        <span className="tag price-sqm-tag">
                            ฿{formattedPricePerSqm} /ตร.ม.
                        </span>
                    )}
                </div>

                <div className="pricing">
                    {isDualPrice ? (
                        <div className="dual-price-container">
                            <div className="price-column sale-column">
                                <p className="price-header">ราคาขาย</p>
                                <span className="sale-price">฿{priceDisplay}</span>
                            </div>

                            {rentPrice !== null &&
                                <div className="price-column rent-column">
                                    <p className="price-header">ราคาเช่า</p>
                                    <span className="rent-price">฿{formatPrice(rentPrice)} /ด.</span>
                                </div>
                            }
                        </div>
                    ) : (
                        <span className="single-price">
                            ฿{priceDisplay}
                            {property.dealType === 'เช่า' && <span className="price-suffix"> /ด.</span>}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};


function Home() {
    const navigate = useNavigate(); 
    const allListings = useMemo(() => propertyListing.listings, []);

    const initialFilterCriteria = useMemo(() => ({
        province: '',
        district: '',
        dealTypes: [],
        propertyType: '',
        priceRange: ''
    }), []);

    const [filterCriteria, setFilterCriteria] = useState(initialFilterCriteria);
    const [searchText, setSearchText] = useState(""); 
    const [currentKeyword, setCurrentKeyword] = useState(""); 

    const handleFilterChange = useCallback((newFilters) => {
        setFilterCriteria(newFilters);
    }, []);

    const handleClearFilters = () => {
        setFilterCriteria(initialFilterCriteria);
        setSearchText(""); 
        setCurrentKeyword(""); 
    };

    const handleSearch = () => {
        setCurrentKeyword(searchText);
    };

    const filteredProperties = useMemo(() => {
        let intermediateListings = allListings.filter(item => {
            
            if (filterCriteria.province && item.location.province !== filterCriteria.province) return false;
            if (filterCriteria.district && item.location.district !== filterCriteria.district) return false;
            if (filterCriteria.propertyType && item.propertyType !== filterCriteria.propertyType) return false;

            if (filterCriteria.dealTypes.length > 0) {
                const isMatch = filterCriteria.dealTypes.some(type => {
                    if (type === 'sell') return item.dealType && item.dealType.includes('ขาย');
                    if (type === 'rent') return item.dealType && item.dealType.includes('เช่า');
                    if (type === 'lease') return item.dealType && item.dealType.includes('เซ้ง');
                    return false;
                });
                if (!isMatch) return false;
            }

            if (filterCriteria.priceRange) {
                const { min, max } = parsePriceRange(filterCriteria.priceRange);
                let priceToCheck = item.price;
                const isDualPrice = item.dealType === 'ขายและเช่า';

                if (isDualPrice) {
                    const priceSection = (item.descriptionSections || []).find(s => s.sectionId === 'price_options');
                    let rentPriceValue = null;

                    if (priceSection && typeof priceSection.body === 'string') {
                        const rentMatch = priceSection.body.match(/(ราคาเช่า|ค่าเช่า)[\s\S]*?([\d,]+)(?:\s*บาท|\s*\/ด\.)?/i);
                        rentPriceValue = rentMatch
                            ? Number(rentMatch[2].replace(/,/g, ''))
                            : null;
                    }

                    if (rentPriceValue !== null) {
                        priceToCheck = rentPriceValue; 
                    } else {
                        priceToCheck = item.price;
                    }
                }
                
                if (priceToCheck === null || priceToCheck < min || priceToCheck > max) return false;
            }

            return true;
        });

        if (currentKeyword.trim() !== "") {
            const k = currentKeyword.toLowerCase(); 
            intermediateListings = intermediateListings.filter(
                (p) =>
                    p.title.toLowerCase().includes(k) ||
                    p.location.address.toLowerCase().includes(k) ||
                    p.location.district.toLowerCase().includes(k) ||
                    p.location.province.toLowerCase().includes(k)
            );
        }

        return intermediateListings;
    }, [filterCriteria, currentKeyword, allListings]); 


    return (
        <div className="listing-page-container">
            
            <div className="mb-3 d-flex">
                <div className="input-group">
                    <span className="input-group-text bg-white">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="search"
                        className="form-control"
                        placeholder="ค้นหาทำเล / โครงการที่คุณต้องการ..."
                        value={searchText} 
                        onChange={(e) => setSearchText(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch(); 
                        }}
                    />
                </div>

                <button
                    className="btn btn-outline-primary ms-2"
                    type="button"
                    onClick={handleSearch} 
                >
                    Search
                </button>
            </div>

            <div className="ads-banner-wrapper"> 
                <AdsBanner />
            </div>

            <div className="filter-bar-container">
                <FilterBar
                    onFilterChange={handleFilterChange}
                    onClear={handleClearFilters}
                />
            </div>


            <div className="listing-grid-section">
                <h2>รายการอสังหาฯ ทั้งหมด ({filteredProperties.length} รายการ)</h2>

                {filteredProperties.length > 0 ? (
                    <div className="property-grid-4-col">
                        {filteredProperties.map((propertyItem) => (
                            <PropertyCard
                                key={propertyItem.id}
                                property={propertyItem}
                                navigate={navigate} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-result">
                        <p style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                            ไม่พบรายการที่ค้นหา
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;