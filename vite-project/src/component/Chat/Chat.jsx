import './Chat.css'
import { useState, useRef } from 'react';
import { Dropdown, InputGroup, Form } from 'react-bootstrap';
import Agent from '../../img/นายหน้า.png';
import Seller from '../../img/ผู้ขาย.jpg';

const numChat = [
    {
        id: 1,
        name: 'Ms.Srisamorn Sornsamer',
        lastMessage: 'สวัสดีค่ะ ติดต่อสอบถาม โทร 0981234567 หรือพิมพ์ข้อความติดต่อได้เลยค่ะ ',
        avatar: Agent
    },
    {
        id: 2,
        name: 'Mr.Somsak Rakdeaw',
        lastMessage: 'สวัสดีครับ ติดต่อสอบถาม โทร 0812345678 หรือพิมพ์ข้อความติดต่อได้เลยครับ ',
        avatar: Seller
    },
];

const ChatWindow = ({ chat }) => {
    const fileInputRef = useRef(null);

    // เก็บเป็น array เพื่อเก็บหลายไฟล์
    const [selectedFiles, setSelectedFiles] = useState([]);

    // เพิ่ม state  ให้พิมพ์ได้แม้มีรูป
    const [messageText, setMessageText] = useState("");

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            // แปลงให้เป็น URL เพื่อจะแสดงรูป Preview เพราะถ้าใส่ fileดิบ ตรงๆ มันจะไม่แสดง (มันไม่รองรับ)
            const previewUrl = URL.createObjectURL(file);

            // เอาไฟล์ใหม่ไปต่อท้าย list เดิม ไม่ต้องเอาอันเก่าออก
            setSelectedFiles(prev => [...prev, { file: file, url: previewUrl }]);

            // ล้าง value เพื่อให้เลือกไฟล์รูปเดิมซ้ำได้ถ้าต้องการ (เผื่อเผลอลบ)
            event.target.value = null;
        }
    };

    // ลบรูปออกจาก list
    const removeImage = (indexToRemove) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    //เช็คก่อนว่ามีคนคุยไหม
    if (!chat) {
        return (
            <div className="flex-grow-1 p-3 bg-white d-flex justify-content-center align-items-center text-muted">
                <p>ไม่มีการสนทนาที่เลือก</p>
            </div>
        );
    }

    return (
        <div className="chat-window-container">
            <div className="chat-window-header p-3 border-bottom">
                <h4 className="mb-0 fw-normal">{chat.name}</h4>
            </div>

            <div className="chat-window-body">
                <div className="d-flex mb-3 justify-content-start">
                    <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="rounded-circle me-2 chat-message-avatar"
                    />
                    <div className="chat-bubble shadow-sm"> {/*เอาข้อความที่คุยล่าสุด มาเขียนใส่ในChat Bubble */}
                        {chat.lastMessage}
                    </div>
                </div>
            </div>

            <div className="chat-window-footer border-top">

                {/* ส่วนกล่องที่จะใช้แสดงรูปภาพ Preview (แสดงขึึั้นมาเฉพาะตอนมีรูป ถ้าไม่มีก็ไม่โชว์) */}
                {selectedFiles.length > 0 && (

                    //เอาชั้นวางยาวๆ มาตั้งเตรียมไว้ และใช้d-flex: สั่งให้ของที่วางบนชั้นนี้เรียงต่อกันเป็นแนวนอน
                    <div className="image-preview-container px-3 pt-2 d-flex gap-2 overflow-auto">

                        {/* หยิบออกมาทีละชิ้น (imgObj) แล้วทำตามคำสั่งนี้:สร้างกรอบdiv ,หยิบกรอบพลาสติกมา 1 อัน ครอบแล้วติดเบอร์ให้มันด้วย (key={index}) ทำจนครบทุกอัน */}
                        {selectedFiles.map((imgObj, index) => (
                            <div key={index} className="position-relative">
                                <img
                                    src={imgObj.url}
                                    alt="preview"
                                    className="rounded border"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />

                                {/* ปุ่มกากบาทสำหรับลบรูป  และระบุindexให้มันรู้ว่าต้องลบindexไหน*/}
                                <button
                                    onClick={() => removeImage(index)}
                                    className="btn-remove-img"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/*   onChange={handleFileChange}  คือ เวลามีไฟล์เข้ามาใหม่ปุ๊บให้รีบไปปลุกฟังก์ชัน handleFileChange มาทำงาน
            พอhandleFileChange: ตื่นขึ้นมา -> รับไฟล์ -> เสกเป็นรูป Preview (createObjectURL) -> แปะลงหน้าจอ*/}
                <div className="d-flex align-items-center justify-content-between p-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }} //อย่าแสดงปุ่ม<input> นี้
                    />

                    {/*ปุ่มรูป ทำให้ปุ่มรูปมันกดแล้วอัปรูปได้*/}
                    <i
                        className="bi bi-image mx-2 fs-4 text-muted chat-footer-icon"
                        onClick={handleImageClick}
                    ></i>

                    <i className="bi bi-geo-alt mx-2 fs-4 text-muted"></i>
                    <i className="bi bi-mic mx-2 fs-4 text-muted"></i>

                    <div className="flex-grow-1 mx-3">
                        <Form.Control
                            type="text"
                            placeholder="พิมพ์ข้อความ..."
                            className="chat-input-control"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                    </div>

                    <i className="bi bi-send-fill fs-4" style={{ color: '#007bff' }}></i>
                </div>
            </div>
        </div>
    );
};

//รับ onHide มาจากAppNavbar.jsx ที่เซตไว้ใน Modal
const Chat = ({ onHide }) => {
    
    const [activeChatId, setActiveChatId] = useState(numChat[0].id);
    const activeChat = numChat.find(chat => chat.id === activeChatId);
    //ใช้ .find() → เพราะอยากได้ chat object ตัวเดียวที่ตรงกับ activeChatId

//กดคลิกเลือกแชตแล้วมันจะเปลี่ยนid ของแชตที่เราเลือก เพื่อไปactiveแล้วแสดงข้อมูล
    const handleChatClick = (id) => {
        setActiveChatId(id);
    };

    return (
        <div className="chat-container">

            <button
                type="button"
                className="btn-close chat-close-btn"
                aria-label="Close"
                onClick={onHide}
            ></button>

            <div className="chat-main-content">

                {/* ส่วนซ้าย รายการแชท */}
                <div className="chat-list-sidebar p-3 border-end d-flex flex-column h-100">

                    {/* แถบควบคุมด้านบน Dropdown/Icon... */}
                    <div className="d-flex align-items-center mb-3">
                        <Dropdown className="me-auto">
                            <Dropdown.Toggle
                                variant="light"
                                className="fw-semibold px-3 py-2 chat-dropdown-toggle"
                            >
                                แชตทั้งหมด ({numChat.length})
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">ทั้งหมด</Dropdown.Item>
                                <Dropdown.Item href="#">ยังไม่อ่าน</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <button
                            className="btn btn-light rounded-circle p-2 chat-settings-btn"
                            aria-label="Settings"
                        >
                            <i className="bi bi-gear"></i>
                        </button>
                    </div>

                    {/* แถบค้นหา*/}
                    <div className="mb-3 chat-search-input-group">
                        <InputGroup>
                            <InputGroup.Text
                                className="bg-white border-end-0"
                            >
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="search"
                                placeholder="ค้นหาแชท..."
                                aria-label="Search"
                                className="border-start-0"
                            />
                        </InputGroup>
                    </div>

                    {/* รายการแชท  */}
                    <div className="chat-list-container list-group list-group-flush">
                        {numChat.map(chat => {
                            const isActive = chat.id === activeChatId;
                            return (
                                <a
                                    key={chat.id}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleChatClick(chat.id); }}
                                    className={`chat-list-item list-group-item-action d-flex border-0 ${isActive ? 'active' : ''}`}
                                >
                                    <div className="me-3">
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="rounded-circle chat-list-avatar"
                                        />
                                    </div>
                                    <div className="flex-grow-1" style={{ minWidth: 0 }}>

                                        {/* ชื่อผู้ติดต่อ */}
                                        <div
                                            className="fw-semibold chat-list-name"
                                        >
                                            {chat.name}
                                        </div>

                                        <small
                                            className="text-muted chat-list-message"
                                            style={{ wordBreak: 'break-all' }} //ถ้าเจอคำยาวๆ ให้ตัดขึ้นบรรทัดใหม่ทันที
                                        >
                                            {chat.lastMessage}  {/* ดึงเอาข้อความล่าสุดจริงๆ มาแสดง */}
                                        </small>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* ส่วนขวา หน้าต่างแชตจริง */}
                <div className="flex-grow-1 h-100">
                    <ChatWindow key={activeChat.id} chat={activeChat} />
                </div>
            </div>
        </div>
    );
};

export default Chat;