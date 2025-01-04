import { apiUrl } from "../../config/Api";

// Fetch all sports
export const fetchSports = (apiUrl, page, setSportsData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/sports?page=${page}`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setSportsData(response.data); 
                    resolve(response); 
                } catch (e) {
                    console.error('Lỗi khi phân tích JSON:', e);
                    setError('Lỗi khi phân tích JSON');
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
            const errorMsg = 'Lỗi mạng';
            console.error(errorMsg);
            setError(errorMsg);
            reject(new Error(errorMsg)); 
        };

        xhr.send();
    });
};


// Fetch all sports paginator
export const fetchSportsPaginator = (apiUrl, page, search = "", setSportsData, setError) => {
    return new Promise((resolve, reject) => {
        const searchParam = typeof search === "string" ? search : "";
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/sports?page=${page}&limit=10&search=${searchParam}`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setSportsData(response.data); 
                    resolve(response); 
                } catch (e) {
                    console.error('Lỗi khi phân tích JSON:', e);
                    setError('Lỗi khi phân tích JSON');
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
            const errorMsg = 'Lỗi mạng';
            console.error(errorMsg);
            setError(errorMsg);
            reject(new Error(errorMsg)); 
        };

        xhr.send();
    });
};

// Fetch all sports delete paginator
export const fetchSportsDeletePaginator = (apiUrl, page, search = "", setSportsData, setError) => {
    return new Promise((resolve, reject) => {
        const searchParam = typeof search === "string" ? search : "";
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/sports_delete?page=${page}&limit=10&search=${searchParam}`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setSportsData(response.data); 
                    resolve(response); 
                } catch (e) {
                    console.error('Lỗi khi phân tích JSON:', e);
                    setError('Lỗi khi phân tích JSON');
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
            const errorMsg = 'Lỗi mạng';
            console.error(errorMsg);
            setError(errorMsg);
            reject(new Error(errorMsg)); 
        };

        xhr.send();
    });
};

export const fetchAllSports = (apiUrl, setPostData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${apiUrl}/sports_list`, true);
  
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

// Add a new sport
export const addSport = (apiUrl, sportData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/sports`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('Có lỗi xảy ra khi thêm sport!');
                }
            }
        };

        xhr.send(JSON.stringify(sportData));
    });
};

// Fetch details of a specific sport
export const fetchSportDetails = async (id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/sports/${id}`);
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

// Update a specific sport
export const updateSport = async (id, sportData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/sports/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Failed to update sport'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send(JSON.stringify(sportData));
    });
};

// Permanently delete a sport
export const deleteSport = (apiUrl, sportId) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${apiUrl}/sports/${sportId}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve(xhr.responseText);
          } else {
            console.error('Error occurred while deleting sport:', xhr.status, xhr.responseText);
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
  
  export const softDeleteSport = async (apiUrl, sportId, reason, setSportData) => {
    try {
        const response = await fetch(`${apiUrl}/sports/${sportId}/soft-delete`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ why_delete: reason }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to soft delete sport');
        }
        setSportData(prevData => prevData.map(sport => sport.sportId === sportId ? { ...sport, is_delete: 1, why_delete: reason } : sport));
        return { success: true };
    } catch (error) {
        console.error('Soft delete sport failed:', error);
        return { success: false, message: error.message };
    }
};

export const restoreSport = (apiUrl, sportId, setSportData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/sports/${sportId}/restore`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log(`Ready State: ${xhr.readyState}, Status: ${xhr.status}, Response: ${xhr.responseText}`);
                if (xhr.status === 200) {
                    setSportData(prevUsers =>
                        prevUsers.map(sport =>
                            sport.id === sportId ? { ...sport, is_deleted: false } : sport
                        )
                    );
                    resolve();
                } else {
                    reject(`Có lỗi xảy ra khi khôi phục sport! Status: ${xhr.status}, Response: ${xhr.responseText}`);
                }
            }
        };

        xhr.onerror = () => {
            reject(`Có lỗi xảy ra khi khôi phục sport! Không thể gửi yêu cầu.`);
        };

        xhr.send();
    });
};

