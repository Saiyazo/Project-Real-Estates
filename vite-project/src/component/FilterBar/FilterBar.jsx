import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./FilterBar.css";

import {
    thaiProvincesData,
    dealTypeOptions,
    propertyTypeOptions,
    priceRangeOptions
} from "../../data/FilterData";

const FilterBar = ({ onFilterChange, onClear }) => {
    const [province, setProvince] = useState("");
    const [dealTypes, setDealTypes] = useState([]);
    const [propertyType, setPropertyType] = useState("");
    const [district, setDistrict] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const filters = { province, district, dealTypes, propertyType, priceRange };
        onFilterChange(filters);
    }, [province, district, dealTypes, propertyType, priceRange, onFilterChange]);

    const handleSelectProvince = (prov) => {
        setProvince(prov);
        setDistrict("");
    };

    const handleDealTypeToggle = (value) => {
        setDealTypes(prev => prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]);
    };

    const getDealTypeDisplay = () => {
        if (dealTypes.length === 0) return "รูปแบบการซื้อขาย";
        if (dealTypes.length === dealTypeOptions.length) return "ทั้งหมด";
        return dealTypes
            .map(val => dealTypeOptions.find(opt => opt.value === val)?.label || '')
            .filter(label => label !== '')
            .join(', ');
    };

    const getPropertyTypeDisplay = () => {
        if (!propertyType) return "ประเภทอสังหา";
        return propertyTypeOptions.find(opt => opt.value === propertyType)?.label || propertyType;
    };

    const handleClearAll = () => {
        setProvince("");
        setDistrict("");
        setDealTypes([]);
        setPropertyType("");
        setPriceRange("");
        if (onClear) onClear();
    };

    return (
        <div className="filter-bar-wrapper">
            <div className="filter-bar">

                {/* จังหวัด */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">
                            {province || "จังหวัด"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelectProvince("")}>ทั้งหมด</Dropdown.Item>
                            <Dropdown.Divider />
                            {Object.keys(thaiProvincesData).map(prov => (
                                <Dropdown.Item key={prov} active={province === prov} onClick={() => handleSelectProvince(prov)}>
                                    {prov}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* เขต */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button" disabled={!province}>
                            {district || "เขต"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setDistrict("")} disabled={!province}>ทั้งหมด</Dropdown.Item>
                            <Dropdown.Divider />
                            {province ? (
                                thaiProvincesData[province].map((dist, i) => (
                                    <Dropdown.Item key={i} active={district === dist} onClick={() => setDistrict(dist)}>
                                        {dist}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>เลือกจังหวัดก่อน</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* รูปแบบการซื้อขาย (Multi-select) */}
                <div className="dropdown-container">
                    <Dropdown autoClose="outside">
                        <Dropdown.Toggle className="filter-button">{getDealTypeDisplay()}</Dropdown.Toggle>
                        <Dropdown.Menu className="deal-type-menu">
                            {dealTypeOptions.map(item => {
                                const isChecked = dealTypes.includes(item.value);
                                return (
                                    <Dropdown.Item key={item.value} onClick={() => handleDealTypeToggle(item.value)} className="deal-type-item">
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

                {/* ประเภทอสังหา */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">{getPropertyTypeDisplay()}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setPropertyType("")}>ทั้งหมด</Dropdown.Item>
                            <Dropdown.Divider />
                            {propertyTypeOptions.map((item, index) => (
                                <Dropdown.Item key={item.value || index} active={propertyType === item.value} onClick={() => setPropertyType(item.value)}>
                                    {item.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* ช่วงราคา */}
                <div className="dropdown-container">
                    <Dropdown>
                        <Dropdown.Toggle className="filter-button">{priceRange || "ช่วงราคา"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setPriceRange("")}>ทั้งหมด</Dropdown.Item>
                            <Dropdown.Divider />
                            {priceRangeOptions.map((item, index) => (
                                <Dropdown.Item key={index} active={priceRange === item} onClick={() => setPriceRange(item)}>
                                    {item}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* ปุ่มล้างทั้งหมด */}
                <button className="filter-button clear-button-small" onClick={handleClearAll}>ล้างทั้งหมด</button>
            </div>
        </div>
    );
};

export default FilterBar;
