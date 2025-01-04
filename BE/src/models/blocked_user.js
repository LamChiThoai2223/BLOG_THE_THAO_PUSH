var db = require("../config/database");

module.exports = class BlockedUser {

  // Chặn người dùng
  static async blockUser(blockerId, blockedId) {
    return new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO blocked_users (blocker_id, blocked_id)
            VALUES (?, ?)
          `;

      db.query(sql, [blockerId, blockedId], (err, result) => {
        if (err) {
          return reject(err); //
        }
        resolve({ message: "User blocked successfully", result });
      });
    });
  }

  //   Bỏ chặn người dùng
  static async unblockUser(blockerId, blockedId) {
    return new Promise((resolve, reject) => {
      const sql = `
            DELETE FROM blocked_users
            WHERE blocker_id = ? AND blocked_id = ?
          `;

      db.query(sql, [blockerId, blockedId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: "User unblocked successfully", result });
      });
    });
  }

  //   Kiểm tra xem người dùng đã bị chặn chưa
  static async isUserBlocked(blockerId, blockedId) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT 1 AS isBlocked
            FROM blocked_users
            WHERE blocker_id = ? AND blocked_id = ?
            LIMIT 1
          `;
  
      db.query(sql, [blockerId, blockedId], (err, result) => {
        if (err) {
          return reject(err);
        }
        // Kiểm tra kết quả trả về
        resolve(result.length > 0);
      });
    });
  }
  
  //   Lấy danh sách người dùng bị chặn
  static async getBlockedUsers(blockerId, offset = 0, limit = 10) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT SQL_CALC_FOUND_ROWS bu.blocked_id, u.username, u.full_name, u.image_user
            FROM blocked_users bu
            JOIN users u ON bu.blocked_id = u.user_id
            WHERE bu.blocker_id = ?
            LIMIT ?, ?
          `;

      db.query(sql, [blockerId, offset, limit], (err, data) => {
        if (err) {
          return reject(err);
        }
        db.query("SELECT FOUND_ROWS() AS total", (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve({
            data: data,
            total: result[0].total,
          });
        });
      });
    });
  }
  static async getAllBlockedUsers(blockerId) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT bu.blocked_id, u.username, u.full_name
            FROM blocked_users bu
            JOIN users u ON bu.blocked_id = u.user_id
            WHERE bu.blocker_id = ?
          `;
  
      db.query(sql, [blockerId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve({
          data: data,
          total: data.length, 
        });
      });
    });
  }
  
};
