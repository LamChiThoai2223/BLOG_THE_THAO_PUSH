const nodemailer = require("nodemailer");
var db = require("../config/database");
const dotenv = require("dotenv");
dotenv.config();
const { saveOtpToDatabase } = require("./otp");
const { getMaxListeners } = require("nodemailer/lib/xoauth2");

const generateOTP = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });
  const otp = generateOTP();
  const getUserIdQuery = "SELECT user_id FROM users WHERE email = ?";

  db.query(getUserIdQuery, [email], (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy user_id từ email:", err);
      throw new Error("Lỗi khi lấy user_id");
    }
    if (results.length === 0) {
      console.log("Không tìm thấy người dùng với email:", email);
      throw new Error("Không tìm thấy người dùng");
    }
    const userId = results[0].user_id;
    saveOtpToDatabase(email, otp, userId, (err, result) => {
      if (err) {
        throw new Error("Lỗi khi lưu OTP vào cơ sở dữ liệu");
      }


    });
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50;">Your Verification Code</h2>
      <p style="font-size: 18px; color: #555;">Hello,</p>
      <p style="font-size: 18px; color: #555;">Here is your verification code:</p>
      <div style="font-size: 24px; font-weight: bold; color: #333; padding: 10px; background-color: #f4f4f4; border-radius: 5px; display: inline-block; margin: 20px 0;">
      ${otp}
      </div>
      <p style="font-size: 18px; color: #555;">Please enter this code in the form on our website to continue.</p>
      <p style="font-size: 18px; color: #555;">If you did not request this code, you can safely ignore this email.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
    </div>
  `;

  // Gửi email
  const info = await transporter.sendMail({
    from: '"Phúc Rờm" <pvphuc041119@gmail.com>',
    to: `${email}`,
    subject: "Mã OTP của bạn",
    text: `Mã OTP của bạn là ${otp}`,
    html: htmlContent,
  });

  return info;
};

const sendEmailRegister = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <h2 style="color: #4CAF50;">Welcome to our Community</h2>
  <p style="font-size: 18px; color: #555;">Hello,</p>
  <p style="font-size: 18px; color: #555;">We are excited to welcome you to our community.</p>
  <p style="font-size: 18px; color: #555;">Your account has been successfully registered. You can use this account to log in and start using our services.</p>
  <hr style="border-top: 1px solid #ddd;">
  <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
</div>

  `;

  // Gửi email
  const info = await transporter.sendMail({
    from: '"Phúc Rờm" <pvphuc041119@gmail.com>',
    to: `${email}`,
    subject: "Welcome to our Community",
    text: "Hello, we are excited to welcome you to our community. Your account has been successfully registered.",
    html: htmlContent,
  });

  return info;
};
const sendEmailRegisterAuthor = async (username, email, reason) => {
  const emailAuthor = "kietchamhoc@gmail.com";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <h2 style="color: #4CAF50;">New Author Registration Notification</h2>
  <p style="font-size: 18px; color: #555;">Hello Admin,</p>
  <p style="font-size: 18px; color: #555;">A user has requested to register as an author.</p>
  <p style="font-size: 18px; color: #555;">Username: ${username}</p>
  <p style="font-size: 18px; color: #555;">Email: ${email}</p>
  <p style="font-size: 18px; color: #555;">Reason: ${reason}</p>
  <hr style="border-top: 1px solid #ddd;">
  <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
</div>

  `;

  const info = await transporter.sendMail({
    from: `"${username}" <${email}>`,
    to: `${emailAuthor}`,
    subject: "New Author Registration Notification",
    text: `Hello Admin, a user has requested to register as an author.`,
    html: htmlContent,
  });
  return info;
};

const sendEmailAgreeAuthor = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50;">New Author Registration Notification</h2>
      <p style="font-size: 18px; color: #555;">Hello New Author,</p>
      <p style="font-size: 18px; color: #555;">You have successfully become an author.</p>
      <p style="font-size: 18px; color: #555;">Please contribute great articles to the community.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
    </div>
`;

  const info = await transporter.sendMail({
    from: `"ADMIN" <kietchamhoc@gmail.com>`,
    to: `${email}`,
    subject: "New Author Registration Notification",
    text: `Hello Author, you have been approved by ADMIN to become an author.`,
    html: htmlContent,
  });

  return info;
};

const sendEmailRefuseAuthor = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: red;">New Author Registration Notification</h2>
      <p style="font-size: 18px; color: #555;">Hello User,</p>
      <p style="font-size: 18px; color: #555;">ADMIN has rejected your request to become an author.</p>
      <p style="font-size: 18px; color: #555;">For any questions, please contact Admin via email.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
    </div>
`;

  const info = await transporter.sendMail({
    from: `"ADMIN" <kietchamhoc@gmail.com>`,
    to: `${email}`,
    subject: "New Author Registration Notification",
    text: `Hello, your request to become an author has been rejected by ADMIN.`,
    html: htmlContent,
  });

  return info;

};

const sendEmailAccountLocked = async (email, reason) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: red;">Account Suspension Notification</h2>
      <p style="font-size: 18px; color: #555;">Hello,</p>
      <p style="font-size: 18px; color: #555;">We regret to inform you that your account has been suspended.</p>
      <p style="font-size: 18px; color: #555;">Reason for account suspension: <strong>${reason}</strong></p>
      <p style="font-size: 18px; color: #555;">If you have any questions, please feel free to contact us.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
    </div>
`;

  const info = await transporter.sendMail({
    from: `"ADMIN" <tkd25092003@gmail.com>`,
    to: `${email}`,
    subject: "Account Suspension Notification",
    html: htmlContent,
  });


  return info;
};

const sendEmailAccountRestored = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pvphuc041119@gmail.com",
      pass: "lsbijbrfnmyxdshr",
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: green;">Account Restoration Notification</h2>
      <p style="font-size: 18px; color: #555;">Hello,</p>
      <p style="font-size: 18px; color: #555;">We are pleased to inform you that your account has been restored and you can access it normally again.</p>
      <p style="font-size: 18px; color: #555;">If you have any questions, please feel free to contact us.</p>
      <hr style="border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #aaa;">Best regards,<br>Support Team</p>
    </div>
`;

  const info = await transporter.sendMail({
    from: `"ADMIN" <pvphuc041119@gmail.com>`,
    to: `${email}`,
    subject: "Account Restoration Notification",
    html: htmlContent,
  });

  return info;
};

module.exports = {
  sendEmail,
  sendEmailRegister,
  sendEmailRegisterAuthor,
  sendEmailAgreeAuthor,
  sendEmailRefuseAuthor,
  sendEmailAccountLocked,
  sendEmailAccountRestored

};
