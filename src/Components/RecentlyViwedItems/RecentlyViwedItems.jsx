import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StarsGeneratorContext } from "../../context/Startsgenrator";
import { Link } from "react-router-dom";
import "./RecentlyViewItems.css";
import { wishlistcontext } from "../../context/WishlistContext";
export default function RecentlyViwedItems() {
  const [seenitems, setSeenitems] = useState(() => {
    const storedItems = localStorage.getItem("recntlyViwedItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const { toggleWishlist, wishlist } = useContext(wishlistcontext);
  const [products, setProducts] = useState([]);
  const { generateStars } = useContext(StarsGeneratorContext);

  useEffect(() => {
    const storedItems = localStorage.getItem("recntlyViwedItems");
    if (storedItems) {
      setSeenitems(JSON.parse(storedItems));
    }
  }, []);
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchRecentlyViewedProducts = async () => {
      if (seenitems.length > 0) {
        const productDetails = await Promise.all(
          seenitems.map((id) => fetchProductDetails(id))
        );
        setProducts(productDetails.filter(Boolean));
      }
    };
    fetchRecentlyViewedProducts();
  }, [seenitems]);
  function emptyRecntlyView() {
    localStorage.removeItem("recntlyViwedItems");
    setSeenitems([]);
  }
  return (
    <>
      {seenitems.length > 0 ? (
        <>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <h2>Recently Viewed</h2>
              <i
                className="fa-regular fa-trash-can text-danger trash"
                onClick={emptyRecntlyView}
              ></i>
            </div>
            <div className="recently-viewed-container">
              <div className="recently-viewed-items">
                {products.map((product) => (
                  <div className="row">
                    <div
                      key={product.id}
                      className="col-6 col-md-6 col-lg-3 d-flex align-items-stretch me-4"
                    >
                      <div className="p-1 border border-1 rounded-2 position-relative product">
                        <div
                          className={`addToWishListIcon z-3 ${
                            wishlist.includes(product.id) ? "active" : ""
                          }`}
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <div
                            className={`icon position-absolute z-3 addToWishListIcon ${
                              wishlist.includes(product.id) ? "active" : ""
                            }`}
                          >
                            <i
                              className={`fa-${
                                wishlist.includes(product.id)
                                  ? "solid"
                                  : "regular"
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
                            <button className="btn bg-main w-100 rounded-5 mb-2">
                              Add to cart
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>{" "}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
