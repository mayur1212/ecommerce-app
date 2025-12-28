import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Toggle wishlist (object based, safe)
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const updated = { ...prev };
      if (updated[product.id]) {
        delete updated[product.id];
      } else {
        updated[product.id] = product;
      }
      return updated;
    });
  };

  // ✅ Check if wishlisted
  const isWishlisted = (id) => !!wishlist[id];

  // ✅ DERIVED DATA (THIS FIXES HEADER COUNT)
  const wishlistItems = Object.values(wishlist); // array
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,          // original object (no breaking change)
        wishlistItems,     // ✅ array for UI
        wishlistCount,     // ✅ direct count (best for badge)
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
