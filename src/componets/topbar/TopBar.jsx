import React from 'react';
import './topbar.css';

function TopBar() {

  return (
    <div className="intr border-bottom small py-1 mb-3">
      <div className="container d-flex justify-content-between align-items-center">
        <span>
         استشارة شخصية من الاثنين إلى السبت من الساعة 9:00 صباحًا حتى 7:00 مساءً على الرقم 06172-267 6363
          <strong className="ms-1">06172-2676363</strong>
        </span>

        <div className="icon  d-flex align-items-center">
          <a href="https://www.instagram.com/instylior/"><i className="bi bi-instagram mx-2"></i></a>
          <a href="https://www.facebook.com/instylior.de/"><i className="bi bi-facebook mx-2"></i></a>
          <a href="https://de.pinterest.com/instylior/"><i className="bi bi-pinterest mx-2"></i></a>
          <a href="https://www.linkedin.com/in/klaus-baermeier/"><i className="bi bi-linkedin mx-2"></i></a>

          <select className="form-select form-select-sm ms-3">
            <option>DE</option>
            <option>EN</option>
            <option>AR</option>
          </select>
          <select className="form-select form-select-sm ms-3">
           <option>$EUR</option>
            <option>$USD</option>
          </select>
        </div>
      </div>
    </div>
  );
  
}

export default TopBar;