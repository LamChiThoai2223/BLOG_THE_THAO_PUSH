const Email = require("../../models/email");
const Otp = require("../../models/otp");

// Hàm gửi email với mã OTP
exports.sendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const response = await Email.sendEmail(email);
      return res.json(response);
    }
    res.json({
      status: "error",
      message: "Email không tồn tại",
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
    });
  }
};

exports.sendEmailRegister = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const response = await Email.sendEmailRegister(email);
      return res.json(response);
    }
    res.json({
      status: "error",
      message: "Email không tồn tại",
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
    });
  }
};

// Hàm xác thực OTP
exports.opt = async (req, res) => {
  try {
    const { email, otp } = req.body; // Lấy email và mã OTP từ request body
    console.log("Email:", email); // Kiểm tra giá trị email trong console
    console.log("OTP:", otp); // Kiểm tra giá trị OTP trong console

    if (email && otp) {
      Otp.checkOtp(email, otp, (err, isValid) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'Lỗi máy chủ nội bộ',
          });
        }
        if (isValid) {
          return res.json({
            status: 'success',
            message: 'Mã OTP đúng',
          });
        }
        return res.json({
          status: 'error',
          message: 'Mã OTP không đúng hoặc đã hết hạn',
        });
      });
    } else {
      return res.json({
        status: 'error',
        message: 'Thiếu email hoặc mã OTP',
      });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      status: 'error',
      message: 'Lỗi máy chủ nội bộ',
    });
  }
};

exports.sendEmailRegisterAuthor = async (req, res, next) => {
  try {
    const { username, email, reason } = req.body;

    if (email && reason) {
      const response = await Email.sendEmailRegisterAuthor(username, email, reason);
      return res.json(response);
    }
    res.json({
      status: "error",
      message: "Email hoặc lý do không tồn tại",
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
    });
  }
};

exports.sendEmailAgreeAuthor = async (req, res, next) => {
  try {
      const { email } = req.body;

      if (email) {
          const response = await Email.sendEmailAgreeAuthor(email);
          return res.json(response);
      }
      res.json({
          status: "error",
          message: "Email không tồn tại",
      });
  } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).json({
          error: "Lỗi máy chủ nội bộ",
      });
  }
};

exports.sendEmailRefuseAuthor = async (req, res, next) => {
  try {
      const { email } = req.body;

      if (email) {
          const response = await Email.sendEmailRefuseAuthor(email);
          return res.json(response);
      }
      res.json({
          status: "error",
          message: "Email không tồn tại",
      });
  } catch (error) {
      console.error("Lỗi:", error);
      res.status(500).json({
          error: "Lỗi máy chủ nội bộ",
      });
  }
};

// Hàm gửi email thông báo tài khoản bị khóa
exports.sendEmailAccountLocked = async (req, res) => {
  try {
    const { email, why_delete } = req.body;

    if (email && why_delete) {
      const response = await Email.sendEmailAccountLocked(email, why_delete);
      return res.json(response);
    }
    res.json({
      status: "error",
      message: "Thiếu email hoặc lý do khóa tài khoản",
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
    });
  }
};
exports.sendEmailAccountRestored = async (req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const response = await Email.sendEmailAccountRestored(email);
      return res.json(response);
    }
    
    res.json({
      status: "error",
      message: "Thiếu email",
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({
      error: "Lỗi máy chủ nội bộ",
    });
  }
};

