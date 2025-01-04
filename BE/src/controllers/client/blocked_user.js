const BlockedUsers = require("../../models/blocked_user");

exports.blockUser = async (req, res) => {
  const { blocker_id, blocked_id } = req.body;

  try {
    await BlockedUsers.blockUser(blocker_id, blocked_id);

    res.status(200).json({
      message: "Người dùng đã được chặn thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi chặn người dùng.", details: error });
  }
};

exports.unblockUser = async (req, res) => {
  const { blocker_id, blocked_id } = req.body;

  try {
    await BlockedUsers.unblockUser(blocker_id, blocked_id);

    res.status(200).json({
      message: "Người dùng đã được bỏ chặn thành công.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi bỏ chặn người dùng.", details: error });
  }
};

exports.isUserBlocked = async (req, res) => {
  const { blocker_id, blocked_id } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!blocker_id || !blocked_id) {
    return res.status(400).json({
      error: "Thiếu blocker_id hoặc blocked_id.",
    });
  }

  try {
    const isBlocked = await BlockedUsers.isUserBlocked(blocker_id, blocked_id);

    res.status(200).json({
      isBlocked: isBlocked,
      message: isBlocked ? "Người dùng đã bị chặn" : "Người dùng chưa bị chặn",
    });
  } catch (error) {
    res.status(500).json({
      error: "Đã xảy ra lỗi khi kiểm tra trạng thái chặn.",
      details: error.message, // Thêm chi tiết lỗi
    });
  }
};

exports.getBlockedUsers = async (req, res) => {
  const blockerId = req.params.id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await BlockedUsers.getBlockedUsers(
      blockerId,
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
        first: `${req.baseUrl}/blocked-users/${blockerId}?page=1&limit=${limit}`,
        last: `${req.baseUrl}/blocked-users/${blockerId}?page=${totalPages}&limit=${limit}`,
        prev:
          page > 1
            ? `${req.baseUrl}/blocked-users/${blockerId}?page=${
                page - 1
              }&limit=${limit}`
            : null,
        next:
          page < totalPages
            ? `${req.baseUrl}/blocked-users/${blockerId}?page=${
                page + 1
              }&limit=${limit}`
            : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Đã xảy ra lỗi khi lấy danh sách người bị chặn.",
      details: error,
    });
  }
};

exports.getAllBlockedUsers = async (req, res) => {
  const blockerId = req.params.id;

  try {
    const { data } = await BlockedUsers.getAllBlockedUsers(blockerId);

    res.status(200).json({
      data: data,
      total: data.length,
    });
  } catch (error) {
    res.status(500).json({
      error: "Đã xảy ra lỗi khi lấy danh sách người bị chặn.",
      details: error,
    });
  }
};
