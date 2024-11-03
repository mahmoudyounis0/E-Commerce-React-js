import React from "react";
import "./GetStarted.css";

export default function GetStarted({ color, text }) {
  return (
    <>
      <div className="button-section">
        <button
          className="btn fw-semibold text-white"
          style={{ backgroundColor: !color? "#0aad0a": color }}
        >
          {!text ? (
            <>
              Get Started
            </>
          ) : (
            text
          )}
          <i className="ms-1 text-white fa-solid fa-arrow-up-right-from-square "></i>
        </button>
      </div>
    </>
  );
}
