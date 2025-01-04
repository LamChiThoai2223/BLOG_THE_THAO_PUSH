var db = require("../config/database");

module.exports = class Tag {
  constructor() {}

  // Fetch all tags
  static async fetchAllTags(offset, limit, search = "") {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM tags WHERE is_delete != 1 AND name LIKE ? LIMIT ?, ?`;
      const searchTerm = `%${search}%`;
      db.query(sql, [searchTerm, offset, limit], (err, data) => {
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
  //hiển thị tag ko phân trang
  static async fetchTags() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM tags WHERE is_delete != 1`;
  
      db.query(sql, (err, data) => {
        if (err) {
          reject({
            message: 'Error fetching tags',
            error: err
          });
        } else {
          resolve({
            message: 'Get API Successfully',
            data: data
          });
        }
      });
    });
  }
  
  
  static async fetchAllTagsDeleted(offset, limit, search = "") {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM tags WHERE is_delete = 1  AND name LIKE ? LIMIT ?, ?`;
      const searchTerm = `%${search}%`;
      db.query(sql, [searchTerm, offset, limit], (err, data) => {
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

  // Add a new tag
  static async createTag(tag) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO tags (name, is_delete) VALUES (?, ?)`;
      let values = [tag.name, tag.is_delete];
      db.query(sql, values, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Soft delete a tag
  static async softDelete(tag_id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE tags SET is_delete = 1 WHERE tag_id = ?`;
      db.query(sql, [tag_id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Cannot soft delete tag");
        } else {
          resolve("Tag soft deleted successfully");
        }
      });
    });
  }

  // Permanently delete a tag
  static async delete(tag_id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM tags WHERE tag_id = ?`;
      db.query(sql, [tag_id], (err, rows) => {
        if (!err) {
          resolve("Tag deleted successfully");
        } else {
          console.log(err);
          reject("Cannot delete tag");
        }
      });
    });
  }

  // Get tag details
  static async detailTag(tag_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM tags WHERE tag_id = ? AND is_delete = 0`;
      db.query(sql, [tag_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async checkNameTag(name) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM tags WHERE name = ? AND is_delete = 0`;
      db.query(sql, [name], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  // Edit a tag
  static async editTag(tag_id, tag) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE tags SET name = ?, is_delete = ? WHERE tag_id = ?";
      let values = [tag.name, tag.is_delete, tag_id];
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  static async restore(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE tags SET is_delete = 0 WHERE tag_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không thể khôi phục");
        } else {
          resolve("Khôi phục thành công");
        }
      });
    });
  }
};
