import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUserDetails } from "../../../services/Users";
import "../../../assets/css/user.css";
import { Helmet } from "react-helmet";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetchUserDetails(id);
        if (response && response.data) {
          setUser(response.data); // Assuming response.data is an array with one object
        } else {
          throw new Error("Invalid data received");
        }
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch user information");
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="app">
      <Helmet>
        <title>{user.username}</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">User Detail</h1>
              <hr className="mb-4" />
              <div className="row">
                <div className="col-12 col-md-4 text-center">
                  <img
                    src={user.image_user}
                    alt="User"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h3>{user.full_name}</h3>
                  <p className="text-muted">@{user.username}</p>
                </div>
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <div className="row mb-3">
                        <div className="col-6">
                          <label className="form-label">Email</label>
                          <p className="form-control-plaintext">{user.email}</p>
                        </div>
                        <div className="col-6">
                          <label className="form-label">Phone</label>
                          <p className="form-control-plaintext">{user.phone}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label className="form-label">Address</label>
                          <p className="form-control-plaintext">
                            {user.address}
                          </p>
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            Citizen Identification Number
                          </label>
                          <p className="form-control-plaintext">{user.cccd}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label className="form-label">Role</label>
                          <p className="form-control-plaintext">{user.role}</p>
                        </div>
                        <div className="col-6">
                          <label className="form-label">Status</label> <br></br>
                          <p
                            className={`badge ${
                              user.status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {user.status}
                          </p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <label className="form-label">Bio</label>
                          <p className="form-control-plaintext">
                            {user.bio || "No information available"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <Link
                        className="btn app-btn-secondary m-2"
                        to={`/admin/users/edit/${user.user_id}`}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn app-btn-secondary ms-2"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                    </div>
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

export default UserDetail;
