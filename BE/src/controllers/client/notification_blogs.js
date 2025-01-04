const NotificationBlogs = require("../../models/notification_blogs");

// Lấy danh sách thông báo (có phân trang)
exports.getNotificationsBlog = async (req, res) => {
  const userId = req.params.id;
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await NotificationBlogs.fetchNotificationsBlog(
      userId,
      offset,
      limit
    );

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
        total: total,
      },
      links: {
        first: `${req.baseUrl}/notifications/${userId}?page=1&limit=${limit}`,
        last: `${req.baseUrl}/notifications/${userId}?page=${totalPages}&limit=${limit}`,
        prev:
          page > 1
            ? `${req.baseUrl}/notifications/${userId}?page=${page - 1}&limit=${limit}`
            : null,
        next:
          page < totalPages
            ? `${req.baseUrl}/notifications/${userId}?page=${page + 1}&limit=${limit}`
            : null,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách thông báo." });
  }
};

// Lấy tất cả thông báo
exports.getAllNotificationsBlog = async (req, res) => {
  const userId = req.params.id;
  try {
    const notifications = await NotificationBlogs.fetchAllNotificationsBlog(userId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách thông báo." });
  }
};


// Đánh dấu thông báo là đã đọc
exports.markAsReadBlog = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const result = await NotificationBlogs.markAsReadBlog(notificationId);
    res.status(200).json({
      message: "Thông báo đã được đánh dấu là đã đọc.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi đánh dấu thông báo." });
  }
};

// Xóa thông báo
exports.deleteNotificationBlog = async (req, res) => {
  const notificationId = req.params.id;
  try {
    const result = await NotificationBlogs.deleteNotificationBlog(notificationId);
    res.status(200).json({
      message: "Thông báo đã được xóa thành công.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi xóa thông báo." });
  }
};
