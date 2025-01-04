var db = require("../config/database");

module.exports = class NotificationBlog {
  constructor() {}

  // Lấy danh sách thông báo cho một người dùng (phân trang)
  static async fetchNotificationsBlog(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      let sql = `
            SELECT SQL_CALC_FOUND_ROWS notification_id, user_id, blog_id, created_at, is_read
            FROM notifications_blogs
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ?, ?`; // Phân trang với LIMIT và OFFSET

      db.query(sql, [userId, offset, limit], (err, data) => {
        if (err) {
          return reject(err);
        }

        // Lấy tổng số thông báo
        db.query("SELECT FOUND_ROWS() as total", (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({
            data: data,
            total: result[0].total, // Tổng số thông báo
          });
        });
      });
    });
  }

  // Lấy tất cả thông báo của một người dùng
  static async fetchAllNotificationsBlog(userId) {
    return new Promise((resolve, reject) => {
      let sql = `
            SELECT notification_id, user_id, blog_id, created_at, reason, is_read
            FROM notifications_blogs
            WHERE user_id = ?
            ORDER BY created_at DESC`;

      db.query(sql, [userId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }


  // Đánh dấu thông báo là đã đọc
  static async markAsReadBlog(notificationId) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE notifications_blogs SET is_read = 1 WHERE notification_id = ?";
      db.query(sql, [notificationId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Xóa thông báo
  static async deleteNotificationBlog(notificationId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM notifications_blogs WHERE notification_id = ?";
      db.query(sql, [notificationId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

};
