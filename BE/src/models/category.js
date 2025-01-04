var db = require("../config/database");

module.exports = class Category {
  constructor() {}

  // Lấy tất cả các category
  static async fetchAllCategory(offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS c.*, p.name AS parent_name FROM categories c LEFT JOIN categories p ON c.parent_id = p.category_id WHERE c.is_delete != 1 LIMIT ?, ? `;
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

  // Lấy danh sách các category chưa bị xóa
  static async fetchCategories() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM categories WHERE is_delete != 1`;
      db.query(sql, (err, data) => {
        if (err) {
          reject({
            message: "Error fetching categories",
            error: err,
          });
        } else {
          resolve({
            message: "Get API Successfully",
            data: data,
          });
        }
      });
    });
  }

  // Lấy tất cả các category đã bị xóa
  static async fetchAllCategoryDeleted(offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM categories WHERE is_delete = 1 LIMIT ?, ?`;
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

  // Thêm category
  static async createCategory(categories) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO categories (name, description, parent_id, created_at, updated_at, is_delete) 
                       VALUES (?, ?, ?, NOW(), NOW(), ?)`;
      let values = [
        categories.name,
        categories.description,
        categories.parent_id || null,
        categories.is_delete || 0,
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

  // Xóa tạm thời category
  static async softDelete(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE categories SET is_delete = 1 WHERE category_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không thể xóa tạm thời category");
        } else {
          resolve("Xóa tạm thời thành công");
        }
      });
    });
  }

  // Xóa vĩnh viễn category
  static async delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM categories WHERE category_id = ${id}`;
      db.query(sql, (err, rows) => {
        if (!err) {
          resolve("Xóa thành công");
        } else {
          console.log(err);
          reject("Không thể xóa category");
        }
      });
    });
  }

  // Lấy chi tiết category theo ID
  static async detailCategory(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM categories WHERE category_id = ${id}`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // Khôi phục category đã bị xóa
  static async restore(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE categories SET is_delete = 0 WHERE category_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không thể khôi phục category");
        } else {
          resolve("Khôi phục thành công");
        }
      });
    });
  }

  // Sửa thông tin category
  static async editCategory(id, category) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE categories SET name = ?, description = ?, parent_id = ?, updated_at = NOW(), is_delete = ? WHERE category_id = ?";
      let values = [
        category.name,
        category.description,
        category.parent_id || null,
        category.is_delete || 0,
        id,
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
};
