import React from "react";
import { Link } from "react-router-dom";
import LogoAdmin from "../../../assets/images/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-dark mt-5">
      <div className="container section">
        <div className="row">
          <div className="col-lg-10 mx-auto text-center">
            <Link className="d-inline-block mb-4 pb-2" to="/">
              <img
                loading="preload"
                decoding="async"
                className="logo-icon"
                src={LogoAdmin}
                alt="Reporter Hugo"
                width="40px"
                height="40px"
              />
              <span className="logo-text h3 text-light">POSTNEST</span>
            </Link>
            <ul className="p-0 d-flex navbar-footer mb-0 list-unstyled">
              <li className="nav-item my-0" style={{ marginRight: '10px' }}>
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item my-0">
                <Link className="nav-link" to="/article" style={{ marginRight: '10px' }}>
                  Elements
                </Link>
              </li>
              <li className="nav-item my-0">
                <Link className="nav-link" to="/privacy-policy" style={{ marginRight: '10px' }}>
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item my-0">
                <Link className="nav-link" to="/terms-conditions" style={{ marginRight: '10px' }}>
                  Terms of Use
                </Link>
              </li>
              <li className="nav-item my-0">
                <Link className="nav-link" to="/404" style={{ marginRight: '10px' }}>
                  Face 404
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright bg-dark content">
        Design &amp; Development{" "}
        <a href="hhttp://103.72.96.123/">POSTNEST</a>
      </div>
    </footer>
  );
};

export default Footer;
