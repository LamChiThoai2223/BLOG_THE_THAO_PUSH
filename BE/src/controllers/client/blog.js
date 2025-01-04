const Blog = require('../../models/blog');

exports.getBlogs = async (req, res, next) => {
    const blogs = await Blog.fetchAll();
    res.status(200).json({ data: blogs });
};

exports.detail = async (req, res, next) => {
    try {
        let id = req.params.id;
        const blogs = await Blog.detail(id);
        res.status(201).json({
            data: blogs,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.add = async (req, res, next) => {
    try {
        let blog = {
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            tag_id: req.body.tag_id,
            sport_id: req.body.sport_id,
            is_delete: req.body.is_delete || 0
        };
        const add = await Blog.create(blog);
        res.status(200).json({
            data: add,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            error: 'Lỗi máy chủ nội bộ',
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        let id = req.params.id;
        let blog = {
            title: req.body.title,
            content: req.body.content,
            author_id: req.body.author_id,
            category_id: req.body.category_id,
            tag_id: req.body.tag_id,
            sport_id: req.body.sport_id,
        };

        const edit = await Blog.update(id, blog);
        res.status(200).json({
            data: edit,
        });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({
            error: 'Lỗi máy chủ nội bộ'
        });
    }
};

exports.delete = async (req, res, next) => {
    let id = req.params.id;

    let result = await Blog.delete(id);

    console.log(result);
    res.status(201).json({
        result: result
    })
};

exports.softDelete = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Blog.softDelete(id);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

