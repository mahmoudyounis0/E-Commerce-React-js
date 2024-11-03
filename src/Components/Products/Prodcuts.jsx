import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "./../Loading/Loading";
import "./product.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { StarsGeneratorContext } from "../../context/Startsgenrator";
import { wishlistcontext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";
import { ThreeDots } from "react-loader-spinner";

export default function OurProdcuts() {
  const { toggleWishlist, wishlist } = useContext(wishlistcontext);
  const [recntlyViwedItems, setRecntlyViwedItems] = useState(() => {
    const savedrecntlyViwedItems = localStorage.getItem("recntlyViwedItems");
    return savedrecntlyViwedItems ? JSON.parse(savedrecntlyViwedItems) : [];
  });
  const { generateStars } = useContext(StarsGeneratorContext);
  const { addProductToCart, loading } = useContext(CartContext);
  async function addPro(id) {
    await addProductToCart(id);
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, error } = useQuery("getProductsData", getProducts);

  useEffect(() => {
    document.title = "Our Products";
  }, []);
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

  const addToRecentlyViewed = (productId) => {
    let updatedrecntlyViwedItems = recntlyViwedItems;

    // Only add if not already in the recently viewed items
    if (!recntlyViwedItems.includes(productId)) {
      updatedrecntlyViwedItems = [...recntlyViwedItems, productId];
      setRecntlyViwedItems(updatedrecntlyViwedItems);
      localStorage.setItem(
        "recntlyViwedItems",
        JSON.stringify(updatedrecntlyViwedItems)
      );
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="ourProducts container min-vh my-4">
            <div className="mb-3 slider">
              {" "}
              <Slider {...settings}>
                <div>
                  <h3>
                    {" "}
                    <div className="hero-img img1 w-100"></div>
                  </h3>
                </div>
                <div>
                  <h3>
                    {" "}
                    <div className="hero-img img2 w-100"></div>
                  </h3>
                </div>
                <div>
                  <h3>
                    {" "}
                    <div className="hero-img img3 w-100"></div>
                  </h3>
                </div>
                <div>
                  <h3>
                    {" "}
                    <div className="hero-img img4 w-100"></div>
                  </h3>
                </div>
              </Slider>
            </div>
            <div className="row gy-3 d-flex align-items-stretch">
              <div className="col-md-12">
                <h2>You might need</h2>
              </div>
              {data?.data?.data.map((product) => (
                <div
                  key={product.id}
                  className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch"
                  onClick={() => addToRecentlyViewed(product.id)}
                >
                  <div className="p-1 border border-1 rounded-2 position-relative product">
                    <div
                      className={`addToWishListIcon z-3 ${
                        wishlist.includes(product.id) ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <div
                        className={`icon position-absolute addToWishListIcon ${
                          wishlist.includes(product.id) ? "active" : ""
                        }`}
                      >
                        <i
                          className={`fa-${
                            wishlist.includes(product.id) ? "solid" : "regular"
                          } fa-heart fs-6`}
                        ></i>
                      </div>
                    </div>
                    <Link to={`/prodectdetails/${product.id}`}>
                      {}
                      <img
                        src={product.imageCover}
                        className="w-100"
                        alt="..."
                      />
                      <div className="mt-2">
                        <h5 className="fw-bold h5">
                          {product.title.split(" ").splice(0, 2).join(" ")}
                        </h5>
                        <p className="fw-bold">
                          {product.priceAfterDiscount ? (
                            <>
                              {`$` + product.priceAfterDiscount}
                              <span className="text-decoration-line-through fw-medium ms-1 fs-7">
                                {product.price}
                              </span>
                            </>
                          ) : (
                            `$` + product.price
                          )}
                        </p>
                        <p className="fs-6 product-desc my-0">
                          {product.description}
                        </p>
                        <div className="d-flex justify-content-between details-pro">
                          <p
                            className={`fs-6 fw-semibold my-0 ${
                              product.quantity !== 0
                                ? "text-main"
                                : "text-danger"
                            }`}
                          >
                            {product.quantity !== 0
                              ? "In Stock"
                              : "Not Available"}
                          </p>
                          <p className="ms-1 fw-semibold text-black">
                            {product.ratingsAverage.toFixed(1)}
                            <span className="rating-color ms-1">
                              {generateStars(product.ratingsAverage)}{" "}
                              <span className="fw-medium text-black font-sm">
                                ({product.ratingsQuantity})
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                      className="btn bg-main w-100 rounded-5 mb-2 d-flex justify-content-center align-items-center"
                      onClick={(_) => addPro(product.id)}
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
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
