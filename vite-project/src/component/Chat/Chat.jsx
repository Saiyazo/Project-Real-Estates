// Chat.jsx

import './Chat.css';
import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, InputGroup, Form, Alert } from 'react-bootstrap';
import { numChat } from './ChatData.jsx';
import ReportModal from '../ReportButton/ReportModal.jsx';

const getCurrentTime = () => {
    return new Date().toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const ChatWindow = ({ chat, messages, onSendMessage, onOpenReportModal }) => {
    const fileInputRef = useRef(null);
    const bottomRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setSelectedFiles(prev => [...prev, { file: file, url: previewUrl }]);
            event.target.value = null;
        }
    };

    const removeImage = (indexToRemove) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSend = () => {
        if (!messageText.trim() && selectedFiles.length === 0) return;
        onSendMessage(messageText, selectedFiles);
        setMessageText("");
        setSelectedFiles([]);
    };

    if (!chat) {
        return (
            <div className="flex-grow-1 p-3 bg-white d-flex justify-content-center align-items-center text-muted">
                <p>ไม่มีการสนทนาที่เลือก</p>
            </div>
        );
    }

    return (
        <div className="chat-window-container">
            <div className="chat-window-header p-3 border-bottom d-flex justify-content-between align-items-center">
                <h4 className="mb-0 fw-normal">{chat.name}</h4>

                <button
                    className="btn btn-sm btn-outline-danger me-5 rounded-pill d-flex align-items-center"
                    onClick={onOpenReportModal}
                    aria-label="ร้องเรียน"
                >
                    <i className="bi bi-flag-fill me-1"></i>
                    ร้องเรียน
                </button>
            </div>

            <div className="chat-window-body">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                        {msg.sender !== 'me' && (
                            <img
                                src={chat.avatar}
                                alt={chat.name}
                                className="rounded-circle me-2 chat-message-avatar"
                            />
                        )}

                        <div className={`d-flex flex-column ${msg.sender === 'me' ? 'align-items-end' : 'align-items-start'}`} style={{ maxWidth: '70%' }}>

                            {msg.text.trim() && (
                                <div className={`chat-bubble shadow-sm ${msg.sender === 'me' ? 'me-bubble' : ''}`}>
                                    {msg.text}
                                </div>
                            )}

                            {msg.images && msg.images.length > 0 && (
                                <div
                                    className={`chat-bubble-images-container mt-2 ${!msg.text.trim() ? '' : 'mb-1'}`}
                                    style={{ maxWidth: '100%' }}
                                >
                                    {msg.images.map((img, i) => (
                                        <img key={i} src={img.url} alt="sent" />
                                    ))}
                                </div>
                            )}

                            <div className="d-flex align-items-center mt-1">
                                {msg.sender === 'me' && msg.showRead && (
                                    <span className="text-primary me-2" style={{ fontSize: '0.75rem' }}>✔✔ อ่านแล้ว</span>
                                )}
                                <span className="text-muted" style={{ fontSize: '0.75rem' }}>{msg.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="chat-window-footer border-top">
                {selectedFiles.length > 0 && (
                    <div className="image-preview-container px-3 pt-2 d-flex gap-2 overflow-auto">
                        {selectedFiles.map((imgObj, index) => (
                            <div key={index} className="position-relative">
                                <img
                                    src={imgObj.url}
                                    alt="preview"
                                    className="rounded border"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />

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

                <div className="d-flex align-items-center justify-content-between p-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    <i className="bi bi-image mx-2 fs-4 text-muted chat-footer-icon" onClick={handleImageClick}></i>
                    <i className="bi bi-geo-alt mx-2 fs-4 text-muted"></i>
                    <i className="bi bi-mic mx-2 fs-4 text-muted"></i>

                    <div className="flex-grow-1 mx-3">
                        <Form.Control
                            type="text"
                            placeholder="พิมพ์ข้อความ..."
                            className="chat-input-control"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                    </div>

                    <i className="bi bi-send-fill fs-4" style={{ color: '#007bff', cursor: 'pointer' }} onClick={handleSend}></i>
                </div>
            </div>
        </div>
    );
};

const Chat = ({ onHide }) => {
    const initialChatId = numChat.length > 0 ? numChat[0].id : null;
    const [activeChatId, setActiveChatId] = useState(initialChatId);
    const [chatHistory, setChatHistory] = useState({});

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // *** แก้ไข: ลบบรรทัดที่ประกาศ activeChatId ซ้ำซ้อนออกไป ***
    // const [activeChatId, setActiveChatId] = useState(numChat[0].id); 

    const activeChat = numChat.find(chat => chat.id === activeChatId);
    //ใช้ .find() → เพราะอยากได้ chat object ตัวเดียวที่ตรงกับ activeChatId

    //กดคลิกเลือกแชตแล้วมันจะเปลี่ยนid ของแชตที่เราเลือก เพื่อไปactiveแล้วแสดงข้อมูล
    const handleChatClick = (id) => {
        setActiveChatId(id);
    };

    const handleSendMessage = (text, images) => {
        const chatToSendTo = numChat.find(chat => chat.id === activeChatId);

        if (!chatToSendTo) {
            console.error("No active chat selected, cannot send message.");
            return;
        }

        if (!text.trim() && images.length === 0) return;

        const currentChatMessages = chatHistory[activeChatId] || [];
        const isFirstMessage = currentChatMessages.length === 0;

        const userMsg = {
            id: Date.now(),
            sender: 'me',
            text: text,
            images: images,
            time: getCurrentTime(),
            showRead: isFirstMessage
        };

        let updatedMessages = [...currentChatMessages, userMsg];

        if (isFirstMessage) {
            const agentMsg = {
                id: Date.now() + 1,
                sender: 'other',
                text: chatToSendTo.initialMessage,
                time: getCurrentTime(),
                showRead: false
            };
            updatedMessages.push(agentMsg);
        }

        setChatHistory(prev => ({
            ...prev,
            [activeChatId]: updatedMessages
        }));
    };

    const getLastMessage = (chatId) => {
        const messages = chatHistory[chatId];

        if (!messages || messages.length === 0) {
            return "";
        }

        const lastMsg = messages[messages.length - 1];

        if (!lastMsg.text && lastMsg.images && lastMsg.images.length > 0) {
            return "ส่งรูปภาพ...";
        }

        return lastMsg.text;
    };

    const handleReportSuccess = () => {
        setIsReportModalOpen(false);
        setShowSuccessToast(true);

        setTimeout(() => {
            setShowSuccessToast(false);
        }, 3000);
    };

    return (
        <div className="chat-container">
            {showSuccessToast && (
                <Alert variant="success" className="success-toast-alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    ส่งรายงานเรียบร้อยแล้ว
                </Alert>
            )}

            <button
                type="button"
                className="btn-close chat-close-btn"
                aria-label="Close"
                onClick={onHide}
            ></button>

            <div className="chat-main-content">
                <div className="chat-list-sidebar p-3 border-end d-flex flex-column h-100">

                    <div className="d-flex align-items-center mb-3">
                        <Dropdown className="me-auto">
                            <Dropdown.Toggle variant="light" className="fw-semibold px-3 py-2 chat-dropdown-toggle">
                                แชตทั้งหมด ({numChat.length})
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">ทั้งหมด</Dropdown.Item>
                                <Dropdown.Item href="#">ยังไม่อ่าน</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button className="btn btn-light rounded-circle p-2 chat-settings-btn" aria-label="Settings">
                            <i className="bi bi-gear"></i>
                        </button>
                    </div>

                    <div className="mb-3 chat-search-input-group">
                        <InputGroup>
                            <InputGroup.Text className="bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control type="search" placeholder="ค้นหาแชท..." aria-label="Search" className="border-start-0" />
                        </InputGroup>
                    </div>

                    <div className="chat-list-container list-group list-group-flush">
                        {numChat.map(chat => {
                            const isActive = chat.id === activeChatId;
                            const lastMsgText = getLastMessage(chat.id);

                            return (
                                <a
                                    key={chat.id}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleChatClick(chat.id); }}
                                    className={`chat-list-item list-group-item-action d-flex border-0 ${isActive ? 'active' : ''}`}
                                >
                                    <div className="me-3">
                                        <img src={chat.avatar} alt={chat.name} className="rounded-circle chat-list-avatar" />
                                    </div>
                                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                        <div className="fw-semibold chat-list-name">{chat.name}</div>

                                        <small className="text-muted chat-list-message" style={{ wordBreak: 'break-all' }}>
                                            {lastMsgText}
                                        </small>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-grow-1 h-100">
                    <ChatWindow
                        key={activeChat ? activeChat.id : 'no-chat'}
                        chat={activeChat}
                        messages={activeChat ? chatHistory[activeChat.id] || [] : []}
                        onSendMessage={handleSendMessage}
                        onOpenReportModal={() => setIsReportModalOpen(true)}
                    />
                </div>
            </div>

            <ReportModal
                isModalOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                onSuccess={handleReportSuccess}
                reportedTarget={activeChat}
            />
        </div>
    );
};

export default Chat;