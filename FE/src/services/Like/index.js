import { apiUrl } from "../../config/Api";
import Cookies from "js-cookie";

// Hàm lấy số lượng like của bài viết
export const getLikesCount = (postId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/post-like/${postId}/count`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject({
            status: xhr.status,
            statusText: "Failed to parse response as JSON",
            error: error.message,
          });
        }
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: "Network Error",
      });
    };

    xhr.send();
  });
};

// Hàm toggle like (thêm hoặc xóa like)
export const toggleLike = (blog_id, user_id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/post-like/`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Thêm header Authorization nếu cần
    const token = Cookies.get("token");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject({
            status: xhr.status,
            statusText: "Failed to parse response as JSON",
            error: error.message,
          });
        }
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          responseText: xhr.responseText, // Cung cấp thêm thông tin về lỗi từ server
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: "Network Error",
      });
    };

    // Gửi dữ liệu dưới dạng JSON
    const data = JSON.stringify({ blog_id, user_id });
    xhr.send(data);
  });
};

// Hàm lấy danh sách bài viết mà người dùng đã like
export const listLikesByUser = (apiUrl, user_id, setLikeCount) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/likes/${user_id}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setLikeCount(response.data);
          resolve(response); // Trả về dữ liệu đã phân tích
        } catch (e) {
          console.error("Lỗi khi phân tích JSON:", e);
          reject(new Error("Lỗi khi phân tích JSON"));
        }
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Lỗi mạng";
      console.error(errorMsg);
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};

export const fetchLikes = (setUserData, setError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/post_likes_blogs`, true); // Đường dẫn API lấy lượt like cho các bài viết

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setUserData(response.data); // Cập nhật dữ liệu vào state
      } catch (e) {
        console.error("Error parsing JSON:", e);
        setError("Error parsing JSON");
      }
    } else {
      console.error("HTTP error:", xhr.status);
      setError(`HTTP error! status: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    console.error("Network error");
    setError("Network error");
  };

  xhr.send();
};

export const totalLikes = (callback, setError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/total_likes`, true); // Thay đổi URL nếu cần
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      } catch (e) {
        setError("Error parsing JSON: " + e.message);
      }
    } else {
      setError("Failed to fetch total likes: " + xhr.status);
    }
  };
  xhr.onerror = () => {
    setError("Network error");
  };
  xhr.send();
};

export const totalLikesInDay = (callback, setError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/total_likes_in_day`, true); // Thay đổi URL nếu cần
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      } catch (e) {
        setError("Error parsing JSON: " + e.message);
      }
    } else {
      setError("Failed to fetch total likes in day: " + xhr.status);
    }
  };
  xhr.onerror = () => {
    setError("Network error");
  };
  xhr.send();
};

export const likeWithUserId = (id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/like/blog/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    const token = Cookies.get("token");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject({
            status: xhr.status,
            statusText: "Failed to parse response as JSON",
            error: error.message,
          });
        }
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
          responseText: xhr.responseText,
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: "Network Error",
      });
    };
    const data = JSON.stringify();
    xhr.send(data);
  });
};

export const LikedPosts = (apiUrl, userId, page, setPostLikesData, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const requestUrl = `${apiUrl}/liked-posts/${userId}/?page=${page}`;
    console.log("Request URL:", requestUrl); // Debug URL
    xhr.open("GET", requestUrl, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          // Gọi hàm cập nhật state nếu cần
          if (setPostLikesData) {
            setPostLikesData(response.data);
          }
          resolve(response);
        } catch (e) {
          console.error("Lỗi khi phân tích JSON:", e);
          reject(new Error("Lỗi khi phân tích JSON"));
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Lỗi mạng";
      console.error(errorMsg);
      if (setError) {
        setError(errorMsg);
      }
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};
