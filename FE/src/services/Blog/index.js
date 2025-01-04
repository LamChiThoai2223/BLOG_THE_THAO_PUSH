import { apiUrl } from "../../config/Api";

export const fetchApprovedBlogs = (apiUrl, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/blogs/approved`, true);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setBlogData(response.data);
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


export const fetchBlogs = (apiUrl, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setBlogData(response.data);

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

export const fetchBlogsAll = (apiUrl, setBlogAllData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogsAll`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                setBlogAllData(response.data);

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

export const fetchAllPaginator = (apiUrl, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs?page=${page}`, true);
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


export const fetchAllFollow = (apiUrl, userId, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs/follow/${userId}?page=${page}`, true);
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

export const fetchAllRestorePaginator = (apiUrl, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs_restore?page=${page}`, true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                    resolve(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e);
                }
            } else {
                const errorMsg = `HTTP error! status: ${xhr.status}`;
                setError(errorMsg);
                reject(new Error(errorMsg));
            }
        };

        xhr.onerror = () => {
            const errorMsg = 'Network error';
            setError(errorMsg);
            reject(new Error(errorMsg));
        };

        xhr.send();
    });
};

export const fetchAllPendingPaginator = (apiUrl, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs_pending?page=${page}`, true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                    resolve(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e);
                }
            } else {
                const errorMsg = `HTTP error! status: ${xhr.status}`;
                setError(errorMsg);
                reject(new Error(errorMsg));
            }
        };

        xhr.onerror = () => {
            const errorMsg = 'Network error';
            setError(errorMsg);
            reject(new Error(errorMsg));
        };

        xhr.send();
    });
};

export const addBlog = (apiUrl, blogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('Có lỗi xảy ra khi thêm bài viết!');
                }
            }
        };

        xhr.send(JSON.stringify(blogData));
    });
};

export const viewBlog = (id, user_id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/views/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('Có lỗi xảy ra khi thêm lượt view!');
                }
            }
        };

        // Send user_id as an object, not a raw string
        xhr.send(JSON.stringify({ user_id }));
    });
};

export const fetchBlogDetails = async (id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs/${id}`);
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

export const fetchBlogEditDetails = async (id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs/edit/${id}`);
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

export const updateBlog = async (id, blogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/blogs/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Failed to update blog'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send(JSON.stringify(blogData));
    });
};


export const softDelete = (apiUrl, blogId, whyDelete, setBlogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/blogs/${blogId}/soft-delete`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setBlogData(prevBlogs => prevBlogs.map(blog =>
                        blog.id === blogId ? { ...blog, deleted: true, why_delete: whyDelete } : blog
                    ));
                    resolve({ success: true });
                } else {
                    console.error('Có lỗi xảy ra khi xóa tạm thời blog!');
                    reject(new Error('Xóa tạm thời không thành công'));
                }
            }
        };

        xhr.send(JSON.stringify({ why_delete: whyDelete }));
    });
};


export const deleteBlog = (apiUrl, blogId, setBlogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${apiUrl}/blogs/${blogId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 204) {
                    setBlogData(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
                    resolve();
                } else {
                    console.error('Có lỗi xảy ra khi xóa bài viết vĩnh viễn!', xhr.status, xhr.responseText);
                    reject(new Error(`Có lỗi xảy ra: ${xhr.statusText}`));
                }
            }
        };

        xhr.send();
    });
};


export const restoreBlog = (apiUrl, blogId, setBlogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/blogs/${blogId}/restore`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setBlogData(prevBlogs =>
                        prevBlogs.map(blog =>
                            blog.id === blogId ? { ...blog, deleted: false } : blog
                        )
                    );
                    resolve({ success: true });
                } else {
                    reject('Có lỗi xảy ra khi khôi phục blog!');
                }
            }
        };

        xhr.send();
    });
};

export const searchBlogs = (apiUrl, keywords, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/blogs/search?keywords=${encodeURIComponent(keywords)}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                } catch (e) {
                    console.error('Parsing Error:', e); // Handle JSON parsing error
                    setError('Error parsing response data');
                }
            } else {
                console.error(`Request Error: ${xhr.status} - ${xhr.statusText}`); // Debugging
                setError(`Request Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    };

    xhr.onerror = () => {
        console.error('Network Error'); // Handle network error
        setError('Network error');
    };

    xhr.send();
};


export const searchBlogsWithTitle = (apiUrl, keywords, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/blogs/search_title?keywords=${encodeURIComponent(keywords)}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                } catch (e) {
                    console.error('Parsing Error:', e); // Handle JSON parsing error
                    setError('Error parsing response data');
                }
            } else {
                console.error(`Request Error: ${xhr.status} - ${xhr.statusText}`); // Debugging
                setError(`Request Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    };

    xhr.onerror = () => {
        console.error('Network Error'); // Handle network error
        setError('Network error');
    };

    xhr.send();
};


export const approvedBlogs = (apiUrl, blogId, setBlogData) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${apiUrl}/blogs/${blogId}/approved`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    setBlogData(prevBlogs => prevBlogs.map(blog =>
                        blog.id === blogId ? { ...blog, status: 'approved' } : blog
                    ));
                    resolve("Duyệt bài viết thành công.");
                } else {
                    console.error('Có lỗi xảy ra khi duyệt bài viết!');
                    reject(new Error("Có lỗi xảy ra khi duyệt bài viết."));
                }
            }
        };
        xhr.send();
    });
};

export const fetchBlogsByCategory = (categoryId, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs/category/${categoryId}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                setBlogData(data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            setError(`HTTP error! Status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Network error');
    };

    xhr.send();
};

export const fetchBlogsByTag = (tagId, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs/tag/${tagId}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                setBlogData(data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            setError(`HTTP error! Status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Network error');
    };

    xhr.send();
};

export const fetchBlogsBySport = (sportId, setBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/blogs/sport/${sportId}`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                setBlogData(data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            setError(`HTTP error! Status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Network error');
    };

    xhr.send();
};

export const fetchBlogUser = (apiUrl, userId, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs/${userId}/blog?page=${page}`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                    resolve(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e);
                }
            } else {
                const errorMsg = `HTTP error! Status: ${xhr.status}`;
                setError(errorMsg);
                reject(new Error(errorMsg));
            }
        };

        xhr.onerror = () => {
            const errorMsg = 'Network error';
            setError(errorMsg);
            reject(new Error(errorMsg));
        };

        xhr.send();
    });
};

export const fetchBlogUserDelete = (apiUrl, userId, page, setBlogData, setError) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${apiUrl}/blogs/${userId}/blogDelete?page=${page}`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    setBlogData(response.data);
                    resolve(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Error parsing JSON');
                    reject(e);
                }
            } else {
                const errorMsg = `HTTP error! Status: ${xhr.status}`;
                setError(errorMsg);
                reject(new Error(errorMsg));
            }
        };

        xhr.onerror = () => {
            const errorMsg = 'Network error';
            setError(errorMsg);
            reject(new Error(errorMsg));
        };

        xhr.send();
    });
};


export const fetchAllBlogUser = (userId, setAllBlogData, setError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ` ${apiUrl}/blogs/${userId}/blogAll`, true);

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                setAllBlogData(data.data);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                setError('Error parsing JSON');
            }
        } else {
            setError(`HTTP error! Status: ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        setError('Network error');
    };

    xhr.send();
}


// Fetch blogs today
export const fetchBlogsToday = (apiUrl) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs/today`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                reject(`HTTP error! status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};


export const fetchBlogsThisWeek = (apiUrl) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs/this-week`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.data);
                } catch (e) {
                    reject('Error parsing JSON');
                }
            } else {
                reject(`HTTP error! status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};


export const fetchBlogsLastMonth = (apiUrl) => {
    return new Promise((resolve, reject) => {  // Thêm Promise
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs/last-month`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                reject(`HTTP error! status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};


// Fetch blogs from three months ago
export const fetchBlogsThreeMonthsAgo = (apiUrl) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs/three-months-ago`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                reject(`HTTP error! status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};

// Fetch blogs from one year ago
export const fetchBlogsOneYearAgo = (apiUrl) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/blogs/one-year-ago`, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                reject(`HTTP error! status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};

export const fetchRecommendations = (apiUrl, blog_id, user_id) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let url = `${apiUrl}/blogs/recommendations/${encodeURIComponent(blog_id)}`;


        if (user_id) {
            url += `?user_id=${encodeURIComponent(user_id)}`;
        }
        console.log(user_id);

        xhr.open('GET', url, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Parsed JSON:', response);

                    // Nếu API trả về lỗi từ server, xử lý và trả về thông báo lỗi
                    if (response.error) {
                        console.error('Error from API:', response.error);
                        reject(response.error);
                    } else {
                        resolve(response.recommendations.recommended_blogs);
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                console.error(`HTTP error! Status: ${xhr.status}, Response: ${xhr.responseText}`);
                reject(`HTTP error! Status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            console.error('Network error');
            reject('Network error');
        };

        xhr.send();
    });
};

export const fetchLatestBlog = (apiUrl) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = `${apiUrl}/blogs/latest-blog`;

        xhr.open('POST', url, true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    const data = response.data;

                    resolve(data[0]);  // Nếu `response.data` có dữ liệu, trả về nó
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    reject('Error parsing JSON');
                }
            } else {
                console.error(`HTTP error! Status: ${xhr.status}, Response: ${xhr.responseText}`);
                reject(`HTTP error! Status: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject('Network error');
        };

        xhr.send();
    });
};

export const autoApprovePost = async (apiUrl, offset = 0, limit = 10) => {
    try {
        const response = await fetch(`${apiUrl}/blogs/auto-approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ offset, limit }),
        });

        if (!response.ok) {
            throw new Error(`Có lỗi xảy ra khi duyệt bài viết: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateInactiveBlogs = async (apiUrl) => {
    try {
        const response = await fetch(`${apiUrl}/blogs/update-inactive-blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Có lỗi xảy ra khi cập nhật bài viết: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};






