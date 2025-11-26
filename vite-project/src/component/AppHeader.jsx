import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import Chat from './Chat/Chat'; 

// ตรวจสอบว่า path ของ Logo และ Avatar ถูกต้อง
import Logo from "/img/webLogo.png";
import buyerAvatar from "/img/personImg/Buyer.jpg"; 

const AppNavbar = () => {
    const [showChatModal, setShowChatModal] = useState(false);
    const handleClose = () => setShowChatModal(false);
    const handleShow = () => setShowChatModal(true);

    // ********** ปรับปรุงคลาสปุ่มให้มีขนาดใหญ่และโค้งมนมากขึ้น **********
    // ลบ padding แนวแกน X ออก (px-4) เพื่อให้ W-100 ทำงานได้
    // **เพิ่ม w-100 (Width 100%) เพื่อให้ปุ่มขยายเต็ม div ที่ครอบ**
    const primaryButtonClasses = "bg-primary fw-bold fs-6 text-white border-0 py-2 rounded-pill w-100"; 
    
    const iconSize = '42px'; 
    
    // สไตล์สำหรับไอคอนแจ้งเตือน (วงกลมสีน้ำเงิน)
    const iconButtonStyle = { width: iconSize, height: iconSize }; 
    const iconButtonClasses = "bg-primary rounded-circle text-white d-flex align-items-center justify-content-center border-0 p-0";
    
    // สไตล์สำหรับรูปโปรไฟล์
    const avatarStyle = { width: iconSize, height: iconSize, objectFit: 'cover' };
    const avatarContainerClasses = "rounded-circle overflow-hidden d-flex align-items-center justify-content-center border-0 p-0";


    return ( 
        <>
            <header 
                // ใช้ justify-content-between จัดระหว่าง 3 กลุ่มหลัก
                className="d-flex justify-content-between align-items-center px-4 py-3" 
                style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#fff' }} 
            >
                {/* === 1. ส่วนซ้าย: โลโก้ === */}
                <div className="d-flex align-items-center">
                    <Link to={'/'} className="text-decoration-none d-flex align-items-center">
                        <img 
                            src={Logo} 
                            alt="LikeBa Logo" 
                            style={{ height: '45px' }} 
                        />
                    </Link>
                </div>

                {/* === 2. ส่วนกลาง: ปุ่มหลัก (หน้าแรก / แชต / รายการโปรด) === */}
                {/* เพิ่ม flex-grow-1 เพื่อให้กลุ่มปุ่มกินพื้นที่ว่างทั้งหมด */}
                {/* ใช้ gap-1 เพื่อให้มีช่องว่างระหว่างปุ่มน้อยที่สุด (4px) */}
                <div className="d-flex align-items-center flex-grow-1 mx-4 gap-1">
                    
                    {/* ใช้ flex-fill ครอบแต่ละปุ่มเพื่อให้แบ่งพื้นที่เท่ากัน */}
                    <div className="flex-fill">
                        <Link to={'/Home'}>
                            <Button className={primaryButtonClasses}>หน้าแรก</Button>
                        </Link>
                    </div>

                    <div className="flex-fill">
                        <Button className={primaryButtonClasses} onClick={handleShow}>แชต</Button>
                    </div>

                    <div className="flex-fill">
                        <Link to={'/Fav'}>
                            <Button className={primaryButtonClasses}>รายการโปรด</Button>
                        </Link>
                    </div>
                </div>

                {/* === 3. ส่วนขวา: ไอคอนแจ้งเตือน + โปรไฟล์ === */}
                {/* ใช้ gap-3 เพื่อช่องว่างระหว่างไอคอน */}
                <div className="d-flex align-items-center gap-3"> 
                    <Link to={'/Noti'}> 
                        <Button className={iconButtonClasses} style={iconButtonStyle}>
                            <i className="bi bi-bell-fill fs-5"></i> 
                        </Button>
                    </Link>

                    <Link to="/buyer-profile" className={avatarContainerClasses}>
                        <img src={buyerAvatar} alt="Buyer Avatar" style={avatarStyle} />
                    </Link>
                </div>
            </header>

            <Modal 
                show={showChatModal} 
                onHide={handleClose} 
                className="full-height-chat-modal"
                dialogClassName="modal-fullscreen-sm-down"
            >
                <Chat handleClose={handleClose} />
            </Modal>
        </>
    );
}

export default AppNavbar;