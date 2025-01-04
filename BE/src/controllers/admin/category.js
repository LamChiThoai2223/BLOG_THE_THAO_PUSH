const Category = require('../../models/category');

// hiển thị
exports.list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { data, total } = await Category.fetchAllCategory(offset, limit);
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
                first: `${req.baseUrl}/categories?page=1&limit=${limit}`,
                last: `${req.baseUrl}/categories?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/categories?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/categories?page=${page + 1}&limit=${limit}` : null
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

        const { data, total } = await Category.fetchAllCategoryDeleted(offset, limit);
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
                first: `${req.baseUrl}/categories?page=1&limit=${limit}`,
                last: `${req.baseUrl}/categories?page=${totalPages}&limit=${limit}`,
                prev: page > 1 ? `${req.baseUrl}/categories?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${req.baseUrl}/categories?page=${page + 1}&limit=${limit}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//add
exports.add = async (req, res, next) => {
    const { name, description, parent_id, is_delete } = req.body; // Lấy dữ liệu từ request

    // Tạo đối tượng category để truyền vào model
    const category = {
        name: name,
        description: description,
        parent_id: parent_id || null,  // Nếu không có parent_id thì gán là null
        is_delete: is_delete || 0,     // Mặc định không xóa
    };

    try {
        // Gọi phương thức createCategory trong model để thêm category
        const addCategory = await Category.createCategory(category);

        // Trả về kết quả
        res.status(200).json({
            message: "Thêm category thành công",
            data: addCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi thêm category",
            error: error.message || error,
        });
    }
};

//xóa tạm thời
exports.softDeleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Category.softDelete(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// xóa loại
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const deleteCategory = await Category.delete(id);
    res.status(200).json({ data: deleteCategory });
};

// lấy chi tiết loại
exports.getDetail = async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.detailCategory(id);
    res.status(200).json({ data: category });
};

// sửa loại
exports.update = async (req, res, next) => {
    const { id } = req.params; // Lấy id từ tham số URL
    const { name, description, parent_id, is_delete } = req.body; // Lấy dữ liệu từ body request

    // Tạo đối tượng category với thông tin cập nhật
    const category = {
        name: name,
        description: description,
        parent_id: parent_id || null,  // Nếu không có parent_id thì gán là null
        is_delete: is_delete || 0,     // Mặc định không xóa
    };

    try {
        // Gọi phương thức editCategory trong model để cập nhật category
        const updateCategory = await Category.editCategory(id, category);

        // Trả về kết quả
        res.status(200).json({
            message: "Cập nhật category thành công",
            data: updateCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi khi cập nhật category",
            error: error.message || error,
        });
    }
};

exports.restore = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Category.restore(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.fetchCategories = async (req, res, next) => {
    try {
        const category = await Category.fetchCategories();
        res.status(200).json({ data: category });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tags" });
    }
};
