
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from "../../img/Color_logo_with_background.avif";
function NavBar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-md">

        <Link className="navbar-brand fw-bold" to="/">
          <img src={logo} alt="logo" className='d-flex w-50' />
        </Link>

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

            <li className="nav-item dropdown position-static">
              <button className='nav-link dropdown-toggle '  data-bs-toggle="dropdown" 
              >اثاث</button>
              <div className="dropdown-menu w-100 mt-0 p-3">
                <div className="row">

                  <div className="col-md-3">
                    <h6>الاقامة</h6>
                    <Link to= "/asos" className="dropdown-item">جميع</Link>
                    <a className="dropdown-item">أرائك</a>
                    <a className="dropdown-item">أرائك معيارية</a>
                    <a className="dropdown-item">كرسى بذراعين</a>
                    <a className="dropdown-item">كراسي استرخاء / مقبلات</a>
                    <a className="dropdown-item">كرسي / عثماني</a>
                    <a className="dropdown-item">طاولات قهوة</a>
                    <a className="dropdown-item">طاولات جانبية</a>
                    <a className="dropdown-item">خزائن جانبية للوسائط</a>
                    <a className="dropdown-item">الخزائن</a>
                    <a className="dropdown-item">أرفف / خزائن كتب</a>
                  </div>

                  <div className="col-md-3">
                    <h6>يأكل</h6>
                    <a className="dropdown-item">طاولات الطعام / طاولات قابلة للتمديد</a>
                    <a className="dropdown-item">كراسى</a>
                    <a className="dropdown-item">طاولات جانبية / بوفيهات</a>
                    <a className="dropdown-item">بارات / خزائن بارات</a>
                    <a className="dropdown-item">خزائن العرض</a>
                    <a className="dropdown-item">أجهزة الألعاب</a>
                  </div>

                  <div className="col-md-3">
                    <h6>ينام</h6>
                    <a className="dropdown-item">أسرة</a>
                    <a className="dropdown-item">ألواح رأس السرير</a>
                    <a className="dropdown-item">طاولات جانبية للسرير</a>
                    <a className="dropdown-item">خزائن ذات أدراج</a>
                    <a className="dropdown-item">مقاعد / كراسي استرخاء</a>
                    <a className="dropdown-item">طاولة الزينة</a>
                    <a className="dropdown-item">أسرّة الكلاب</a>
                  </div>
                  <div className="col-md-3">
                    <h6>مكتب</h6>
                    <a className="dropdown-item">مكاتب</a>
                    <a className="dropdown-item">كراسى المكتب</a>
                    <a className="dropdown-item">أرفف / خزائن كتب</a>
                  </div>



                </div>
              </div>
            </li>

            <li className="nav-item dropdown position-static">
              <button
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                مرأة
              </button>

              <div className="dropdown-menu m-0 p-4">
                <div className="col ">
                  <div className="row-md-3">
                    <Link to="/mirror" className="dropdown-item">الجميع</Link>
                    <a className="dropdown-item">مستطيل</a>
                    <a className="dropdown-item">حول</a>
                    <a className="dropdown-item">بيضاوى</a>
                    <a className="dropdown-item">معيارى</a>
                    <a className="dropdown-item">غير منتظم</a>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown position-static">
              <a
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown">
                قن الارات ديكو
              </a>

              <div className="dropdown-menu m-0 p-4">
                <div className="col ">
                  <div className="row-md-3">
                    <a className="dropdown-item">Sofas</a>
                    <a className="dropdown-item">Sessel</a>
                    <a className="dropdown-item">Tische</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown position-static">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Möbel
              </a>
              <div className="dropdown-menu m-0 p-4">
                <div className="col ">
                  <div className="row-md-3">
                    <h6>Wohnen</h6>
                    <a className="dropdown-item">Sofas</a>
                    <a className="dropdown-item">Sessel</a>
                    <a className="dropdown-item">Tische</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown position-static">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Möbel
              </a>
              <div className="dropdown-menu m-0 p-4">
                <div className="col ">
                  <div className="row-md-3">
                    <h6>Wohnen</h6>
                    <a className="dropdown-item">Sofas</a>
                    <a className="dropdown-item">Sessel</a>
                    <a className="dropdown-item">Tische</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown position-static">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Möbel
              </a>

              <div className="dropdown-menu m-0 p-4">
                <div className="col ">
                  <div className="row-md-3">
                    <h6>Wohnen</h6>
                    <a className="dropdown-item">Sofas</a>
                    <a className="dropdown-item">Sessel</a>
                    <a className="dropdown-item">Tische</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item position-static">
              <a
                href="#"
                className="nav-link">
                أوكازيون
              </a>
            </li>
          </ul>

          <form action="">
            <div className="d-flex align-items-center">
              <button type="button" className="btn p-0 mx-2">
                <i className="bi bi-search fs-5"></i>
              </button>

              <button type="button" className="btn p-0 mx-2">
                <i className="bi bi-person fs-5"></i>
              </button>

              <button type="button" className="btn p-0 mx-2">
                <i className="bi bi-heart fs-5"></i>
              </button>

              <button type="button" className="btn p-0 mx-2">
                <i className="bi bi-cart fs-5"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

/*<Link to="/asos">اثاث</Link>*/