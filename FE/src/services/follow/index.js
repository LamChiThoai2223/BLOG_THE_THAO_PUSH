import { apiUrl } from "../../config/Api";

// Fetch followers for a specific user
export const fetchFollowers = (apiUrl, user_id, page, setFollowers) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/followers/${user_id}/?page=${page}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setFollowers(response.data);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          reject(e);
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      console.error(errorMsg);
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};

export const fetchFriends = (apiUrl, user_id, page, setFriends) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/sendFriends/${user_id}/?page=${page}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setFriends(response.data); // Lưu dữ liệu bạn bè vào state
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          reject(e);
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      console.error(errorMsg);
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};


// Fetch users that a specific user is following
export const fetchFollowing = (apiUrl, user_id,page, setFollowing) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/following/${user_id}/?page=${page}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setFollowing(response.data); // Set danh sách người đang theo dõi
          resolve(response);
        } catch (e) {
          console.error("Lỗi khi phân tích JSON:", e);
          reject(e);
        }
      } else {
        const errorMsg = `Lỗi HTTP! mã: ${xhr.status}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
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

// Fetch followers for a specific user
export const fetchFollowersAll = (apiUrl, user_id, setFollowers, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/followersAll/${user_id}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setFollowers(response.data); // Set danh sách người theo dõi
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

// Fetch users that a specific user is following
export const fetchFollowingAll = (apiUrl, user_id, setFollowing, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/followingAll/${user_id}`, true);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setFollowing(response.data); 
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

// Follow a user
export const followUser = (apiUrl, follower_id, followed_id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${apiUrl}/follow`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          const errorResponse = JSON.parse(xhr.responseText);
          console.log(
            errorResponse.message || "Có lỗi xảy ra khi theo dõi người dùng!"
          ); // Ghi lại thông báo lỗi trong console
          reject(
            errorResponse.message || "Có lỗi xảy ra khi theo dõi người dùng!"
          );
        }
      }
    };

    xhr.onerror = () => {
      console.log("Network Error"); // Ghi lại lỗi mạng
      reject(new Error("Network Error"));
    };

    xhr.send(
      JSON.stringify({ follower_id: follower_id, followed_id: followed_id })
    );
  });
};

// Unfollow a user
export const unfollowUser = (apiUrl, follower_id, followed_id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/unfollow`, true);
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
      JSON.stringify({ follower_id: follower_id, followed_id: followed_id })
    );
  });
};
