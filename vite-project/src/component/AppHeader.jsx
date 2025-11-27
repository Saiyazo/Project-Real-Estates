import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import Chat from './Chat/Chat'; 

import Logo from "/img/webLogo.png";
import buyerAvatar from "/img/personImg/Buyer.jpg"; 

const AppNavbar = () => {
    const [showChatModal, setShowChatModal] = useState(false);
    const handleClose = () => setShowChatModal(false);
    const handleShow = () => setShowChatModal(true);
    const primaryButtonClasses = "bg-primary fw-bold fs-6 text-white border-0 py-2 rounded-pill w-100"; 
    
    const iconSize = '42px'; 
    
    // ไอคอนแจ้งเตือน
    const iconButtonStyle = { width: iconSize, height: iconSize }; 
    const iconButtonClasses = "bg-primary rounded-circle text-white d-flex align-items-center justify-content-center border-0 p-0";
    
    // รูปโปรไฟล์
    const avatarStyle = { width: iconSize, height: iconSize, objectFit: 'cover' };
    const avatarContainerClasses = "rounded-circle overflow-hidden d-flex align-items-center justify-content-center border-0 p-0";


    return ( 
        <>
            <header 
                className="d-flex justify-content-between align-items-center px-4 py-3" 
                style={{ borderBottom: '1px solid #dee2e6', backgroundColor: '#fff' }} 
            >
                {/* โลโก้  */}
                <div className="d-flex align-items-center">
                    <Link to={'/'} className="text-decoration-none d-flex align-items-center">
                        <img 
                            src={Logo} 
                            alt="LikeBa Logo" 
                            style={{ height: '45px' }} 
                        />
                    </Link>
                </div>

                <div className="d-flex align-items-center flex-grow-1 mx-4 gap-1">
                    
                    <div className="flex-fill">
                        {/* ปุ่มหน้าแรก */}
                        <Button 
                            as={Link} 
                            to={'/'} // หน้า Home (Listing Page)
                            className={primaryButtonClasses}
                        >
                            หน้าแรก
                        </Button>
                    </div>

                    <div className="flex-fill">
                        <Button className={primaryButtonClasses} onClick={handleShow}>แชต</Button>
                    </div>

                    <div className="flex-fill">
                        <Button 
                            as={Link} 
                            to={'/Fav'}
                            className={primaryButtonClasses}
                        >
                            รายการโปรด</Button>
                    </div>
                </div>

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
                // 🚨 ใช้คลาส modal-fullscreen บังคับให้เต็มจอ (แก้ไขจาก full-height-chat-modal)
                dialogClassName="modal-fullscreen" 
            >
                <Chat handleClose={handleClose} />
            </Modal>
        </>
    );
}

export default AppNavbar;