import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { user, logout, setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    address: "",
    city: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "حدث خطأ أثناء الدفع");
        return;
      }

      setCart([]);
      navigate("/myorders");

    } catch (error) {
      console.error(error);
      setError("خطأ في الاتصال بالسيرفر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3>إتمام الطلب والدفع</h3>
      <hr />

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <form onSubmit={handleCheckout}>
        <h5 className="mt-3">بيانات الشحن</h5>

        <input
          className="form-control mb-3"
          placeholder="العنوان"
          id="address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="المدينة"
          id="city"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="رقم الهاتف"
          id="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <h5 className="mt-4">بيانات البطاقة (Mock)</h5>

        <input
          className="form-control mb-3"
          placeholder="رقم البطاقة (16 رقم)"
          id="cardNumber"
          value={form.cardNumber}
          maxLength="16"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="MM/YY"
          id="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="CVV"
          id="cvv"
          value={form.cvv}
          maxLength="4"
          onChange={handleChange}
          required
        />

        <button
          className="btn btn-dark w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "جاري الدفع..." : "ادفع الآن"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;