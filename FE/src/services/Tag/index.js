import { apiUrl } from "../../config/Api";

export const fetchAll = (apiUrl, page, setPostData, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/tags?page=${page}`, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setPostData(response.data);

          resolve(response.data);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Error parsing JSON");
          reject(e);
        }
      } else {
        setError(`HTTP error! status: ${xhr.status}`);
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      setError("Network error");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};

export const fetchAllTags = (apiUrl, setPostData, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/tags_list`, true);

    xhr.onload = () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          console.log("Response from API:", response);
  
          if (Array.isArray(response?.data?.data)) {
            setPostData(response?.data?.data);
            resolve(response?.data?.data);
          } else {
            setError("Invalid data format");
            reject(new Error("Invalid data format"));
          }
        } else {
          setError(`HTTP error! status: ${xhr.status}`);
          reject(new Error(`HTTP error! status: ${xhr.status}`));
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
        setError("Error parsing JSON");
        reject(e);
      }
    };
    

    xhr.onerror = () => {
      setError("Network error");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};


export const fetchAllDeletedPaginator = (
  apiUrl,
  page,
  search = "",
  setPostData,
  setError
) => {
  const searchParam = typeof search === "string" ? search : "";
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/tag_deleted?page=${page}&limit=10&search=${searchParam}`, true);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setPostData(response.data);
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
      reject(new Error(errorMsg)); // Reject the promise with an error message
    };

    xhr.send();
  });
};

export const fetchAllPaginator = (
  apiUrl,
  page,
  search = "",
  setPostData,
  setError
) => {
  const searchParam = typeof search === "string" ? search : "";

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${apiUrl}/tags?page=${page}&limit=10&search=${searchParam}`,
      true
    );
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log(response);

          setPostData(response.data);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Error parsing JSON");
          reject(e);
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

export const add = (apiUrl, setPostData, setError, requestData) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/tags`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setPostData(response.data);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        setError("Error parsing JSON");
      }
    } else {
      setError(`HTTP error! status: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    setError("Network error");
  };

  xhr.send(JSON.stringify(requestData));
};
export const deleteTag = (apiUrl, tagId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${apiUrl}/tags/${tagId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.data);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          reject("Error parsing JSON");
        }
      } else {
        reject(`HTTP error! status: ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      reject("Network error");
    };

    xhr.send();
  });
};

export const checkNameTag = async (apiUrl, name) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/check-tags/${name}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("API Response:", xhr.responseText);
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.exists);
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

export const fetchById = (apiUrl, tagId, setBlogData, setError) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/tags/${tagId}`, true);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const response = JSON.parse(xhr.responseText);
        setBlogData(response.data);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        setError("Error parsing JSON");
      }
    } else {
      setError(`HTTP error! status: ${xhr.status}`);
    }
  };

  xhr.onerror = () => {
    setError("Network error");
  };

  xhr.send();
};
export const putById = (apiUrl, tagId, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/tags/${tagId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          reject("Error parsing JSON");
        }
      } else {
        reject(`HTTP error! status: ${xhr.status}`);
      }
    };

    xhr.onerror = () => {
      reject("Network error");
    };

    xhr.send(JSON.stringify(data));
  });
};
export const softDelete = (apiUrl, tagId, setUserData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/tags/${tagId}/soft-delete`, true); // Kiểm tra URL endpoint
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUserData((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === tagId ? { ...user, is_delete: true } : user
          )
        );
        resolve();
      } else {
        reject("Có lỗi xảy ra khi xóa tạm thời!");
      }
    };

    xhr.onerror = () => {
      reject("Lỗi mạng");
    };

    xhr.send();
  });
};
export const restore = (apiUrl, tagId, setUserData) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${apiUrl}/tags/${tagId}/restore`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        console.log(
          `Ready State: ${xhr.readyState}, Status: ${xhr.status}, Response: ${xhr.responseText}`
        );
        if (xhr.status === 200) {
          setUserData((prevUsers) =>
            prevUsers.map((user) =>
              user.id === tagId ? { ...user, is_deleted: false } : user
            )
          );
          resolve();
        } else {
          reject(
            `Có lỗi xảy ra khi khôi phục! Status: ${xhr.status}, Response: ${xhr.responseText}`
          );
        }
      }
    };

    xhr.onerror = () => {
      reject(`Có lỗi xảy ra khi khôi phục! Không thể gửi yêu cầu.`);
    };

    xhr.send();
  });
};
