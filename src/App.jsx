import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './componets/context/CartContext';

import Home from './componets/home/Home';
import TopBar from './componets/topbar/TopBar';
import NavBar from './componets/navbar/NavBar';
import Footer from './componets/footer/Footer';
import { FavoritesProvider } from './componets/context/FavoritesContext';
import CategoryPage from './componets/pages/CategoryPage';
import CartPage from './componets/pages/CartPage';
import CheckoutPage from './componets/pages/CheckoutPage';
import MyOrders from './componets/pages/MyOrders';
import Login from './componets/pages/login';
import Register from './componets/pages/register';
import ForgotPassword from './componets/pages/ForgotPassword';
import AdminDashboard from './componets/pages/Adashboard';
import AdminRoute from './componets/pages/AdminRoute';
import FavoritesPage from './componets/pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <TopBar />
          <NavBar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/favorites" element={<FavoritesPage />} />


            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />


            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/:category/:subCategory" element={<CategoryPage />} />


            <Route path="*" element={
              <h3 className="text-center mt-5">404 - الصفحة غير موجودة</h3>
            } />
          </Routes>
          <Footer />
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;