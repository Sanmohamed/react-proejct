import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [cart, setCart] = useState([]);


  const normalizeCartItems = (items) => {
    if (!Array.isArray(items)) return [];

    return items.map((item) => {
  
      if (item.product) {
        return {
          _id: item.product._id,
          name: item.product.name,
          image: item.product.image,
          price: item.price,
          quantity: item.quantity,
        };
      }

  
      return item;
    });
  };


  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem("cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    }
  }, [user]);


  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);


  useEffect(() => {
    if (!user?.token) return;

    const controller = new AbortController();

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          setCart([]);
          return;
        }

        const data = await res.json();
        setCart(normalizeCartItems(data.items));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("فشل تحميل السلة:", error);
        }
      }
    };

    fetchCart();

    return () => controller.abort();
  }, [user?.token]);


  const addToCart = async (product) => {
 
    if (!user) {
      setCart((prev) => {
        const exist = prev.find((item) => item._id === product._id);

        if (exist) {
          return prev.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          },
        ];
      });

      return;
    }


    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCart(normalizeCartItems(data.items));
    } catch (error) {
      console.error("فشل إضافة المنتج:", error);
    }
  };


  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }


    if (!user) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCart(normalizeCartItems(data.items));
    } catch (error) {
      console.error("فشل تحديث الكمية:", error);
    }
  };


  const removeFromCart = async (id) => {

    if (!user) {
      setCart((prev) => prev.filter((item) => item._id !== id));
      return;
    }

   
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCart(normalizeCartItems(data.items));
    } catch (error) {
      console.error("فشل حذف المنتج:", error);
    }
  };

  
  const login = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    const localCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (localCart.length > 0) {
      try {
        const res = await fetch(
          "http://localhost:5000/api/cart/merge",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({ items: localCart }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          setCart(normalizeCartItems(data.items));
        }
      } catch (error) {
        console.error("فشل دمج السلة:", error);
      }
    }

    localStorage.removeItem("cart");
  };


  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
  };


  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const value = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      login,
      logout,
      totalPrice,
      totalItems,
      user,
    }),
    [cart, user, totalPrice, totalItems]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};