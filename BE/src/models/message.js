var db = require("../config/database");

module.exports = class Message {
  constructor() {}

  // Lấy tất cả tin nhắn giữa hai người dùng
  static async fetchMessages(senderId, receiverId) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT m.*, u.username, u.full_name, u.image_user, b.blog_id, b.title, b.content, b.image
                 FROM messages m
                 JOIN users u ON m.sender_id = u.user_id
                 LEFT JOIN blogs b ON m.blog_id = b.blog_id
                 WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?)
                 ORDER BY m.timestamp ASC`;
  
      db.query(
        sql,
        [senderId, receiverId, receiverId, senderId],
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  

  // Gửi một tin nhắn
  static async sendMessage(senderId, receiverId, blogId, message) {
    return new Promise((resolve, reject) => {
      if (senderId === receiverId) {
        return reject(new Error("Không thể gửi tin nhắn cho chính mình."));
      }
  
      let sql =
        "INSERT INTO messages (sender_id, receiver_id, blog_id, message, timestamp) VALUES (?, ?, ?, ?, NOW())";
      db.query(sql, [senderId, receiverId, blogId, message], (err, data) => {
        if (err) {
          reject(err);
        } else {
          const timestamp = new Date().toISOString(); 
  
          resolve({
            message: "Message sent successfully",
            timestamp: timestamp,
          });
        }
      });
    });
  }
  

  // Xóa một tin nhắn
  static async deleteMessage(messageId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM messages WHERE id = ?";
      db.query(sql, [messageId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Kiểm tra xem một tin nhắn có tồn tại hay không
  static async messageExists(messageId) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM messages WHERE id = ?";
      db.query(sql, [messageId], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length > 0);
        }
      });
    });
  }

  // Lấy thông tin người gửi tin nhắn
  static async getUserInfo(userId) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT id, username, image_user FROM users WHERE id = ?";
      db.query(sql, [userId], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });
  }
  
  // Lấy danh sách receiver_id mà người dùng hiện tại đã nhắn tin
  static async getChatReceivers(userId) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT DISTINCT 
        CASE 
          WHEN sender_id = ? THEN receiver_id
          ELSE sender_id
        END AS chat_user_id
      FROM messages
      WHERE sender_id = ? OR receiver_id = ?`;

      db.query(sql, [userId, userId, userId], async (err, data) => {
        if (err) {
          reject(err);
        } else {
          const userIds = data.map((row) => row.chat_user_id);

          try {
            const usersSql = `
            SELECT 
              u.user_id, u.full_name, u.image_user, u.username, 
              m.message, m.timestamp
            FROM users u
            LEFT JOIN (
              SELECT 
                sender_id, receiver_id, message, timestamp
              FROM messages
              WHERE (sender_id = ? OR receiver_id = ?)
              AND sender_id != receiver_id
              ORDER BY timestamp DESC
              LIMIT 1
            ) m 
            ON (u.user_id = m.sender_id OR u.user_id = m.receiver_id)
            WHERE u.user_id IN (?)`;

            db.query(usersSql, [userId, userId, userIds], (err, usersData) => {
              if (err) {
                reject(err);
              } else {
                const chatReceivers = usersData.map((user) => ({
                  user_id: user.user_id,
                  full_name: user.full_name,
                  image_user: user.image_user || "https://placehold.co/50x50",
                  username: user.username || "unknown_user",
                  message: user.message,
                  timestamp: user.timestamp,
                }));
                resolve(chatReceivers);
              }
            });
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
};
