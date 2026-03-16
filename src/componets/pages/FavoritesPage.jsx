import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  if (favorites.length === 0) {
    return <h4 className="text-center mt-5">لا توجد منتجات مفضلة</h4>;
  }

  return (
    <div className="container mt-5">
      <h3>المفضلة ❤️</h3>
      <hr />

      {favorites.map(product => (
        <div key={product._id} className="row mb-3 align-items-center">
          <div className="col-md-2">
            <img
              src={`http://localhost:5000${product.image}`}
              width="80"
              alt={product.name}
            />
          </div>

          <div className="col-md-4">{product.name}</div>

          <div className="col-md-2">{product.price} جنيه</div>

          <div className="col-md-2">
            <button
              className="btn btn-dark btn-sm"
              onClick={() => addToCart(product)}
            >
              أضف للسلة
            </button>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromFavorites(product._id)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;