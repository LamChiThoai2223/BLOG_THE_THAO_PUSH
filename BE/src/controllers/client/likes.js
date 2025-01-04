const Likes = require("../../models/likes");

exports.ListLikesByUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id || req.body.user_id;

    if (!user_id) {
      return res.status(400).json({ message: "User ID không được để trống." });
    }
    const likes = await Likes.findLikesByUser(user_id);

    if (likes.length === 0) {
      return res
        .status(404)
        .json({ message: "Người dùng chưa like bài viết nào." });
    }
    res.status(200).json({
      message: "Danh sách các bài viết đã like",
      data: likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã có lỗi xảy ra." });
  }
};
