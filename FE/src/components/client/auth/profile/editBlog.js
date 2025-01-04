import React, { useEffect, useState } from "react";
import TextEditor from "../../../admin/TextEditor";
import TagInput from "../../../admin/Blog/Tags";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogEditDetails, updateBlog } from "../../../../services/Blog";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { fetchCategories } from "../../../../services/Category";
import { fetchSports } from "../../../../services/Sports";
import { fetchAll } from "../../../../services/Tag";
import { getUserProfile } from "../../../../services/Auth";
import { apiUrl } from "../../../../config/Api";
import { uploadFileBlog } from "../../../../services/Firebase";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";
import { uniqueId } from "lodash";
import { Helmet } from "react-helmet";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { register, control, handleSubmit, setValue, formState } = useForm();
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [categoriesData, setCategoriesData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const response = await fetchBlogEditDetails(id);
        if (!response || !response.data) {
          throw new Error("Invalid response format");
        }
        const data = response.data[0];
        const tagIds = data.tag_ids ? data.tag_ids.split(",") : [];
        console.log("API Response:", data);

        if (data) {
          if (data.content) {
            // Nếu content tồn tại, chuyển đổi và thiết lập trạng thái của trình soạn thảo
            const contentState = convertFromRaw(JSON.parse(data.content));
            setEditorContent(EditorState.createWithContent(contentState));
          }
          setValue("title", data.title || "");
          setValue("author_id", data.author_id || "");
          setValue("category_id", data.category_id || "");
          setValue("tags", tagIds);
          setValue("sport_id", data.sport_id || "");
          setValue("short_description", data.short_description);
          setImageUrl(data.image || "");
          setBlog(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      }
    };

    const getTagsList = async () => {
      try {
        const tags = await fetchAll(apiUrl, 1, setTagsData, setError);
        if (tags && tags.data) {
          setTagsList(tags.data);
          console.log(tags.data); // Kiểm tra dữ liệu tags
        } else {
          throw new Error("Invalid tags data");
        }
      } catch (error) {
        console.error("Failed to fetch tags list:", error);
      }
    };

    // Fetch danh sách tags và chi tiết blog
    getTagsList();
    getBlogDetails();
  }, [id, setValue]);

  const handleEditorChange = (editorState) => {
    setEditorContent(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join(" ");
    setValue("content", JSON.stringify(rawContentState));
    setValue("context", plainText);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadFileBlog(file);
        setImageUrl(url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const onSubmit = async (data) => {
    const updatedBlog = {
      title: data.title,
      short_description: data.short_description,
      content: JSON.stringify(convertToRaw(editorContent.getCurrentContent())),
      context: data.context,
      author_id: user?.user_id,
      category_id: data.category_id,
      tag_ids: data.tags,
      sport_id: data.sport_id,
      image: imageUrl,
    };

    try {
      await updateBlog(id, updatedBlog);
      toast.success(`Success: Blog updated successfully.`, {
        toastId: uniqueId("toast-sucess"),
        containerId: "GlobalApplicationToast",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update Blog.");
    }
  };

  useEffect(() => {
    fetchCategories(apiUrl, 1, setCategoriesData, setError);
    fetchSports(apiUrl, 1, setSportData, setError);
    fetchAll(apiUrl, 1, setTagsData, setError);

    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Edit Blog</title>
      </Helmet>
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">Edit Blog</span>
            <div className="profile-info-right mt-3">
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="title" className="form-label">
                                Blog Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                {...register("title", {
                                  required: {
                                    value: true,
                                    message: "Tên bài viết không được bỏ trống",
                                  },
                                  minLength: {
                                    value: 5,
                                    message: "Tên bài viết có ít nhất 5 ký tự",
                                  },
                                })}
                              />
                              {formState.errors?.title && (
                                <p className="text-danger">
                                  {formState.errors?.title.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="short_description"
                                className="form-label"
                              >
                                Short Description{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="short_description"
                                {...register("short_description", {
                                  required: {
                                    value: true,
                                    message: "Short Description is required",
                                  },
                                  minLength: {
                                    value: 10,
                                    message:
                                      "Short Description must be at least 10 characters",
                                  },
                                })}
                              />
                              {formState.errors?.short_description && (
                                <p className="text-danger">
                                  {formState.errors?.short_description.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="image" className="form-label">
                            Upload Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imageUrl && (
                            <div className="mt-3">
                              <img
                                src={imageUrl}
                                alt="Preview"
                                style={{ width: "100%", maxWidth: "200px" }}
                              />
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="category_id"
                                className="form-label"
                              >
                                Category <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control p-2"
                                id="category_id"
                                {...register("category_id", {
                                  required: {
                                    value: true,
                                    message: "Danh mục không được bỏ trống",
                                  },
                                })}
                              >
                                <option value="">Vui lòng chọn danh mục</option>
                                {categoriesData
                                  .filter((cate) => !cate.is_delete)
                                  .map((cate) => (
                                    <option
                                      key={cate.category_id}
                                      value={cate.category_id}
                                      selected={
                                        blog &&
                                        blog.category_id === cate.category_id
                                      }
                                    >
                                      {cate.name}
                                    </option>
                                  ))}
                              </select>
                              {formState.errors?.category_id && (
                                <p className="text-danger">
                                  {formState.errors?.category_id.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="sport_id" className="form-label">
                                Sport <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control p-2"
                                id="sport_id"
                                {...register("sport_id", {
                                  required: {
                                    value: true,
                                    message: "Thể thao không được bỏ trống",
                                  },
                                })}
                              >
                                <option value="">Vui lòng chọn thể thao</option>
                                {sportData.map((sport) => (
                                  <option
                                    key={sport.sport_id}
                                    value={sport.sport_id}
                                    selected={
                                      blog && blog.sport_id === sport.sport_id
                                    }
                                  >
                                    {sport.name}
                                  </option>
                                ))}
                              </select>
                              {formState.errors?.sport_id && (
                                <p className="text-danger">
                                  {formState.errors?.sport_id.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="tags" className="form-label">
                            Tags <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="tags"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <TagInput
                                value={field.value}
                                onChange={field.onChange}
                                tagsList={tagsList}
                              />
                            )}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="content" className="form-label">
                            Content <span className="text-danger">*</span>
                          </label>
                          <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextEditor
                                editorState={editorContent}
                                onChange={handleEditorChange}
                              />
                            )}
                          />
                          {formState.errors?.content && (
                            <p className="text-danger">
                              {formState.errors?.content.message}
                            </p>
                          )}
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
                          Edit Articles
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
      <ToastContainer
        autoClose={1000}
        closeOnClick
        pauseOnHover
        containerId="GlobalApplicationToast"
      />
    </div>
  );
};

export default EditBlog;
