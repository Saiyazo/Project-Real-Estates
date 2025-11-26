import { Button, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useState } from 'react'
import Chat from './Chat/Chat'
import Fav from '../pages/Fav/Fav'


const AppNav = () => {
    const [showChatModal, setShowChatModal] = useState(false) //เริ่มมาให้ "ปิด" ไว้ก่อน (เหมือนทีวี)
    const handleClose = () => setShowChatModal(false) //สั่งปิด เหมือนกดปุ่มปิดที่รีโมตทีวี
    const handleShow = () => setShowChatModal(true) //สั่งเปิด
    const primaryColorClasses = "bg-primary rounded-5 fw-semibold fs-6 text-white btn-sm py-2 px-3 border-0"; 

    return ( 
        <div className="d-flex justify-content-end align-items-center gap-2 p-2"> 
            
            <Link to={'Noti'}> 
                <Button 
                    className={primaryColorClasses} 
                    variant="primary"
                >
                    <i className="bi bi-bell fs-6"></i>
                </Button>
            </Link>  


            <Button 
                className={primaryColorClasses}
                variant="primary"
                onClick={handleShow} //กดแล้วเปิดตัวแชต
            >
                <span className='m-0'>แชต</span> 
            </Button>


            <Link to={'Home'}>
                <Button 
                    className={primaryColorClasses}
                    variant="primary" 
                >
                    <span className='m-0'>หน้าแรก</span>
                </Button>
            </Link>


            <Link to={'Fav'}>
                <Button 
                    className={primaryColorClasses}
                    variant="primary" 
                >
                    <span className='m-0'>รายการโปรด</span>
                </Button>
            </Link>


            <Modal // เด้งทับหน้าเดิม 
                show={showChatModal} 
                onHide={handleClose} 
                scrollable  //ถ้าแชทมันยาว ให้มี Scrollbar เลื่อนขึ้นลงได้
                className="full-height-chat-modal"
            >
                <Modal.Body className="p-0">
                    <Chat onHide={handleClose} /> 
                </Modal.Body>
                
            </Modal>
        </div>
    )
}
export default AppNav