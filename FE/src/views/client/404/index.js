import React from "react";
import { Link } from "react-router-dom";
import IMAGES_CLEINT from "../../../assets/styles/client/images";
import { Helmet } from "react-helmet";

const PageNotFound = () => {
  return (
    <main>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto text-center">
              <img
                loading="lazy"
                decoding="async"
                src={IMAGES_CLEINT.img_404}
                alt="404"
                className="img-fluid mb-4"
                width="500"
                height="350"
              />
              <h1 className="mb-4">Page Not Found!</h1>
              <Link to="/" className="btn btn-outline-primary">
                Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;
