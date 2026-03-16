import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "حدث خطأ");
        return;
      }

      await login(data); 
      navigate("/");

    } catch (error) {
      console.error(error);
      setError("خطأ في السيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="mt-5">تسجيل حساب جديد</h1>
        <p>يرجى إدخال بياناتك لتسجيل حساب جديد</p>

        {error && (
          <div className="alert alert-danger w-50 mx-auto">{error}</div>
        )}

        <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label">الاسم</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
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
            <label htmlFor="password" className="form-label">كلمة المرور</label>
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
            {loading ? "جاري التسجيل..." : "تسجيل الحساب"}
          </button>
        </form>

        <p className="mt-3">
          لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;