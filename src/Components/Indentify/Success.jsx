import React from "react";
import successimg from "../../Assets/images/success.png";
import "./success.css";
export default function Success() {
  return (
    <>
      <div className="success-page min-vh max-vw my-4 position-absolute z-3">
        <div className="row">
          <div className="col-md-12">
            <div className="square border border-1 rounded-2 shadow p-3 pb-5 bg-white">
              <div className="square-content d-flex justify-content-center flex-column align-items-center text-center">
                <img src={successimg} alt="success" className="w-25" />
                <h5 className="fw-bold h3 text-main">Hooray!</h5>
                <p className="font-sm mb-0">Your account is ready to use.</p>
                <p className="font-sm">You will be redirected to the Login page in few seconds.</p>
                <div class="load">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
