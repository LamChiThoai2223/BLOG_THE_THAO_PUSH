var db = require("../config/database");

module.exports = class Reports {
  constructor() { }

  // Lấy tất cả báo cáo với phân trang và tìm kiếm
  static fetchAll(offset, limit, search = "") {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT SQL_CALC_FOUND_ROWS
          r.id AS report_id,
          r.blog_id,
          b.image AS blog_image,
          b.title AS blog_title,
          r.user_id,
          u.username AS reported_by,
          r.reason,
          r.status,
          r.created_at,
          r.updated_at
        FROM 
          reports r
        LEFT JOIN 
          blogs b ON r.blog_id = b.blog_id
        LEFT JOIN 
          users u ON r.user_id = u.user_id
        WHERE 
          (b.title LIKE ? OR r.reason LIKE ?)
        ORDER BY 
          r.created_at DESC
        LIMIT ? OFFSET ?;
      `;

      const searchQuery = `%${search}%`;

      db.query(query, [searchQuery, searchQuery, limit, offset], (err, data) => {
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
  static fetchReportsByUser(userId, offset, limit) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT SQL_CALC_FOUND_ROWS
          r.id AS report_id,
          r.blog_id,
          b.image AS blog_image,
          b.title AS blog_title,
          r.user_id,
          u.username AS reported_by,
          r.reason,
          r.status,
          r.created_at,
          r.updated_at
        FROM 
          reports r
        LEFT JOIN 
          blogs b ON r.blog_id = b.blog_id
        LEFT JOIN 
          users u ON r.user_id = u.user_id
        WHERE 
          r.user_id = ?
        ORDER BY 
          r.created_at DESC
        LIMIT ? OFFSET ?;
      `;
      db.query(query, [userId, limit, offset], (err, data) => {
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


  // Lấy chi tiết một báo cáo
  static fetchById(reportId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          r.id AS report_id,
          r.blog_id,
          b.title AS blog_title,
          r.user_id,
          u.username AS reported_by,
          r.reason,
          r.status,
          r.created_at,
          r.updated_at
        FROM 
          reports r
        LEFT JOIN 
          blogs b ON r.blog_id = b.blog_id
        LEFT JOIN 
          users u ON r.user_id = u.user_id
        WHERE 
          r.id = ?
      `;

      db.execute(query, [reportId])
        .then(([rows]) => {
          if (rows.length === 0) {
            reject(new Error("Report not found"));
          } else {
            resolve(rows[0]);
          }
        })
        .catch((err) => reject(err));
    });
  }

  // Tạo một báo cáo mới
  static async create(blogId, userId, reason) {
    return new Promise((resolve, reject) => {
      if (!blogId || !userId || !reason) {
        return reject(new Error("Thiếu dữ liệu đầu vào (blogId, userId, reason)"));
      }

      const query = `
        INSERT INTO reports (blog_id, user_id, reason, status, created_at, updated_at)
        VALUES (?, ?, ?, 'pending', NOW(), NOW())
      `;

      db.query(query, [blogId, userId, reason], (err, data) => {
        if (err) {
          return reject(err);
        }

        const reportId = data.insertId;
        resolve({ reportId });
      });
    });
  }



  // Cập nhật trạng thái báo cáo
  static updateStatus(reportId, status) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE reports
        SET status = ?, updated_at = NOW()
        WHERE id = ?
      `;

      db.execute(query, [status, reportId])
        .then(([result]) => {
          if (result.affectedRows === 0) {
            reject(new Error("Report not found or not updated"));
          } else {
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  }

  // Xóa báo cáo
  static async delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM reports WHERE id = ${id}`;
      db.query(sql, (err, rows) => {
        if (!err) {
          resolve("Xóa Thành Công");
        } else {
          console.log(err);
          reject("Không Thể Xóa report");
        }
      });
    });
  }

  static async deleteAllByBlogId(blogId) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM reports WHERE blog_id = ?`;
      db.query(query, [blogId], (err, result) => {
        if (err) {
          reject("Không thể xóa các báo cáo");
        } else {
          // Kiểm tra nếu không có báo cáo nào được xóa
          if (result.affectedRows === 0) {
            console.log(`No reports found to delete for blogId ${blogId}`);
          }
          resolve("Xóa tất cả báo cáo thành công");
        }
      });
    });
  }


  // Thêm phương thức count vào model Reports
  static async countReportsByBlogId(blogId) {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT COUNT(*) AS report_count
      FROM reports
      WHERE blog_id = ?
    `;

      db.query(query, [blogId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0].report_count);
        }
      });
    });
  }


};


