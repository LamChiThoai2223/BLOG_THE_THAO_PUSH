import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  submitComment,
  fetchByIdBlog,
  deleteComment,
  editComment,
} from "../../../../services/Comment";
import {
  createParentComment,
  fetchParentComment,
  deleteParentComment,
  editParentComment,
  countParentCommentsByBlog,
} from "../../../../services/ParentComment";
import ShareBlog from "../../Share";
import {
  getLikesCount,
  toggleLike,
  likeWithUserId,
} from "../../../../services/Like";
import { fetchFriends } from "../../../../services/follow";
import { fetchBlogDetails, viewBlog } from "../../../../services/Blog";
import { fetchSportDetails } from "../../../../services/Sports";
import { fetchUserDetails } from "../../../../services/Users";
import { fetchAll as fetchAllTag } from "../../../../services/Tag";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import BlogTopic from "../topic_blog";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./style.css";
import "./comment.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../../../../config/Api";
import { ConfirmDeleteCommentModal } from "../../../Dialog";
import { uploadFileComment } from "../../../../services/Firebase";
import IMAGES_CLEINT from "../../../../assets/styles/client/images";
import moment from "moment";
import {
  getUserGoogleProfile,
  getUserProfile,
} from "../../../../services/Auth";
import { Helmet } from "react-helmet";
import { formatDistanceToNow } from "date-fns";
import Paginator from "../../../admin/Paginator";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFriendId, setSelectedFriendIds] = useState([]);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(null); // State for image
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [tagNames, setTagNames] = useState({});
  const [sportNames, setSportNames] = useState({});
  const [userNames, setUserNames] = useState({});
  const [userImages, setUserImages] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteParentModal, setShowDeleteParentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [parentCommentToDelete, setParentCommentToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editReplyId, setEditReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user_id, setUserId] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [blogID, setBlogID] = useState([]);
  const blogUrl = `blog/detail${id}`;
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [parentComment, setParentComment] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [newParentComment, setNewParentComment] = useState(false);
  const [replyToUserId, setReplyToUserId] = useState(null);
  const [idReply, setIdReply] = useState("");
  const [countParentComment, setCountParentComment] = useState(0);
  const [editReplyImage, setEditReplyImage] = useState(null);
  const [editCommentImage, setEditCommentImage] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const [sensitiveMessage, setSensitiveMessage] = useState(""); // State quản lý thông báo nhạy cảm
  const [response, setResponse] = useState(null); // Lưu phản hồi từ backend
  const [replyResponse, setReplyResponse] = useState(null); // State to store reply response
  const [isFormOpen, setIsFormOpen] = useState(true); // Track if the form is open
  const [friendsData, setFriends] = useState([]);
  const [messageData, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReport, setIsModalOpenReport] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const reportReasons = [
    "Inappropriate content, including offensive language",
    "Impersonation of individuals, brands, or organizations",
    "User may be under 16 years old and violating platform",
    "Fraudulent activities, including scams and deceptive",
    "Counterfeit products and violations of intellectual",
    "Other reasons (please specify)",
  ];
  

  const handleSelectReason = (reason) => {
    setSelectedReason(reason);
    if (reason === "Other reasons (please specify)") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFriendClick = (friendId) => {
    setSelectedFriendIds((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId]
    );
  };
  const fetchFrend = async (page) => {
    try {
      const response = fetchFriends(apiUrl, user_id, page, setFriends);
      if (!response.ok) {
        throw new Error("Có lỗi khi lấy danh sách bạn bè");
      }
      setFriends(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async (receiverIds, blogId, message) => {
    try {
      let allSuccess = true;
      for (let receiverId of receiverIds) {
        const response = await fetch(`${apiUrl}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_id: user_id,
            receiver_id: receiverId,
            blog_id: blogId,
            message: message.trim() || null,
          }),
        });
        if (!response.ok) {
          console.error("Failed to send message to", receiverId);
          allSuccess = false;
        }
      }

      if (allSuccess) {
        toast.success("Share the article successfully.", {
          autoClose: 700,
        });
        setMessage("");
        setIsModalOpen(false);
        document.body.classList.remove("modal-open");
      }

      console.log("Messages sent successfully to all selected friends!");

    } catch (error) {
      console.error("Error sending messages:", error);
    }
  };


  const handleSendReports = async (blogId, reason) => {
    try {
      const response = await fetch(`${apiUrl}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blogId,
          userId: user_id, // Kiểm tra lại giá trị của user_id
          reason: reason.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Report the article successfully.", {
          autoClose: 700,
        });
        setIsModalOpenReport(false);
        document.body.classList.remove("modal-open");
      } else {
        const errorData = await response.json();
        console.error("Failed to send report:", errorData.message);
      }
    } catch (error) {
      console.error("Error sending report:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };
  const openModalReport = () => {
    setIsModalOpenReport(true);
    document.body.classList.add("modal-open");
  };

  const closeModalReport = () => {
    setIsModalOpenReport(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    if (user_id) {
      fetchFrend();
    }
  }, [user_id]);

  const loadComments = async (page = 1) => {
    setLoadingComment(true);
    await fetchByIdBlog(
      id,
      setComments,
      setError,
      setTotalComments,
      page,
      limit,
      true
    );
    setLoadingComment(false);
  };

  const handleFetchParentComment = async (comment_id) => {
    await fetchParentComment(
      comment_id,
      (parentCommentData) => {
        setParentComment((prev) => ({
          ...prev,
          [comment_id]: parentCommentData,
        }));
      },
      setError
    );
  };

  const toggleReplies = (comment_id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [comment_id]: !prev[comment_id],
    }));
  };

  useEffect(() => {
    loadComments(currentPage);
  }, [currentPage]);
  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        handleFetchParentComment(comment.comment_id);
      });
    }
  }, [comments]);

  useEffect(() => {
    countParentCommentsByBlog(id, setCountParentComment, setError);
  });

  useEffect(
    () => {
      const getBlogDetails = async () => {
        try {
          const response = await fetchBlogDetails(id);
          if (response && response.data && response.data.length > 0) {
            const blogData = response.data[0];
            const rawContentState = JSON.parse(blogData.content);
            const contentState = convertFromRaw(rawContentState);
            const htmlContent = stateToHTML(contentState);
            setBlog({
              ...blogData,
              content: htmlContent,
            });

            setBlogID(blogData.blog_id);

            fetchByIdBlog(
              id,
              setComments,
              setError,
              setTotalComments,
              offset,
              limit
            );
          } else {
            setError("Không tìm thấy dữ liệu");
          }
        } catch (err) {
          setError(err.message);
        }
      };

      const getCurrentUser = () => {
        const token = Cookies.get("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
          } catch (e) {
            console.error("Invalid token", e);
            Cookies.remove("token");
            setCurrentUser(null);
          }
        }
      };

      const handleViewBlog = () => {
        const token = Cookies.get("token");
        if (token) {
          setIsLoggedIn(true);
          Promise.allSettled([
            getUserProfile(token),
            getUserGoogleProfile(token),
          ])
            .then((results) => {
              const userProfileResult = results.find(
                (result) =>
                  result.status === "fulfilled" && result.value.username
              );

              if (userProfileResult) {
                const user = userProfileResult.value;
                setUserId(user.user_id || "user_id");
                setTimeout(() => {
                  viewBlog(id, user.user_id).catch((err) => {
                    console.error("Failed to record blog view:", err);
                  });
                }, 10000);
                // Call the viewBlog API
              } else {
                throw new Error("Failed to fetch user info");
              }
            })
            .catch((err) => {
              console.error("Failed to fetch user info:", err);
              setError("Failed to fetch user info. Please log in again.");
              navigate("/login");
            });
        } else {
          setIsLoggedIn(false);
          setUserId("");
        }
      };
      const likeUserId = () => {
        const token = Cookies.get("token");
        if (token) {
          setIsLoggedIn(true);
          Promise.allSettled([
            getUserProfile(token),
            getUserGoogleProfile(token),
          ])
            .then((results) => {
              const userProfileResult = results.find(
                (result) =>
                  result.status === "fulfilled" && result.value.username
              );

              if (userProfileResult) {
                const user = userProfileResult.value;

                likeWithUserId(id)
                  .then((response) => {
                    const userIdInResponse = findUserId(
                      response.data,
                      user.user_id
                    );

                    if (userIdInResponse) {
                      console.log("User has already liked the post");
                      setLiked(true);
                    } else {
                      console.log("User has not liked the post");
                      setLiked(false);
                    }
                  })
                  .catch((error) => {
                    console.error("Error calling likeWithUserId:", error);
                  });
              } else {
                throw new Error("Failed to fetch user info");
              }
            })
            .catch((err) => {
              console.error("Failed to fetch user info:", err);
              setError("Failed to fetch user info. Please log in again.");
              navigate("/login");
            });
        } else {
          setIsLoggedIn(false);
          setUserId("");
        }
      };
      const findUserId = (data, userId) => {
        if (Array.isArray(data)) {
          return data.find((item) => item.user_id === userId);
        } else if (data && typeof data === "object") {
          return Object.values(data).find((item) => item.user_id === userId);
        }
        return null;
      };

      likeUserId();
      getCurrentUser();
      getBlogDetails();
      handleViewBlog();
    },
    [id, offset, limit],
    [navigate],
    [page, showMore]
  );

  useEffect(() => {
    if (showLoginMessage) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      if (countdown === 0) {
        navigate("/login");
      }
      return () => clearInterval(countdownInterval);
    }
  }, [showLoginMessage, countdown, navigate]);

  useEffect(() => {
    if (blog && blog.sport_id && blog.author_id && blog.tag_ids) {
      const fetchAdditionalData = async () => {
        try {
          // Prepare promises to fetch additional data
          const sportPromises = [
            fetchSportDetails(blog.sport_id).then((data) => ({
              id: blog.sport_id,
              name: data.data[0].name,
            })),
          ];
          const userPromises = [
            fetchUserDetails(blog.author_id).then((data) => ({
              id: blog.author_id,
              name: data.data?.full_name,
              image: data.data?.image_user,
            })),
          ];

          const tagIds = blog.tag_ids.split(",").map((id) => parseInt(id, 10));
          const tagPromises = tagIds.map((tagId) =>
            fetchAllTag(
              apiUrl,
              1,
              () => { },
              () => { }
            ).then((data) => {
              const tag = data.find((t) => t.tag_id === tagId);
              return tag ? { id: tag.tag_id, name: tag.name } : null;
            })
          );

          const [sportResults, userResults, tagResults] = await Promise.all([
            Promise.all(sportPromises),
            Promise.all(userPromises),
            Promise.all(tagPromises),
          ]);

          const sportMap = sportResults.reduce(
            (acc, { id, name }) => ({ ...acc, [id]: name }),
            {}
          );
          const userMap = userResults.reduce(
            (acc, { id, name }) => ({ ...acc, [id]: name }),
            {}
          );
          const userImageMap = userResults.reduce(
            (acc, { id, image }) => ({ ...acc, [id]: image }),
            {}
          );
          const tagMap = tagResults.reduce(
            (acc, { id, name }) => ({ ...acc, [id]: name }),
            {}
          );

          setSportNames(sportMap);
          setUserNames(userMap);
          setUserImages(userImageMap);
          setTagNames(tagMap);
        } catch (error) {
          console.error("Failed to fetch additional data:", error);
        }
      };

      fetchAdditionalData();
    }
  }, [blog]); // Only trigger this effect when blog is updated

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const result = await getLikesCount(id); // Dùng id nếu postId không đúng
        const count = Number(result.likesCount);
        if (!isNaN(count)) {
          setLikesCount(count);
        } else {
          console.error("Invalid likes count:", result.likesCount);
        }
      } catch (error) {
        console.error("Failed to fetch likes count:", error);
      }
    };

    fetchLikesCount();
  }, [id]); // Sử dụng id của bài viết

  // Hàm để xử lý toggle like
  const handleToggleLike = async () => {
    if (currentUser) {
      try {
        const response = await toggleLike(id, currentUser.id);
        if (response.liked) {
          setLikesCount(likesCount + 1); // Thêm một lượt like
          setLiked(true);
        } else {
          setLikesCount(likesCount - 1); // Xóa một lượt like
          setLiked(false);
        }
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    } else {
      setShowLoginMessage(true);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleShowDeleteModal = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const handleShowParentDeleteModal = (commentId) => {
    setParentCommentToDelete(commentId);
    setShowDeleteParentModal(true);
  };

  const handleCloseParentDeleteModal = () => {
    setShowDeleteParentModal(false);
    setParentCommentToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const handleDeleteComment = async () => {
    if (commentToDelete) {
      try {
        await deleteComment(
          apiUrl,
          commentToDelete,
          async (data) => {
            setParentComment(data);
            setTotalComments((prevTotal) => prevTotal - 1);
          },
          setError,
          setTotalComments
        );
        handleCloseDeleteModal();
        loadComments(currentPage);
        if (comments.length > 0) {
          comments.forEach((comment) => {
            handleFetchParentComment(comment.comment_id);
          });
        }
        toast.success("Delete Comment Successfully.", {
          autoClose: 700,
        });
      } catch (error) {
        console.error(`Error deleting comment: ${error.message}`);
        setError("An error occurred while deleting the comment.");
      }
    }
  };

  const handleDeleteParentComment = async () => {
    if (parentCommentToDelete) {
      try {
        await deleteParentComment(
          parentCommentToDelete,
          async (data) => {
            setComments(data);
            setTotalComments((prevTotal) => prevTotal - 1);
          },
          setError,
          setTotalComments
        );
        handleCloseParentDeleteModal();
        toast.success("Delete Comment Successfully.", {
          autoClose: 700,
        });
      } catch (error) {
        console.error(`Error deleting comment: ${error.message}`);
        setError("An error occurred while deleting the comment.");
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    const token = Cookies.get("token");
    if (!token) {
      setShowLoginMessage(true);
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadFileComment(image);
      } catch (uploadError) {
        setError("Error uploading image: " + uploadError.message);
        return;
      }
    }

    const commentData = {
      blog_id: id,
      content: newComment,
      is_delete: 0,
      user_id: userId,
      image_url: imageUrl,
    };

    try {
      await submitComment(
        commentData,
        async (response) => {
          setResponse(response); // Save successful response to state
          // Automatically clear the response message after 3 seconds
          setTimeout(() => setResponse(""), 5000);

          setNewComment("");
          setImage(null);
          document.querySelector('input[type="file"]').value = "";
          await loadComments(1);
          setCurrentPage(1);
          if (comments.length > 0) {
            comments.forEach((comment) => {
              handleFetchParentComment(comment.comment_id);
            });
          }
          setSensitiveMessage(""); // Reset sensitive content message
        },
        (errorMessage) => {
          console.log("Error Message: ", errorMessage);
          if (
            errorMessage.includes("Bình luận của bạn chứa nội dung độc hại")
          ) {
            setSensitiveMessage(errorMessage); // Show sensitive content message
          } else {
            setError(errorMessage); // Show general error message
          }
        }
      );
    } catch (error) {
      console.log("Error in submitComment:", error);
      setError(error.response?.data?.error || error.message);
    }
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };
  const handleReplySubmit = async (e, parentCommentId, user_id) => {
    e.preventDefault();
    if (!replyContent) return; // Không gửi nếu không có nội dung trả lời

    const token = Cookies.get("token");
    if (!token) {
      setShowLoginMessage(true); // Hiển thị thông báo yêu cầu đăng nhập nếu không có token
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id; // Lấy userId từ token đã giải mã

    let imageUrl = "";
    if (image) {
      try {
        imageUrl = await uploadFileComment(image); // Upload ảnh nếu có
      } catch (uploadError) {
        setError("Error uploading image: " + uploadError.message); // Xử lý lỗi khi upload ảnh
        return;
      }
    }

    const parentCommentData = {
      comment_id: parentCommentId,
      content: replyContent,
      is_delete: 0,
      user_id: userId,
      image_url: imageUrl,
      reply_to_user_id: user_id,
    };

    try {
      await createParentComment(
        parentCommentData,
        async (response) => {
          setReplyResponse(response); // Lưu phản hồi thành công vào state
          setTimeout(() => setReplyResponse(""), 5000);
          setReplyContent(""); // Xóa nội dung trả lời
          setImage(null); // Reset ảnh

          // Reset input file
          const fileInput = document.querySelector(
            `input[type="file"][data-id="${parentCommentId}"]`
          );
          if (fileInput) {
            fileInput.value = ""; // Reset giá trị file input nếu tìm thấy
          } else {
            console.warn(
              `Không tìm thấy input file với data-id "${parentCommentId}"`
            );
          }

          // Reload comments sau khi trả lời thành công
          if (comments.length > 0) {
            comments.forEach((comment) => {
              handleFetchParentComment(comment.comment_id); // Fetch parent comment cho mỗi bình luận
            });
          }
        },
        (errorMessage) => {
          setError(errorMessage); // Xử lý lỗi từ API
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error); // Log lỗi không mong muốn
      setError(error.message); // Xử lý lỗi bất ngờ
    }
  };

  const handleReplyInCommentSubmit = async (e, parentCommentId, user_id) => {
    e.preventDefault();
    setReplyToUserId(null);
    if (!replyContent) return;

    const token = Cookies.get("token");
    if (!token) {
      setShowLoginMessage(true);
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadFileComment(image);
    }

    const parentCommentData = {
      comment_id: parentCommentId,
      content: replyContent,
      is_delete: 0,
      user_id: userId,
      image_url: imageUrl,
      reply_to_user_id: user_id,
    };

    try {
      await createParentComment(
        parentCommentData,
        async () => {
          setReplyContent("");
          setReplyingTo(null);
          setImage(null);

          const inputFile = document.querySelector(
            `input[type="file"][data-id="${parentCommentId}"]`
          );
          if (inputFile) {
            inputFile.value = "";
          }
          if (comments.length > 0) {
            comments.forEach((comment) => {
              handleFetchParentComment(comment.comment_id);
            });
          }
        },
        setError
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = editCommentImage;
    if (image) {
      imageUrl = await uploadFileComment(image);
      setEditCommentImage(imageUrl); // Update image state here
    }

    const commentData = {
      content: editCommentContent,
      image_url: imageUrl,
    };

    try {
      await new Promise((resolve, reject) => {
        editComment(apiUrl, editCommentId, commentData, resolve, reject);
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.comment_id === editCommentId
            ? { ...comment, content: editCommentContent, image_url: imageUrl }
            : comment
        )
      );

      // Reset fields after state update
      setImage(null);
      setEditCommentId(null);
      setEditCommentContent("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditReply = (replyId, content) => {
    setEditReplyId(replyId);
    setEditReplyContent(content);
  };

  const handleEditReplySubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    imageUrl = editReplyImage;
    if (image) {
      imageUrl = await uploadFileComment(image);
    }
    console.log(imageUrl);
    const replyData = {
      content: editReplyContent,
      image_url: imageUrl,
    };

    try {
      await new Promise((resolve, reject) => {
        editParentComment(apiUrl, editReplyId, replyData, resolve, reject);
      });
      setImage(null);
      imageUrl = undefined;
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.comment_id === editReplyId) {
            return { ...comment, content: editReplyContent };
          }
          return comment;
        })
      );
      setEditReplyId(null);
      setEditReplyContent("");
    } catch (error) {
      setError(error.message);
    }
  };
  const goToAuthorPage = (userId) => navigate(`/author/${userId}`);

  const handleReplyClick = (commentId) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.info("Please log in to your account !!", {
        autoClose: 700,
      });
      navigate("/login");
    } else {
      setReplyingTo(replyingTo === commentId ? null : commentId);
      setReplyToUserId(replyToUserId === null);
    }
  };

  const handleParentCommentClick = (replyId, userId) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.info("Please log in to your account !!", {
        autoClose: 700,
      });
      navigate("/login");
    } else {
      setReplyToUserId(replyToUserId === replyId ? null : replyId);
      setReplyingTo(null);
      setIdReply(userId);
    }
  };
  const handleCancelClick = () => {
    setReplyContent(""); // Reset the content
    setIsFormOpen(false); // Close the form
  };

  if (!isFormOpen) return null; // Do not render the form if it's closed
  const mainComments = comments.filter((c) => !c.parent_comment_id);
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <article>
                <ul className="post-meta mb-2 mt-4">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      style={{ marginRight: "5px", marginTop: "-4px" }}
                      className="text-dark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 10.5A.5.5 0 0 1 6 10h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                    </svg>
                    <span>{moment(blog.created_at).format("DD/MM/YYYY")}</span>
                  </li>
                </ul>
                <h1 className="my-3">{blog.title}</h1>
                <div className="d-flex justify-content-end">
                  <ul className="post-meta mb-2">
                    {blog.tag_ids &&
                      blog.tag_ids.split(",").map((tagId) => (
                        <li key={tagId}>
                          <Link to={`/blog/tag/${tagId}`}>
                            #{tagNames[tagId]}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <Helmet>
                    <title>{blog.title}</title>
                  </Helmet>
                  <div className="d-flex align-items-center ms-auto">
                    <img
                      src={
                        userImages[blog.author_id] ||
                        "https://bootdey.com/img/Content/avatar/avatar1.png"
                      }
                      alt="Author"
                      className="rounded-circle"
                      width="30"
                      height="30"
                    />
                    <span className="ms-2">{userNames[blog.author_id]}</span>
                  </div>
                </div>
                <span className="badge bg-secondary">
                  {sportNames[blog.sport_id]}
                </span>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                {showLoginMessage && (
                  <div className="alert alert-warning">
                    Please log in to use full functionality. Automatically go to
                    login in{" "}
                    <span style={{ color: "red" }}>({countdown}s)</span>
                  </div>
                )}

                {/* Nút Like */}
                <div className="shadow p-3">
                  <div>
                    {error ? (
                      <p>Lỗi: {error}</p>
                    ) : (
                      <div className="likesText">
                        People who liked this post: {likesCount}
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-start mt-2">
                    <motion.button
                      type="button"
                      onClick={handleToggleLike}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "1.2rem",
                        marginTop: "10px",
                        width: "40px",
                        height: "40px",
                        border: "2px solid green",
                        backgroundColor: liked ? "green" : "white",
                        color: liked ? "white" : "green",
                        transition: "background-color 0.3s, color 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50px",
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        backgroundColor: liked ? "green" : "white",
                      }}
                    >
                      <motion.i
                        className="fas fa-thumbs-up"
                        initial={{ scale: 1 }}
                        animate={{ scale: liked ? 1.2 : 1 }}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        style={{ fontSize: "1.2rem" }}
                      ></motion.i>
                    </motion.button>
                    <ShareBlog
                      blogUrl={`blog/detail/${blog.blog_id}`}
                      blogTitle={blog?.title}
                      blogContent={blog?.content}
                      blogImg={blog?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                    />

                    {/* // Nút Share */}
                    <div className="col-lg-4 chatSendMess">
                      <button
                        type="button"
                        className="btn btn-icon buttonSendChat"
                        onClick={openModal}
                      >
                        <div class="d-flex align-items-center">
                          <div class="icon-circle">
                            <i class="fas fa-paper-plane"></i>
                          </div>
                          <div class="ms-2 textSend">Share with friends</div>
                        </div>
                      </button>

                      {isModalOpen && (
                        <div className="modal-Share" onClick={closeModal}></div>
                      )}
                      {isModalOpen && (
                        <div
                          className="modal fade show"
                          style={{ display: "block" }}
                          tabIndex="-1"
                          aria-labelledby="friendModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-header">
                                <p
                                  className="modal-title fs-5 fw-bold"
                                  id="friendModalLabel"
                                >
                                  Send to friends
                                </p>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={closeModal}
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="modal-body p-4">
                                <div>
                                  <p className="modal-title fs-6 fw-bold mb-3">
                                    Friends
                                  </p>
                                  <div className="sendFriendMess">
                                    {friendsData.map((friend) => (
                                      <div
                                        key={friend.user_id}
                                        className={`d-flex align-items-center borderFriend p-1 gap-1 ${selectedFriendId.includes(
                                          friend.user_id
                                        )
                                          ? "activeSendMess"
                                          : ""
                                          }`}
                                        onClick={() =>
                                          handleFriendClick(friend.user_id)
                                        }
                                      >
                                        <img
                                          src={
                                            friend.image_user ||
                                            "https://placehold.co/50x50"
                                          }
                                          className="rounded-circle me-2"
                                          alt="Avatar"
                                          style={{
                                            width: "45px",
                                            height: "45px",
                                          }}
                                        />
                                        <div className="flex-grow-1">
                                          <div className="sendFullName">
                                            {friend.full_name}
                                          </div>
                                          <small>{friend.username}</small>
                                        </div>
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={selectedFriendId.includes(
                                            friend.user_id
                                          )}
                                          readOnly
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="modal-footer footerChat">
                                <div className="col-12 d-flex justify-content-between">
                                  <div className="col-8">
                                    <textarea
                                      className="form-control mb-2"
                                      placeholder="Write a message..."
                                      rows="2"
                                      value={messageData}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                  <div className="col-2">
                                    <img
                                      src={
                                        blog?.image ||
                                        "https://placehold.co/80x80"
                                      }
                                      className="rounded"
                                      alt="Avatar"
                                      style={{ width: "80px", height: "80px" }}
                                    />
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-danger w-100 rounded-3"
                                  onClick={() =>
                                    handleSendMessage(
                                      selectedFriendId,
                                      blog?.blog_id,
                                      messageData
                                    )
                                  }
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* nút report */}
                    <div className="col-lg-4 chatSendMess">
                      <button
                        type="button"
                        className="btn btn-icon buttonSendChat"
                        onClick={openModalReport}
                      >
                        <div className="d-flex align-items-center">
                          <div className="icon-circleReport pt-2">
                            <i class="bi bi-flag fs-5"></i>
                          </div>
                          <div className="ms-2 textSend">Report with post</div>
                        </div>
                      </button>
                      {isModalOpenReport && (
                        <div
                          className="modal-Share"
                          onClick={closeModalReport}
                        ></div>
                      )}
                      {isModalOpenReport && (
                        <div
                          className="modal fade show"
                          style={{ display: "block" }}
                          tabIndex="-1"
                          aria-labelledby="reportModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-header">
                                <p
                                  className="modal-title fs-5 fw-bold"
                                  id="reportModalLabel"
                                >
                                  Report
                                </p>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={closeModalReport}
                                  aria-label="Close"
                                ></button>
                              </div>

                              <div className="p-3">
                                <div className="report-title">
                                  Please select a reason
                                </div>
                                {reportReasons.map((reason, index) => (
                                  <div
                                    key={index}
                                    className={`report-list-item ${selectedReason === reason
                                      ? "selected"
                                      : ""
                                      }`}
                                    onClick={() => handleSelectReason(reason)}
                                  >
                                    {reason}
                                    {reason === "Other reasons (please specify)" && (
                                      <i className="report-icon fas fa-chevron-right"></i>
                                    )}
                                  </div>
                                ))}
                                {isOtherSelected && (
                                  <div className="report-content">
                                    <p>We do not allow content that:</p>
                                    <ul>
                                      <li>
                                        Our priority is to provide a safe and
                                        compassionate environment. We also
                                        encourage genuine engagement by removing
                                        fraudulent content and accounts from the
                                        platform. Select this option if the
                                        reason you're reporting doesn't fall
                                        into any of the listed categories.
                                      </li>
                                    </ul>
                                  </div>
                                )}
                                <div className="modal-footer footerChat">
                                  <button
                                    type="button"
                                    className="btn btn-danger w-100 rounded-3"
                                    onClick={() =>
                                      handleSendReports(
                                        blog?.blog_id,
                                        selectedReason
                                      )
                                    }
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-lg-4">
              <BlogTopic blogID={blogID} />
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="col-md-8">
          <h2 className="section-title mb-3">
            Comments ({totalComments + countParentComment})
          </h2>
          <div className="comment-form">
            {response && response.message && (
              <div className="alert alert-danger">{response.message}</div>
            )}

            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control border-primary"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={handleCommentChange}
                  style={{
                    maxHeight: "100%",
                    height: "auto",
                  }}
                ></textarea>
              </div>
              <div className="form-group file-input-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control-file"
                />
                <button
                  className={`btn btn-primary ${newComment.trim() ? "active" : "disabled"
                    }`}
                  type="submit"
                  disabled={!newComment.trim()}
                >
                  Comment
                </button>
              </div>
            </form>
          </div>

          {mainComments.length > 0 ? (
            mainComments.map((comment) => (
              <div key={comment.comment_id} className="media-block pad-all">
                <div className="media-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="m-2 d-flex align-items-center">
                      <a
                        className="media-left d-flex text-success text-decoration-none pe-auto"
                        onClick={() => goToAuthorPage(comment.user_id)}
                        style={{ marginRight: "5%" }}
                      >
                        {comment.image_user ? (
                          <img
                            className="img-circle img-sm"
                            src={comment.image_user}
                            alt=""
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <img
                            className="img-circle img-sm"
                            src={IMAGES_CLEINT.user_logo}
                            alt="User icon"
                            style={{ borderRadius: "50%" }}
                          />
                        )}
                        <div className="btn-link text-semibold m-2 media-heading box-inline d-flex text-comment">
                          {comment.username}
                        </div>
                      </a>
                    </div>
                    <div>
                      <span
                        className="text-muted small"
                        style={{ marginRight: "18px" }}
                      >
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  {editCommentId === comment.comment_id ? (
                    <form
                      onSubmit={handleEditCommentSubmit}
                      className="edit-reply-form"
                    >
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Edit your comment..."
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                        ></textarea>

                        <div className="d-flex flex-column w-100">
                          {editCommentImage && (
                            <div
                              className="existing-image-wrapper"
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={editCommentImage}
                                alt="Current comment attachment"
                                className="img-thumbnail"
                                style={{
                                  maxWidth: "200px",
                                  marginTop: "10px",
                                }}
                              />
                              <button
                                type="button"
                                className="close-button"
                                onClick={() => setEditCommentImage(null)}
                                style={{
                                  position: "absolute",
                                  top: "5px",
                                  right: "5px",
                                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "24px",
                                  height: "24px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                              >
                                <i
                                  className="fa fa-times"
                                  style={{ color: "red" }}
                                ></i>
                              </button>
                            </div>
                          )}

                          {/* Input file nếu không có hình ảnh */}
                          {!editCommentImage && (
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e)}
                              className="form-control-file m-1"
                              style={{ marginTop: "10px" }}
                            />
                          )}

                          {/* Nút lưu và hủy */}
                          <div className="d-flex justify-content-end mt-2">
                            <button
                              type="submit"
                              className={`btn btn-success btn-sm me-2 comment-button ${editCommentContent ? "active" : "inactive"
                                }`}
                              disabled={!editCommentContent}
                            >
                              <i className="fa fa-save"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => setEditCommentId(null)}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between row">
                        <div className="col-10">
                          <div className=" justify-content-between row">
                            <div
                              className="col-10"
                              style={{
                                marginLeft: "45px",
                                maxWidth: "630px",
                                width: "auto",
                                minWidth: "130px",
                                minHeight: "30px",
                                height: "auto",
                                wordBreak: "break-word",
                                overflow: "hidden",
                              }}
                            >
                              <p
                                className=""
                                style={{
                                  marginLeft: "20px",
                                  textAlign: "justify",
                                }}
                              >
                                {comment.content}
                              </p>

                              {/* Hiển thị hình ảnh nếu có */}
                              {comment.image_url && (
                                <a href="#" style={{ paddingLeft: "5px" }}>
                                  <img
                                    className="img-fluid img-thumbnail"
                                    src={comment.image_url}
                                    alt="Comment attachment"
                                    style={{
                                      maxWidth: "100%",
                                      marginBottom: "15px",
                                      width: "auto",
                                      maxHeight: "200px",
                                      height: "auto",
                                      objectFit: "cover",
                                    }}
                                  />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="pad-ver col-2 text-center">
                          {currentUser &&
                            currentUser.id === comment.user_id && (
                              <>
                                <a
                                  className="btn btn-sm btn-default"
                                  style={{
                                    border: "none",
                                    padding: "0",
                                    backgroundColor: "transparent",
                                  }}
                                  onClick={() => {
                                    handleEditComment(
                                      comment.comment_id,
                                      comment.content
                                    );
                                    setEditCommentImage(comment.image_url);
                                    setReplyingTo(replyingTo === null);
                                  }}
                                >
                                  <i
                                    className="fa fa-edit"
                                    style={{
                                      color: "#28a745",
                                      color: "inherit !important",
                                    }}
                                  ></i>{" "}
                                  {/* Màu xanh lá cây */}
                                </a>

                                <a
                                  className="btn btn-sm btn-default"
                                  style={{
                                    border: "none",
                                    padding: "0",
                                    backgroundColor: "transparent",
                                  }}
                                  onClick={() =>
                                    handleShowDeleteModal(comment.comment_id)
                                  }
                                >
                                  <i
                                    className="fa fa-trash"
                                    style={{
                                      color: "#dc3545",
                                      color: "inherit !important",
                                    }}
                                  ></i>{" "}
                                  {/* Màu đỏ */}
                                </a>
                              </>
                            )}
                          <a
                            className="btn btn-sm btn-default"
                            style={{
                              border: "none",
                              padding: "0",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => handleReplyClick(comment.comment_id)}
                          >
                            <i
                              className="fa fa-reply"
                              style={{
                                color: "#007bff",
                                color: "inherit !important",
                              }}
                            ></i>{" "}
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                  <div></div>
                  {replyingTo === comment.comment_id && (
                    <div>
                      {replyResponse && replyResponse.message && (
                        <div className="alert alert-danger">
                          {replyResponse.message}
                        </div>
                      )}
                      <form
                        className="reply-form p-4 mb-4 border rounded shadow-sm bg-light"
                        onSubmit={(e) =>
                          handleReplySubmit(
                            e,
                            comment.comment_id,
                            comment.user_id
                          )
                        }
                      >
                        <div className="form-group">
                          <textarea
                            className="form-control border-primary"
                            rows="2"
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={handleReplyChange}
                          ></textarea>
                        </div>
                        <div className="form-group file-input-group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            data-id={comment.comment_id}
                            className="form-control-file"
                          />
                          <button
                            type="submit"
                            className={`btn btn-primary ${replyContent.trim() ? "active" : "disabled"
                              }`}
                            disabled={!replyContent.trim()}
                          >
                            Reply
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  <div className="comment-list">
                    {expandedComments[comment.comment_id] && (
                      <div
                        className="replies"
                        style={{
                          marginLeft: "50px",
                          borderLeft: "3px solid #d3d3d3",
                          paddingLeft: "10px",
                        }}
                      >
                        {parentComment[comment.comment_id]
                          ?.filter((reply) => reply.is_delete === 0)
                          .map((reply) => (
                            <div
                              key={reply.comment_id}
                              className="reply-block m-3"
                            >
                              <div
                                className="media-body"
                                style={{ marginLeft: "3%" }}
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <a
                                      className="d-flex align-items-center text-success text-decoration-none pe-auto"
                                      onClick={() =>
                                        goToAuthorPage(reply.user_id)
                                      }
                                      style={{ marginRight: "5px" }}
                                    >
                                      <img
                                        className="img-fluid"
                                        src={reply.image_user || ""}
                                        alt=""
                                        style={{
                                          marginRight: "5px",
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                      <div className="ms-1 text-semibold text-comment">
                                        {reply.username}
                                      </div>
                                    </a>

                                    {reply.user_id !==
                                      reply.reply_to_user_id && (
                                        <>
                                          <p className="m-0 me-1">replied to</p>
                                          <a
                                            className="text-primary m-0"
                                            onClick={() =>
                                              goToAuthorPage(
                                                reply.reply_to_user_id
                                              )
                                            }
                                          >
                                            {reply.reply_to_user}
                                          </a>
                                        </>
                                      )}
                                  </div>

                                  <div>
                                    <span
                                      className="text-muted small"
                                      style={{ marginRight: "8px" }}
                                    >
                                      {formatDistanceToNow(
                                        new Date(reply.created_at),
                                        {
                                          addSuffix: true,
                                        }
                                      )}
                                    </span>
                                  </div>
                                </div>

                                {/* Edit form and reply actions */}
                                {editReplyId === reply.parent_comment_id ? (
                                  <form
                                    onSubmit={handleEditReplySubmit}
                                    className="edit-reply-form"
                                  >
                                    <div className="input-group">
                                      <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Edit your reply..."
                                        value={editReplyContent}
                                        onChange={(e) =>
                                          setEditReplyContent(e.target.value)
                                        }
                                      ></textarea>

                                      <div className="d-flex flex-column w-100">
                                        {editReplyImage && (
                                          <div
                                            className="existing-image-wrapper"
                                            style={{
                                              position: "relative",
                                              display: "inline-block",
                                            }}
                                          >
                                            <img
                                              src={editReplyImage}
                                              alt="Current reply attachment"
                                              className="img-thumbnail"
                                              style={{
                                                maxWidth: "200px",
                                                marginTop: "10px",
                                              }}
                                            />
                                            <button
                                              type="button"
                                              className="close-button"
                                              onClick={() => {
                                                setEditReplyImage(null);
                                              }}
                                              style={{
                                                position: "absolute",
                                                top: "5px",
                                                right: "5px",
                                                backgroundColor:
                                                  "rgba(255, 255, 255, 0.8)",
                                                border: "none",
                                                borderRadius: "50%",
                                                width: "24px",
                                                height: "24px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <i
                                                className="fa fa-times"
                                                style={{ color: "red" }}
                                              ></i>
                                            </button>
                                          </div>
                                        )}

                                        {!editReplyImage && (
                                          <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                              handleImageChange(e)
                                            }
                                            className="form-control-file m-1"
                                            style={{ marginTop: "10px" }}
                                          />
                                        )}

                                        <div className="d-flex justify-content-end mt-2">
                                          <button
                                            type="submit"
                                            className={`btn btn-success btn-sm me-2 comment-button ${editReplyContent
                                              ? "active"
                                              : "inactive"
                                              }`}
                                            disabled={!editReplyContent}
                                          >
                                            <i className="fa fa-save"></i>
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => setEditReplyId(null)}
                                          >
                                            <i className="fa fa-times"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                ) : (
                                  <div className="row">
                                    <div
                                      className="d-flex col-10 justify-content-between row"
                                      style={{ marginLeft: "1px" }}
                                    >
                                      <div
                                        className="col-10"
                                        style={{
                                          marginLeft: "20px",
                                          maxWidth: "630px",
                                          width: "auto",
                                          minWidth: "130px",
                                          minHeight: "30px",
                                          height: "auto",
                                          wordBreak: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <p
                                          className="m-3"
                                          style={{
                                            textAlign: "justify",
                                          }}
                                        >
                                          {reply.content}
                                        </p>
                                        {reply.image_url && (
                                          <a href="#">
                                            <img
                                              className="img-fluid img-thumbnail"
                                              src={reply.image_url}
                                              alt="Reply attachment"
                                              style={{
                                                maxWidth: "100%",
                                                marginBottom: "15px",
                                                maxHeight: "200px",
                                                objectFit: "cover",
                                              }}
                                            />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className="pad-ver mt-2 col-2 text-center"
                                      style={{ marginLeft: "11px" }}
                                    >
                                      {currentUser &&
                                        currentUser.id === reply.user_id && (
                                          <>
                                            <a
                                              className="btn btn-sm btn-default"
                                              style={{
                                                border: "none",
                                                padding: "0",
                                                backgroundColor: "transparent",
                                              }}
                                              onClick={() => {
                                                handleEditReply(
                                                  reply.parent_comment_id,
                                                  reply.content
                                                );
                                                setReplyToUserId(
                                                  replyToUserId === null
                                                );
                                                setEditReplyImage(
                                                  reply.image_url
                                                );
                                              }}
                                            >
                                              <i
                                                className="fa fa-edit"
                                                style={{
                                                  color: "#28a745",
                                                  color: "inherit !important",
                                                }}
                                              ></i>{" "}
                                              {/* Màu xanh lá cây */}
                                            </a>
                                            <a
                                              className="btn btn-sm btn-default"
                                              style={{
                                                border: "none",
                                                padding: "0",
                                                backgroundColor: "transparent",
                                              }}
                                              onClick={() =>
                                                handleShowParentDeleteModal(
                                                  reply.parent_comment_id
                                                )
                                              }
                                            >
                                              <i
                                                className="fa fa-trash"
                                                style={{
                                                  color: "#dc3545",
                                                  color: "inherit !important",
                                                }}
                                              ></i>{" "}
                                              {/* Màu đỏ */}
                                            </a>
                                          </>
                                        )}
                                      <a
                                        className="btn btn-sm btn-default"
                                        style={{
                                          border: "none",
                                          padding: "0",
                                          backgroundColor: "transparent",
                                        }}
                                        onClick={() =>
                                          handleParentCommentClick(
                                            reply.parent_comment_id,
                                            reply.user_id
                                          )
                                        }
                                      >
                                        <i
                                          className="fa fa-reply"
                                          style={{
                                            color: "#007bff",
                                            color: "inherit !important",
                                          }}
                                        ></i>{" "}
                                        {/* Màu xanh dương */}
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {replyToUserId === reply.parent_comment_id && (
                                <form
                                  className="reply-form"
                                  onSubmit={(e) =>
                                    handleReplyInCommentSubmit(
                                      e,
                                      reply.comment_id,
                                      reply.user_id
                                    )
                                  }
                                >
                                  <div className="form-group">
                                    <textarea
                                      className="form-control"
                                      rows="2"
                                      placeholder="Write a reply..."
                                      value={replyContent}
                                      onChange={handleReplyChange}
                                    ></textarea>
                                  </div>
                                  <div className="form-group file-input-group">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      data-id={comment.comment_id}
                                    />
                                    <button
                                      type="submit"
                                      className={`comment-button ${replyContent.trim()
                                        ? "active"
                                        : "inactive"
                                        }`}
                                      disabled={!replyContent.trim()}
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </form>
                              )}
                            </div>
                          ))}
                      </div>
                    )}

                    <a
                      onClick={() => {
                        toggleReplies(comment.comment_id);
                        setReplyToUserId(replyToUserId === null);
                      }}
                      className=""
                    >
                      {parentComment[comment.comment_id]?.length > 0 ||
                        newParentComment
                        ? expandedComments[comment.comment_id]
                          ? `Hide comments`
                          : `Show ${parentComment[comment.comment_id].length
                          } comments `
                        : ""}
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-center">No comments yet</h3>
          )}
          {totalComments > limit && (
            <Paginator
              currentPage={currentPage}
              lastPage={Math.ceil(totalComments / limit)}
              setCurrentPage={setCurrentPage}
              fetchData={loadComments}
            />
          )}
        </div>
      </div>

      <ConfirmDeleteCommentModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleDeleteComment}
      />

      <ConfirmDeleteCommentModal
        show={showDeleteParentModal}
        handleClose={handleCloseParentDeleteModal}
        handleConfirm={handleDeleteParentComment}
      />
    </main>
  );
};

export default BlogDetail;
