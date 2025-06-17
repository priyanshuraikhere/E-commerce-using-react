import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
  };
  
  

  const allremoveFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

 

  const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
};


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total, allremoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);





























// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems(prevItems => {
//       const existing = prevItems.find(item => item.id === product.id);
      
//       if (existing) {
//         return prevItems.map(item =>
//           item.id === product.id ? { ...item , quantity: item.quantity + 1 } : item );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
    
//   };

//   const removeFromCart = (id) => {
//     setCartItems(prevItems => prevItems.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//     ).filter(item => item.quantity > 0));
//   };
//  const allremoveFromCart = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
// };


//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total , allremoveFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);
