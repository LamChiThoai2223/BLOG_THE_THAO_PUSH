const Sport = require('../../models/sport');

// Fetch all sports with search functionality
exports.getPages = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || ''; 

        const { data, total } = await Sport.fetchAll(offset, limit, search); 
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
                first: `${req.baseUrl}/sports?page=1&limit=${limit}&search=${search}`,
                last: `${req.baseUrl}/sports?page=${totalPages}&limit=${limit}&search=${search}`,
                prev: page > 1 ? `${req.baseUrl}/sports?page=${page - 1}&limit=${limit}&search=${search}` : null,
                next: page < totalPages ? `${req.baseUrl}/sports?page=${page + 1}&limit=${limit}&search=${search}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch all sports that are marked as deleted
exports.getPagesDelete = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const { data, total } = await Sport.fetchAllSportDelete(offset, limit, search); 
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
                first: `${req.baseUrl}/sports_delete?page=1&limit=${limit}&search=${search}`,
                last: `${req.baseUrl}/sports_delete?page=${totalPages}&limit=${limit}&search=${search}`,
                prev: page > 1 ? `${req.baseUrl}/sports_delete?page=${page - 1}&limit=${limit}&search=${search}` : null,
                next: page < totalPages ? `${req.baseUrl}/sports_delete?page=${page + 1}&limit=${limit}&search=${search}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.fetchSports = async (req, res, next) => {
    try {
        const sport = await Sport.fetchSports();
        res.status(200).json({ data: sport });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching sports" });
    }
};

// hiển thị
exports.list = async (req, res, next) => {
    const sport = await Sport.fetchAllSport();
    res.status(200).json({ data: sport });
};

//add
exports.add = async (req, res, next) => {
    const file = req.file;
    var sport = {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        is_delete: req.body.is_delete || 0 // mặc định là không xóa
    }

    // if (!user.username || !user.email || !user.password || !user.full_name || !user.image_user || !user.phone) {
    //     return res.status(400).json({ error: "Các trường bắt buộc không được để trống" });
    // }

    // Thêm các kiểm tra bổ sung nếu cần thiết

    try {
        const addSport = await Sport.createSport(sport);
        res.status(200).json({
            data: addSport,
        });
    } catch (error) {
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm Sport" });
    }
};

//xóa tạm thời
exports.softDeleteSport = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Sport.softDelete(id);
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in soft deleting sport:", error);
        res.status(500).json({ error: error.message });
    }
};
// Restore a sport
exports.restoreSports = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Sport.restoreSport(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// xóa 
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const deleteSport = await Sport.delete(id);
    res.status(200).json({ data: deleteSport });
};

// lấy chi tiết 
exports.getDetail = async (req, res, next) => {
    const id = req.params.id;
    const sport = await Sport.detailSport(id);
    res.status(200).json({ data: sport });
};

// update sport with logging
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const sport = {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images,
        updated_at: new Date(),
        is_delete: 0
    };

    console.log("Updating sport with data:", sport); // Log sport data

    try {
        const SportEdit = await Sport.editSport(id, sport);
        res.status(200).json({ message: "Cập nhật loại thành công.", data: SportEdit });
    } catch (error) {
        console.error("Error updating sport:", error); // Log error
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật sport." });
    }
};
