const Rating = require('../../models/user');

// Hiển thị
exports.list = async (req, res, next) => {
    const ratings = await Rating.fetchAllRatings();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: ratings
    });
};

// Thêm
exports.add = async (req, res, next) => {
    var rating = {
        blog_id: req.body.blog_id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        created_at: req.body.created_at || new Date(),
        updated_at: req.body.updated_at || new Date(),
        is_delete: req.body.is_delete || 0 // mặc định là không xóa
    };

    // Thêm các kiểm tra bổ sung nếu cần thiết

    try {
        const addRating = await Rating.createRating(rating);
        res.status(200).json({
            status: 200,
            message: 'Dữ liệu được thêm thành công',
            data: addRating,
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm đánh giá" });
    }
};

// Xóa tạm thời
exports.softDeleteRating = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Rating.softDelete(id);
        res.status(200).json({
            status: 200,
            message: result
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Xóa
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteRating = await Rating.delete(id);
        res.status(200).json({ 
            status: 200,
            message: 'Dữ liệu xóa thành công',
            data: deleteRating 
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa đánh giá" });
    }
};

// Lấy chi tiết
exports.getDetail = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rating = await Rating.detailRating(id);
        res.status(200).json({ 
            status: 200,
            message: 'Dữ liệu trả về thành công',
            data: rating });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy thông tin chi tiết" });
    }
};

// Sửa
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const rating = {
        blog_id: req.body.blog_id,
        user_id: req.body.user_id,
        rating: req.body.rating,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        is_delete: req.body.is_delete
    };

    try {
        const ratingEdit = await Rating.editRating(id, rating);
        res.status(200).json({ status: 200, message: "Thông tin đánh giá đã được cập nhật thành công.", data: ratingEdit });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin đánh giá." });
    }
};
