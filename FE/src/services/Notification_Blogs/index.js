// Lấy danh sách thông báo (có phân trang)
export const fetchNotificationsBlogs = (apiUrl, blog_id, page, setNotifications, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${apiUrl}/notificationsBlog/${blog_id}?page=${page}`, true); // Thêm tham số trang vào URL
  
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
  
  // Lấy tất cả thông báo
  export const fetchAllNotificationsBlogs = (apiUrl, blog_id, setNotifications, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${apiUrl}/notificationsBlogsAll/${blog_id}`, true);
  
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
  
  // Đánh dấu thông báo là đã đọc
  export const markNotificationBlogAsRead = (apiUrl, id) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${apiUrl}/notificationsBlog/${id}/read`, true);
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
  
  // Xóa thông báo
  export const deleteNotificationBlog = (apiUrl, id) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `${apiUrl}/notificationsBlogs/${id}`, true);
  
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
  
  
  