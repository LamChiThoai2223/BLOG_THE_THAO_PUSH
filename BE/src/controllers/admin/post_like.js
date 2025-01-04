const PostLike = require('../../models/post_like');

// Lấy thông tin chi tiết của một like theo blog_id và user_id
exports.detail = async (req, res, next) => {
    try {
        const { blog_id, user_id } = req.body; // Cần cả blog_id và user_id
        const likes = await PostLike.findByPostAndUser(blog_id, user_id);
        res.status(200).json({
            data: likes,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Đếm số lượng likes của bài viết
exports.countLikes = async (req, res, next) => {
    try {
        const blogId = req.params.blogId; // Sửa từ postId thành blogId để phù hợp với model
        const count = await PostLike.countLikes(blogId);
        res.status(200).json({
            likesCount: count,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle like (thêm hoặc xóa like)
exports.toggleLike = async (req, res, next) => {
    try {
        const { blog_id, user_id } = req.body;
        const result = await PostLike.toggleLike(blog_id, user_id);
        res.status(200).json({
            liked: result.liked,
            message: result.liked ? "Like đã được thêm" : "Like đã bị xóa",
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getLikedPosts = async (req, res) => {
    try {
        const likedPosts = await PostLike.fetchAll();
        res.status(200).json({ data: likedPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tổng số lượt like
exports.getTotalLikes = async (req, res) => {
    try {
        const totalLikes = await PostLike.fetchTotalLikes();
        res.status(200).json({ data: [totalLikes] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tổng số lượt like trong ngày
exports.getTotalLikesInDay = async (req, res) => {
    try {
        const totalLikesInDay = await PostLike.fetchTotalLikesInDay();
        res.status(200).json({ data: [totalLikesInDay] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findUserLikeBlog = async (req, res, next) => {
    try {
        const blog_id = req.params.blog_id;
        const like = await PostLike.findUserLikeBlog(blog_id);
        if (like.length === 0) {
            return res.status(404).json({
                message: 'No likes found for this user'
            });
        }
        res.status(200).json({
            message: 'Get data Successfully',
            data: like,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  exports.getLikedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Lấy danh sách bài viết mà người dùng đã like
        const { data, total } = await PostLike.fetchLikedPostsByUser(userId, offset, limit);
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
                first: `${req.baseUrl}/liked-posts/${userId}/?page=1&limit=${limit}`,
                last: `${req.baseUrl}/liked-posts/${userId}/?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/liked-posts/${userId}/?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/liked-posts/${userId}/?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách bài viết mà bạn đã thích." });
    }
};