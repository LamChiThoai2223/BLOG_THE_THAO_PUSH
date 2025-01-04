import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <main>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs mb-4">
                <Link to="/">Trang Chủ</Link>
                <span className="mx-1">/</span>
                <Link to="#!">Liên Hệ</Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pr-0 pr-lg-4">
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labor.
                  <div className="mt-5">
                    <p className="h3 mb-3 font-weight-normal">
                      <a className="text-dark" href="mailto:hello@reporter.com">
                        hello@reporter.com
                      </a>
                    </p>
                    <p className="mb-3">
                      <a className="text-dark" href="tel:+211234565523">
                        +211234565523
                      </a>
                    </p>
                    <p className="mb-2">9567 Turner Trace Apt. BC C3G8A4</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <form method="POST" action="#!" className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Họ và Tên"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control mb-4"
                    placeholder="Email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Chủ Đề"
                    name="subject"
                    id="subject"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control mb-4"
                    placeholder="Nhập Tin Nhắn Của Bạn Tại Đây"
                    rows="5"
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-outline-primary" type="submit">
                    Gửi Tin Nhắn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
