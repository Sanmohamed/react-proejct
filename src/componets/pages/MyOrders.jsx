import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const statusLabels = {
  pending: { label: "قيد الانتظار", color: "warning" },
  confirmed: { label: "مؤكد", color: "primary" },
  processing: { label: "قيد التجهيز", color: "info" },
  shipped: { label: "تم الشحن", color: "secondary" },
  delivered: { label: "تم التسليم", color: "success" },
  cancelled: { label: "ملغي", color: "danger" },
};

function MyOrders() {
  const { user } = useContext(CartContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error("فشل تحميل الطلبات");

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        setError("فشل تحميل الطلبات، يرجى المحاولة مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status" />
    </div>
  );

  if (error) return (
    <div className="alert alert-danger container mt-5">{error}</div>
  );

  if (orders.length === 0) return (
    <h3 className="text-center mt-5">لا توجد طلبات</h3>
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-4">طلباتي</h3>

      {orders.map((order) => {
        const statusInfo = statusLabels[order.status] || {
          label: order.status,
          color: "secondary"
        };

        return (
          <div key={order._id} className="card mb-4 shadow-sm">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">رقم الطلب: #{order._id.slice(-6)}</h5>
                <span className={`badge bg-${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>

              <hr />

              <p>
                الدفع:{" "}
                {order.isPaid ? (
                  <span className="text-success fw-bold">مدفوع ✔</span>
                ) : (
                  <span className="text-danger fw-bold">غير مدفوع</span>
                )}
              </p>

              {order.paymentResult?.last4 && (
                <p>البطاقة: **** **** **** {order.paymentResult.last4}</p>
              )}

              <p>
                العنوان: {order.shippingAddress?.address}،{" "}
                {order.shippingAddress?.city}
              </p>

              <hr />

              <h6>المنتجات:</h6>

              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    width="70"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                  <div className="ms-3">
                    <p className="mb-1 fw-bold">{item.name}</p>
                    <small className="text-muted">
                      {item.quantity} × {item.price} جنيه ={" "}
                      <strong>{item.quantity * item.price} جنيه</strong>
                    </small>
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">الإجمالي: {order.totalPrice} جنيه</h5>
                <small className="text-muted">
                  {new Date(order.createdAt).toLocaleString("ar-EG")}
                </small>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyOrders;