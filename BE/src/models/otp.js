var db = require("../config/database");
const dotenv = require("dotenv");
dotenv.config();

const saveOtpToDatabase = (email, otp, userId, callback) => {
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // Mã OTP sẽ hết hạn sau 2 phút
  const query =
    "INSERT INTO otps (email, otp, user_id, expires_at, created_at) VALUES (?, ?, ?, ?, ?)"; 

  db.query(query, [email, otp, userId, expiresAt, new Date()], (err, results) => {
    if (err) {
      console.error("Lỗi khi lưu OTP vào cơ sở dữ liệu:", err);
      return callback(err);
    }
    console.log("OTP đã được lưu vào cơ sở dữ liệu:", results);
    callback(null, results);
  });
};

const checkOtp = (email, otp, callback) => {
  const query =
    "SELECT otp, expires_at FROM otps WHERE email = ? ORDER BY created_at DESC LIMIT 1";

  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }

    if (results.length === 0) {
      return callback(null, false);
    }

    const { otp: storedOtp, expires_at } = results[0];

    if (storedOtp === otp && new Date() <= new Date(expires_at)) {
      return callback(null, true);
    }

    return callback(null, false);
  });
};

module.exports = { checkOtp, saveOtpToDatabase };
