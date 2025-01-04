import { apiUrl } from "../../config/Api";
import axios from "axios";
import Cookies from "js-cookie";
// Fetch all users
export const fetchUsers = (apiUrl, page, setUserData, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/users?page=${page}`, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setUserData(response.data);
          resolve(response); // Resolve the promise with the response data
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Error parsing JSON");
          reject(e); // Reject the promise if there is an error
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        setError(errorMsg);
        reject(new Error(errorMsg)); // Reject the promise with an error message
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      setError(errorMsg);
      reject(new Error(errorMsg)); // Reject the promise with an error message
    };

    xhr.send();
  });
};

// gửi mail thông báo xóa tài khoản

export const fetchAllDeletedPaginator = (
  apiUrl,
  page,
  deletedUsers,
  setError
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/user_deleted?page=${page}`, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          deletedUsers(response.data);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Error parsing JSON");
          reject(e);
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        setError(errorMsg);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      setError(errorMsg);
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};

export const fetchUsersByDeleteId = (
  apiUrl,
  delete_id,
  page,
  setUserData,
  setError
) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/users/${delete_id}?page=${page}`, true);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setUserData(response.data);
        console.log("Fetched users:", response.data);
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

// Add a new user
export const register = (userData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/register`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          console.error('Error status:', xhr.status);
          console.error('Response:', xhr.responseText);
          try {
            const errorMessage = JSON.parse(xhr.responseText).message || "This email does not exist !";
            reject(errorMessage);
          } catch (e) {
            reject("This email does not exist");
          }
        }
      }
    };

    console.log('Payload gửi đi:', userData);
    xhr.send(JSON.stringify(userData));
  });
};




// gửi mail xác thực
export const sendVerificationEmail = (email, userId, username) => {
  return new Promise((resolve, reject) => {
    if (!userId || !email) {
      console.error("Email hoặc User ID không hợp lệ:", { email, userId });
      return reject("Email hoặc User ID không hợp lệ.");
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/test-email`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve("Gửi email xác thực thành công!");
        } else {
          console.error("Response Error:", xhr.responseText);
          reject("Lỗi khi gửi email xác thực!");
        }
      }
    };

    // Gửi payload ngay tại đây
    xhr.send(JSON.stringify({ email, userId, username }));
  });
};

export const addUser = (apiUrl, userData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/users`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi thêm người dùng!");
        }
      }
    };

    xhr.send(JSON.stringify(userData));
  });
};
// Get user by username
export const GetUserByUsername = async (username) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/check-user/${username}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("API Response:", xhr.responseText);
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject(new Error("Failed to parse JSON"));
        }
      } else {
        reject(new Error("Failed to fetch"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

// Fetch user details by ID
export const fetchUserDetails = async (id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/users/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          resolve(data);
        } catch (error) {
          reject(new Error("Failed to parse JSON"));
        }
      } else {
        reject(new Error(`Failed to fetch, status code: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

export const verifiedEmail = async (token, userId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/verify-email?token=${token}&userId=${userId}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("Raw Response:", xhr.responseText); // Debugging
        try {
          // Kiểm tra nếu phản hồi có thể parse JSON
          if (xhr.getResponseHeader("Content-Type")?.includes("application/json")) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            // Trả về văn bản thuần túy nếu không phải JSON
            resolve({ message: xhr.responseText });
          }
        } catch (error) {
          console.error("Failed to parse JSON:", error);
          reject(new Error("Response is not valid JSON"));
        }
      } else {
        reject(new Error(`Failed to fetch, status code: ${xhr.status}`));
      }
    };


    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};


export const checkToken = async (token) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/check-token?token=${token}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          reject(new Error("Failed to parse JSON"));
        }
      } else {
        reject(new Error(`Failed to fetch, status code: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};



// Update user information
export const updateUser = async (id, userData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/users/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error("Failed to update user"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(userData));
  });
};

// Update profile

// Soft delete a user
// Xóa tạm thời người dùng
export const softDeleteUser = async (
  apiUrl,
  userId,
  reason,
  setUserData,
  email
) => {
  try {
    // Thực hiện yêu cầu xóa tạm thời
    const response = await fetch(`${apiUrl}/users/${userId}/soft-delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ why_delete: reason }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to soft delete user");
    }

    // Cập nhật trạng thái người dùng trong state
    setUserData((prevData) =>
      prevData.map((user) =>
        user.user_id === userId
          ? { ...user, is_delete: 1, why_delete: reason }
          : user
      )
    );

    // Gửi email thông báo tài khoản bị khóa
    console.log("Sending email to:", email); // Kiểm tra email được gửi
    const emailResponse = await fetch(`${apiUrl}/sendEmailAccountLocked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, why_delete: reason }), // Thử dùng `why_delete` thay cho `reason`
    });

    const emailResponseData = await emailResponse.json();
    if (!emailResponse.ok) {
      console.error("Error sending email:", emailResponseData); // Log chi tiết lỗi gửi email
      return {
        success: false,
        message: emailResponseData.error || "Error sending email notification",
      };
    }

    console.log("Email API response:", emailResponseData); // Log phản hồi của API gửi email
    console.log("Email sent successfully for user:", userId);
    return { success: true };
  } catch (error) {
    console.error("Soft delete user failed:", error);
    return { success: false, message: error.message };
  }
};

// Permanently delete a user
export const deleteUser = (apiUrl, userId, setUserData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/users/${userId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          setUserData((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== userId)
          );
          resolve();
        } else {
          console.error(
            "Có lỗi xảy ra khi xóa người dùng vĩnh viễn!",
            xhr.status,
            xhr.responseText
          );
          reject(new Error(`Có lỗi xảy ra: ${xhr.statusText}`));
        }
      }
    };

    xhr.send();
  });
};

// Restore a user
export const restoreUser = async (apiUrl, userId, email, setUserData) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/users/${userId}/restore`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = async () => {
      if (xhr.status === 200) {
        setUserData((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_deleted: false } : user
          )
        );

        // Gửi email thông báo tài khoản đã được khôi phục
        const emailResponse = await fetch(
          `${apiUrl}/sendEmailAccountRestored`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }), // Gửi email để thông báo khôi phục
          }
        );

        const emailResponseData = await emailResponse.json();
        if (!emailResponse.ok) {
          console.error("Error sending restore email:", emailResponseData); // Log chi tiết lỗi gửi email
          return {
            success: false,
            message:
              emailResponseData.error ||
              "Error sending restore email notification",
          };
        }

        console.log("Email API response for restore:", emailResponseData); // Log phản hồi của API gửi email
        console.log("Restore email sent successfully for user:", userId);
        return { success: true };
      } else {
        throw new Error("Failed to restore user");
      }
    };

    xhr.onerror = () => {
      throw new Error("Network Error");
    };

    xhr.send();
  } catch (error) {
    console.error("Restore user failed:", error);
    return { success: false, message: error.message };
  }
};

export const searchUser = (apiUrl, keyword, setUserData, setError) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `${apiUrl}/users/search?keyword=${encodeURIComponent(keyword)}`,
    true
  );

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setUserData(response.data);
        console.log("Searched users:", response.data);
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
export const searchUserSoftDelete = (
  apiUrl,
  keyword,
  setUserData,
  setError
) => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `${apiUrl}/users/searchSoftDelete?keyword=${encodeURIComponent(keyword)}`,
    true
  );

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setUserData(response.data);
        console.log("Searched users:", response.data);
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
// services/Users.js

// Check if email exists
export const checkEmailExists = async (apiUrl, email) => {
  try {
    const response = await axios.get(`${apiUrl}/check-email`, {
      params: { email },
    });
    return response.data.exists; // Giả định API trả về { exists: true/false }
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

// Check if username exists
export const checkUsernameExists = async (apiUrl, username) => {
  try {
    const response = await axios.get(`${apiUrl}/check-username`, {
      params: { username },
    });
    return response.data.exists; // Giả định API trả về { exists: true/false }
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
};

// Check if phone exists
export const checkPhoneExists = async (apiUrl, phone) => {
  try {
    const response = await axios.get(`${apiUrl}/check-phone`, {
      params: { phone },
    });
    return response.data.exists; // Giả định API trả về { exists: true/false }
  } catch (error) {
    console.error("Error checking phone:", error);
    throw error;
  }
};

// Check if CCCD exists
export const checkCccdExists = async (apiUrl, cccd) => {
  try {
    const response = await axios.get(`${apiUrl}/check-cccd`, {
      params: { cccd },
    });
    return response.data.exists; // Giả định API trả về { exists: true/false }
  } catch (error) {
    console.error("Error checking CCCD:", error);
    throw error;
  }
};

export const confirmAuthor = (apiUrl, userId, reason, setUserData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/users/${userId}/confirm-author`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);

        setUserData(
          (prevData) =>
            Array.isArray(prevData)
              ? prevData.map((user) =>
                user.user_id === userId
                  ? { ...user, confirm_author: 1, why_delete: reason }
                  : user
              )
              : [] // Nếu `prevData` không phải là mảng, trả về mảng rỗng hoặc hành vi thích hợp khác
        );

        resolve({ success: true });
      } else {
        const errorResponse = JSON.parse(xhr.responseText);
        reject(new Error(errorResponse.error || "Failed to confirm author"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error"));
    };

    xhr.send(JSON.stringify({ why_delete: reason }));
  });
};

export const sendEmailRegisterAuthor = (
  username,
  email,
  reason,
  onSuccess,
  onError
) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/sendEmailRegisterAuthor`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        console.log("Email sent successfully:", response);
        if (onSuccess) onSuccess(response);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        if (onError) onError(e);
      }
    } else {
      console.error("HTTP error:", xhr.status);
      if (onError) onError(`HTTP error: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    console.error("Network error");
    if (onError) onError("Network error");
  };

  const data = JSON.stringify({
    username: username,
    email: email,
    reason: reason,
  });
  xhr.send(data);
};

export const agreeAuthor = (userId, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  const url = `${apiUrl}/users/${userId}/agrreAuthor`;

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      onSuccess(response);
    } else {
      onError(`Error: ${xhr.status} - ${xhr.statusText}`);
    }
  };

  // Xử lý lỗi kết nối
  xhr.onerror = () => {
    onError("Network error");
  };

  xhr.send();
};

export const refuseAuthor = (userId, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  const url = `${apiUrl}/users/${userId}/refuseAuthor`;

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      onSuccess(response);
    } else {
      onError(`Error: ${xhr.status} - ${xhr.statusText}`);
    }
  };

  xhr.onerror = () => {
    onError("Network error");
  };

  xhr.send();
};

export const sendEmailAgreeAuthor = (email, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/sendEmailAgreeAuthor`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        console.log("Email sent successfully:", response);
        if (onSuccess) onSuccess(response);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        if (onError) onError(e);
      }
    } else {
      console.error("HTTP error:", xhr.status);
      if (onError) onError(`HTTP error: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    console.error("Network error");
    if (onError) onError("Network error");
  };

  const data = JSON.stringify({ email: email });
  xhr.send(data);
};

export const sendEmailRefuseAuthor = (email, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/sendEmailRefuseAuthor`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        console.log("Email sent successfully:", response);
        if (onSuccess) onSuccess(response);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        if (onError) onError(e);
      }
    } else {
      console.error("HTTP error:", xhr.status);
      if (onError) onError(`HTTP error: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    console.error("Network error");
    if (onError) onError("Network error");
  };

  const data = JSON.stringify({ email: email });
  xhr.send(data);
};

export const fetchRegisterAuthors = (apiUrl, page, setAuthorData, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const endpoint = `${apiUrl}/users/author/register?page=${page}`;

    xhr.open("GET", endpoint, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setAuthorData(response.data);
          resolve(response); // Resolve với dữ liệu trả về
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Error parsing JSON");
          reject(e); // Reject nếu lỗi khi parse JSON
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        setError(errorMsg);
        reject(new Error(errorMsg)); // Reject với lỗi HTTP
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      setError(errorMsg);
      reject(new Error(errorMsg)); // Reject với lỗi mạng
    };

    xhr.send();
  });
};

