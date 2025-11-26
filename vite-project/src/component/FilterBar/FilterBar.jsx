import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./FilterBar.css";

// สมมติว่าไฟล์ FilterData มีโครงสร้างดังนี้:
// propertyTypeOptions: [
//     { label: "คอนโดมิเนียม", value: "คอนโด" },
//     { label: "บ้านเดี่ยว", value: "บ้านเดี่ยว" },
//     // ...
// ]
import {
    thaiProvincesData,
    dealTypeOptions,
    propertyTypeOptions,
    priceRangeOptions
} from "../../data/FilterData";


const FilterBar = ({ onFilterChange, onClear }) => {
    // กำหนด State ภายใน FilterBar
    const [province, setProvince] = useState("");
    const [dealTypes, setDealTypes] = useState([]);
    const [propertyType, setPropertyType] = useState("");
    const [district, setDistrict] = useState("");
    const [priceRange, setPriceRange] = useState("");


    // ส่งค่า Filter กลับไปยัง Parent Component (ListingGridPage) ทุกครั้งที่ State เปลี่ยน 
    useEffect(() => {
        const filters = {
            province,
            district,
            dealTypes,
            propertyType,
            priceRange
        };
        
        // เรียกใช้ฟังก์ชันที่ส่งมาจาก Parent Component
        onFilterChange(filters);
        
    }, [province, district, dealTypes, propertyType, priceRange, onFilterChange]);

    // เมื่อเลือกจังหวัด ให้ล้างค่าเขตทันที
    const handleSelectProvince = (prov) => {
        setProvince(prov);
        setDistrict(""); // ล้างค่า district เมื่อ province เปลี่ยน
    };

    // --- ฟังก์ชันสำหรับ Checkbox Multi-select ของ Deal Type ---
    const handleDealTypeToggle = (value) => {
        setDealTypes(prevTypes => {
            if (prevTypes.includes(value)) {
                return prevTypes.filter(type => type !== value);
            } else {
                return [...prevTypes, value];
            }
        });
    };

    // --- Helper สำหรับแสดงข้อความในปุ่ม Deal Type ---
    const getDealTypeDisplay = () => {
        if (dealTypes.length === 0) return "รูปแบบการซื้อขาย";
        if (dealTypes.length === dealTypeOptions.length) return "ทั้งหมด";

        // ค้นหา Label จาก Value
        return dealTypes
            .map(val => {
                const option = dealTypeOptions.find(opt => opt.value === val);
                return option ? option.label : '';
            })
            .filter(label => label !== '') // กรองค่าว่างออก
            .join(', ');
    };

    // --- Helper สำหรับแสดงข้อความในปุ่ม Property Type ---
    const getPropertyTypeDisplay = () => {
        if (!propertyType) return "ประเภทอสังหา";
        
        // ค้นหา Label จาก Value ที่ถูกเลือก
        const selectedOption = propertyTypeOptions.find(opt => opt.value === propertyType);
        // แสดง Label ถ้าหาเจอ ถ้าไม่เจอให้แสดงค่า State เดิม
        return selectedOption ? selectedOption.label : propertyType;
    };


    // *** สำหรับล้างค่าทั้งหมดภายใน FilterBar ***
    const handleClearAll = () => {
        setProvince("");
        setDistrict("");
        setDealTypes([]);
        setPropertyType("");
        setPriceRange("");
        if (onClear) {
            onClear();
        }
    };


    return (
        <div className="filter-bar-wrapper">
            <div className="filter-bar">

                {/* 1. จังหวัด */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">
                            {province || "จังหวัด"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* ปุ่ม 'ล้างค่า' */}
                            <Dropdown.Item onClick={() => handleSelectProvince("")}>
                                ทั้งหมด 
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {Object.keys(thaiProvincesData).map((prov) => (
                                <Dropdown.Item
                                    key={prov}
                                    active={province === prov}
                                    onClick={() => handleSelectProvince(prov)}
                                >
                                    {prov}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* 2. เขต (เปลี่ยนตามจังหวัด) */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button" disabled={!province}>
                            {district || "เขต"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* ปุ่ม 'ล้างค่า' */}
                            <Dropdown.Item onClick={() => setDistrict("")} disabled={!province}>
                                ทั้งหมด 
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {province ? (
                                thaiProvincesData[province].map((dist, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        active={district === dist}
                                        onClick={() => setDistrict(dist)}
                                    >
                                        {dist}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>เลือกจังหวัดก่อน</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* 3. รูปแบบการซื้อขาย (Multi-select Checkbox) */}
                <div className="dropdown-container">
                    <Dropdown autoClose="outside">
                        <Dropdown.Toggle className="filter-button">
                            {getDealTypeDisplay()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="deal-type-menu">
                            {dealTypeOptions.map((item) => {
                                const isChecked = dealTypes.includes(item.value);
                                return (
                                    <Dropdown.Item
                                        key={item.value}
                                        onClick={() => handleDealTypeToggle(item.value)}
                                        className="deal-type-item"
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                            <span>{item.label}</span>
                                            <div className={`custom-checkbox ${isChecked ? 'custom-checkbox-checked' : ''}`}>
                                                {isChecked && <span style={{ color: 'white' }}>✔</span>}
                                            </div>
                                        </div>
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* 4. ประเภทอสังหา - แก้ไขให้ส่งค่า Value ที่ใช้ในการกรอง และแสดง Label */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">
                            {getPropertyTypeDisplay()}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* ปุ่ม 'ล้างค่า' */}
                            <Dropdown.Item onClick={() => setPropertyType("")}>
                                ทั้งหมด 
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {propertyTypeOptions.map((item, index) => (
                                <Dropdown.Item
                                    key={item.value || index}
                                    active={propertyType === item.value}
                                    onClick={() => setPropertyType(item.value)} // ส่ง Value (e.g., "คอนโด") ไปกรอง
                                >
                                    {item.label} {/* แสดง Label (e.g., "คอนโดมิเนียม") */}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* 5. ช่วงราคา & 6. ปุ่ม Clear All */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">
                            {priceRange || "ช่วงราคา"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* ปุ่ม 'ล้างค่า' */}
                            <Dropdown.Item onClick={() => setPriceRange("")}>
                                ทั้งหมด
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {priceRangeOptions.map((item, index) => (
                                <Dropdown.Item
                                    key={index}
                                    active={priceRange === item}
                                    onClick={() => setPriceRange(item)}
                                >
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* ปุ่มล้างสถานะทั้งหมด*/}
                <button
                    className="filter-button clear-button-small"
                    onClick={handleClearAll}
                    disabled={false}
                >
                    ล้างทั้งหมด
                </button>

            </div>
        </div>
    );
};

export default FilterBar;