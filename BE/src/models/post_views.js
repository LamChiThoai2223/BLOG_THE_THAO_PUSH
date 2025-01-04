var db = require("../config/database");

module.exports = class PostView {
  constructor() {}

  // Trả về tất cả
 static async fetchPostViewsWithTotal() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT b.title AS blog_title, b.blog_id AS blog_id, COUNT(v.view_id) AS total_views, DATE(CONVERT_TZ(v.viewed_at, '+00:00', '+07:00')) AS view_date FROM blogs b LEFT JOIN blogs_views v ON b.blog_id = v.blog_id WHERE v.viewed_at IS NOT NULL GROUP BY b.blog_id, view_date ORDER BY view_date DESC;`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async fetchTotalViewsWithBlogs() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT b.title AS blog_title, b.blog_id AS blog_id, COUNT(v.view_id) AS total_views FROM blogs b LEFT JOIN blogs_views v ON b.blog_id = v.blog_id GROUP BY b.blog_id ORDER BY total_views DESC;`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err); 
        } else {
          resolve(data);
        }
      });
    });
  }


  static async totalViewsByUserId(user_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(view_id) as total_views FROM blogs_views WHERE user_id = ?;`;
      db.query(sql, user_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async totalViews() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(view_id) AS total_views FROM blogs_views;`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async totalViewsInDay() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(view_id) AS total_views FROM blogs_views WHERE DATE(viewed_at) = CURDATE();`;
      db.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0].total_views);
        }
      });
    });
  }

  static async fetchAllPostViews() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM blogs_views`;
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
  static async createPostView(postView) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO blogs_views (blog_id, user_id, viewed_at) VALUES (?, ?, ?)`;
      let values = [
        postView.blog_id,
        postView.user_id,
        postView.viewed_at || new Date(),
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
      let sql = `UPDATE blogs_views SET is_delete = 1 WHERE view_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không Thể Xóa Tạm Thời Lượt Xem Bài Viết");
        } else {
          resolve("Xóa Tạm Thời Thành Công");
        }
      });
    });
  }

  static async viewBlog(id, user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO blogs_views (blog_id, user_id) VALUES (?, ?)",
        [id, user_id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
};
