import React, { useState, useEffect, useMemo } from 'react';
import './ReportModal.css';
import reasonsData from './reasonsData.jsx';

const ReportModal = ({ isModalOpen, onClose, onSuccess, reportedTarget }) => {
    const [category, setCategory] = useState('user');
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [details, setDetails] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]); // ✅ เพิ่ม State สำหรับรูปภาพ

    const { name, label, icon } = useMemo(() => {
        const targetName = reportedTarget ? reportedTarget.name : "ไม่ระบุคู่สนทนา";
        const targetId = reportedTarget ? reportedTarget.id : "N/A";

        if (category === 'listing') {
            return {
                name: "ขายคอนโด Life Asoke (ID: 8821)",
                label: "คุณกำลังรายงาน: ประกาศ",
                icon: "bi-house-door-fill"
            };
        }
        if (category === 'chat') {
            return {
                name: `คู่สนทนา: ${targetName} (ID: ${targetId})`,
                label: "คุณกำลังรายงาน: แชต",
                icon: "bi-chat-dots-fill"
            };
        }
        return {
            name: targetName,
            label: "คุณกำลังรายงาน: ผู้ใช้งาน",
            icon: "bi-person-fill"
        };
    }, [category, reportedTarget]);

    const reasonsList = useMemo(() => {
        return reasonsData[category] || [];
    }, [category]);

    const isOtherSelected = reason === "อื่นๆ (ระบุ)";

    useEffect(() => {
        if (reasonsList.length > 0) {
            setReason(reasonsList[0]);
        } else {
            setReason('');
        }
        setOtherReason('');
    }, [category, reasonsList]);

    // ✅ ฟังก์ชันจัดการการเลือกไฟล์ (รองรับ Multiple Files)
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files).map(file => ({
                file: file,
                url: URL.createObjectURL(file),
                name: file.name
            }));
            setSelectedFiles(prev => [...prev, ...newFiles]);
            event.target.value = null;
        }
    };

    // ✅ ฟังก์ชันลบรูปภาพ
    const removeImage = (indexToRemove) => {
        setSelectedFiles(prev => {
            // Optional: Revoke URL if you want to free up memory immediately
            // URL.revokeObjectURL(prev[indexToRemove].url); 
            return prev.filter((_, index) => index !== indexToRemove);
        });
    };

    const handleSubmit = () => {
        const reportPayload = {
            reportedId: reportedTarget ? reportedTarget.id : null,
            category,
            reason: isOtherSelected ? otherReason : reason,
            details,
            evidenceFiles: selectedFiles.map(f => f.file), // ✅ ส่งไฟล์ที่เลือกไป
        };
        console.log("Report Submitted:", reportPayload);
        setSelectedFiles([]); // ✅ เคลียร์ไฟล์หลังจากส่งสำเร็จ
        onSuccess();
    };

    if (!isModalOpen) return null;

    return (
        <>
            <div className="modal-backdrop-custom"></div>

            <div
                className={`modal fade ${isModalOpen ? 'd-block show' : ''}`}
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                style={{ display: isModalOpen ? 'block' : 'none', zIndex: 1055 }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                                <span className="modal-title fs-5">ร้องเรียน</span>
                            </div>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>

                        <div className="modal-body p-4">

                            <div className="target-card">
                                <div className="target-icon-box">
                                    <i className={`bi ${icon}`}></i>
                                </div>
                                <div className="target-info">
                                    <h6>{name}</h6>
                                    <span>{label}</span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">ประเภทการร้องเรียน <span className="text-danger">*</span></label>
                                <select
                                    className="form-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="listing">หมวด: ประกาศ (Listing)</option>
                                    <option value="user">หมวด: ผู้ใช้งาน (User)</option>
                                    <option value="chat">หมวด: แชต (Chat)</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">หัวข้อปัญหา <span className="text-danger">*</span></label>
                                <select
                                    className="form-select"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    {reasonsList.length > 0 && reasonsList.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>

                                {isOtherSelected && (
                                    <div className="other-input-container">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="โปรดระบุสาเหตุอื่นๆ..."
                                            value={otherReason}
                                            onChange={(e) => setOtherReason(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">รายละเอียดเพิ่มเติม</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="ระบุวันที่ เวลา หรือรายละเอียดอื่นๆ..."
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                ></textarea>
                            </div>

                            {/* ✅ Image Preview Section */}
                            {selectedFiles.length > 0 && (
                                <div className="image-preview-report-container mb-3 d-flex flex-wrap gap-2">
                                    {selectedFiles.map((imgObj, index) => (
                                        <div key={index} className="position-relative preview-item-box">
                                            <img
                                                src={imgObj.url}
                                                alt={imgObj.name}
                                                className="rounded border"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                            />
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="btn-remove-img"
                                                aria-label={`ลบรูปภาพ ${imgObj.name}`}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="form-label">หลักฐานประกอบ (ถ้ามี)</label>
                                <div className="upload-zone" onClick={() => document.getElementById('fileUpload').click()}>
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        multiple // ✅ รองรับหลายไฟล์
                                    />
                                    <i className="bi bi-cloud-arrow-up-fill fs-3 text-danger"></i>
                                    <span className="upload-text">คลิกเพื่อแนบรูปภาพเพิ่มเติม</span>
                                    <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '4px' }}>รองรับไฟล์ JPG, PNG</div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-2">
                                <button type="button" className="btn btn-cancel" onClick={onClose}>ยกเลิก</button>
                                <div style={{ width: '60%' }}>
                                    <button type="button" className="btn btn-submit" onClick={handleSubmit}>ส่งรายงาน</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportModal;