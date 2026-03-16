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
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container-md">
        <div className='d-flex align-items-center flex-nowrap gap-2'>
          <Link className="navbar-brand fw-bold" to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
          <h2 className="text-dark mb-0 fw-semibold site-title">Instylior Design Home</h2>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#megaNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="megaNav">
          <ul className="navbar-nav mx-auto">

            {/* اثاث */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                اثاث
              </button>
              <div className="dropdown-menu w-100 mt-0 p-3">
                <div className="row">
                  <div className="col-md-3">
                    <h6>الاقامة</h6>
                    <Link to="/asos" className="dropdown-item">جميع</Link>
                    <Link to="/asos/sofas" className="dropdown-item">أرائك</Link>
                    <Link to="/asos/standard-sofas" className="dropdown-item">أرائك معيارية</Link>
                    <Link to="/asos/armchairs" className="dropdown-item">كرسى بذراعين</Link>
                    <Link to="/asos/recliners" className="dropdown-item">كراسي استرخاء</Link>
                    <Link to="/asos/armchair" className="dropdown-item">كرسي / عثماني</Link>
                    <Link to="/asos/coffee-tables" className="dropdown-item">طاولات قهوة</Link>
                    <Link to="/asos/side-tables" className="dropdown-item">طاولات جانبية</Link>
                    <Link to="/asos/media-cabinets" className="dropdown-item">خزائن الوسائط</Link>
                    <Link to="/asos/cabinets" className="dropdown-item">الخزائن</Link>
                    <Link to="/asos/shelves" className="dropdown-item">أرفف / خزائن كتب</Link>
                  </div>
                  <div className="col-md-3">
                    <h6>يأكل</h6>
                    <Link to="/asos/dining-tables" className="dropdown-item">طاولات الطعام</Link>
                    <Link to="/asos/dining-chairs" className="dropdown-item">كراسى</Link>
                    <Link to="/asos/side-tables" className="dropdown-item">طاولات جانبية</Link>
                    <Link to="/asos/bar-cabinets" className="dropdown-item">خزائن بارات</Link>
                    <Link to="/asos/display-cabinets" className="dropdown-item">خزائن العرض</Link>
                    <Link to="/asos/gaming-sets" className="dropdown-item">أجهزة الألعاب</Link>
                  </div>
                  <div className="col-md-3">
                    <h6>ينام</h6>
                    <Link to="/asos/beds" className="dropdown-item">أسرة</Link>
                    <Link to="/asos/bed-headboards" className="dropdown-item">ألواح رأس السرير</Link>
                    <Link to="/asos/bedside-tables" className="dropdown-item">طاولات جانبية للسرير</Link>
                    <Link to="/asos/drawer-cabinets" className="dropdown-item">خزائن ذات أدراج</Link>
                    <Link to="/asos/bedroom-seating" className="dropdown-item">مقاعد استرخاء</Link>
                    <Link to="/asos/decoration-tables" className="dropdown-item">طاولة الزينة</Link>
                    <Link to="/asos/dog-beds" className="dropdown-item">أسرّة الكلاب</Link>
                  </div>
                  <div className="col-md-3">
                    <h6>مكتب</h6>
                    <Link to="/asos/offices" className="dropdown-item">مكاتب</Link>
                    <Link to="/asos/office-chairs" className="dropdown-item">كراسى المكتب</Link>
                    <Link to="/asos/bookcases" className="dropdown-item">أرفف / خزائن كتب</Link>
                  </div>
                </div>
              </div>
            </li>

            {/* مرأة */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">مرأة</button>
              <div className="dropdown-menu m-0 p-4">
                <Link to="/mirror" className="dropdown-item">الجميع</Link>
                <Link to="/mirror/rectangular" className="dropdown-item">مستطيل</Link>
                <Link to="/mirror/circular" className="dropdown-item">حول</Link>
                <Link to="/mirror/oval" className="dropdown-item">بيضاوى</Link>
                <Link to="/mirror/standard" className="dropdown-item">معيارى</Link>
                <Link to="/mirror/irregular" className="dropdown-item">غير منتظم</Link>
              </div>
            </li>

            {/* ديكور */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">ديكور</button>
              <div className="dropdown-menu m-0 p-4">
                <Link to="/decor" className="dropdown-item">الجميع</Link>
                <Link to="/decor/flower-pots" className="dropdown-item">الفسيفساء</Link>
                <Link to="/decor/skulpturen" className="dropdown-item">المنحوتات</Link>
                <Link to="/decor/photos" className="dropdown-item">صور</Link>
                <Link to="/decor/vases" className="dropdown-item">مزهريات</Link>
                <Link to="/decor/artworks" className="dropdown-item">عمل فنى</Link>
                <Link to="/decor/platforms" className="dropdown-item">المنصات</Link>
              </div>
            </li>

            {/* السجاد */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">السجاد</button>
              <div className="dropdown-menu m-0 p-4">
                <Link to="/carpets" className="dropdown-item">الجميع</Link>
                <Link to="/carpets/rectangular" className="dropdown-item">مستطيل</Link>
                <Link to="/carpets/circular" className="dropdown-item">حول</Link>
                <Link to="/carpets/square" className="dropdown-item">مربع</Link>
              </div>
            </li>

            {/* أضاءة */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">أضاءة</button>
              <div className="dropdown-menu m-0 p-4">
                <Link to="/lighting" className="dropdown-item">الجميع</Link>
                <Link to="/lighting/table-lamps" className="dropdown-item">مصابيح الطاولة</Link>
                <Link to="/lighting/wall-lamps" className="dropdown-item">مصابيح جدارية</Link>
                <Link to="/lighting/floor-lamps" className="dropdown-item">مصابيح أرضية</Link>
                <Link to="/lighting/ceiling-lights" className="dropdown-item">اضواء السقف</Link>
              </div>
            </li>

            {/* العلامات التجارية */}
            <li className="nav-item dropdown position-static">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">العلامات التجارية</button>
              <div className="dropdown-menu m-0 p-4">
                <Link to="/brands" className="dropdown-item">الجميع</Link>
                <Link to="/brands/semi-circle" className="dropdown-item">دار نصف دورة</Link>
                <Link to="/brands/christopher-gay" className="dropdown-item">كريستوفر جاي</Link>
                <Link to="/brands/adriana-huey" className="dropdown-item">أدريانا هويوس</Link>
                <Link to="/brands/deco-bubble" className="dropdown-item">قبة ديكو</Link>
              </div>
            </li>

            <li className="nav-item position-static">
              <Link to="/offers" className="nav-link">أوكازيون</Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn p-0 dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person fs-5"></i>
                  <span className="ms-1">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
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
              <Link to="/login" className="btn p-0">
                <i className="bi bi-person fs-5"></i>
              </Link>
            )}

            {/* Admin link */}
            {user?.role === "admin" && (
              <Link to="/admin" className="btn p-0">
                <i className="bi bi-speedometer2 fs-5"></i>
              </Link>
            )}

            {/* Favorites */}
            <Link to="/favorites" className="btn p-0 position-relative">
              <i className="bi bi-heart fs-5"></i>
              {favoriteCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn p-0 position-relative">
              <i className="bi bi-cart fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Checkout shortcut */}
            {user && totalItems > 0 && (
              <Link to="/checkout" className="btn btn-dark btn-sm">
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