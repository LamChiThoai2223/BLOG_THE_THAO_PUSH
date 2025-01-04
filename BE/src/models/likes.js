var db = require('../config/database');

const Like = {
  findByPostAndUser: (postId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM blog_likes WHERE blog_id = ? AND user_id = ?',
        [postId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Thêm like cho bài viết
  addLike: (postId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO blog_likes (blog_id, user_id) VALUES (?, ?)',
        [postId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Xóa like
  removeLike: (postId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM blog_likes WHERE blog_id = ? AND user_id = ?',
        [postId, userId],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  // Đếm số lượng likes của bài viết
  countLikes: (postId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT COUNT(*) AS likesCount FROM blog_likes WHERE blog_id = ?',
        [postId],
        (err, result) => {
          if (err) reject(err);
          resolve(result[0].likesCount);
        }
      );
    });
  },
 // Lấy danh sách các bài viết mà một người dùng đã like
  findLikesByUser: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT blog_id FROM blog_likes WHERE user_id = ?',
        [user_id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
};

module.exports = Like;
