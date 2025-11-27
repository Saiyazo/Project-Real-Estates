import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './AppFooter.css'; 
import { Link } from 'react-router-dom';

// Modal: เกี่ยวกับเรา
const ModalAbout = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="border-0 modal-header-white">
            <Modal.Title className="text-blue-theme fw-bold ">เกี่ยวกับเรา</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
            <img src="https://placehold.co/800x360/003CFF/ffffff?text=Likeban+About+Us" className="w-100 rounded mb-3" alt="Likeban About Us Banner"/>
            <h4 className="text-blue-theme">Likeban: เพื่อนคู่คิดเรื่องบ้าน</h4>
            <p className="text-muted">เราคือแพลตฟอร์มสื่อกลางที่มุ่งมั่นพัฒนาระบบการซื้อ-ขายและเช่าอสังหาริมทรัพย์ให้เป็นเรื่องง่าย สะดวก และปลอดภัยสำหรับทุกคน โดยเชื่อมโยงผู้ซื้อ ผู้เช่า และผู้ขายเข้าด้วยกันอย่างมีประสิทธิภาพ</p>
            
            <div className="row text-center mt-4 border-top pt-3">
                <div className="col-4">
                    <i className="bi bi-search display-6 text-blue-theme mb-2 d-block"></i> 
                    <h6 className="fw-bold text-blue-theme">ค้นหาง่าย ตรงใจ</h6>
                    <small className="text-muted">ระบบกรองข้อมูลละเอียด ค้นหาได้รวดเร็ว</small>
                </div>
                <div className="col-4">
                    <i className="bi bi-list-check display-6 text-blue-theme mb-2 d-block"></i>
                    <h6 className="fw-bold text-blue-theme">จัดการประกาศง่าย</h6>
                    <small className="text-muted">สำหรับผู้ขายและนายหน้า มืออาชีพ</small>
                </div>
                <div className="col-4">
                    <i className="bi bi-shield-check display-6 text-blue-theme mb-2 d-block"></i>
                    <h6 className="fw-bold text-blue-theme">ปลอดภัย โปร่งใส</h6>
                    <small className="text-muted">เน้นบริการข้อมูลและการโฆษณาที่ตรวจสอบได้</small>
                </div>
            </div>
        </Modal.Body>
    </Modal>
);

// Modal: ติดต่อเรา
const ModalContact = ({ show, handleClose, handleShowPrivacy }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="border-0 modal-header-white">
                <Modal.Title className="text-blue-theme fw-bold">ติดต่อเรา</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-4">
                    <div className="col-md-5">
                        <h4 className="text-blue-theme">บริษัท ไลค์บ้าน จำกัด</h4>
                        <p className="text-muted small">Likeban Co., Ltd.</p>
                        <hr />
                        <div className="mb-3">
                            <strong className="text-blue-theme d-block mb-1"><i className="bi bi-geo-alt-fill"></i> ที่อยู่สำนักงาน</strong>
                            <span className="small text-secondary">เลขที่ 123 อาคาร A ชั้น 9 ถนนพระราม 10<br/>แขวงทุ่งมหาเมฆ เขตสาทร<br/>กรุงเทพมหานคร 10120</span>
                        </div>
                        <div className="mb-3">
                            <strong className="text-blue-theme d-block mb-1"><i className="bi bi-clock-fill"></i> เวลาทำการ</strong>
                            <span className="small text-secondary">จันทร์ - ศุกร์ : 09.00 - 18.00 น.</span>
                        </div>
                        <div>
                            <strong className="text-blue-theme d-block mb-1"><i className="bi bi-envelope-fill"></i> ช่องทางออนไลน์</strong>
                            <span className="small text-secondary">Email: contact@likeban.com<br/>Line Official: @likeban</span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h5>ส่งข้อความถึงเรา</h5>
                        <form onSubmit={(e) => { e.preventDefault(); alert('ส่งข้อความเรียบร้อย!'); handleClose(); }}>
                            <div className="mb-3"><input type="text" className="form-control" placeholder="ชื่อ - นามสกุล" required/></div>
                            <div className="mb-3"><input type="tel" className="form-control" placeholder="เบอร์โทรศัพท์" required/></div>
                            <div className="mb-3">
                                <select className="form-select text-secondary">
                                    <option>สอบถามการใช้งานทั่วไป</option>
                                    <option>แจ้งปัญหาการใช้งาน / ร้องเรียน</option>
                                    <option>สนใจลงโฆษณา (Banner)</option>
                                    <option>อื่นๆ</option>
                                </select>
                            </div>
                            <div className="mb-3"><textarea className="form-control" rows="3" placeholder="รายละเอียด..." required></textarea></div>
                            <div className="mb-3 form-check small">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="checkConsent" 
                                    checked={isChecked}
                                    onChange={handleCheckboxChange} 
                                />
                                <label className="form-check-label text-secondary" htmlFor="checkConsent">
                                    ข้าพเจ้ายอมรับ 
                                    <a href="#" className="text-blue-theme" onClick={(e) => { e.preventDefault(); handleClose(); handleShowPrivacy(); }}>
                                        นโยบายความเป็นส่วนตัว
                                    </a>
                                    {!isChecked && <span className="text-danger-custom ms-2">*ต้องยอมรับเงื่อนไข</span>}
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-blue-theme w-100 py-2"
                                disabled={!isChecked} 
                            >
                                ส่งข้อความ
                            </button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

// Modal: นโยบายความเป็นส่วนตัว
const ModalPrivacy = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton className="border-0 modal-header-white">
            <Modal.Title className="text-blue-theme fw-bold">นโยบายความเป็นส่วนตัว</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary lh-lg">
            <span className="d-block mb-3 small text-muted">แก้ไขล่าสุด: 24 พฤศจิกายน 2568</span>
            <p>บริษัท ไลค์บ้าน จำกัด ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของท่าน ...</p>
        </Modal.Body>
    </Modal>
);

const AppFooter = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleShowPrivacy = () => setShowPrivacy(true);

    return (
        <>
            <footer className="bg-light border-top py-4 mt-auto">
                <div className="container text-center">
                    <div className="d-flex justify-content-center flex-wrap gap-4 mb-3">
                        <Link to="/" className="footer-link">หน้าหลัก</Link>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>เกี่ยวกับเรา</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setShowContact(true); }}>ติดต่อเรา</a>
                        <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>นโยบายความเป็นส่วนตัว</a>
                    </div>

                    <div className="mb-3 text-secondary small">
                        <i className="bi bi-geo-alt-fill text-blue-theme fs-6 me-1"></i>
                        <span>เลขที่ 123 อาคาร A ชั้น 9 ถนนพระราม 10 แขวงทุ่งมหาเมฆ เขตสาทร กรุงเทพมหานคร 10120</span>
                    </div>

                    <div className="d-flex justify-content-center flex-wrap gap-3">
                        <div className="contact-pill"><i className="bi bi-telephone-fill"></i> 02-999-1234</div>
                        <div className="contact-pill"><i className="bi bi-telephone-fill"></i> (Sales) 02-999-4321</div>
                        <div className="contact-pill"><i className="bi bi-envelope-fill"></i> contact@likeban.com</div>
                    </div>

                    <p className="mt-3 mb-0 text-muted small">&copy; 2025 Likeban. All rights reserved.</p>
                </div>
            </footer>

            <ModalAbout show={showAbout} handleClose={() => setShowAbout(false)} />
            <ModalContact show={showContact} handleClose={() => setShowContact(false)} handleShowPrivacy={handleShowPrivacy} />
            <ModalPrivacy show={showPrivacy} handleClose={() => setShowPrivacy(false)} />
        </>
    );
};

export default AppFooter;
