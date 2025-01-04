const Tag = require('../../models/tag');

// List all tags
exports.list = async (req, res, next) => {
    try {
        const tags = await Tag.fetchAllTags();
        res.status(200).json({ data: tags });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tags" });
    }
};

exports.fetchTags = async (req, res, next) => {
    try {
        const tags = await Tag.fetchTags();
        res.status(200).json({ data: tags });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tags" });
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

// Update a tag
exports.update = async (req, res, next) => {
    const tag_id = req.params.tag_id;
    const tag = {
        name: req.body.name,
        is_delete: req.body.is_delete
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
