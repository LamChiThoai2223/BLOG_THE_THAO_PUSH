var db = require("../config/database");

module.exports = class Sport {
  constructor() {}

  static fetchAll(offset, limit, search = "") {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM sports WHERE is_delete != 1 AND name LIKE ? LIMIT ?, ?`;
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

  // Hàm fetchAllSportDelete lấy các bản ghi đã bị xóa
  static fetchAllSportDelete(offset, limit, search = "") {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM sports WHERE is_delete = 1 AND name LIKE ? LIMIT ?, ?`;
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

  static async fetchSports() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM sports WHERE is_delete != 1`;
  
      db.query(sql, (err, data) => {
        if (err) {
          reject({
            message: 'Error fetching sports',
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

  //Lấy tất cả
  static async fetchAllSport() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * from sports`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  //thêm
  static async createSport(sports) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO sports (name, description, images, is_delete) VALUES (?, ?, ?, ?)`;
      let values = [
        sports.name,
        sports.description,
        JSON.stringify(sports.images), // Chuyển mảng JSON thành chuỗi
        sports.is_delete,
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

  //xóa tạm thời
  static async softDelete(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE sports SET is_delete = 1 WHERE sport_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không Thể Xóa Tạm Thời Sport");
        } else {
          resolve("Xóa Tạm Thời Thành Công");
        }
      });
    });
  }

  // Khôi phục sport
  static async restoreSport(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE sports SET is_delete = 0 WHERE sport_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không thể khôi phục sport");
        } else {
          resolve("Khôi phục thành công");
        }
      });
    });
  }

  // xóa vĩnh viễn
  static async delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM sports WHERE sport_id = ${id}`;
      db.query(sql, (err, rows) => {
        if (!err) {
          resolve("Xóa Thành Công");
        } else {
          console.log(err);
          reject("Không Thể Xóa Sport");
        }
      });
    });
  }

  // chi tiết
  static async detailSport(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM sports WHERE sport_id = ${id}`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // edit sport method
  static async editSport(id, sport) {
    return new Promise((resolve, reject) => {
      let sql =
        "UPDATE sports SET name = ?, description = ?, images = ?, updated_at = ?, is_delete = ? WHERE sport_id = ?";
      let values = [
        sport.name,
        sport.description,
        JSON.stringify(sport.images),
        sport.updated_at,
        sport.is_delete,
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
