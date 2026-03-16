import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(CartContext);
  const { syncFavoritesAfterLogin } = useContext(FavoritesContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "خطأ في تسجيل الدخول");
        return;
      }

     
      login(data);

      await syncFavoritesAfterLogin(data.token);

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("خطأ في السيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="mt-5">تسجيل الدخول</h1>
        <p>يرجى إدخال بياناتك لتسجيل الدخول إلى حسابك</p>

        <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <div className="d-flex justify-content-between">
              <label htmlFor="password" className="form-label">
                كلمة المرور
              </label>
              <Link to="/forgot-password" className="text-decoration-none">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-3">
          ليس لديك حساب؟ <Link to="/register">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;