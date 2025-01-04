const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
// hiển thị
exports.list = async (req, res, next) => {
  const users = await User.fetchAllUsers();
  res.status(200).json({ data: users });
};

// register
exports.register = async (req, res, next) => {
  const { username, email, password, full_name, phone } = req.body;
  const isEmailValid = await validateEmail(email);
  if (!isEmailValid) {
    return res.status(400).json({ error: "Invalid email." });
  }
  const newpassword = bcrypt.hashSync(password, 10);
  const user = {
    username,
    email,
    password: newpassword,
    image_user:
      "https://firebasestorage.googleapis.com/v0/b/blogsport-d488d.appspot.com/o/uploads%2FUsers%2Fdefault.jpg?alt=media",
    full_name,
    phone,
    role: "user",
    is_delete: 0,
    status: "active",
  };

  try {
    const addUser = await User.register(user);
    res.status(200).json({
      data: addUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi thêm người dùng." });
  }
};

//add
exports.add = async (req, res, next) => {
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.full_name,
    image_user: req.body.image_user,
    phone: req.body.phone,
    bio: req.body.bio,
    role: req.body.role || "user", // mặc định là user
    is_delete: req.body.is_delete || 0, // mặc định là không xóa
  };

  try {
    const addUser = await User.createUsers(user);
    res.status(200).json({
      data: addUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Đã xảy ra lỗi khi thêm người dùng" });
  }
};

//xóa tạm thời
exports.softDeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.softDelete(id);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// xóa
exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const deleteUser = await User.delete(id);
  res.status(200).json({ data: deleteUser });
};

// get user by username
exports.getUserByUsername = async (req, res, next) => {
  const username = req.params.username;
  try {
    const users = await User.getUserbyUsernam(username);
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// lấy chi tiết
exports.getDetail = async (req, res, next) => {
  const id = req.params.id;
  const users = await User.detailUsers(id);
  res.status(200).json({ data: users });
};

// sửa
exports.update = async (req, res, next) => {
  const id = req.params.id;
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.full_name,
    image_user: req.body.image_user,
    phone: req.body.phone,
    bio: req.body.bio,
    role: req.body.role,
    is_delete: req.body.is_delete,
  };

  try {
    const userEdit = await User.editUsers(id, user);
    res.status(200).json({
      message: "Thông tin người dùng đã được cập nhật thành công.",
      data: userEdit,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi cập nhật thông tin người dùng." });
  }
};

exports.forgotPass = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Gọi phương thức ForgotPass từ lớp User
    const result = await User.ForgotPass(email, newPassword);
    res.status(200).json({ status: "success", message: result.message });
  } catch (error) {
    res.status(500).json({ status: "lỗi error", message: error.message });
  }
};

async function validateEmail(email) {
  const url = `https://api.zerobounce.net/v2/validate?api_key=3a4683741ef345709c044c52a17ff1ad&email=${email}`;
  try {
    const response = await axios.get(url);
    const { status } = response.data;

    return status === "valid";
  } catch (error) {
    console.error("Error validating email with ZeroBounce:", error.message);
    return false;
  }
}

exports.sendVerificationEmail = async (req, res) => {
  const { username, email, password, userId } = req.body;

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await User.saveVerificationToken(userId, token);

    const verificationLink = `${process.env.BASE_URL}/verified?token=${token}&userId=${userId}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email.",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4CAF50;">Welcome ${username}, you've successfully registered an account</h2>
        <p style="font-size: 18px; color: #555;">Hello,</p>
        <p style="font-size: 18px; color: #555;">We are thrilled to welcome you to our website.</p>
        <p style="font-size: 18px; color: #555;">Your account has been registered. To activate it, please verify your email by clicking the link below:</p>
        <a href="${verificationLink}" 
          style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;"
          onmouseover="this.style.backgroundColor='#218838';"
          onmouseout="this.style.backgroundColor='#28a745';">
          Verify Email
        </a>
        <p>This link will expire in 30 minute.</p>
        <p style="font-size: 14px; color: #aaa;">Best regards,<br>The Support Team</p>
      </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email xác nhận đã được gửi.");
  } catch (errors) {
    res.status(500).json({ status: "error", message: errors.message });
  }
};
exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const userId = req.query.userId;

  try {
    const result = await User.getUserByToken(token);
    if (!result || result.user_id !== parseInt(userId, 10)) {
      return res
        .status(400)
        .send("Liên kết xác nhận không hợp lệ hoặc đã hết hạn.");
    }

    await User.verifyUser(userId);
    await User.deleteVerificationToken(token);

    res.status(200).send("Email đã được xác thực thành công!");
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.checkToken = async (req, res) => {
  const token = req.query.token;
  try {
    const result = await User.getUserByToken(token);
    if (!result) {
      return res
        .status(400)
        .json({ valid: false, message: "Token không hợp lệ hoặc đã hết hạn." });
    }
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(500).json({ valid: false, message: error.message });
  }
};
