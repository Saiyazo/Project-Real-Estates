import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Noti.css';

import notificationsData from './notificationsData';
import BackButton from '../../component/BackButton/BackButton';


const NotificationsPage = () => {

  return (
    <div className="container py-4">
      
      <div className="d-flex align-items-center mb-4">
        <BackButton />
      </div>

      {/*รายการแจ้งเตือน Card */}
      <div className="notification-list-container">
        {notificationsData.map((item) => (
          <Card
            key={item.id}
            className="mb-3 notification-card shadow-sm border-0"
          >
            <Card.Body className="d-flex align-items-center p-3">

              {/* 1. ไอคอนวงกลม */}
              <div className="notification-icon me-3 flex-shrink-0">
                <img
                
                  src={item.img}
                  alt={`ไอคอนสำหรับการแจ้งเตือน: ${item.message.substring(0, 20)}...`}
                  className="sender-image" 
                />
              </div>

              {/*  เนื้อหาข้อความ */}
              <div className="notification-content flex-grow-1">
                <p className="fw-bold mb-0">{item.sender}</p>
                <p className="mb-0 text-muted small">{item.message}</p>
              </div>


            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;