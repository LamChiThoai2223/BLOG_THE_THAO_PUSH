
import { apiUrl } from "../../config/Api";
export const fetchUserById = (userId, setUserData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/users/${userId}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);           
                setUserData(response.data); 
            } catch (e) {
                console.error('Lỗi khi phân tích JSON:', e);
                setError('Lỗi khi phân tích JSON');
            }
        } else {
            setError(`Lỗi HTTP! mã lỗi: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Lỗi mạng');
    };

    xhr.send();
};
export const submitComment = (commentData, setResponse, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/comments`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);                  
                setResponse(response);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            try {
                const error = JSON.parse(xhr.responseText);
                console.log('Error Response:', error);  
                if (error.message && error.message.includes('nội dung độc hại')) {
                    setError(error.message); 
                } else {
                    setError(error.error || 'Có lỗi xảy ra, vui lòng thử lại.');
                }
            } catch (e) {
                console.error('Error parsing error response:', e);
                setError('Có lỗi xảy ra khi xử lý phản hồi từ server.');
            }
        }
    };

    xhr.onerror = () => {
        setError('Lỗi mạng, không thể kết nối đến server.');
    };

    // Gửi dữ liệu bình luận dưới dạng JSON
    xhr.send(JSON.stringify(commentData));
};

export const deleteComment = (apiUrl, commentId, setComments) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/comments/${commentId}/soft-delete`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
                setComments(prevComments => 
                    Array.isArray(prevComments) 
                        ? prevComments.filter(comment => comment.comment_id !== commentId) 
                        : [] // nếu không phải là mảng, đặt lại thành mảng rỗng
                );
                resolve();
            } else {
                console.error('Error deleting comment:', xhr.status, xhr.responseText);
                reject(new Error(`Error deleting comment: ${xhr.statusText}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network error'));
        };

        xhr.send();
    });
};


// Edit a comment
export const editComment = (apiUrl, commentId, updatedCommentData, setResponse, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/comments/${commentId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setResponse(response); 
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

    xhr.send(JSON.stringify(updatedCommentData));
};

export const fetchByIdBlog = (blogId, setData, setError, setTotalComments, page, resetData = false) => {
    const xhr = new XMLHttpRequest();
    const url = `${apiUrl}/blogs/${blogId}/comments?page=${page}`;
    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                // Nếu resetData là true, thay thế dữ liệu cũ bằng dữ liệu mới
                setData(prevData => {
                    if (resetData) {
                        return response.data; // Thay thế dữ liệu cũ
                    } else {
                        const existingIds = new Set(prevData.map(comment => comment.comment_id));
                        const newComments = response.data.filter(comment => !existingIds.has(comment.comment_id));
                        return [...prevData, ...newComments]; // Chỉ thêm dữ liệu mới
                    }
                });
                setTotalComments(response.total_comments);
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

export const fetchAllDeletedPaginator = (apiUrl, page, setPostData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${apiUrl}/comment_deleted?page=${page}`, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            setPostData(response.data);
            resolve(response);
          } catch (e) {
            console.error('Error parsing JSON:', e);
            setError('Error parsing JSON');
            reject(e); 
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
// phân trang admin comment
export const fetchBlogComments = (blogId, updateComments, updateTotalComments, handleError, page, limit = 5) => {
    const xhr = new XMLHttpRequest();
    const offset = (page - 1) * limit;
    const url = `${apiUrl}/blogs/${blogId}/comments?limit=${limit}&offset=${offset}`;
    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                updateComments(prevComments => {
                    // Không sử dụng resetData, chỉ lấy dữ liệu cho trang hiện tại
                    return response.data;
                });
                updateTotalComments(response.total_comments);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                handleError('Error parsing JSON');
            }
        } else {
            handleError(`HTTP error! status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        handleError('Network error');
    };

    xhr.send();
};




export const fetchAllBlogs = (setBlogs, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs/comments`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);         
                setBlogs(response.data);
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
export const fetchBlogs = (apiUrl, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${apiUrl}/blog_comment?page=${page}`, true);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            setBlogData(response.data);
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
  
export const fetchBlogById = (blogId, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs/${blogId}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                console.log('Thông tin bài viết:', response.data); // Kiểm tra dữ liệu
                setBlogData(response.data); // Cập nhật dữ liệu bài viết
            } catch (e) {
                console.error('Lỗi khi phân tích JSON:', e);
                setError('Lỗi khi phân tích JSON');
            }
        } else {
            setError(`Lỗi HTTP! mã lỗi: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Lỗi mạng');
    };

    xhr.send();
};

export const editReply = (apiUrl, replyId, updatedReplyData, setResponse, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/replies/${replyId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setResponse(response); 
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

    xhr.send(JSON.stringify(updatedReplyData));
};


