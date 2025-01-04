const Tag = require('../../models/tag');

// List all tags
exports.list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || ''; // Get search query from request

        // Pass the search parameter to the fetchAllTags method
        const { data, total } = await Tag.fetchAllTags(offset, limit, search);
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
                first: `${req.baseUrl}/tags?page=1&limit=${limit}&search=${search}`,
                last: `${req.baseUrl}/tags?page=${totalPages}&limit=${limit}&search=${search}`,
                prev: page > 1 ? `${req.baseUrl}/tags?page=${page - 1}&limit=${limit}&search=${search}` : null,
                next: page < totalPages ? `${req.baseUrl}/tags?page=${page + 1}&limit=${limit}&search=${search}` : null
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
        const search = req.query.search || '';
        
        const { data, total } = await Tag.fetchAllTagsDeleted(offset, limit, search);
        const totalPages = Math.ceil(total / limit);
        const from = offset + 1;
        const to = offset + data.length;

        res.status(200).json({
            message: "Successfully connected API",
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
                first: `${req.baseUrl}/tags?page=1&limit=${limit}&search=${search}`,
                last: `${req.baseUrl}/tags?page=${totalPages}&limit=${limit}&search=${search}`,
                prev: page > 1 ? `${req.baseUrl}/tags?page=${page - 1}&limit=${limit}&search=${search}` : null,
                next: page < totalPages ? `${req.baseUrl}/tags?page=${page + 1}&limit=${limit}&search=${search}` : null
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new tag
exports.add = async (req, res, next) => {
    const tag = {
        name: req.body.name,
        is_delete: req.body.is_delete || 0
    };

    try {
        const tagId = await Tag.createTag(tag);
        res.status(200).json({ data: { tag_id: tagId } });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while adding the tag" });
    }
};

// Get tag details
exports.getDetail = async (req, res, next) => {
    const tag_id = req.params.tag_id;
    try {
        const tag = await Tag.detailTag(tag_id);
        res.status(200).json({ data: tag });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the tag details" });
    }
};

exports.checkNameTag = async (req, res, next) => {
    const name = req.params.name;
    try {
        const tag = await Tag.checkNameTag(name);
        res.status(200).json({ data: tag });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the tag details" });
    }
};
// Update a tag
exports.update = async (req, res, next) => {
    const tag_id = req.params.tag_id;
    const tag = {
        name: req.body.name,
        is_delete: req.body.is_delete || 0
    };

    try {
        const tagEdit = await Tag.editTag(tag_id, tag);
        res.status(200).json({ message: "Tag information updated successfully", data: tagEdit });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating tag information" });
    }
};

// Soft delete a tag
exports.softDelete = async (req, res, next) => {
    const tag_id = req.params.tag_id;
    try {
        const result = await Tag.softDelete(tag_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Permanently delete a tag
exports.delete = async (req, res, next) => {
    const tag_id = req.params.tag_id;
    try {
        const result = await Tag.delete(tag_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.restore = async (req, res) => {
    const tag_id = req.params.tag_id;
    try {
        const result = await Tag.restore(tag_id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
