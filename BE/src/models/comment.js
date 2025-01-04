var db = require('../config/database');

module.exports = class Comment {
    constructor() {}

    // Fetch comments by blog ID
    static async fetchCommentsByBlogId(blog_id, offset, limit) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT SQL_CALC_FOUND_ROWS c.*, u.username, u.image_user, c.created_at, u.bio, u.full_name
                FROM comments c
                JOIN users u ON c.user_id = u.user_id
                WHERE c.blog_id = ? AND c.is_delete != 1
                ORDER BY c.created_at DESC
                LIMIT ?, ?
            `;
            db.query(sql, [blog_id, offset, limit], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    db.query("SELECT FOUND_ROWS() as total", (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            // Tính tổng số bình luận không bị xóa
                            const totalCommentsSql = `
                                SELECT COUNT(*) as total
                                FROM comments
                                WHERE blog_id = ? AND is_delete = 0
                            `;
                            db.query(totalCommentsSql, [blog_id], (err, totalResult) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        data: data,
                                        total: totalResult[0].total, // Tổng số bình luận không bị xóa
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    

    // Add a new comment
    static async createComment(comment) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO comments (blog_id, user_id, content, image_url, is_delete) VALUES (?, ?, ?, ?, ?)`;
            let values = [
                comment.blog_id,
                comment.user_id,
                comment.content,
                comment.image_url,
                comment.is_delete,
            ];
            db.query(sql, values, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Fetch replies for a comment
    static async fetchReplies(comment_id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT c.*, u.username, u.image_user
                FROM comments c
                JOIN users u ON c.user_id = u.user_id
                WHERE c.parent_comment_id = ? AND c.is_delete = 0
            `;
            db.query(sql, [comment_id], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Soft delete a comment
    static async softDelete(comment_id) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE comments SET is_delete = 1 WHERE comment_id = ?`;
            db.query(sql, [comment_id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Cannot soft delete comment");
                } else {
                    resolve("Comment soft deleted successfully");
                }
            });
        });
    }

    // Permanently delete a comment
    static async delete(comment_id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM comments WHERE comment_id = ?`;
            db.query(sql, [comment_id], (err, rows) => {
                if (!err) {
                    resolve("Comment deleted successfully");
                } else {
                    console.log(err);
                    reject("Cannot delete comment");
                }
            });
        });
    }

    // Get comment details
    static async detailComment(comment_id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM comments WHERE comment_id = ? AND is_delete = 0`;
            db.query(sql, [comment_id], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Edit a comment
    static async editComment(comment_id, comment) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE comments SET ?  WHERE comment_id = ?";
            db.query(sql, [comment, comment_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
 // Edit a reply
static async editReply(reply_id, reply) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE comments SET content = ? WHERE comment_id = ?";
        let values = [
            reply.content,
            reply_id
        ];
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


    static async fetchAllBlogs(offset, limit) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT SQL_CALC_FOUND_ROWS b.* 
                FROM blogs b 
                INNER JOIN comments c ON b.blog_id = c.blog_id 
                WHERE b.is_delete != 1 
                GROUP BY b.blog_id
                LIMIT ?, ?`;
            db.query(sql, [offset, limit], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    db.query("SELECT FOUND_ROWS() as total", (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                data: data,
                                total: result[0].total,
                            });
                        }
                    });
                }
            });
        });
    }
    

}
