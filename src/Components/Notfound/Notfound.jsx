import React, { useEffect } from "react";
import NotFoundImg from '../../Assets/images/error.svg';
// import NotFoundImg from '../../Assets/images/new/404_page-not-found-1024x576.webp';


export default function Notfound() {
    useEffect(() => {
        document.title = "Page Not Found";
    }, []);
  return (
    <>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <img
          src={NotFoundImg}
          alt="Page not found"
          className="img-fluid"
        />
      </div>
    </>
  );
}
