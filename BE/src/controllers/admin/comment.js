const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const Notification = require('../../models/notification');
const axios = require('axios');
const HUGGING_FACE_API_KEY = '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'; // API Key từ Hugging Face
const API_URL_AUTO = process.env.API_URL_AUTO;
exports.list = async (req, res, next) => {
    const blog_id = req.params.blog_id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Comment.fetchCommentsByBlogId(blog_id, offset, limit);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;
        const hasMore = total > offset + data.length;

        res.status(200).json({
            data: data, 
            meta: {
                current_page: page,
                from: from,
                last_page: totalPages,
                path: req.baseUrl,
                per_page: limit,
                to: to,
                total: total,
                hasMore: hasMore // Cờ để xác định có nhiều bình luận hơn hay không
            },
            total_comments: total,
            links: {
                first: `${req.baseUrl}/comments/${blog_id}?page=1&limit=${limit}`,
                last: `${req.baseUrl}/comments/${blog_id}?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/comments/${blog_id}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/comments/${blog_id}?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.editReply = async (req, res, next) => {
    const reply_id = req.params.id;
    const reply = {
        content: req.body.content,
    };

    try {
        const result = await Comment.editReply(reply_id, reply);
        res.status(200).json({ message: 'Reply updated successfully', data: result });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the reply' });
    }
};

// Add a new comment or reply
exports.add = async (req, res, next) => {
    const comment = {
        blog_id: req.body.blog_id,
        user_id: req.body.user_id,
        content: req.body.content,
        image_url: req.body.image_url,
        is_delete: req.body.is_delete || 0,
    };

    try {
        const textModerationResponse = await axios.post(
            API_URL_AUTO,
            { inputs: comment.content },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const textModerationResult = textModerationResponse.data;
        if (Array.isArray(textModerationResult) && Array.isArray(textModerationResult[0])) {
            const labels = textModerationResult[0].map(item => item.label);
            const scores = textModerationResult[0].map(item => item.score);
            const toxicIndex = labels.indexOf('toxic');
            if (toxicIndex !== -1 && scores[toxicIndex] > 0.9) {
                return res.status(200).json({
                    message: `Your comment contains harmful content and cannot be added. Please edit your comment.`
                });
            }
        } else {
            console.error('Invalid response structure:', textModerationResult);
            return res.status(500).json({ error: 'Cấu trúc phản hồi không hợp lệ từ Hugging Face API.' });
        }
        const commentId = await Comment.createComment(comment);
        // Lấy thông tin tác giả của bài viết
        const blog = await Blog.findById(req.body.blog_id);
        if (!blog) {
            return res.status(404).json({ error: "Bài viết không tồn tại" });
        }

        const authorId = blog.author_id;

        // Gửi thông báo nếu người bình luận không phải là tác giả
        if (authorId !== req.body.user_id) {
            await Notification.createNotification(authorId, req.body.blog_id, req.body.user_id, 'comment');
        }
        res.status(200).json({ data: { comment_id: commentId } });

    } catch (error) {
        console.error('Error adding comment:', error.message);
        if (error.response) {
            console.error('API Response Error:', error.response.data);
        }

        res.status(500).json({ error: `Có lỗi xảy ra khi thêm bình luận: ${error.message}` });
    }
};


// Get comment details
exports.getDetail = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    try {
        const comment = await Comment.detailComment(comment_id);
        res.status(200).json({ data: comment });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the comment details" });
    }
};

// Update a comment
exports.update = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    const comment = {
        content: req.body.content,
        
    };
    if (req.body.image_url !== undefined) {
        comment.image_url = req.body.image_url; 
      }
    try {
        const commentEdit = await Comment.editComment(comment_id, comment);
        res.status(200).json({ message: "Comment updated successfully", data: commentEdit });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the comment" });
    }
};

// Soft delete a comment
exports.softDelete = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    try {
        const result = await Comment.softDelete(comment_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Permanently delete a comment
exports.delete = async (req, res, next) => {
    const comment_id = req.params.comment_id;
    try {
        const result = await Comment.delete(comment_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// List all blogs

exports.listAllBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const { data, total } = await Comment.fetchAllBlogs(offset, limit);
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
                first: `${req.baseUrl}/blog_comment?page=1&limit=${limit}`,
                last: `${req.baseUrl}/blog_comment?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/blog_comment?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/blog_comment?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
