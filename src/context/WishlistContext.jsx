import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
export const wishlistcontext = createContext();
export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const toggleWishlist = (productId) => {
    let updatedWishlist;
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter((id) => id !== productId);
      toast.success("Removed Succ", { duration: 1500, position: "top-center" });
    } else {
      updatedWishlist = [...wishlist, productId];
      toast.success("Added Succ", { duration: 1500, position: "top-center" });
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };
  return (
    <>
      <wishlistcontext.Provider value={{ toggleWishlist, wishlist }}>
        {children}
      </wishlistcontext.Provider>
    </>
  );
}
