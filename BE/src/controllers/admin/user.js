const bcrypt = require('bcryptjs');
const User = require('../../models/user');

// Hiển thị tất cả người dùng
exports.list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await User.fetchAll(offset, limit);
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
                first: `${req.baseUrl}/users?page=1&limit=${limit}`,
                last: `${req.baseUrl}/users?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/users?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/users?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listDeleted = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await User.fetchAllUsersDeleted(offset, limit);
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
                first: `${req.baseUrl}/users?page=1&limit=${limit}`,
                last: `${req.baseUrl}/users?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/users?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/users?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.fetchRegisterAuthor = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Gọi model fetchRegisterAuthor
        const { data, total } = await User.fetchRegisterAuthor(offset, limit);

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
                first: `${req.baseUrl}?page=1&limit=${limit}`,
                last: `${req.baseUrl}?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Add a user
exports.register = async (req, res, next) => {
    const newpassword = bcrypt.hashSync(req.body.password, 10);
    var user = {
        username: req.body.username,
        email: req.body.email,
        password: newpassword,
        image_user: req.body.image_user || 'https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdefault.jpg?alt=media',
        full_name: req.body.full_name,
        phone: req.body.phone,
        role: req.body.role || 'user',
        is_delete: req.body.is_delete || 0,
        status: req.body.status || 'active',
    }
    try {
        const addUser = await User.register(user);
        res.status(200).json({
            data: addUser,
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm người dùng" });
    }
}
//  get email address
exports.getEmails = async (req, res) => {
    try {
        const emails = await User.getEmails();
        res.status(200).json({ data: emails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Check if email exists
exports.checkEmailExists = async (req, res) => {
    const { email } = req.query;
    const exists = await User.checkEmailExists(email);
    res.json({ exists });
};

// Check if username exists
exports.checkUsernameExists = async (req, res) => {
    const { username } = req.query;
    const exists = await User.checkUsernameExists(username);
    res.json({ exists });
};

// Check if phone exists
exports.checkPhoneExists = async (req, res) => {
    const { phone } = req.query;
    const exists = await User.checkPhoneExists(phone);
    res.json({ exists });
};

// Check if CCCD exists
exports.checkCccdExists = async (req, res) => {
    const { cccd } = req.query;
    const exists = await User.checkCccdExists(cccd);
    res.json({ exists });
};

// Soft delete a user
exports.softDeleteUser = async (req, res) => {
    const id = req.params.id;
    const { why_delete } = req.body;

    if (!why_delete) {
        return res.status(400).json({ error: "Reason for deletion is required" });
    }

    try {
        const result = await User.softDelete(id, why_delete);
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in soft deleting user:", error);
        res.status(500).json({ error: error.message });
    }
};

// Restore a user
exports.restoreUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.restoreUser(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Permanently delete a user
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteUser = await User.delete(id);
        res.status(200).json({ message: deleteUser });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa người dùng" });
    }
};

// Get user details
exports.getDetail = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await User.detailUsers(id);
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const user = result[0]; // lấy user đầu tiên từ kết quả trả về
        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi lấy chi tiết người dùng" });
    }
};

exports.profile = async (req, res, next) => {
    const id = req.params.id;
    const user = {
        email: req.body.email,
        full_name: req.body.full_name,
        full_name: req.body.full_name,
        phone: req.body.phone,
        address: req.body.address,
        bio: req.body.bio || '',
        updated_at: new Date()
    };
    if (req.body.image_user) {
        user.image_user = `https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2F${req.body.image_user}?alt=media`;
    }
    try {
        const userEdit = await User.profileUpdate(id, user);
        res.status(200).json({ message: "Thông tin người dùng đã được cập nhật thành công.", data: userEdit });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin người dùng" });
    }
};
// Update a user
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const user = {
        email: req.body.email,
        full_name: req.body.full_name,
        image_user: req.body.image_user,
        phone: req.body.phone,
        address: req.body.address,
        cccd: req.body.cccd,
        bio: req.body.bio,
        role: req.body.role,
        status: req.body.status,
        is_delete: req.body.is_delete,
        updated_at: new Date()
    };

    try {
        const userEdit = await User.editUsers(id, user);
        res.status(200).json({ message: "Thông tin người dùng đã được cập nhật thành công.", data: userEdit });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin người dùng" });
    }
};
exports.search = async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: "Keyword is required for search" });
    }
    try {
        const users = await User.searchUsers(keyword);
        res.status(200).json({ data: users });
    } catch (error) {
        console.error("Error in searching users:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.searchSoftDelete = async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        return res.status(400).json({ error: "Keyword is required for search" });
    }

    try {
        const users = await User.searchUsers(keyword);
        res.status(200).json({ data: users });
    } catch (error) {
        console.error("Error in searching users:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.confirmAuthor = async (req, res) => {
    const id = req.params.id;
    const { why_delete } = req.body;

    if (!why_delete) {
        return res.status(400).json({ error: "Reason for deletion is required" });
    }

    try {
        const result = await User.confirmAuthor(id, why_delete);
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in soft deleting user:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.agreeAuthor = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.agreeAuthor(id);
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in register author:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.refuseAuthor = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.refuseAuthor(id);
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in register author:", error);
        res.status(500).json({ error: error.message });
    }
};


