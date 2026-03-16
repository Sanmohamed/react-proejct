import React from "react";
import "./topbar.css";

function TopBar() {
  return (
    <div className="topbar border-bottom py-1">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <span className="topbar-text d-none d-md-inline">
          استشارة شخصية من الاثنين إلى السبت من الساعة 9:00 صباحًا حتى 7:00 مساءً على الرقم
          <strong className="ms-1">06172-2676363</strong>
        </span>
        <div className="d-flex align-items-center gap-2">
          <div className="social-icons d-flex align-items-center">
            <a href="https://www.instagram.com/instylior/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.facebook.com/instylior.de/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://de.pinterest.com/instylior/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-pinterest"></i>
            </a>
            <a href="https://www.linkedin.com/in/klaus-baermeier/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <select className="form-select form-select-sm">
            <option>DE</option>
            <option>EN</option>
            <option>AR</option>
          </select>

          <select className="form-select form-select-sm">
            <option>€ EUR</option>
            <option>$ USD</option>
          </select>

        </div>
      </div>
    </div>
  );
}

export default TopBar;