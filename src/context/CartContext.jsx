import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const token  = localStorage.getItem('tkn')
  const [loading, setLoading] = useState(false);
  const [eraseloading, setEraseLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  const [total, setTotal] = useState(null);
  const [cartId, setCartId] = useState(null);
  async function GetLoggedUserCart() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: token },
      })
      .then((succ) => {
        console.log(succ);
        setCount(succ.data?.numOfCartItems);
        setCartProducts(succ.data?.data?.products);
        setTotal(succ.data?.data?.totalCartPrice);
        setCartId(succ.data?.cartId);
        localStorage.setItem("userId", succ.data?.data?.cartOwner);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Error fetching cart data", {
        //   duration: 3000,
        //   position: "top-center",
        // });
      });
  }
  async function addProductToCart(id) {
    setLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: { token: token } }
      )
      .then((succ) => {
        toast.success(succ.data?.message, {
          duration: 3000,
          position: "top-center",
        });
        console.log(succ);
        console.log(succ);

        setCount(succ.data?.numOfCartItems);
        setLoading(false);
        GetLoggedUserCart();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message, {
          duration: 3000,
          position: "top-center",
        });
        setLoading(false);
      });
  }
  function eraseCart() {
    setEraseLoading(true);
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: token },
      })
      .then((x) => {
        toast.success("Cart has been erased", {
          duration: 3000,
          position: "top-center",
        });
        setCartProducts([]);
        setCount(0);
        setTotal(0);
        setEraseLoading(false);
      })
      .catch((err) => {
        toast.error("Error erasing cart", {
          duration: 3000,
          position: "top-center",
        });

        setLoading(false);
      });
  }
  function deleteItem(id) {
    setLoading(true);
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: token },
      })
      .then((x) => {
        toast.success("Item has been deleted", {
          duration: 3000,
          position: "top-center",
        });
        setCount(x.data?.numOfCartItems);
        setCartProducts(x.data?.data?.products);
        setTotal(x.data?.data?.totalCartPrice);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error deleting item", {
          duration: 3000,
          position: "top-center",
        });
        setLoading(false);
      });
  }
  function updateProductCount(id, current) {
    setLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: current },
        {
          headers: { token: token },
        }
      )
      .then((succ) => {
        console.log(succ);

        toast.success("Product count updated", {
          duration: 3000,
          position: "top-center",
        });
        setLoading(false);
        setCount(succ.data?.numOfCartItems);
        setCartProducts(succ.data?.data?.products);
        setTotal(succ.data?.data?.totalCartPrice);
      })
      .catch((err) => {
        toast.error("Error updating product count", {
          duration: 3000,
          position: "top-center",
        });
        setLoading(false);
      });
  }
  function decraseCount(id, currentCount) {
    if (currentCount === 1) {
      document.querySelector(`#minus-${id}`).classList.add("disabled");
    } else {
      currentCount -= 1;
      updateProductCount(id, currentCount);
    }
  }

  function increaseCount(id, currentCount) {
    if (!isNaN(currentCount)) {
      currentCount += 1;
    }

    if (currentCount > 1) {
      document.querySelector(`#minus-${id}`).classList.remove("disabled");
    }

    updateProductCount(id, currentCount);
  }
  useEffect(() => {
    GetLoggedUserCart();
    return () => {};
  }, [token]);
  return (
    <>
      <CartContext.Provider
        value={{
          addProductToCart,
          loading,
          count,
          GetLoggedUserCart,
          cartProducts,
          eraseCart,
          decraseCount,
          increaseCount,
          deleteItem,
          total,
          eraseloading,
          cartId
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
