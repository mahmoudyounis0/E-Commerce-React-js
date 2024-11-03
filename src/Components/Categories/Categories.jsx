import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Loading from "./../Loading/Loading";
import "./categ.css";
import { Link } from "react-router-dom";

export default function Categories() {
  useEffect(() => {
    document.title = "Categories";
  }, []);
  function getCateogriesData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { error, isLoading, data } = useQuery(
    "getCategories",
    getCateogriesData
  );
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
  const categories = data?.data?.data;
  return (
    <>
      <div className="container my-4 min-vh">
        <div className="row gy-3">
          {categories.map((pro) => {
            return (
              <>
                <div key={pro.id} className="col-md-3 col-6">
                  <Link to={`/getspecificcateg/`+pro.name}>
                    <div className="item p-2 product">
                      <img src={pro.image} alt={pro.name} className="w-100" />
                      <h5 className="text-capitalize text-center mt-3 fw-semibold">
                        {pro.name}
                      </h5>
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
