import React from "react";
import { Helmet } from "react-helmet";

const AdminView = () => {
  return (
    <div className="app">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4 card">
          <div className="container-xl">
            <div className="card-body">
              <h1 className="app-page-title">Overview</h1>

              <div className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration">
                <div className="inner">
                  <div className="app-card-body p-3 p-lg-4">
                    <h3 className="mb-3">Welcome, Admin!</h3>
                    <div className="row gx-5 gy-3">
                      <div className="col-12 col-lg-9">
                        <div>
                          Welcome to the admin page have a nice day..., Please
                          be careful with your operations.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
