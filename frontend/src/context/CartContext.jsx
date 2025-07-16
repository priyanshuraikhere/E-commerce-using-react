import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const { token } = useContext(UserContext); 

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
// console.log("token" , token)
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();

      const items = (data.items || []).map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      }));

      setCartItems(items);
    } catch (error) {
      console.error("Fetch cart failed:", error.message);
    }
  };

  
  const addToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      fetchCart();
    } catch (err) {
      console.error("Add to cart failed:", err.message);
    }
  };

  
  const removeFromCart = async (productId) => {
    const currentItem = cartItems.find((item) => item._id === productId);
    if (!currentItem) return;

    if (currentItem.quantity === 1) {
      return await allremoveFromCart(productId);
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: -1 }),
      });

      if (!res.ok) throw new Error("Failed to decrease quantity");

      fetchCart();
    } catch (err) {
      console.error("Remove from cart failed:", err.message);
    }
  };

  
  const allremoveFromCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to remove item");

      fetchCart();
    } catch (err) {
      console.error("Full remove from cart failed:", err.message);
    }
  };

  
  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err.message);
    }
  };

  
  const clearBadge = () => {
    setCartItems([]);
  };

  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCartItems([]); 
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        allremoveFromCart,
        clearCart,
        clearBadge,
        fetchCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};