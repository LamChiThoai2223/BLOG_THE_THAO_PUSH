var db = require('../config/database');

module.exports = class Rating {
    constructor() {}

    // Trả về tất cả 
    static async fetchAllRatings() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ratings`;
            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    } 

    // Thêm
    static async createRating(rating) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO ratings (blog_id, user_id, rating, created_at, updated_at, is_delete) VALUES (?, ?, ?, ?, ?, ?)`;
            let values = [
                rating.blog_id,
                rating.user_id,
                rating.rating,
                rating.created_at,
                rating.updated_at,
                rating.is_delete
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

    // Xóa tạm thời
    static async softDelete(id) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE ratings SET is_delete = 1 WHERE rating_id = ?`;
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Không Thể Xóa Tạm Thời Đánh Giá");
                } else {
                    resolve("Xóa Tạm Thời Thành Công");
                }
            });
        });
    }
    
    // Xóa vĩnh viễn
    static async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM ratings WHERE rating_id = ${id}`;
            db.query(sql, (err, rows) => {
                if (!err) {
                    resolve("Xóa Thành Công");
                } else {
                    console.log(err);
                    reject("Không Thể Xóa Đánh Giá");
                }
            });
        });
    }

    // Chi tiết 
    static async detailRating(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ratings WHERE rating_id = ${id}`;
            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Thực hiện sửa
    static async editRating(id, rating) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE ratings SET blog_id = ?, user_id = ?, rating = ?, created_at = ?, updated_at = ?, is_delete = ? WHERE rating_id = ?";
            let values = [
                rating.blog_id,
                rating.user_id,
                rating.rating,
                rating.created_at,
                rating.updated_at,
                rating.is_delete,
                id
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
}
