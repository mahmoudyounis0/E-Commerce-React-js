import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProdectDetails.css";
import { StarsGeneratorContext } from "./../../context/Startsgenrator";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import RecentlyViwedItems from "../RecentlyViwedItems/RecentlyViwedItems";
import { wishlistcontext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { ThreeDots } from "react-loader-spinner";

export default function ProdectDetails() {
  const { id } = useParams();
  useEffect(() => {
    document.title = "Product Details";
    window.scrollTo(0, 0);
  }, [id]);
  const { toggleWishlist, wishlist } = useContext(wishlistcontext);
  const { generateStars } = useContext(StarsGeneratorContext);
  const { addProductToCart,  loading } = useContext(CartContext);
  
async function addpro(id){
  await addProductToCart(id)
}
  async function getProductData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
  }

  const { isLoading, error, data } = useQuery(
    `getproductData-${id}`,
    getProductData
  );
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
  const ProDetails = data?.data?.data;
  function changeImageShown(e) {
    const targetImage = document.querySelector("#heroImageDetails");
    const srcOfClickedIMage = e.target.src;
    targetImage.src = srcOfClickedIMage;
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container my-4">
            <div className="row detailsRow">
              <div className="col-md-6 position-relative">
                <div className="p-2">
                  <img
                    src={ProDetails.imageCover}
                    className="w-75 h-75 m-auto d-block"
                    alt="proimage"
                    id="heroImageDetails"
                  />
                  <div className="row mt-3 p-1 gy-2">
                    <div
                      className={`addToWishListIcon z-3 ${
                        wishlist.includes(ProDetails.id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(ProDetails.id)}
                    >
                      <div
                        className={`icon position-absolute addToWishListIcon ${
                          wishlist.includes(ProDetails.id) ? "active" : ""
                        }`}
                      >
                        <i
                          className={`fa-${
                            wishlist.includes(ProDetails.id)
                              ? "solid"
                              : "regular"
                          } fa-heart fs-6`}
                        ></i>
                      </div>
                    </div>
                    {ProDetails.images.map((pro, idx) => {
                      return (
                        <>
                          <div
                            key={idx}
                            className="col-3 col-md-3 proImage"
                            onClick={changeImageShown}
                          >
                            <div className="p-1 border border-1 rounded-2 product">
                              <img src={pro} className="w-100" alt="" />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2">
                  <div className="head-details">
                    <h2 className="fw-bold h3">{ProDetails.title}</h2>
                    <p className="desc-head-deadils">
                      {ProDetails.description}
                    </p>
                    <p className="ms-1 fw-semibold text-black">
                      {ProDetails.ratingsAverage.toFixed(1)}
                      <span className="rating-color ms-1">
                        {generateStars(ProDetails.ratingsAverage)}{" "}
                        <span className="fw-medium text-black font-sm">
                          ({ProDetails.ratingsQuantity})
                        </span>
                      </span>
                    </p>
                    <p className="fw-bold fs-6 mark rounded-2">
                      sold<span className="qnt ms-1">({ProDetails.sold})</span>
                    </p>
                  </div>
                  <div className="price-details">
                    <h4 className="fw-bold">
                      {ProDetails.priceAfterDiscount ? (
                        <>
                          {`$` + ProDetails.priceAfterDiscount}
                          <span className="text-decoration-line-through fw-medium ms-1 fs-5">
                            {ProDetails.price}
                          </span>
                        </>
                      ) : (
                        ProDetails.price + `$`
                      )}
                    </h4>
                  </div>
                  <div className="brand-details d-flex align-items-center">
                    {/* <h4 className="fw-bold me-2 mt-2">{ProDetails.brand.name}</h4> */}
                    <img
                      src={ProDetails.brand.image}
                      className="w-25 rounded-2"
                      alt="brand"
                    />
                  </div>
                  <div className="qunatity-buttons-details">
                    <div className="plus-muins-btns d-flex gap-4 align-items-center mb-2 ">
                      <p
                        className="border-0 d-flex py-1 px-2 justify-content-center align-items-center bg-body-secondary rounded-5 d-none"
                        addedtocart="false"
                      >
                        <button className="fs-4 me-2">-</button>
                        <span className="fw-semibold">1</span>
                        <button className="fs-4 ms-2">+</button>
                      </p>
                      <p
                        className={ProDetails.quantity <= 12 ? "" : "d-none"}
                        goingtobeallsold="false"
                      >
                        Only{" "}
                        <span className="text-danger fw-bold">
                          {ProDetails.quantity} items
                        </span>{" "}
                        left!
                        <br />
                        Don't miss it
                      </p>
                    </div>
                    <div className="d-flex  gap-4 align-items-center buy-add-btns">
                      <button className="btn btn-buy rounded-5 bg-main">
                        Buy Now
                      </button>
                      <button
                        className={
                          "btn btn-add rounded-5 text-main d-flex justify-content-center align-items-center " +
                          (loading ? "bg-main w-25" : "")
                        }
                        onClick={(_) => {
                          addpro(ProDetails.id);
                        }}
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
                          "Add to cart"
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="delivry-details fs-7 mt-3">
                    <div className="freeDelivery d-flex align-items-baseline">
                      <i className="fa-solid fa-truck-fast me-2 fs-6 text-main"></i>
                      <div>
                        {" "}
                        <h6 className="fw-semibold">Free Delivery</h6>
                        <p className="text-decoration-underline">
                          Enter your Postal code for Delivery Availability
                        </p>
                      </div>
                    </div>
                    <div className="returnDelivery d-flex align-items-baseline">
                      <i className="fa-regular fa-clipboard  me-2 fs-6 text-main"></i>
                      <div>
                        <h6 className="fw-semibold">Return Delivery</h6>
                        <p className="text-decoration-underline">
                          Free 30 days Delivery Returns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RecentlyViwedItems />
            </div>
          </div>
        </>
      )}
    </>
  );
}
