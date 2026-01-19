import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-dark border-top mt-4'>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
          <div className='col mb-3'>
            <h5 className='text-white '>تواصل معنا</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a
                  href="tel:+4961722676363"
                  className="text-white text-decoration-none"
                >
                  <i className="bi bi-telephone me-2"></i>
                  49 6172 267 6363
                </a>
              </li>

              <li className="nav-item mb-2">
                <Link
                  to="/Contact"
                  className="text-white text-decoration-none"
                >
                  <i className="bi bi-envelope me-2"></i>
                  اتصال
                </Link>
              </li>
            </ul>
            <h5 className='text-white'>تابعنا</h5>
            <div className='icon d-flex align-items-center'>
              <a href="https://www.instagram.com/instylior/" ><i className="bi bi-instagram mx-2 text-white"></i></a>
              <a href="https://www.facebook.com/instylior.de/"><i className="bi bi-facebook mx-2 text-white"></i></a>
              <a href="https://de.pinterest.com/instylior/"><i className="bi bi-pinterest mx-2 text-white"></i></a>
              <a href="https://www.linkedin.com/in/klaus-baermeier/"><i className="bi bi-linkedin mx-2 text-white"></i></a>

            </div>
          </div>
          <div className='col mb-3'>
            <h5 className='text-white'>خدمة العملاء</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  نصيحة
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  صالة العرض
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  خدمة التصميم الداخلي
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  عميل تجاي
                </Link>
              </li>
            </ul>
          </div>
          <div className='col mb-3'>
            <h5 className='text-white'>معلومة</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  معلومات عنا
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  معلومات الشحن
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  الإرجاع/الشكوى
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  شروط الدفع
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
          <div className='col mb-3'>
            <h5 className='text-white'>قانوني</h5>
            <ul className='nav flex-column'>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  حق الانسحاب ونموذج الانسحاب
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  إعدادات ملفات تعريف الارتباط
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  حماية البيانات
                </Link>
              </li>
              <li className='nav-item mb-1'>
                <Link to="/" className='text-white nav-link'>
                  بصمة
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
