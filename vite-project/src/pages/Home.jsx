import React from "react";
import { useState } from "react";
import propertyListing from "../data/propertyListing";
import "./Home.css";

const formatPrice = (price) => {
  if (price === null) return "N/A";
  return price.toLocaleString("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const calculatePricePerSqm = (price, size) => {
  if (!price || !size) return "N/A";
  const ppsqm = price / size;
  return ppsqm.toFixed(0);
};

const extractRoomInfo = (listing) => {
  const roomDetails = listing.descriptionSections.find(
    (s) => s.sectionId === "room_details"
  );
  if (!roomDetails) return { bedrooms: "1", bathrooms: "1" };
  const body = roomDetails.body;
  const bedroomMatch = body.match(/(\d+)\s*ห้องนอน/);
  const bathroomMatch = body.match(/(\d+)\s*ห้องน้ำ/);

  return {
    bedrooms: bedroomMatch ? bedroomMatch[1] : "1",
    bathrooms: bathroomMatch ? bathroomMatch[1] : "1",
  };
};

const getDealTypeClass = (dealType) => {
  if (dealType === "ขาย") return "sale";
  if (dealType === "เช่า") return "rent";
  if (dealType === "ขายและเช่า") return "sale-rent";
  return "default";
};

//  CARD
const PropertyCard = ({ property }) => {
  const { bedrooms, bathrooms } = extractRoomInfo(property);
  const rawPricePerSqm = calculatePricePerSqm(
    property.price,
    property.unitSizeSqm
  );
  const formattedPricePerSqm = formatPrice(parseInt(rawPricePerSqm));

  const isDualPrice =
    property.dealType.includes("เช่า") && property.dealType.includes("ขาย");
  let rentPrice = null;
  if (isDualPrice) {
    const priceSection = property.descriptionSections.find(
      (s) => s.sectionId === "price_options"
    );
    if (priceSection) {
      const rentMatch = priceSection.body.match(/ราคาเช่า:\s*([\d,]+)/);
      rentPrice = rentMatch ? rentMatch[1].replace(/,/g, "") : null;
    }
  }
  const priceDisplay = formatPrice(property.price);
  const dealTypeClass = getDealTypeClass(property.dealType);

  return (
    <div className="property-card-item styled-card">
      <div className="card-thumbnail-container">
        <img
          src={property.thumbnail}
          alt={property.title}
          className="card-thumbnail"
        />
      </div>

      <div className="card-info">
        <h3 className="card-title">{property.title}</h3>
        <p className="card-location">{property.location.district}</p>

        {/* --- ส่วน Tags --- */}
        <div className="main-tags-row">
          <span className="tag property-type-tag blue-bg">
            {property.propertyType}
          </span>
          <span className={`tag deal-type-tag ${dealTypeClass}`}>
            {property.dealType}
          </span>
          <span className="tag room-tag bedroom-tag">
            <span role="img" aria-label="bedroom">
              🛏️
            </span>{" "}
            {bedrooms} ห้องนอน
          </span>
          <span className="tag room-tag bathroom-tag">
            <span role="img" aria-label="bathroom">
              🚽
            </span>{" "}
            {bathrooms} ห้องน้ำ
          </span>
          <span className="tag size-tag">{property.unitSizeSqm} ตร.ม.</span>
          <span className="tag ppsqm-tag">฿{formattedPricePerSqm} /ตร.ม.</span>
        </div>

        {/* --- ส่วนราคา --- */}
        <div className="pricing">
          {isDualPrice ? (
            // กรณี ขาย/เช่า (Dual Price)
            <div className="dual-price-container">
              <div className="price-column sale-column">
                <p className="price-header">ราคาขาย</p>
                <span className="sale-price">฿{priceDisplay}</span>
              </div>

              {rentPrice && (
                <div className="price-column rent-column">
                  <p className="price-header">ราคาเช่า</p>
                  <span className="rent-price">
                    ฿{formatPrice(parseInt(rentPrice))} /ด.
                  </span>
                </div>
              )}
            </div>
          ) : (
            // กรณี ขาย หรือ เช่า อย่างเดียว
            <span className="single-price">
              ฿{priceDisplay}
              {property.dealType === "เช่า" && (
                <span className="price-suffix"> /ด.</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

function ListingGridPage() {
  const allListings = propertyListing.listings;

  const [keyword, setKeyword] = useState("");
  const [filteredListings, setFilteredListings] = useState(allListings);

  const handleSearch = () => {
    let results = allListings;

    if (keyword.trim() !== "") {
      const k = keyword.toLowerCase();
      results = allListings.filter(
        (p) =>
          p.title.toLowerCase().includes(k) ||
          p.location.address.toLowerCase().includes(k) ||
          p.location.district.toLowerCase().includes(k) ||
          p.location.province.toLowerCase().includes(k)
      );
    }

    setFilteredListings(results);
  };

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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
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

      {/* 1. ส่วน Banner และ Filter (จำลอง UI Control) */}
      <div className="top-ui-controls">
        <div className="banner-carousel">[พื้นที่สำหรับ Banner โฆษณา]</div>

        <div className="filter-bar">
          <button className="filter-button primary-blue">จังหวัด</button>
          <button className="filter-button primary-blue">
            รูปแบบการซื้อขาย
          </button>
          <button className="filter-button primary-blue">ประเภทอสังหาฯ</button>
          <button className="filter-button primary-blue">เขต</button>
          <button className="filter-button primary-blue">ช่วงราคา</button>
        </div>
      </div>

      <hr />

      {/* 2. ส่วน Grid แสดงผลการ์ด (4 คอลัมน์) */}
      <div className="listing-grid-section">
        <h2>รายการอสังหาฯ ทั้งหมด</h2>

        <div className="property-grid-4-col">
          {filteredListings.map((propertyItem) => (
            <PropertyCard key={propertyItem.id} property={propertyItem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListingGridPage;
