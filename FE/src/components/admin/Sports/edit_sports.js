import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSportDetails, updateSport } from "../../../services/Sports";
import { uploadFilesToFirebase } from "../../../services/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const SportsEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const watchedFiles = watch("images");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  console.log("imgage ======", initialImages);

  useEffect(() => {
    if (watchedFiles && watchedFiles.length) {
      const fileArray = Array.from(watchedFiles).filter(
        (file) => file instanceof File
      );
      setImages(fileArray);
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews); 
    }
  }, [watchedFiles]);

  useEffect(() => {
    const fetchSportData = async () => {
      try {
        const response = await fetchSportDetails(id);
        const sport = response.data[0];
        setValue("name", sport.name);
        setValue("description", sport.description);
        setValue("images", sport.images);

        if (sport.images) {
          try {
            const parsedImages = JSON.parse(sport.images);
            const validImages = parsedImages.map((image) =>
              image.replace(/(^")|("$)/g, "")
            );
            setInitialImages(validImages);
            setImagePreviews(validImages);
          } catch (error) {
            console.error("Error parsing images JSON:", error);
          }
        }
      } catch (err) {
        toast.error("Error when retrieving sport data");
      }
    };

    fetchSportData();
  }, [id, setValue]);

  const onFileUploadHandler = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).filter((file) => file instanceof File);
    setImages(fileArray);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    if (index < initialImages.length) {
      const updatedInitialImages = [...initialImages];
      updatedInitialImages.splice(index, 1);
      setInitialImages(updatedInitialImages);
      setImagePreviews(updatedInitialImages);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(index - initialImages.length, 1);
      setImages(updatedImages);
      const updatedPreviews = updatedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(updatedPreviews);
      const dataTransfer = new DataTransfer();
updatedImages.forEach((file) => dataTransfer.items.add(file));
      document.getElementById("sport-image").files = dataTransfer.files;
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    }
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
              <h5 className="card-title text-truncate">
                {images[index - initialImages.length]?.name ||
                  `Image ${index + 1}`}
              </h5>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              onClick={() => removeImage(index)}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <i
                className="bi bi-x-circle-fill"
                style={{ fontSize: "1.5rem", color: "red" }}
              ></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const sportsSubmit = async (data) => {
    const imageObjects =
      images.length > 0 ? await uploadFilesToFirebase(images) : initialImages;

    const updatedData = {
      name: data.name,
      description: data.description,
      images: imageObjects,
      updated_at: new Date().toISOString(),
    };

    try {
      await updateSport(id, updatedData);
      toast.success("Updated the sport successfully!");
      setTimeout(() => {
        navigate("/admin/sports/list");
      }, 1500);
    } catch (err) {
      toast.error("Error updating sport!!!");
    }
  };

  return (
    <div className="app">
      <Helmet>
        <title>Edit Sports</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Update Sport</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(sportsSubmit)}
>
                        <div className="mb-3">
                          <label htmlFor="sport-name" className="form-label">
                            Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                            id="sport-name"
                            placeholder="Football"
                            {...register("name", {
                              required: "Tên sport là bắt buộc",
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
                            style={{ height: "150px" }}
                            className={`form-control ${
                              errors.description ? "is-invalid" : ""
                            }`}
                            id="sport-description"
                            rows="5"
                            placeholder="Một sport đội phổ biến được chơi trên toàn thế giới với quả bóng tròn."
                            {...register("description", {
                              required: "Mô tả là bắt buộc",
                            })}
                          ></textarea>
                          {errors.description && (
                            <div className="invalid-feedback">
                              {errors.description.message}
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
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
                            {...register("images")}
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
                          type="submit"
                          className="btn btn-primary"
                        >{`Update Sport`}</button>
                      </form>
                      <ToastContainer />
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

export default SportsEdit;
