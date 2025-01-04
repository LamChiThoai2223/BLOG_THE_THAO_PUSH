var db = require("../config/database");

module.exports = class Notification {
  constructor() {}

  // Lấy danh sách thông báo của một người dùng
  static async fetchNotifications(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT SQL_CALC_FOUND_ROWS n.*, u.username, u.full_name, n.notification_type
      FROM notifications n
      JOIN users u ON n.follower_id = u.user_id
      WHERE n.follower_id = ? 
      ORDER BY n.created_at DESC
      LIMIT ?, ?`;

      db.query(sql, [userId, offset, limit], (err, data) => {
        if (err) {
          return reject(err);
        }
        // Truy vấn tổng số thông báo
        db.query("SELECT FOUND_ROWS() as total", (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve({
            data: data,
            total: result[0].total, // Trả về tổng số thông báo
          });
        });
      });
    });
  }

  static async fetchAllNotifications(userId) {
    return new Promise((resolve, reject) => {
      let sql = `
              SELECT n.*, u.username, u.full_name
              FROM notifications n
              JOIN users u ON n.follower_id = u.user_id
              WHERE n.follower_id = ? 
              ORDER BY n.created_at DESC`;
      db.query(sql, [userId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  // Lưu thông báo
  static async createNotification(
    followerId,
    blogId,
    authorId,
    message,
    type = "comment"
  ) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO notifications (follower_id, blog_id, author_id, notification_type, content) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(sql, [followerId, blogId, authorId, type, message], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  

  // Đánh dấu thông báo là đã đọc
  static async markAsRead(notificationId) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE notifications SET is_read = 1 WHERE id = ?";
      db.query(sql, [notificationId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Xóa thông báo
  static async deleteNotification(notificationId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM notifications WHERE id = ?";
      db.query(sql, [notificationId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Ẩn thông báo
  static async hideNotification(notificationId) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE notifications SET is_hidden = 1 WHERE id = ?";
      db.query(sql, [notificationId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Tắt tất cả thông báo từ một tác giả
  static async turnOffNotifications(userId, authorId) {
    return new Promise((resolve, reject) => {
      let sql = `
              INSERT INTO notification_preferences (user_id, author_id, notification_disabled)
              VALUES (?, ?, TRUE)
              ON DUPLICATE KEY UPDATE notification_disabled = TRUE;
            `;
      db.query(sql, [userId, authorId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
  // Hàm để bật thông báo cho tất cả bài viết từ một tác giả
  static async turnOnNotifications(userId, authorId) {
    return new Promise((resolve, reject) => {
      let sql = `
            INSERT INTO notification_preferences (user_id, author_id, notification_disabled)
            VALUES (?, ?, FALSE)
            ON DUPLICATE KEY UPDATE notification_disabled = FALSE;
        `;
      db.query(sql, [userId, authorId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  static async sendNewPostNotification(authorId, blog_id) {
    return new Promise((resolve, reject) => {
      let sql = `
              SELECT follow.follower_id FROM follow
              LEFT JOIN notification_preferences ON follow.follower_id = notification_preferences.user_id
              WHERE follow.followed_id = ? AND (notification_preferences.notification_disabled IS NULL OR notification_preferences.notification_disabled = FALSE);
            `;
      db.query(sql, [authorId], (err, result) => {
        if (err) {
          return reject(err);
        }

        const notifications = result.map((follower) => ({
          author_id: authorId,
          follower_id: follower.follower_id,
          blog_id: blog_id,
          is_read: 0,
        }));

        if (notifications.length > 0) {
          let notificationSql =
            "INSERT INTO notifications (author_id, follower_id, blog_id, is_read) VALUES ?";
          db.query(
            notificationSql,
            [
              notifications.map((n) => [
                n.author_id,
                n.follower_id,
                n.blog_id,
                n.is_read,
              ]),
            ],
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
        } else {
          resolve({ message: "No notifications to send." });
        }
      });
    });
  }
};
