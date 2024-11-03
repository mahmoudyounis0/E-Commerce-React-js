import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "./../Loading/Loading";
import { Link } from "react-router-dom";

export default function Brands() {
  useEffect(() => {
    document.title = "brands";
  }, []);
  function getBrandsData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { error, isLoading, data } = useQuery("getBrands", getBrandsData);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    <>
      <div className="container my-4 min-vh">
        <h1 className="fw-bold text-center text-capitalize">
          An error has occurred - {error.message}
        </h1>
      </div>
    </>;
  }
  const allBrands = data?.data?.data;
  return (
    <>
      <div className="container my-4 min-vh">
        <div className="row gy-3">
          {allBrands.map((brand, idx) => {
            return (
              <>
                <div className="col-md-2 col-4" key={idx}>
                  <Link to={`/getspecificbrand/`+brand.name}>
                    {" "}
                    <div className="itemBrand cursor-pointer product">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="img-fluid rounded-2"
                      />
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
