export const fetchAllReports = (apiUrl, page, setReport, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/report?page=${page}`);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setReport(response.data);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Lỗi khi xử lý dữ liệu.");
          reject(e);
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        console.error(errorMsg);
        setError("Lỗi khi lấy dữ liệu báo cáo.");
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      console.error(errorMsg);
      setError("Lỗi kết nối mạng.");
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};

export const fetchReports = (apiUrl, user_id, page, setReport, setError) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${apiUrl}/report/user/${user_id}?page=${page}`);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          setReport(response.data);
          resolve(response);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Lỗi khi xử lý dữ liệu.");
          reject(e);
        }
      } else {
        const errorMsg = `HTTP error! status: ${xhr.status}`;
        console.error(errorMsg);
        setError("Lỗi khi lấy dữ liệu báo cáo.");
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => {
      const errorMsg = "Network error";
      console.error(errorMsg);
      setError("Lỗi kết nối mạng.");
      reject(new Error(errorMsg));
    };

    xhr.send();
  });
};
export const deleteReport = (apiUrl, reportId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${apiUrl}/report/${reportId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(xhr.responseText);
        } else {
          console.error('Error occurred while deleting reportId:', xhr.status, xhr.responseText);
          reject(new Error(`Có lỗi xảy ra: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
};

export const reviewReport = (apiUrl, blogId) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/review-reports/${blogId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.error('Error occurred while reviewing reports:', xhr.status, xhr.responseText);
          reject(new Error(`Có lỗi xảy ra: ${xhr.statusText}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
};


