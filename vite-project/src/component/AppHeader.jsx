import React from 'react';
import { Link } from 'react-router-dom'; 
import './AppHeader.css'; 

import buyerAvatar from '../img/Buyer.jpg'; 

const AppHeader = () => {

  return (
    <header className="main-header-container">
      <div className="header-content-right">

        <Link to="/buyer-profile" className="buyer-profile-link">
          <img 
            src={buyerAvatar} 
            alt="Buyer Avatar" 
            className="buyer-avatar" 
          />
          <span className="buyer-email">
            thammachartlongthote@gmail.com
          </span>
        </Link>

        <nav className="header-nav">
          <Link to="/guide" className="nav-link">
            คู่มือการใช้งาน
          </Link>
          <Link to="/contact" className="nav-link">
            ติดต่อเรา
          </Link>

          
          
        </nav>

      </div>
    </header>
  );
};

export default AppHeader;