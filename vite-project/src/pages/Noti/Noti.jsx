import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Noti.css';
import notificationsData from './notificationsData';
import BackButton from '../../component/BackButton/BackButton';

const NotificationsPage = () => {

  return (
    <div className="container py-4">
      {/* === ส่วนหัว: ปุ่ม BACK และหัวข้อ  */}
      <div className="d-flex align-items-center mb-4">
        <BackButton />
        <h2 className="mb-0 mx-auto fw-normal text-center">การแจ้งเตือน</h2>

      </div>

      {/* === รายการแจ้งเตือน (ใช้โครงสร้าง Card) === */}
      <div className="notification-list-container">
        {notificationsData.map((item) => (
          <Card key={item.id} className="mb-3 notification-card shadow-sm border-0">
            <Card.Body className="d-flex align-items-center p-3">

              {/* 1. ไอคอนวงกลม  */}
              <div className="notification-icon me-3 flex-shrink-0">
                <img
                  src=" "
                  alt="รอรูปก่องนะอ้วง"
                  className="sender-image"
                />
              </div>

              {/* 2. เนื้อหาข้อความ  */}
              <div className="notification-content flex-grow-1">
                <p className="fw-bold mb-0">{item.sender}</p>
                <p className="mb-0 text-muted small">{item.message}</p>
              </div>

              {/* 3. เวลา ) */}
              <div className="notification-timestamp ms-3 text-muted small flex-shrink-0">
                {item.time}
              </div>

            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;