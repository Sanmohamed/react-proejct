import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from "../../img/logofors2.png";
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

function NavBar() {
  const { user, logout, totalItems } = useContext(CartContext);
  const { favoriteCount } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top custom-navbar" dir="rtl">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="logo" className="logo-img" />
          <span className="site-title">Instylior Design Home</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#megaNav"
          aria-controls="megaNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="megaNav">

          {/* Main Nav */}
          <ul className="navbar-nav mx-auto align-items-lg-center">

            {/* Furniture Mega Menu */}
            <li className="nav-item dropdown position-static">
              <button
                className="nav-link dropdown-toggle nav-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                أثاث
              </button>

              <div className="dropdown-menu mega-menu border-0 shadow-lg p-4">
                <div className="row g-4">

                  <div className="col-12 col-md-6 col-lg-3">
                    <h6 className="mega-title">الإقامة</h6>
                    <Link to="/asos" className="dropdown-item">جميع</Link>
                    <Link to="/asos/sofas" className="dropdown-item">أرائك</Link>
                    <Link to="/asos/standard-sofas" className="dropdown-item">أرائك معيارية</Link>
                    <Link to="/asos/armchairs" className="dropdown-item">كرسي بذراعين</Link>
                    <Link to="/asos/recliners" className="dropdown-item">كراسي استرخاء</Link>
                    <Link to="/asos/armchair" className="dropdown-item">كرسي / عثماني</Link>
                    <Link to="/asos/coffee-tables" className="dropdown-item">طاولات قهوة</Link>
                    <Link to="/asos/side-tables" className="dropdown-item">طاولات جانبية</Link>
                    <Link to="/asos/media-cabinets" className="dropdown-item">خزائن الوسائط</Link>
                    <Link to="/asos/cabinets" className="dropdown-item">الخزائن</Link>
                    <Link to="/asos/shelves" className="dropdown-item">أرفف / خزائن كتب</Link>
                  </div>

                  <div className="col-12 col-md-6 col-lg-3">
                    <h6 className="mega-title">الطعام</h6>
                    <Link to="/asos/dining-tables" className="dropdown-item">طاولات الطعام</Link>
                    <Link to="/asos/dining-chairs" className="dropdown-item">كراسي</Link>
                    <Link to="/asos/side-tables" className="dropdown-item">طاولات جانبية</Link>
                    <Link to="/asos/bar-cabinets" className="dropdown-item">خزائن بارات</Link>
                    <Link to="/asos/display-cabinets" className="dropdown-item">خزائن العرض</Link>
                    <Link to="/asos/gaming-sets" className="dropdown-item">أجهزة الألعاب</Link>
                  </div>

                  <div className="col-12 col-md-6 col-lg-3">
                    <h6 className="mega-title">النوم</h6>
                    <Link to="/asos/beds" className="dropdown-item">أسرة</Link>
                    <Link to="/asos/bed-headboards" className="dropdown-item">ألواح رأس السرير</Link>
                    <Link to="/asos/bedside-tables" className="dropdown-item">طاولات جانبية للسرير</Link>
                    <Link to="/asos/drawer-cabinets" className="dropdown-item">خزائن ذات أدراج</Link>
                    <Link to="/asos/bedroom-seating" className="dropdown-item">مقاعد استرخاء</Link>
                    <Link to="/asos/decoration-tables" className="dropdown-item">طاولة الزينة</Link>
                    <Link to="/asos/dog-beds" className="dropdown-item">أسرّة الكلاب</Link>
                  </div>

                  <div className="col-12 col-md-6 col-lg-3">
                    <h6 className="mega-title">المكتب</h6>
                    <Link to="/asos/offices" className="dropdown-item">مكاتب</Link>
                    <Link to="/asos/office-chairs" className="dropdown-item">كراسي المكتب</Link>
                    <Link to="/asos/bookcases" className="dropdown-item">أرفف / خزائن كتب</Link>
                  </div>

                </div>
              </div>
            </li>

            {/* Mirror */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-btn" data-bs-toggle="dropdown">
                مرايا
              </button>
              <div className="dropdown-menu shadow-sm border-0 normal-menu">
                <Link to="/mirror" className="dropdown-item">الجميع</Link>
                <Link to="/mirror/rectangular" className="dropdown-item">مستطيل</Link>
                <Link to="/mirror/circular" className="dropdown-item">دائري</Link>
                <Link to="/mirror/oval" className="dropdown-item">بيضاوي</Link>
                <Link to="/mirror/standard" className="dropdown-item">معياري</Link>
                <Link to="/mirror/irregular" className="dropdown-item">غير منتظم</Link>
              </div>
            </li>

            {/* Decor */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-btn" data-bs-toggle="dropdown">
                ديكور
              </button>
              <div className="dropdown-menu shadow-sm border-0 normal-menu">
                <Link to="/decor" className="dropdown-item">الجميع</Link>
                <Link to="/decor/flower-pots" className="dropdown-item">أحواض الزهور</Link>
                <Link to="/decor/skulpturen" className="dropdown-item">منحوتات</Link>
                <Link to="/decor/photos" className="dropdown-item">صور</Link>
                <Link to="/decor/vases" className="dropdown-item">مزهريات</Link>
                <Link to="/decor/artworks" className="dropdown-item">أعمال فنية</Link>
                <Link to="/decor/platforms" className="dropdown-item">منصات</Link>
              </div>
            </li>

            {/* Carpets */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-btn" data-bs-toggle="dropdown">
                السجاد
              </button>
              <div className="dropdown-menu shadow-sm border-0 normal-menu">
                <Link to="/carpets" className="dropdown-item">الجميع</Link>
                <Link to="/carpets/rectangular" className="dropdown-item">مستطيل</Link>
                <Link to="/carpets/circular" className="dropdown-item">دائري</Link>
                <Link to="/carpets/square" className="dropdown-item">مربع</Link>
              </div>
            </li>

            {/* Lighting */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-btn" data-bs-toggle="dropdown">
                الإضاءة
              </button>
              <div className="dropdown-menu shadow-sm border-0 normal-menu">
                <Link to="/lighting" className="dropdown-item">الجميع</Link>
                <Link to="/lighting/table-lamps" className="dropdown-item">مصابيح الطاولة</Link>
                <Link to="/lighting/wall-lamps" className="dropdown-item">مصابيح جدارية</Link>
                <Link to="/lighting/floor-lamps" className="dropdown-item">مصابيح أرضية</Link>
                <Link to="/lighting/ceiling-lights" className="dropdown-item">إضاءة السقف</Link>
              </div>
            </li>

            {/* Brands */}
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle nav-btn" data-bs-toggle="dropdown">
                العلامات التجارية
              </button>
              <div className="dropdown-menu shadow-sm border-0 normal-menu">
                <Link to="/brands" className="dropdown-item">الجميع</Link>
                <Link to="/brands/semi-circle" className="dropdown-item">دار نصف دورة</Link>
                <Link to="/brands/christopher-gay" className="dropdown-item">كريستوفر جاي</Link>
                <Link to="/brands/adriana-huey" className="dropdown-item">أدريانا هويوس</Link>
                <Link to="/brands/deco-bubble" className="dropdown-item">ديكو بابل</Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/offers" className="nav-link offer-link">أوكازيون</Link>
            </li>
          </ul>

          {/* Right actions */}
          <div className="nav-actions d-flex align-items-center gap-3">

            {user ? (
              <div className="dropdown">
                <button className="btn user-btn dropdown-toggle" data-bs-toggle="dropdown">
                  <i className="bi bi-person"></i>
                  <span className="ms-1">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                  <li>
                    <Link className="dropdown-item" to="/myorders">طلباتي</Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="icon-btn">
                <i className="bi bi-person"></i>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin" className="icon-btn">
                <i className="bi bi-speedometer2"></i>
              </Link>
            )}

            <Link to="/favorites" className="icon-btn position-relative">
              <i className="bi bi-heart"></i>
              {favoriteCount > 0 && <span className="count-badge">{favoriteCount}</span>}
            </Link>

            <Link to="/cart" className="icon-btn position-relative">
              <i className="bi bi-cart"></i>
              {totalItems > 0 && <span className="count-badge">{totalItems}</span>}
            </Link>

            {user && totalItems > 0 && (
              <Link to="/checkout" className="checkout-btn">
                الدفع
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;