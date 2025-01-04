const Share = require('../../models/share');

exports.fetchPostSharesWithTotal = async (req, res, next) => {
    const postViews = await Share.fetchPostSharesWithTotal();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.fetchTotalSharesWithBlogs = async (req, res, next) => {
    const postViews = await Share.fetchTotalSharesWithBlogs();
    res.status(200).json({
        status: 200,
        message: 'Dữ liệu trả về thành công',
        data: postViews
    });
};

exports.addShare = async (req, res, next) => {
    const blog_id = req.body.blog_id;
    const user_id = req.body.user_id;
    try {
        const result = await Share.addShare(blog_id,user_id);
        res.status(200).json({ message: "Add share successfuly" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
    
}