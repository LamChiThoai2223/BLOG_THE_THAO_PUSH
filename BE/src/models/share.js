var db = require('../config/database');

module.exports = class Rating {
    constructor() {}
    static async fetchPostSharesWithTotal() {
        return new Promise((resolve, reject) => {
          let sql = `SELECT b.title AS blog_title, b.blog_id AS blog_id, COUNT(v.share_id) AS total_share, DATE(CONVERT_TZ(v.shared_at, '+00:00', '+07:00')) AS share_date FROM blogs b LEFT JOIN blogs_share v ON b.blog_id = v.blog_id WHERE v.shared_at IS NOT NULL GROUP BY b.blog_id, share_date ORDER BY share_date DESC;`;
          db.query(sql, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
    
      static async fetchTotalSharesWithBlogs() {
        return new Promise((resolve, reject) => {
          let sql = `SELECT b.title AS blog_title, b.blog_id AS blog_id, COUNT(v.share_id) AS total_share FROM blogs b LEFT JOIN blogs_share v ON b.blog_id = v.blog_id GROUP BY b.blog_id ORDER BY total_share DESC;`;
          db.query(sql, (err, data) => {
            if (err) {
              reject(err); 
            } else {
              resolve(data);
            }
          });
        });
      }
      static async addShare(blog_id, user_id) {
        return new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO blogs_share (blog_id, user_id) VALUES (?, ?)",
            [blog_id, user_id],
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
}