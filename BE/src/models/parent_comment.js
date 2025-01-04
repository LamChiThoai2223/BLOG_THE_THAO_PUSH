var db = require("../config/database");

module.exports = class ParentComment {
  constructor() {}

  static async fetch(comment_id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT parent_comment.*, users.username, users.image_user, users.bio, users.full_name ,reply_user.username AS reply_to_user, reply_user.image_user AS reply_to_user_image FROM parent_comment JOIN users ON parent_comment.user_id = users.user_id LEFT JOIN users AS reply_user ON parent_comment.reply_to_user_id = reply_user.user_id WHERE parent_comment.comment_id = ?;`;
      db.query(sql, [comment_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async countParentCommentsByBlog(blog_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(*) AS total_parent_comments FROM parent_comment JOIN comments ON parent_comment.comment_id = comments.comment_id WHERE comments.blog_id = ? AND parent_comment.is_delete = 0`;
      db.query(sql, [blog_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data[0].total_parent_comments);
        }
      });
    });
  }
  
  static async create(parentComment, comment_id) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO parent_comment (user_id, comment_id, content, image_url, reply_to_user_id) VALUES (?, ?, ?, ?, ?)`;
      let values = [
        parentComment.user_id,
        parentComment.comment_id,
        parentComment.content,
        parentComment.image_url,
        parentComment.reply_to_user_id
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

  static async edit(parent_comment_id, parentComment) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE parent_comment SET ? WHERE parent_comment_id = ?";
      db.query(sql, [parentComment, parent_comment_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  static async softDelete(parent_comment_id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE parent_comment SET is_delete = 1 WHERE parent_comment_id = ?`;
      db.query(sql, [parent_comment_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async delete(parent_comment_id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM parent_comment WHERE parent_comment_id = ?`;
      db.query(sql, [parent_comment_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
