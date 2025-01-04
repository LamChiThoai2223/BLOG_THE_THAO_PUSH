import { apiUrl } from "../../config/Api";

export const fetchCategories = (apiUrl, page, setCategoryData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/categories?page=${page}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setCategoryData(response.data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            setError(`HTTP error! status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Network error');
    };

    xhr.send();

};

export const fetchAllDeletedPaginator = (apiUrl, page, setCategoryData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${apiUrl}/category_deleted?page=${page}`, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            setCategoryData(response.data);
            resolve(response); // Resolve the promise with the response data
          } catch (e) {
            console.error('Error parsing JSON:', e);
            setError('Error parsing JSON');
            reject(e); // Reject the promise if there is an error
          }
        } else {
          const errorMsg = `HTTP error! status: ${xhr.status}`;
          setError(errorMsg);
          reject(new Error(errorMsg)); // Reject the promise with an error message
        }
      };
  
      xhr.onerror = () => {
        const errorMsg = 'Network error';
        setError(errorMsg);
        reject(new Error(errorMsg)); // Reject the promise with an error message
      };
  
      xhr.send();
    });
  };

  export const fetchAllCategories = (apiUrl, setPostData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${apiUrl}/categories_list`, true);
  
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
        reject(new Error("Network error"));
      };

      xhr.send();
    });
  };
  

export const fetchAllPaginator = (apiUrl, page, setPostData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${apiUrl}/categories?page=${page}`, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            setPostData(response.data);
            resolve(response); // Resolve the promise with the response data
          } catch (e) {
            console.error('Error parsing JSON:', e);
            setError('Error parsing JSON');
            reject(e); // Reject the promise if there is an error
          }
        } else {
          const errorMsg = `HTTP error! status: ${xhr.status}`;
          setError(errorMsg);
          reject(new Error(errorMsg)); // Reject the promise with an error message
        }
      };
  
      xhr.onerror = () => {
        const errorMsg = 'Network error';
        setError(errorMsg);
        reject(new Error(errorMsg)); // Reject the promise with an error message
      };
  
      xhr.send();
    });
  };
  

export const addCategory = (apiUrl, categoryData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/categories`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('Có lỗi xảy ra khi thêm danh mục!');
                }
            }
        };

        xhr.send(JSON.stringify(categoryData));
    });
};


export const fetchCategoryById = async (id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/categories/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText));
                } catch (error) {
                    reject(new Error('Failed to parse JSON'));
                }
            } else {
                reject(new Error('Failed to fetch'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send();
    });
};


export const updateCategory = async (id, category) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/categories/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Failed to update user'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send(JSON.stringify(category));
    });
};


export const softDeleteCategory = (apiUrl, categoryId, setCategoryData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/categories/${categoryId}/soft-delete`, true); // Kiểm tra URL endpoint
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                setCategoryData(prevCategories =>
                    prevCategories.map(category =>
                        category.category_id === categoryId ? { ...category, is_delete: true } : category
                    )
                );
                resolve();
            } else {
                reject('Có lỗi xảy ra khi xóa tạm thời danh mục!');
            }
        };

        xhr.onerror = () => {
            reject('Lỗi mạng');
        };

        xhr.send();
    });
};


export const deleteCategory = (apiUrl, categoryId, setCategoryData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${apiUrl}/categories/${categoryId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 204) {
                    setCategoryData(prevCategories => 
                        prevCategories.filter(category => category.category_id !== categoryId)
                    );
                    resolve();
                } else {
                    console.error('Có lỗi xảy ra khi xóa danh mục!', xhr.status, xhr.responseText);
                    reject(new Error(`Có lỗi xảy ra: ${xhr.statusText}`));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};


export const restoreCategory = (apiUrl, categoryId, setCategoryData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/categories/${categoryId}/restore`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setCategoryData(prevCategories =>
                        prevCategories.map(category =>
                            category.category_id === categoryId ? { ...category, is_deleted: false } : category
                        )
                    );
                    resolve();
                } else {
                    reject(new Error('Có lỗi xảy ra khi khôi phục danh mục!'));
                }
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};



