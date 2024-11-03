import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { ThreeDots } from "react-loader-spinner";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const {
    eraseCart,
    decraseCount,
    increaseCount,
    deleteItem,
    loading,
    cartProducts,
    total,
    eraseloading,cartId
  } = useContext(CartContext);
  const subtotal = total;
  return (
    <>
      <div className="container my-4 min-vh">
        <div className="row gy-3">
          {cartProducts?.length > 0 ? (
            <>
              {" "}
              <div className="col-md-9">
                <div className="shoppingCartContainer p-2 bg-white rounded-2 shadow">
                  <div className="cart-text d-flex justify-content-between p-2">
                    <div className="d-flex justify-content-center cart-head">
                      <h5 className="fw-bold me-2 cart-text-h5">
                        Shopping Cart
                      </h5>
                      {eraseloading ? (
                        <ThreeDots
                          visible={true}
                          height="40"
                          width="40"
                          color="#000"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        <i
                          className="fa-regular fa-trash-can text-danger trash mt-1"
                          onClick={eraseCart}
                        ></i>
                      )}
                    </div>
                    <Link
                      to="/ourproducts"
                      className="text-main cart-text-cont"
                    >
                      <i className="fa-solid fa-arrow-left me-2"></i>
                      Continue Shopping
                    </Link>
                  </div>
                  <div className="row">
                    {cartProducts.map((product, idx) => {
                      return (
                        <>
                          <div key={idx} className="col-12 border-bottom">
                            <div className="row justify-content-between align-items-center">
                              <div className="col-4 col-md-4">
                                <div className="p-2">
                                  <img
                                    src={product.product.imageCover}
                                    className="card-img-top"
                                    alt="..."
                                  />
                                  <h5 className="text-center fw-semibold mt-2 ">
                                    {product.product.title
                                      .split(" ")
                                      .splice(0, 2)
                                      .join(" ")}
                                  </h5>
                                </div>
                              </div>
                              <div className="col-8 col-md-6">
                                <div className="d-flex flex-column fw-bold text-center">
                                  <div className=" fw-bold d-flex justify-content-between">
                                    <p className="mb-0">Price </p>
                                    <p className="text-center">
                                      ${product.price}
                                    </p>
                                  </div>
                                  <span>×</span>
                                  <div className=" d-flex justify-content-between align-items-center">
                                    <p className="mb-0">Quantity</p>
                                    <div className="w-50">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <button
                                          id={`minus-${product.product._id}`}
                                          className="btn fw-bold me-1 fs-5"
                                          disabled={loading}
                                          onClick={(_) => {
                                            decraseCount(
                                              product.product._id,
                                              product.count
                                            );
                                          }}
                                        >
                                          -
                                        </button>
                                        <span id={`itm` + product.product._id}>
                                          {product.count}
                                        </span>
                                        <button
                                          className="btn fw-bold pe-0 ms-1 fs-5"
                                          disabled={loading}
                                          onClick={(_) => {
                                            increaseCount(
                                              product.product._id,
                                              product.count
                                            );
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <span>=</span>
                                  <div className=" d-flex justify-content-between">
                                    <p className="mb-0">Total</p>
                                    <p className="mark">
                                      ${product.price * product.count}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-2 d-flex justify-content-center">
                                <button
                                  className="btn btn-danger text-white d-flex align-items-center justify-content-center"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <ThreeDots
                                      visible={true}
                                      height="40"
                                      width="40"
                                      color="#fff"
                                      radius="9"
                                      ariaLabel="three-dots-loading"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                    />
                                  ) : (
                                    <i
                                      className="fa-regular fa-trash-can trash"
                                      onClick={(_) => {
                                        deleteItem(product.product._id);
                                      }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="orderSummaryContainer p-2 bg-white rounded-2 shadow">
                  <h5 className="orderSummary fw-bold text-center border-bottom pb-2">
                    Order Summary
                  </h5>
                  <div className="border-bottom fw-semibold">
                    <div className="subtotal mt-2 d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>${subtotal}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Delivery Fee:</p>
                      <p>----</p>
                    </div>
                  </div>
                  <div className="checkout fw-semibold mt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <p>Total</p>
                      <p className="mark">${subtotal}</p>
                    </div>
                    <div className="btn-checkout">
                      <Link to={`/checkout/`+cartId}>
                      <button
                        className="btn bg-main fw-bold w-100"
                        disabled={loading}
                      >
                        Checkout
                      </button></Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex flex-column align-items-center">
                <h1 className="fw-bold">Your Cart Is Empty</h1>
                <Link to="/ourproducts" className="text-main">
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
