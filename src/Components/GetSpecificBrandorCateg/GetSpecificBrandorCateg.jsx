import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { StarsGeneratorContext } from "../../context/Startsgenrator";
import { wishlistcontext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { ThreeDots } from "react-loader-spinner";

export default function GetSpecificCateg() {
  const { categ } = useParams();
  useEffect(() => {
    document.title = "Sepcific Products";
    window.scrollTo(0, 0);
  }, []);
  const { generateStars } = useContext(StarsGeneratorContext);
  const { toggleWishlist, wishlist } = useContext(wishlistcontext);
  function getData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { error, isLoading, data } = useQuery("getdata", getData);
  const { addProductToCart,  loading } = useContext(CartContext);

  if (isLoading) {
    return <Loading />;
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
  const productSpec = data?.data?.data;
  const filteredProducts = productSpec.filter(
    (pro) => pro.category.name === categ || pro.category.slug === categ
  );
  return (
    <>
      <div className="container min-vh my-4">
        <div className="row gy-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((pro) => {
              return (
                <>
                  <div
                    key={pro.id}
                    className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch"
                  >
                    <div className="p-1 border border-1 rounded-2 position-relative product">
                      <div
                        className={`addToWishListIcon z-3 ${
                          wishlist.includes(pro.id) ? "active" : ""
                        }`}
                        onClick={() => toggleWishlist(pro.id)}
                      >
                        <div
                          className={`icon position-absolute addToWishListIcon ${
                            wishlist.includes(pro.id) ? "active" : ""
                          }`}
                        >
                          <i
                            className={`fa-${
                              wishlist.includes(pro.id) ? "solid" : "regular"
                            } fa-heart fs-6`}
                          ></i>
                        </div>
                      </div>
                      <Link to={`/prodectdetails/${pro.id}`}>
                        {}
                        <img src={pro.imageCover} className="w-100" alt="..." />
                        <div className="mt-2">
                          <h5 className="fw-bold h5">
                            {pro.title.split(" ").splice(0, 2).join(" ")}
                          </h5>
                          <p className="fw-bold">
                            {pro.priceAfterDiscount ? (
                              <>
                                {`$` + pro.priceAfterDiscount}
                                <span className="text-decoration-line-through fw-medium ms-1 fs-7">
                                  {pro.price}
                                </span>
                              </>
                            ) : (
                              `$` + pro.price
                            )}
                          </p>
                          <p className="fs-6 product-desc my-0">
                            {pro.description}
                          </p>
                          <div className="d-flex justify-content-between details-pro">
                            <p
                              className={`fs-6 fw-semibold my-0 ${
                                pro.quantity !== 0 ? "text-main" : "text-danger"
                              }`}
                            >
                              {pro.quantity !== 0
                                ? "In Stock"
                                : "Not Available"}
                            </p>
                            <p className="ms-1 fw-semibold text-black">
                              {pro.ratingsAverage.toFixed(1)}
                              <span className="rating-color ms-1">
                                {generateStars(pro.ratingsAverage)}{" "}
                                <span className="fw-medium text-black font-sm">
                                  ({pro.ratingsQuantity})
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                      <button
                        className="btn bg-main w-100 rounded-5 mb-2 d-flex justify-content-center align-items-center"
                        onClick={(_) => {
                          addProductToCart(pro.id);
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
                </>
              );
            })
          ) : (
            <>
              <div className="col-12 text-center">
                <h2 className="fw-bold">Sorry.</h2>
                <h3 className="fw-bold">
                  Due to many customers, no products are currently available for{" "}
                  {categ}.
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
