const Blog = require('../../models/blog');
const Follow = require('../../models/follow');
const Notification = require('../../models/notification');
const stopword = require('stopword');
const checkBannedWords = require('../../utils/checkBannedWords');
var db = require('../../config/database');
const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

const API_KEY = process.env.API_KEY;
const API_URL_AUTO = process.env.API_URL_AUTO;
const API_CHECK_SPORT = process.env.API_CHECK_SPORT;

exports.getApprovedBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.fetchAllApprovedBlogs();
        res.status(201).json({
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Blog.fetchAllBlogs(offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogsFollow = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Lấy user_id từ params (ví dụ: /blogs/123)
        const userId = req.params.id;  // Đây chính là ID của người dùng

        // Sử dụng userId để lấy các bài viết liên quan
        const { data, total } = await Blog.fetchAllBlogsFollow(userId, offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getBlogsAllAuthor = async (req, res, next) => {
    try {
        const { data, total } = await Blog.fetchAllBlogsWithAuthors();

        res.status(200).json({
            data: data,
            meta: {
                total: total,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getBlogsRestore = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Blog.fetchRestoreBlogs(offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogsPending = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Blog.fetchPendingBlogs(offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.detail = async (req, res, next) => {
    try {
        let id = req.params.id;
        const blogs = await Blog.detail(id);
        res.status(201).json({
            data: blogs,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.detailBlog = async (req, res, next) => {
    try {
        let id = req.params.id;
        const blogs = await Blog.detailBlog(id);
        res.status(201).json({
            data: blogs,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.getBlogUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Blog.getBlogUser(userId, offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/users/${userId}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/users/${userId}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/users/${userId}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/users/${userId}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogUserDelete = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Blog.getBlogUserDelete(userId, offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            data: data,
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total
            },
            links: {
                first: `${req.baseUrl}/users/${userId}/blogs?page=1&limit=${limit}`,
                last: `${req.baseUrl}/users/${userId}/blogs?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/users/${userId}/blogs?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/users/${userId}/blogs?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllBlogUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;
        const posts = await Blog.getALLBlogUser(userId);
        res.status(200).json({
            data: posts,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.add = async (req, res, next) => {
    try {
        let blog = {
            title: req.body.title,
            content: req.body.content,
            // Loại bỏ stopword khỏi context
            context: stopword.removeStopwords(req.body.context.split(' ')).join(' '),
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            sport_id: req.body.sport_id,
            short_description: req.body.short_description,
            is_delete: req.body.is_delete || 0,
            image: req.body.image || null,
            status: req.body.status,
        };

        const add = await Blog.create(blog);

        if (!add || !add.insertId) {
            throw new Error('Không thể tạo bài viết');
        }
        const blogId = add.insertId;

        await Notification.sendNewPostNotification(req.body.author_id, blogId);

        const tags = req.body.tags || [];
        if (tags.length > 0) {
            const tagPromises = tags.map(tagId => Blog.addTag(blogId, tagId));
            await Promise.all(tagPromises);
        }

        res.status(200).json({
            data: { ...add, blogId },
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            error: 'Lỗi máy chủ nội bộ',
        });
    }
};


exports.update = async (req, res, next) => {
    try {

        let id = req.params.id;
        let blog = {
            title: req.body.title,
            content: req.body.content,
            context: stopword.removeStopwords(req.body.context.split(' ')).join(' '),
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            sport_id: req.body.sport_id,
            image: req.body.image || null,
            short_description: req.body.short_description,
        };

        // Đảm bảo rằng tag_ids là một mảng
        let tagIds = Array.isArray(req.body.tag_ids) ? req.body.tag_ids : [];

        // Cập nhật thông tin blog
        await Blog.update(id, blog);

        await new Promise((resolve, reject) => {
            let deleteSql = 'DELETE FROM blog_tags WHERE blog_id = ?';
            db.query(deleteSql, [id], (err, data) => {
                if (err) {
                    console.error("Error deleting tags:", err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        // Thêm các tags mới cho blog
        if (Array.isArray(tagIds) && tagIds.length > 0) {
            let values = tagIds.map(tagId => [id, tagId]);
            await new Promise((resolve, reject) => {
                let insertSql = 'INSERT INTO blog_tags (blog_id, tag_id) VALUES ?';
                db.query(insertSql, [values], (err, data) => {
                    if (err) {
                        console.error("Error inserting tags:", err);
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        res.status(200).json({
            data: 'Blog updated successfully',
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let result = await Blog.delete(id);

    res.status(200).json({
        result: result
    });
};

exports.softDelete = async (req, res, next) => {
    const id = req.params.id;
    const whyDelete = req.body.why_delete;
    try {
        const result = await Blog.softDelete(id, whyDelete);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.restore = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Blog.restore(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.sreach = async (req, res, next) => {
    const keywords = req.query.keywords || '';
    try {
        const results = await Blog.search(keywords);
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('API Error:', error); // Log lỗi nếu có
        res.status(500).json({ error: error.message });
    }
};

exports.searchWithTitle = async (req, res, next) => {
    const keywords = req.query.keywords || '';
    try {
        const results = await Blog.searchWithTitle(keywords);
        res.status(200).json({ data: results });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.approved = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Blog.approved(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.getBlogsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const blogs = await Blog.getBlogsByCategory(categoryId);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.getBlogsByTag = async (req, res) => {
    const tagId = req.params.tagId;
    try {
        const blogs = await Blog.fetchBlogsByTag(tagId);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogsBySport = async (req, res) => {
    const sportId = req.params.sportId;
    try {
        const blogs = await Blog.getBlogsBySport(sportId);
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs by sport:', error);
        res.status(500).json({ error: 'Không thể lấy các bài viết theo thể thao' });
    }
};

// Lấy bài viết hôm nay
exports.getBlogsToday = async (req, res, next) => {
    try {
        const blogs = await Blog.getBlogsToday();
        res.status(200).json({
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy bài viết tuần này
exports.getBlogsThisWeek = async (req, res, next) => {
    try {
        const blogs = await Blog.getBlogsThisWeek();
        res.status(200).json({
            data: blogs,
        });
    } catch (error) {
        console.error('Error:', error); // Log lỗi
        res.status(500).json({ error: error.message });
    }
};

// Lấy bài viết tháng trước
exports.getBlogsLastMonth = async (req, res, next) => {
    try {
        const blogs = await Blog.getBlogsLastMonth();
        res.status(200).json({
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy bài viết 3 tháng trước
exports.getBlogsThreeMonthsAgo = async (req, res, next) => {
    try {
        const blogs = await Blog.getBlogsThreeMonthsAgo();
        res.status(200).json({
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy bài viết 1 năm trước
exports.getBlogsOneYearAgo = async (req, res, next) => {
    try {
        const blogs = await Blog.getBlogsOneYearAgo();
        res.status(200).json({
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRecommendations = async (req, res) => {
    const { blog_id } = req.params;
    const { user_id } = req.query;

    const pythonPath = 'C:/Users/kiet0/AppData/Local/Programs/Python/Python313/python.exe';
    const scriptPath = path.resolve(__dirname, '../../python/recommendations.py');

    let command = `"${pythonPath}" "${scriptPath}" "${blog_id}"`;
    if (user_id) {
        command += ` "${user_id}"`;
    }

    try {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Lỗi khi thực thi script Python:", error);
                return res.status(500).json({ error: `Error executing Python script: ${error.message}` });
            }

            if (stderr) {
                console.error("Lỗi từ script Python:", stderr);
                return res.status(500).json({ error: `Error from Python script: ${stderr}` });
            }

            try {
                const recommendations = JSON.parse(stdout);
                res.status(200).json({ recommendations });
            } catch (jsonError) {
                console.error("Lỗi khi parse JSON:", jsonError);
                return res.status(500).json({ error: `Failed to parse Python output: ${jsonError.message}` });
            }
        });
    } catch (error) {
        console.error("Lỗi trong controller:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.getLatestBlog = async (req, res, next) => {
    try {
        const blog = await Blog.fetchLatestBlog();
        if (!blog || Object.keys(blog).length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết mới nhất.'
            });
        }
        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Có lỗi xảy ra khi lấy bài viết mới nhất.'
        });
    }
};


exports.autoApprovePost = async (req, res) => {
    try {
        console.log('Request received:', req.body);
        const { offset = 0, limit = 10 } = req.body;
        const pendingBlogs = await Blog.fetchPendingBlogs(offset, limit);

        if (!pendingBlogs.data.length) {
            return res.status(200).json({
                message: "Không có bài viết nào đang chờ duyệt.",
            });
        }

        const rejectedBlogs = [];
        const approvedBlogs = [];

        for (let blog of pendingBlogs.data) {
            const { blog_id, title, context } = blog;
            const blogContent = `${title} ${context}`;

            // Kiểm tra nội dung có phải là thể thao không
            const isSports = await checkIfSportsRelated(blogContent);

            if (!isSports) {
                const reason = "Bài viết không liên quan đến thể thao.";
                await Blog.softDelete(blog_id, reason);
                rejectedBlogs.push({ blog_id, reason });
                continue;
            }

            try {
                const response = await axios.post(
                    API_URL_AUTO,
                    { text: blogContent },
                    {
                        headers: {
                            Authorization: `Bearer ${API_KEY}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('Hugging Face Response:', response.data);

                if (response && response.data) {
                    const toxicityScore = response.data[0].score;

                    if (toxicityScore > 0.5) {
                        const reason = `Bài viết bị từ chối vì độ độc hại: ${toxicityScore}`;
                        await Blog.softDelete(blog_id, reason);
                        rejectedBlogs.push({ blog_id, reason });
                    } else {
                        await Blog.approved(blog_id);
                        approvedBlogs.push(blog_id);
                    }
                } else {
                    throw new Error("Không nhận được phản hồi hợp lệ từ Hugging Face.");
                }
            } catch (error) {
                console.error(`Error processing blog ID ${blog.blog_id}:`, error.message);
            }
        }

        return res.status(200).json({
            message: "Quá trình duyệt bài viết đã hoàn tất.",
            approvedBlogs,
            rejectedBlogs,
        });
    } catch (error) {
        console.error('Error during auto-approval:', error);
        return res.status(500).json({
            message: "Có lỗi xảy ra khi duyệt bài viết.",
            error: error.message,
        });
    }
};

// Hàm kiểm tra nội dung liên quan đến thể thao
async function checkIfSportsRelated(text) {
    try {
        const response = await axios.post(
            API_CHECK_SPORT,
            {
                inputs: text,
                parameters: { candidate_labels: ["sports", "politics", "entertainment"] },
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );

        // Kiểm tra kết quả trả về
        const label = response.data.labels[0];
        console.log(`Nội dung được phân loại là: ${label}`);

        return label === "sports";
    } catch (error) {
        console.error('Error during sports classification:', error.message);
        return false;
    }
}

exports.updateInactiveBlogs = async (req, res, next) => {
    try {
        const result = await Blog.updateBlogsForInactiveUsers();
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không có bài viết nào được cập nhật.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Cập nhật bài viết thành công!',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || 'Có lỗi xảy ra khi cập nhật bài viết.'
        });
    }
};



