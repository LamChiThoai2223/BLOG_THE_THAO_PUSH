import { apiUrl } from "../../config/Api";

export const fetchParentComment = (comment_id, setUserData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/parent_comment/${comment_id}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                
                if (response.data && response.data.length > 0) {
                    setUserData(response.data); 
                } else {
                    setUserData([]); 
                }
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

export const countParentCommentsByBlog = (blog_id, setUserData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/parent_comment/count/${blog_id}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);                
                if (response.data && typeof response.data === 'number') {
                    setUserData(response.data); 
                } else {
                    setUserData(0);
                }
            } catch (e) {
                console.error('JSON parse error:', e);
                setError && setError('JSON parse error');
            }
        } else {
            setError && setError(`HTTP error: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError && setError('Network error');
    };

    xhr.send();
};
// export const createParentComment = (commentData, setResponse, setError) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', `${apiUrl}/parent_comment`, true); // Bỏ comment_id khỏi URL
//     xhr.setRequestHeader('Content-Type', 'application/json');
  
//     xhr.onload = () => {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           try {
//             const response = JSON.parse(xhr.responseText);
//             setResponse(response);
//           } catch (e) {
//             console.error('Error parsing JSON:', e);
//             setError('Error parsing JSON');
//           }
//         } else {
//           console.error('Response from server:', xhr.responseText); // Thêm log phản hồi server
//           setError(`HTTP error! status: ${xhr.status}`);
//         }
//       };
//       xhr.onerror = () => {
//         console.error('Network error or server unavailable:', xhr); // Thêm log nếu lỗi mạng
//         setError('Network error or server unavailable');
//       };
  
//     xhr.send(JSON.stringify(commentData)); // Gửi toàn bộ commentData qua body
//   };
  
  export const createParentComment = (commentData, setResponse, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/parent_comment`, true); // Make POST request to create a parent comment
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setResponse(response); // Set the response if request is successful
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            try {
                const error = JSON.parse(xhr.responseText);
                console.error('Error Response:', error); // Log the error response from server

                // Handle error for toxic content, based on response from server
                if (error.message && error.message.includes('nội dung độc hại')) {
                    setError(error.message);  // Set the error message related to harmful content
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
        console.error('Network error or server unavailable:', xhr); // Log network or server errors
        setError('Lỗi mạng, không thể kết nối đến server.');
    };

    // Gửi dữ liệu bình luận dưới dạng JSON
    xhr.send(JSON.stringify(commentData)); // Send the comment data as JSON
};

export const deleteParentComment = (parent_comment_id, setComments) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${apiUrl}/parent_comment/${parent_comment_id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
                setComments(prevComments => prevComments.filter(comment => comment.parent_comment_id !== parent_comment_id));
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

export const editParentComment = (apiUrl, parent_comment_id, updatedCommentData, setResponse, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/parent_comment/${parent_comment_id}`, true);
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