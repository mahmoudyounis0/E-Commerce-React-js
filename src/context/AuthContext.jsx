import React, { createContext, useEffect, useState } from "react";
export const authcontext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    localStorage.removeItem('recntlyViwedItems')
    localStorage.removeItem('wishlist')
    localStorage.removeItem('userId')
  }
  useEffect(() => {
    const storedToken = localStorage.getItem('tkn');
    setToken(storedToken)
  }, []);
  return (
    <authcontext.Provider value={{token ,setToken,logout }}>
      {children}
    </authcontext.Provider>
  );
}
