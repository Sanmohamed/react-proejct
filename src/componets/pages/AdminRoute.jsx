import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function AdminRoute({ children }) {
  const { user } = useContext(CartContext);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminRoute;