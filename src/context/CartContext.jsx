import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
  const addToCart = (item) => {
  setCartItems((prev) => {
    const existing = prev.find(
      (p) => p.productId === item.productId
    );

    if (existing) {
      return prev.map((p) =>
        p.productId === item.productId
          ? {
              ...p,
              qty: p.qty + item.qty,
              perItemDelivery: item.perItemDelivery, // keep original
            }
          : p
      );
    }

    return [...prev, item];
  });
};


  // REMOVE ITEM
  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  // UPDATE QTY
  const updateQty = (productId, qty) => {
    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, qty }
          : item
      )
    );
  };

  // CLEAR CART (after order success)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
