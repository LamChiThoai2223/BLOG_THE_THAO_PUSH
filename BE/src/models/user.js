var db = require("../config/database");
const bcrypt = require("bcrypt");
module.exports = class User {
  constructor() { }

  // Trả về tất cả người dùng
  static fetchAll(offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM users WHERE role != 'admin' AND is_delete != 1 LIMIT ?, ?`;
      db.query(sql, [offset, limit], (err, data) => {
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



  static async fetchAllUsersDeleted(offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM users WHERE is_delete = 1 LIMIT ?, ?`;
      db.query(sql, [offset, limit], (err, data) => {
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

  static fetchDelete(delete_id, offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM users WHERE is_delete = ?  LIMIT ?, ?;`;
      db.query(sql, [delete_id, offset, limit], (err, data) => {
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

  // Create a user
  static async createUsers(user) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO users (username, email, password, full_name, image_user, phone, address, cccd, bio, role, status, created_at, updated_at, is_delete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      let values = [
        user.username,
        user.email,
        user.password,
        user.full_name,
        user.image_user || "",
        user.phone,
        user.address || "",
        user.cccd || "",
        user.bio || "",
        user.role || "user",
        user.status || "Inactive",
        new Date(),
        new Date(),
        user.is_delete || 0,
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

  // Hàm cập nhật trạng thái xác nhận email
  static async verifyUser(userId) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE users SET verified = 1 WHERE user_id = ?";
      db.query(sql, [userId], (err, rows) => {
        if (!err) {
          resolve("Cập nhật thành công");
        } else {
          console.log(err);
          reject("Không Thể Cập nhật");
        }
      });
    });
  }

  // Lưu token xác nhận vào cơ sở dữ liệu
  static async saveVerificationToken(userId, token) {
    return new Promise((resolve, reject) => {
      const sqlDeleteOld = "DELETE FROM user_verifications WHERE user_id = ?";
      db.query(sqlDeleteOld, [userId], (err) => {
        if (err) {
          console.log(err);
          return reject("Không thể xóa token cũ.");
        }

        const sqlInsert = "INSERT INTO user_verifications (user_id, token, created_at) VALUES (?, ?, NOW())";
        db.query(sqlInsert, [userId, token], (err) => {
          if (!err) {
            resolve("Thêm token thành công.");
          } else {
            console.log(err);
            reject("Không thể lưu token mới.");
          }
        });
      });
    });
  }


  // Kiểm tra token xác nhận
  static async getUserByToken(token) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT user_id FROM user_verifications WHERE token = ?";
      db.query(sql, [token], (err, rows) => {
        if (!err && rows.length > 0) {
          resolve(rows[0]);
        } else if (!err) {
          reject("Token không tồn tại.");
        } else {
          console.log(err);
          reject("Không thể truy vấn dữ liệu.");
        }
      });
    });
  }
  // Xóa token sau khi xác thực
  static async deleteVerificationToken(token) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM user_verifications WHERE token = ?";
      db.query(sql, [token], (err, rows) => {
        if (!err) {
          resolve("Xóa thành công");
        } else {
          console.log(err);
          reject("Không thể xóa");
        }
      });
    });
  }


  // Soft delete a user
  static async softDelete(id, why_delete) {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE users SET is_delete = 1, status = "Inactive", why_delete = ? WHERE user_id = ?';
      db.query(sql, [why_delete, id], (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          reject(new Error(`Failed to soft delete user: ${err.message}`));
        } else {
          if (result.affectedRows === 0) {
            reject(new Error("User not found or already deleted"));
          } else {
            resolve({ message: "User soft deleted successfully" });
          }
        }
      });
    });
  }
  // Permanently delete a user
  static async delete(id) {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM users WHERE user_id = ?`;
      db.query(sql, [id], (err, rows) => {
        if (!err) {
          resolve("Xóa Thành Công");
        } else {
          console.log(err);
          reject("Không Thể Xóa Người Dùng");
        }
      });
    });
  }

  // Get user details
  static async detailUsers(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE user_id = ?`;
      db.query(sql, [id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data); // data là mảng
        }
      });
    });
  }

  // Update a user
  static async editUsers(id, user) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE users SET email = ?, full_name = ?, image_user = ?, phone = ?, address = ?, cccd = ?, bio = ?, role = ?, status = ?, updated_at = ?, is_delete = ? WHERE user_id = ?`;
      let values = [
        user.email,
        user.full_name,
        user.image_user || "",
        user.phone,
        user.address || "",
        user.cccd || "",
        user.bio || "",
        user.role || "user",
        user.status || "Inactive",
        new Date(),
        user.is_delete || 0,
        id,
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Restore a user
  static async restoreUser(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE users SET is_delete = 0, status = "active" WHERE user_id = ?`;
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Không thể khôi phục người dùng");
        } else {
          resolve("Khôi phục thành công");
        }
      });
    });
  }

  //Get user by username
  static async getUserbyUsernam(username) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE username = ?`;
      db.query(sql, [username], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // Search users by keyword

  static async searchUsers(keyword) {
    return new Promise((resolve, reject) => {
      // Use parameterized queries to prevent SQL injection
      let sql = `SELECT * FROM users WHERE (username LIKE ? OR email LIKE ?) AND is_delete = 0`;
      let values = [`%${keyword}%`, `%${keyword}%`];

      db.query(sql, values, (err, data) => {
        if (err) {
          // Handle error, you might want to log it or return a custom message
          console.error("Database query error:", err);
          reject(new Error("Failed to search users."));
        } else {
          resolve(data);
        }
      });
    });
  }
  static async searchUserSoftDelete(keyword) {
    return new Promise((resolve, reject) => {
      // Use parameterized queries to prevent SQL injection
      let sql = `SELECT * FROM users WHERE (username LIKE ? OR email LIKE ?) AND is_delete = 1`;
      let values = [`%${keyword}%`, `%${keyword}%`];

      db.query(sql, values, (err, data) => {
        if (err) {
          // Handle error, you might want to log it or return a custom message
          console.error("Database query error:", err);
          reject(new Error("Failed to search users."));
        } else {
          resolve(data);
        }
      });
    });
  }
  static async profileUpdate(id, user) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE users SET ? WHERE user_id = ?";
      db.query(sql, [user, id], function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  static async register(user) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", user, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  // Check if username exists
  static async checkUsernameExists(username) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE username = ? AND is_delete = 0`;
      db.query(sql, [username], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length > 0); // true nếu tồn tại
        }
      });
    });
  }
  // get email address
  static async getEmails(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT email FROM users WHERE is_delete = 0`;
      db.query(sql, [id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  // Check if email exists
  static async checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE email = ? AND is_delete = 0`;
      db.query(sql, [email], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length > 0); // true nếu tồn tại
        }
      });
    });
  }

  // Check if phone exists
  static async checkPhoneExists(phone) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE phone = ? AND is_delete = 0`;
      db.query(sql, [phone], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length > 0); // true nếu tồn tại
        }
      });
    });
  }

  // Check if cccd exists
  static async checkCccdExists(cccd) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE cccd = ? AND is_delete = 0`;
      db.query(sql, [cccd], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.length > 0); // true nếu tồn tại
        }
      });
    });
  }

  static async ForgotPass(email, newPassword) {
    try {
      // Tìm người dùng theo email
      const user = await new Promise((resolve, reject) => {
        const sql = `SELECT password FROM users WHERE email = ?`;
        db.query(sql, [email], (err, data) => {
          if (err) {
            reject(err);
          } else if (data.length === 0) {
            resolve(null); // Không tìm thấy email
          } else {
            resolve(data[0]);
          }
        });
      });

      if (!user) {
        throw new Error("Email not found");
      }

      // Mã hóa mật khẩu mới
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      await new Promise((resolve, reject) => {
        const sql = `UPDATE users SET password = ? WHERE email = ?`;
        db.query(sql, [hashedNewPassword, email], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return { message: "Password changed successfully" };
    } catch (error) {
      console.error("Change password error:", error);
      throw new Error(error.message);
    }
  }

  static async confirmAuthor(id, why_delete) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE users SET confirm_author = 1, why_delete = ? WHERE user_id = ?";
      db.query(sql, [why_delete, id], (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          reject(new Error(`Failed to soft delete user: ${err.message}`));
        } else {
          if (result.affectedRows === 0) {
            reject(new Error("User not found or already deleted"));
          } else {
            resolve({ message: "User soft deleted successfully" });
          }
        }
      });
    });
  }

  static async agreeAuthor(id) {
    return new Promise((resolve, reject) => {
      const sql =
        'UPDATE users SET confirm_author = 2, role = "author", why_delete = NULL WHERE user_id = ?';

      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          reject(new Error(`Failed to soft delete user: ${err.message}`));
        } else {
          if (result.affectedRows === 0) {
            reject(new Error("User not found or already deleted"));
          } else {
            resolve({ message: "User soft deleted successfully" });
          }
        }
      });
    });
  }

  static async refuseAuthor(id) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE users SET confirm_author = 0, why_delete = NULL WHERE user_id = ?";

      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Database query error:", err);
          reject(new Error(`Failed to soft delete user: ${err.message}`));
        } else {
          if (result.affectedRows === 0) {
            reject(new Error("User not found or already deleted"));
          } else {
            resolve({ message: "User soft deleted successfully" });
          }
        }
      });
    });
  }

  // kiểm tra tài khoản chưa verified
  static async checkAccountByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE email = ? AND verified = 0`;
      db.query(sql, [email], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          return resolve(null);
        }
        resolve(result[0]);
      });
    });
  }

  static fetchRegisterAuthor(offset, limit) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM users WHERE is_delete != 1 AND confirm_author = 1 LIMIT ?, ?`;
      db.query(sql, [offset, limit], (err, data) => {
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

};
