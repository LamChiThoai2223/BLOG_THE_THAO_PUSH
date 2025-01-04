var db = require('../config/database');

module.exports = class PostLike {
    // Tìm like theo blog_id và user_id
    static async findByPostAndUser(blogId, userId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM blog_likes WHERE blog_id = ? AND user_id = ?',
                [blogId, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Thêm lượt like
    static async addLike(blogId, userId) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO blog_likes (blog_id, user_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP',
                [blogId, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Xóa lượt like
    static async removeLike(blogId, userId) {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM blog_likes WHERE blog_id = ? AND user_id = ?',
                [blogId, userId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Đếm số lượng likes của bài viết
    static async countLikes(blogId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT COUNT(*) AS total_likes FROM blog_likes WHERE blog_id = ?',
                [blogId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result[0].total_likes || 0); // Trả về 0 nếu không có bản ghi nào
                }
            );
        });
    }

    // Lấy tất cả lượt like
    static async fetchAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM blog_likes', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Toggle like (thêm hoặc xóa like)
    static async toggleLike(blogId, userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.findByPostAndUser(blogId, userId);
                if (result.length > 0) {
                    // Nếu đã có like, thực hiện xóa like
                    await this.removeLike(blogId, userId);
                    resolve({ liked: false }); // Trả về kết quả đã bỏ like
                } else {
                    // Nếu chưa có like, thực hiện thêm like
                    await this.addLike(blogId, userId);
                    resolve({ liked: true }); // Trả về kết quả đã thêm like
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static async getLikeDetailsByPost(blogId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user_id, created_at 
                 FROM blog_likes 
                 WHERE blog_id = ? 
                 ORDER BY created_at ASC`, // Sắp xếp theo thời gian like
                [blogId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result); // Trả về danh sách các lượt like cùng thời gian
                }
            );
        });
    }

    // Lấy thông tin bài viết theo ID
    static async findPostById(blogId) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM posts WHERE id = ?',
                [blogId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result[0]); // Trả về bài viết đầu tiên
                }
            );
        });
    }

    static async fetchAll() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT p.blog_id AS blog_id, p.title AS postTitle, COUNT(l.user_id) AS total_likes
                 FROM blog_likes l
                 JOIN blogs p ON l.blog_id = p.blog_id
                 GROUP BY p.blog_id
                 HAVING total_likes > 0
                 ORDER BY total_likes DESC`,
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    // Lấy tổng số lượt like của tất cả các bài viết
    static async fetchTotalLikes() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT COUNT(*) AS total_likes FROM blog_likes`,
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0]);
                }
            );
        });
    }

    // Lấy tổng số lượt like trong ngày
    static async fetchTotalLikesInDay() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT COUNT(*) AS total_likes FROM blog_likes WHERE DATE(created_at) = CURDATE()`,
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0]);
                }
            );
        });
    }
    static async findUserLikeBlog(blog_id) {
        return new Promise ((resole, reject)=>{
            db.query(
                "SELECT * FROM blog_likes WHERE blog_id = ?",
                [blog_id],
                (err, result) =>{
                    if(err) reject(err);
                    resole(result);
                }
            );
        });
      }

      static async fetchLikedPostsByUser(userId, offset, limit) {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT SQL_CALC_FOUND_ROWS 
    p.blog_id, 
    p.title, 
    p.content, 
    p.image, 
    bl.created_at AS liked_at  
FROM blog_likes bl
JOIN blogs p ON bl.blog_id = p.blog_id
WHERE bl.user_id = ?
    AND p.is_delete = 0 
    AND p.status = 'approved'
ORDER BY bl.created_at DESC
LIMIT ?, ?;`;
    
            db.query(sql, [userId, offset, limit], (err, data) => {
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

