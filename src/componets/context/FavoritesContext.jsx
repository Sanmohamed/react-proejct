import React, { createContext, useEffect, useState, useContext } from "react";
import { CartContext } from "./CartContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(CartContext);
  const token = user?.token;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/api/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) return;
          const data = await res.json();
          setFavorites(data);
        } catch (error) {
          console.error("فشل تحميل المفضلة:", error);
        }
      } else {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
      }
    };

    loadFavorites();
  }, [token]);

 
  useEffect(() => {
    if (!token) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, token]);

  
  const syncFavoritesAfterLogin = async (userToken) => {
    const localFav = JSON.parse(localStorage.getItem("favorites")) || [];
    if (localFav.length === 0) return;

    try {
      for (const product of localFav) {
        await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ productId: product._id }),
        });
      }
      localStorage.removeItem("favorites");
    } catch (error) {
      console.error("فشل مزامنة المفضلة:", error);
    }
  };

  
  const addToFavorites = async (product) => {
    if (isFavorite(product._id)) return; 

    if (token) {
      try {
        const res = await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id }),
        });
        if (!res.ok) return;
      } catch (error) {
        console.error("فشل إضافة للمفضلة:", error);
        return;
      }
    }

    setFavorites(prev => [...prev, product]);
  };

  
  const removeFromFavorites = async (id) => {
    if (token) {
      try {
        const res = await fetch(`http://localhost:5000/api/favorites/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
      } catch (error) {
        console.error("فشل حذف من المفضلة:", error);
        return;
      }
    }

    setFavorites(prev => prev.filter(f => f._id !== id));
  };

  const isFavorite = (id) => favorites.some(f => f._id === id);

  const favoriteCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        syncFavoritesAfterLogin,
        favoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};