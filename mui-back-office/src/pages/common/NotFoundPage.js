import React, { useEffect } from "react";

export default function NotFoundPage() {
  // if (localStorage.getItem("have_error") !== null) {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
              {" "}
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            {/* <h1 className="lead" style={{fontSize : "30px"}}>
              Having some error during loading data from server
            </h1> */}
            <a href="/" className="btn btn-info btn-small">
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  // }
}
