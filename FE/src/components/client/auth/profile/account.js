import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserProfile,
  getUserGoogleProfile,
  logout,
  updateProfile,
} from "../../../../services/Auth";
import { uploadFileUser } from "../../../../services/Firebase";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Breadcrumb } from "react-bootstrap";
import { RegisterAuthorModal } from "../../../Dialog";
import {
  confirmAuthor,
  sendEmailRegisterAuthor,
} from "../../../../services/Users";
import { apiUrl } from "../../../../config/Api";
import { Helmet } from "react-helmet";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";

const UserProfile = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [user, setUser] = useState({});
  const [cookies, removeCookie] = useCookies(["token"]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  const fetchUser = async () => {
    try {
      let data;
      try {
        data = await getUserProfile(cookies.token);
      } catch (e) {
        console.log("Regular login failed, trying Google login...");
        data = await getUserGoogleProfile(cookies.token);
      }

      setUser(data);
      if (data) {
        setValue("full_name", data.full_name);
        setValue("email", data.email);
        setEmail(data.email || "");
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("bio", data.bio);
        setImagePreview(data.image_user || "");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data.");
      setLoading(false);
      navigate("/login");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (file) {
      try {
        const uploadedUrl = await uploadFileUser(file);
        setUrl(uploadedUrl);
      } catch (error) {
        console.error("Failed to upload file:", error);
      }
    }
  };
  const submit = async (value) => {
    const profile = {
      full_name: value.full_name,
      email: value.email,
      phone: value.phone,
      bio: value.bio,
      address: value.address,
      image_user: value?.image[0]?.name,
    };
    handleUpload();
    try {
      const data = await getUserProfile(Cookies.get("token"));
      await updateProfile(data.user_id, profile);
      toast.success("Updated user successfully!", { autoClose: 1000 });
      setTimeout(() => {
        fetchUser();
      }, 1000);
    } catch (err) {
      toast.error("Updated user errors!", { autoClose: 1000 });
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await logout(token); // Gửi token khi logout
      }
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("token", { path: "/admin" });
      Cookies.remove("role", { path: "/admin" });
      toast.success("Log Out successful!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsLoggedIn(true);

      getUserProfile(token)
        .then((user) => {
          setUserId(user.user_id);
          setUserData(user);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          setError("Failed to fetch user info. Please log in again.");
          navigate("/login");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  const handleRegisterAuthor = async () => {
    console.log(user);

    if (userId) {
      try {
        const result = await confirmAuthor(apiUrl, userId, reason, setUserData);
        if (result.success) {
          sendEmailRegisterAuthor(
            user.username,
            user.email,
            reason,
            () => {
              toast.success("Submitted author registration successfully!");
            },
            (error) => {
              toast.error(`Failed to send email: ${error}`);
            }
          );
          toast.success("Registered as author successfully!");
          setShowRegisterModal(false);
        }
      } catch (error) {
        toast.error(`Failed to register as author: ${error.message}`);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">
              Personal Information
            </span>
            <div className="profile-info-right mt-3">
              <div className="main-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row gutters-sm">
                  <div className="col-md-12">
                    <Card className="mb-3">
                      <Card.Body>
                        
                        <form onSubmit={handleSubmit(submit)}>
                          {/* Full Name */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-sm-3 col-form-label">
                              Fullname
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.full_name ? "is-invalid" : ""
                                }`}
                                {...register("full_name", {
                                  required: "Full name is required",
                                })}
                              />
                              {errors.full_name && (
                                <div className="invalid-feedback">
                                  {errors.full_name.message}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-sm-3 col-form-label">
                              Phone
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.phone ? "is-invalid" : ""
                                }`}
                                {...register("phone", {
                                  required: "Phone number is required",
                                })}
                              />
                              {errors.phone && (
                                <div className="invalid-feedback">
                                  {errors.phone.message}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bio */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-sm-3 col-form-label">
                              Bio
                            </label>
                            <div className="col-sm-9">
                              <textarea
                                className={`form-control ${
                                  errors.bio ? "is-invalid" : ""
                                }`}
                                {...register("bio")}
                                rows="3"
                                style={{ height: "80px" }}
                              />
                              {errors.bio && (
                                <div className="invalid-feedback">
                                  {errors.bio.message}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Address */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-sm-3 col-form-label">
                              Address
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.address ? "is-invalid" : ""
                                }`}
                                {...register("address")}
                              />
                              {errors.address && (
                                <div className="invalid-feedback">
                                  {errors.address.message}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Image */}
                          <div className="row mb-3 align-items-center mb-5">
                            <label className="col-sm-3 col-form-label">
                              Image
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="file"
                                name="up_hinh"
                                className="form-control"
                                {...register("image", {})}
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn buttonColorGayItem"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn buttonColorGreenItem"
                          >
                            Add Articles
                          </button>
                        </form>
                      </Card.Body>
                    </Card>
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

export default UserProfile;
