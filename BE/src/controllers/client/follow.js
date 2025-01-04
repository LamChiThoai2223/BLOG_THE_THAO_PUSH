const Follow = require('../../models/follow');

// Lấy danh sách người theo dõi của một người dùng với phân trang
exports.getFollowers = async (req, res) => {
    const userId = req.params.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Follow.fetchFollowers(userId, offset, limit);
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
                first: `${req.baseUrl}/followers/${userId}/?page=1&limit=${limit}`,
                last: `${req.baseUrl}/followers/${userId}/?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/followers/${userId}/?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/followers/${userId}/?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách người theo dõi." });
    }
};

exports.getFriends = async (req, res) => {
    const userId = req.params.id;
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit; 

        const { data, total } = await Follow.fetchFriends(userId, offset, limit);

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
                first: `${req.baseUrl}/friends/${userId}?page=1&limit=${limit}`,
                last: `${req.baseUrl}/friends/${userId}?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/friends/${userId}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/friends/${userId}?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        console.error("Error in getFriends:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách bạn bè." });
    }
};


// Lấy danh sách người mà một người dùng đang theo dõi với phân trang
exports.getFollowing = async (req, res) => {
    const userId = req.params.id;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Follow.fetchFollowing(userId, offset, limit);
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
                first: `${req.baseUrl}/following/${userId}/?page=1&limit=${limit}`,
                last: `${req.baseUrl}/following/${userId}/?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/following/${userId}/?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/following/${userId}/?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách người mà bạn đang theo dõi." });
    }
};


// Lấy danh sách người theo dõi của một người dùng
exports.getFollowersAllNoPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const followers = await Follow.fetchFollowersAllNoPage(userId);
        res.status(200).json({ data: followers });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách người theo dõi." });
    }
};

// Lấy danh sách người mà một người dùng đang theo dõi
exports.getFollowingAllNoPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const following = await Follow.fetchFollowingAllNoPage(userId);
        res.status(200).json({ data: following });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách người mà bạn đang theo dõi." });
    }
};

// Theo dõi người dùng
exports.followUser = async (req, res) => {
    const { follower_id, followed_id } = req.body;
    try {
        const isFollowing = await Follow.isFollowing(follower_id, followed_id);
        if (isFollowing) {
            return res.status(400).json({ message: "Bạn đã theo dõi người dùng này." });
        }
        const result = await Follow.followUser(follower_id, followed_id);
        res.status(200).json({ message: "Theo dõi thành công.", data: result });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi theo dõi người dùng." });
    }
};

// Bỏ theo dõi người dùng
exports.unfollowUser = async (req, res) => {
    
    const { follower_id, followed_id } = req.body;
    try {
        const result = await Follow.unfollowUser(follower_id, followed_id);
        res.status(200).json({ message: "Bỏ theo dõi thành công.", data: result });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi bỏ theo dõi người dùng." });
    }
};
