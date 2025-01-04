export const fetchBlockedUsers = (
  apiUrl,
  userId,
  page,
  setBlockedUsers,
  setError
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/blocked-users/${userId}?page=${page}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setBlockedUsers(response.data);
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

export const blockUser = (apiUrl, blocker_id, blocked_id, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiUrl}/blocked-users`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204) {
              resolve(xhr.responseText);
            } else {
              reject("Có lỗi xảy ra khi bỏ theo dõi người dùng!");
            }
          }
        };
    
        xhr.onerror = () => {
          reject(new Error("Network Error"));
        };
    
        xhr.send(
          JSON.stringify({ blocker_id: blocker_id, blocked_id: blocked_id })
        );
      });
};

export const unblockUser = (apiUrl, blocker_id, blocked_id, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/blocked-users`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          reject("Có lỗi xảy ra khi bỏ theo dõi người dùng!");
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    xhr.send(
      JSON.stringify({ blocker_id: blocker_id, blocked_id: blocked_id })
    );
  });
};

export const isUserBlocked = (apiUrl, blocker_id, blocked_id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/blocked-users/check`, true); 
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error("Invalid response format from server"));
          }
        } else {
          reject(new Error("Có lỗi xảy ra khi kiểm tra trạng thái chặn!"));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network Error"));
    };

    const body = JSON.stringify({ blocker_id, blocked_id }); 
    xhr.send(body);
  });
};


export const fetchAllBlockedUsers = (
  apiUrl,
  userId,
  setBlockedUsers,
  setError
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/blockedAll-users/${userId}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setBlockedUsers(response.data); // Set danh sách người bị chặn
          resolve(response); // Trả về dữ liệu nếu thành công
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
