import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function CartPage() {
  const {
    cart = [],
    removeFromCart,
    updateQuantity,
    user
  } = useContext(CartContext);

  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return <h3 className="text-center mt-5">السلة فارغة</h3>;
  }

  const getProduct = (item) => {
    if (user && item.product && typeof item.product === "object") {
      return item.product;
    }
    return item;
  };

  const getId = (item) => {
    if (user && item.product && typeof item.product === "object") {
      return item.product._id;
    }
    return item._id;
  };

  // حساب الإجمالي
  const totalPrice = cart.reduce((acc, item) => {
    const product = getProduct(item);
    return acc + product.price * item.quantity;
  }, 0);

  return (
    <div className="container mt-5">
      <h2>سلة المشتريات</h2>
      <hr />

      {cart.map((item) => {
        const product = getProduct(item);
        const id = getId(item);
        const itemTotal = product.price * item.quantity;

        return (
          <div key={id} className="row align-items-center mb-3 border-bottom pb-3">

            <div className="col-md-2">
              <img
                src={`http://localhost:5000${product.image}`}
                width="100"
                alt={product.name}
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="col-md-3">{product.name}</div>

            <div className="col-md-2">
              {product.price} جنيه
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>

              <span className="mx-3">{item.quantity}</span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="col-md-2">
              {itemTotal} جنيه
            </div>

            <div className="col-md-12 text-end mt-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(id)}
              >
                حذف
              </button>
            </div>
          </div>
        );
      })}

      <hr />

      <div className="row">
        <div className="col-md-6">
          <h5>ملخص الطلب</h5>
          <p>عدد المنتجات: {cart.length}</p>
          <p>الإجمالي: <strong>{totalPrice} جنيه</strong></p>
        </div>

        <div className="col-md-6 text-end">
          <button
            className="btn btn-dark btn-lg"
            onClick={() => navigate("/checkout")}
          >
            إتمام الطلب (Checkout)
          </button>
        </div>
      </div>

    </div>
  );
}

export default CartPage;