var db = require("../config/database");

module.exports = class Follow {
  constructor() {}

  // Lấy danh sách người theo dõi của một người dùng với phân trang
  static async fetchFollowers(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT SQL_CALC_FOUND_ROWS u.*
      FROM follow f
      JOIN users u ON f.follower_id = u.user_id
      WHERE f.followed_id = ?
      LIMIT ?, ?`;
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

  static async fetchFriends(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT SQL_CALC_FOUND_ROWS 
                u.user_id, 
                u.username, 
                u.full_name, 
                u.image_user
            FROM follow f1
            JOIN follow f2 ON f1.follower_id = f2.followed_id AND f1.followed_id = f2.follower_id
            JOIN users u ON u.user_id = f1.followed_id
            WHERE f1.follower_id = ?
            LIMIT ?, ?;
        `;

      db.query(sql, [userId, offset, limit], (err, data) => {
        if (err) {
          console.error("Error executing SQL query:", err);
          return reject(err);
        }

        db.query("SELECT FOUND_ROWS() as total", (err, result) => {
          if (err) {
            console.error("Error fetching total rows:", err);
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

  // Lấy danh sách người mà một người dùng đang theo dõi với phân trang
  static async fetchFollowing(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      let sql = `
      SELECT SQL_CALC_FOUND_ROWS u.user_id, u.username, u.full_name, u.email, u.image_user
      FROM follow f
      JOIN users u ON f.followed_id = u.user_id
      WHERE f.follower_id = ?
      LIMIT ?, ?`;
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

  static async fetchFollowersAllNoPage(userId) {
    return new Promise((resolve, reject) => {
      let sql = ` SELECT u.*
        FROM follow f
        JOIN users u ON f.follower_id = u.user_id
        WHERE f.followed_id = ?`;
      db.query(sql, [userId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  // Lấy danh sách người mà một người dùng đang theo dõi
  static async fetchFollowingAllNoPage(userId) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT u.user_id, u.username, u.full_name, u.email, u.image_user
        FROM follow f
        JOIN users u ON f.followed_id = u.user_id
        WHERE f.follower_id = ?`;
      db.query(sql, [userId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  // Theo dõi người dùng
  static async followUser(followerId, followedId) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO follow (follower_id, followed_id) VALUES (?, ?)";
      db.query(sql, [followerId, followedId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  // Bỏ theo dõi người dùng
  static async unfollowUser(followerId, followedId) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM follow WHERE follower_id = ? AND followed_id = ?";
      db.query(sql, [followerId, followedId], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  // Kiểm tra xem một người dùng có theo dõi người khác hay không
  static async isFollowing(followerId, followedId) {
    return new Promise((resolve, reject) => {
      let sql =
        "SELECT * FROM follow WHERE follower_id = ? AND followed_id = ?";
      db.query(sql, [followerId, followedId], (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.length > 0);
      });
    });
  }
};
