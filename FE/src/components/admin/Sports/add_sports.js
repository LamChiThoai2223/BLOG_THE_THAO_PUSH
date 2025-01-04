import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addSport } from "../../../services/Sports";
import { apiUrl } from "../../../config/Api";
import { useNavigate } from "react-router-dom";
import { uploadFilesToFirebase } from "../../../services/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const SportsAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const watchedFiles = watch("images"); // Đảm bảo đồng bộ với tên input
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (watchedFiles && watchedFiles.length) {
      const fileArray = Array.from(watchedFiles);
      setImages(fileArray);
      setImagePreviews(fileArray.map((file) => URL.createObjectURL(file)));
    }
  }, [watchedFiles]);
  const onFileUploadHandler = (event) => {
    const files = event.target.files;
    setImages(Array.from(files));
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newImages.map((file) => URL.createObjectURL(file))); // Cập nhật previews

    const dataTransfer = new DataTransfer();
    newImages.forEach((file) => dataTransfer.items.add(file));
    document.getElementById("sport-image").files = dataTransfer.files;
  };

  const showImages = () => (
    <div className="row">
      {imagePreviews.map((preview, index) => (
        <div
          key={index}
          className="col-12 col-sm-6 col-md-3 col-lg-2 mb-4 mt-3 position-relative"
        >
          <div
            className="card shadow-sm border-light rounded"
            style={{ width: "150px" }}
          >
            <img
              src={preview}
              className="card-img-top"
              alt={`Preview ${index}`}
              style={{
                objectFit: "cover",
                height: "100px",
                width: "150px",
                borderTopLeftRadius: "0.25rem",
                borderTopRightRadius: "0.25rem",
              }}
            />
            <div className="card-body">
              <h5 className="card-title text-truncate">{images[index].name}</h5>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              onClick={() => removeImage(index)}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <i
                className="bi bi-x-circle-fill"
                style={{ fontSize: "1.5rem", color: "#ffff" }}
              ></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const sportsSubmit = async (data) => {
    try {
      const imageObjects = await uploadFilesToFirebase(images);
      const sportsData = {
        name: data.name,
        description: data.description,
        images: imageObjects,
      };

      await addSport(apiUrl, sportsData);
      toast.success("Sport added successfully!", { autoClose: 1000 }); 
      setTimeout(() => {
        navigate("/admin/sports/list"); 
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to add sport!", { autoClose: 1000 });
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Create Sports</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="">
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card shadow-sm p-4">
                  <span className="profile-info-author-title">Add Sport</span>
                  <hr className="mb-4" />
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(sportsSubmit)}
                      >
                        <div className="mb-3">
                          <label htmlFor="sport-name" className="form-label">
                            Sport Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            id="sport-name"
                            placeholder="Enter the sport name"
                            {...register("name", {
                              required: "Sport name is required",
                            })}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name.message}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="sport-description"
                            className="form-label"
                          >
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className={`form-control ${
                              errors.description ? "is-invalid" : ""
                            }`}
                            id="sport-description"
                            rows="5"
                            style={{ height: "150px" }}
                            placeholder="Enter sport description"
                            {...register("description", {
                              required: "Description is required",
                            })}
                          ></textarea>
                          {errors.description && (
                            <div className="invalid-feedback">
                              {errors.description.message}
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="sport-image" className="form-label">
                            Images <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={onFileUploadHandler}
                            className={`form-control ${
                              errors.images ? "is-invalid" : ""
                            }`}
                            {...register("images", {
                              required: "Images are required",
                            })}
                            id="sport-image"
                          />
                          {errors.images && (
                            <div className="invalid-feedback">
                              {errors.images.message}
                            </div>
                          )}
                          {showImages()}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SportsAdd;
