import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
export default function Orders() {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  useEffect(() => {
    document.title = "Orders";
  }, []);
  function getOrders() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId,
      {
        headers: {
          token: token,
        },
      }
    );
  }
  const { error, data, isLoading } = useQuery("getOrders", getOrders);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (error)
    return (
      <>
        <div className="container my-4 min-vh">
          <h1 className="fw-bold text-center text-capitalize">
            An error has occurred - {error.message}
          </h1>
        </div>
      </>
    );
  console.log(data.data);
  const orderItems = data.data;

  return (
    <div className="container min-vh my-4 w-100">
      {userId ? (
        <>
          {orderItems?.map((pro) => {
            return (
              <div className="mb-3">
                <div className="mb-3">
                  <h3 className="fw-bold">Order ID: {pro.id}</h3>
                  <p>Time jan 8,2024 at 9:48 pm</p>
                  <div className="row font-sm align-items-center">
                    <div className="col-md-6 mb-2">
                      <p className="me-3 mb-0">
                        Pay Method :{" "}
                        <span className="mark rounded-2 fw-semibold text-center">
                          {pro.paymentMethodType}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-0">
                        Order Status :{" "}
                        <span className="mark rounded-2 fw-semibold text-center">
                          {pro.isDelivered == "true"
                            ? "Deliverd"
                            : "Not Deliverd Yet"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="orderItem border p-2 rounded-3 bg-white ">
                  <h5 className="fw-semibold">Order Item</h5>
                  <p className="mark rounded-2 fw-semibold">
                    {pro.isPaid == "true" ? "Paid" : "Not Paid"}
                  </p>
                  <div className="row">
                    {pro.cartItems?.map((cartItems) => {
                      return (
                        <>
                          <div className="col-md-12">
                            <div className="col-3">
                              <img
                                src={cartItems.product.imageCover}
                                className="w-100"
                                alt=""
                              />
                            </div>
                            <div className="col-9 col-md-6 fw-bold mb-3">
                              <h5 className="fw-bold">
                                {cartItems.product.title}
                              </h5>
                              <p className="mb-0 font-sm">
                                Price : ${cartItems.price}
                              </p>
                              <p className="mb-0 font-sm">
                                count : {cartItems.count}
                              </p>
                              <p
                                className="mb-0 bg-body rounded-4 py-2 font-sm"
                                style={{ width: "fit-content" }}
                              >
                                Total : ${cartItems.price * cartItems.count}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="totalPrice">
                    <h6 className="fw-bold">
                      Total Price :{" "}
                      <span className="mark rounded-2">
                        ${pro.totalOrderPrice}
                      </span>
                    </h6>
                  </div>
                  <div className="shippingAddress">
                    <h6 className="w-100 text-center fw-semibold">
                      Shipping details
                    </h6>
                    <div>
                      <h5 className=" me-3 font-sm">
                       City:  {pro.shippingAddress.city}
                      </h5>
                      <p className="phone mb-0 font-sm">
                        Ph : {pro.shippingAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <div className="fw-bold text-center fs-5">
            <h1 className="h4 fw-bold">
              Pls add a Product to ur cart to get past orders if Exist.
            </h1>
            <p>Here you can view and manage all your orders.</p>
          </div>
        </>
      )}
    </div>
  );
}
