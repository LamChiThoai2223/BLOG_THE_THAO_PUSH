const PostView = require('../../models/post_views');

// Hiển thị
exports.list = async (req, res, next) => {
    const postViews = await PostView.fetchAllPostViews();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.totalViews = async (req, res, next) => {
    const postViews = await PostView.totalViews();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.totalViewsByUserId = async (req, res, next) => {
    const user_id = req.body.user_id;
    const postViews = await PostView.totalViewsByUserId(user_id);
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};


exports.totalViewsInDay = async (req, res, next) => {
    const postViews = await PostView.totalViewsInDay();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.fetchPostViewsWithTotal = async (req, res, next) => {
    const postViews = await PostView.fetchPostViewsWithTotal();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.fetchTotalViewsWithBlogs = async (req, res, next) => {
    const postViews = await PostView.fetchTotalViewsWithBlogs();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};



// Thêm
exports.add = async (req, res, next) => {
    var postView = {
        blog_id: req.body.blog_id,
        user_id: req.body.user_id,
        viewed_at: req.body.viewed_at || new Date()
    };

    // Thêm các kiểm tra bổ sung nếu cần thiết

    try {
        const addPostView = await PostView.createPostView(postView);
        res.status(200).json({
            status: 200,
            message: 'Dữ liệu được thêm thành công',
            data: addPostView,
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm lượt xem bài viết" });
    }
};

// Xóa tạm thời
exports.softDeletePostView = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await PostView.softDelete(id);
        res.status(200).json({
            status: 200,
            message: result
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.viewBlog = async (req, res, next) => {
    const id = req.params.id;
    const user_id = req.body.user_id;
    try {
        const result = await PostView.viewBlog(id,user_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
    
}