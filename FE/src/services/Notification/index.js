// import { apiUrl } from "../../config/Api";

// Lấy danh sách thông báo của người dùng
export const fetchNotifications = (apiUrl, user_id, page, setNotifications, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/notifications/${user_id}?page=${page}`, true); // Thêm tham số trang vào URL

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setNotifications(response.data); // Set danh sách thông báo
          resolve(response); // Trả về dữ liệu nếu thành công
        } catch (e) {
          console.error("Lỗi khi phân tích JSON:", e);
          setError("Lỗi khi phân tích JSON");
          reject(e); // Báo lỗi phân tích JSON
        }
      } else {
        const errorMsg = `Lỗi HTTP! mã: ${xhr.status}`;
        console.error(errorMsg);
        setError(errorMsg); // Báo lỗi HTTP
        reject(new Error(errorMsg)); // Trả về lỗi HTTP
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Lỗi mạng";
      console.error(errorMsg);
      setError(errorMsg); // Báo lỗi mạng
      reject(new Error(errorMsg)); // Trả về lỗi mạng
    };

    xhr.send();
  });
};

export const fetchAllNotifications = (apiUrl, user_id, setNotifications, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/notificationsAll/${user_id}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setNotifications(response.data); // Set danh sách thông báo
          resolve(response);
        } catch (e) {
          console.error("Lỗi khi phân tích JSON:", e);
          setError("Lỗi khi phân tích JSON");
          reject(e);
        }
      } else {
        const errorMsg = `Lỗi HTTP! mã: ${xhr.status}`;
        console.error(errorMsg);
        setError(errorMsg);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Lỗi mạng";
      console.error(errorMsg);
      setError(errorMsg);
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};


// Tạo một thông báo mới.
export const createNotification = (apiUrl, user_id, message, type) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/notifications/`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          const errorResponse = JSON.parse(xhr.responseText);
          console.log(
            errorResponse.message || "Có lỗi xảy ra khi tạo thông báo!"
          ); 
          reject(
            errorResponse.message || "Có lỗi xảy ra khi tạo thông báo!"
          );
        }
      }
    };

    xhr.onerror = () => {
      console.log("Network Error");
      reject(new Error("Network Error"));
    };

    xhr.send(
      JSON.stringify({ user_id: user_id, message: message, type: type })
    );
  });
};

// Đánh dấu một thông báo là đã đọc.
export const markNotificationAsRead = (apiUrl, id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/notifications/${id}/read`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi đánh dấu thông báo là đã đọc!");
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

// Xóa một thông báo khỏi hệ thống.
export const deleteNotification = (apiUrl, id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/notifications/${id}`, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi xóa thông báo!");
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

// Ẩn một thông báo.
export const hideNotification = (apiUrl, id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${apiUrl}/notifications/hide/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        console.log("Status:", xhr.status); // Kiểm tra mã trạng thái HTTP
        console.log("Response:", xhr.responseText); // Ghi log phản hồi
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          const errorMsg = `Có lỗi xảy ra khi ẩn thông báo! HTTP Status: ${xhr.status}`;
          reject(errorMsg);
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};


// Tắt tất cả thông báo từ một tác giả.
export const turnOffAllNotifications = (apiUrl, userId, authorId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/notifications/turn-off/${userId}/${authorId}`, true); 
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi tắt tất cả thông báo từ tác giả!");
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

// Bật tất cả thông báo từ một tác giả.
export const turnOnAllNotifications = (apiUrl, userId, authorId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/notifications/turn-on/${userId}/${authorId}`, true); 
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi tắt tất cả thông báo từ tác giả!");
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

