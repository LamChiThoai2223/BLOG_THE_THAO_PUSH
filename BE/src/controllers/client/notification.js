const Notification = require('../../models/notification');

// Lấy danh sách thông báo của một người dùng
exports.getNotifications = async (req, res) => {
    const userId = req.params.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Notification.fetchNotifications(userId, offset, limit);
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
                first: `${req.baseUrl}/notifications/${userId}?page=1&limit=${limit}`,
                last: `${req.baseUrl}/notifications/${userId}?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/notifications/${userId}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/notifications/${userId}?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách thông báo." });
    }
};

// Lấy danh sách thông báo của một người dùng
exports.getAllNotifications = async (req, res) => {
    const userId = req.params.id;
    try {
        const notifications = await Notification.fetchAllNotifications(userId);
        res.status(200).json({ data: notifications });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách thông báo." });
    }
};

// Tạo thông báo mới khi có bài viết mới
exports.createNotification = async (req, res) => {
    const { follower_id, blog_id, author_id } = req.body;
    try {
        const result = await Notification.createNotification(follower_id, blog_id, author_id);
        res.status(201).json({ message: "Thông báo đã được tạo thành công.", data: result });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi tạo thông báo." });
    }
};

// Đánh dấu thông báo là đã đọc
exports.markAsRead = async (req, res) => {
    const notificationId = req.params.id; // Lấy ID thông báo từ params
    try {
        const result = await Notification.markAsRead(notificationId);
        res.status(200).json({ message: "Thông báo đã được đánh dấu là đã đọc.", data: result });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi đánh dấu thông báo." });
    }
};

// Xóa thông báo
exports.deleteNotification = async (req, res) => {
    const notificationId = req.params.id; // Lấy ID thông báo từ params
    try {
        const result = await Notification.deleteNotification(notificationId);
        res.status(200).json({ message: "Thông báo đã được xóa thành công.", data: result });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa thông báo." });
    }
};

// Ẩn thông báo
exports.hideNotification = async (req, res) => {
    const notificationId = req.params.id; // Lấy ID thông báo từ params
    try {
        await Notification.hideNotification(notificationId);
        res.status(200).json({ message: "Thông báo đã được ẩn thành công." });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi ẩn thông báo." });
    }
};

// Tắt tất cả thông báo từ một tác giả
exports.turnOffNotifications = async (req, res) => {
    const userId = req.params.userId; // ID người dùng
    const authorId = req.params.authorId; // ID tác giả
    
    try {
        await Notification.turnOffNotifications(userId, authorId);
        res.status(200).json({ message: "Đã tắt tất cả thông báo từ tác giả này." });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi tắt thông báo." });
    }
};
// Bật tất cả thông báo từ một tác giả
exports.turnOnNotifications = async (req, res) => {
    const userId = req.params.userId; // ID người dùng
    const authorId = req.params.authorId; // ID tác giả

    try {
        await Notification.turnOnNotifications(userId, authorId); // Gọi hàm từ model để bật thông báo
        res.status(200).json({ message: "Đã bật tất cả thông báo từ tác giả này." });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi bật thông báo." });
    }
};
