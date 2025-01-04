const Reports = require('../../models/reports');
const Blog = require('../../models/blog');
const axios = require('axios');
const User = require('../../models/user');
const API_KEY = process.env.API_KEY;
const API_URL_AUTO = process.env.API_URL_AUTO;
const API_CHECK_SPORT = process.env.API_CHECK_SPORT;

// Lấy danh sách báo cáo với phân trang
exports.getReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { data, total } = await Reports.fetchAll(offset, limit);
    const totalPages = Math.ceil(total / limit);
    const from = offset + 1;
    const to = offset + data.length;

    res.status(200).json({
      data: data,
      meta: {
        current_page: page,
        from: from,
        last_page: totalPages,
        path: req.baseUrl,
        per_page: limit,
        to: to,
        total: total,
      },
      links: {
        first: `${req.baseUrl}?page=1&limit=${limit}`,
        last: `${req.baseUrl}?page=${totalPages}&limit=${limit}`,
        prev: page > 1 ? `${req.baseUrl}?page=${page - 1}&limit=${limit}` : null,
        next: page < totalPages ? `${req.baseUrl}?page=${page + 1}&limit=${limit}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy danh sách báo cáo.",
      error: error.message,
    });
  }
};

exports.getReportsByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Lấy user_id từ URL params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "user_id không hợp lệ.",
      });
    }

    const { data, total } = await Reports.fetchReportsByUser(userId, offset, limit);
    const totalPages = Math.ceil(total / limit);
    const from = offset + 1;
    const to = offset + data.length;

    res.status(200).json({
      data: data,
      meta: {
        current_page: page,
        from: from,
        last_page: totalPages,
        path: req.baseUrl,
        per_page: limit,
        to: to,
        total: total,
      },
      links: {
        first: `${req.baseUrl}?page=1&limit=${limit}`,
        last: `${req.baseUrl}?page=${totalPages}&limit=${limit}`,
        prev: page > 1 ? `${req.baseUrl}?page=${page - 1}&limit=${limit}` : null,
        next: page < totalPages ? `${req.baseUrl}?page=${page + 1}&limit=${limit}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy danh sách báo cáo của người dùng.",
      error: error.message,
    });
  }
};



// Lấy chi tiết một báo cáo
exports.getReportById = async (req, res) => {
  try {
    const { reportId } = req.params; // Nhận reportId từ URL

    const report = await Reports.fetchById(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Báo cáo không tồn tại",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chi tiết báo cáo",
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết báo cáo",
      error: error.message,
    });
  }
};

// Tạo một báo cáo mới
exports.createReport = async (req, res) => {
  try {
    const { blogId, userId, reason } = req.body;
    if (!blogId || !userId || !reason) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu đầu vào (blogId, userId, reason)",
      });
    }
    const result = await Reports.create(blogId, userId, reason);

    return res.status(201).json({
      success: true,
      message: "Tạo báo cáo thành công",
      reportId: result.reportId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi khi tạo báo cáo",
      error: error.message,
    });
  }
};


// Cập nhật trạng thái báo cáo
exports.updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params; // Nhận reportId từ URL
    const { status } = req.body; // Nhận trạng thái từ body

    if (!["pending", "resolved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ (pending, resolved, rejected)",
      });
    }

    const updated = await Reports.updateStatus(reportId, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Báo cáo không tồn tại hoặc không được cập nhật",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái báo cáo thành công",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật trạng thái báo cáo",
      error: error.message,
    });
  }
};

// Xóa báo cáo
exports.deleteReport = async (req, res, next) => {
  const id = req.params.id;
  const deleteReport = await Reports.delete(id);
  res.status(200).json({ data: deleteReport });
};

// Kiểm tra số lượng báo cáo cho bài viết
const checkReportCount = async (blogId) => {
  try {
    const reportCount = await Reports.countReportsByBlogId(blogId);
    return reportCount >= 3;
  } catch (error) {
    console.error("Error while counting reports:", error);
    return false;
  }
};

const checkContentToxicity = async (blogId) => {
  try {
    const blog = await Blog.detailBlog(blogId);
    if (!blog || blog.length === 0) {
      throw new Error("Blog not found or empty response");
    }

    const { title, context } = blog[0];
    const blogContent = `${title} ${context}`;

    const response = await axios.post(
      API_URL_AUTO,
      { text: blogContent },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("Invalid response from toxicity API");
    }

    const toxicityScore = response.data[0].score;

    return { toxicityScore };
  } catch (error) {
    console.error("Error checking content toxicity:", error);
    return { toxicityScore: null };
  }
};

const checkIfSportsRelated = async (blogContent) => {
  try {
    const response = await axios.post(
      API_CHECK_SPORT,
      {
        inputs: blogContent,
        parameters: { candidate_labels: ["sports", "politics", "entertainment"] },
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` }
      }
    );

    if (!response.data || response.data.labels.length === 0) {
      throw new Error("Invalid response from sports API");
    }

    const label = response.data.labels[0];
    return label === "sports";
  } catch (error) {
    console.error("Error during sports classification:", error.message);
    return null;
  }
};

const processReports = async (blogId) => {
  try {
    const isReportValid = await checkReportCount(blogId);
    if (!isReportValid) {
      return { message: 'Chưa đủ báo cáo hợp lệ để kiểm tra' };
    }

    const blog = await Blog.detailBlog(blogId);
    if (!blog || blog.length === 0) {
      return { message: 'Bài viết không tồn tại' };
    }

    const { title, context, author_id } = blog[0];
    const blogContent = `${title} ${context}`;

    const isSports = await checkIfSportsRelated(blogContent);
    if (isSports === null) {
      return { message: 'Lỗi khi kiểm tra thể thao' };
    }

    const { toxicityScore } = await checkContentToxicity(blogId);
    if (toxicityScore === null) {
      return { message: 'Không thể xác định mức độ độc hại, cần kiểm tra lại' };
    }

    if (toxicityScore > 0.5) {
      const reason = "Độ toxic vượt quá mức cho phép.";
      await User.softDelete(author_id, reason).catch(err => {
        throw new Error(`Soft delete failed: ${err.message}`);
      });
      await Blog.updateBlogsForInactiveUsers();
      return { message: "Bài viết và tài khoản người dùng đã bị xóa" };
    } else if (toxicityScore > 0.3) {
      const reason = "Bài viết không liên quan đến thể thao và có độc hại.";
      await Blog.softDelete(blogId, reason).catch(err => {
        throw new Error(`Failed to soft delete blog: ${err.message}`);
      });
      return { message: "Bài viết đã bị xóa và các báo cáo đã bị xóa" };
    }

    return { message: 'Báo cáo đã bị xóa, bài viết không vi phạm' };
  } catch (error) {
    console.error(`Unexpected error during report processing for blogId: ${blogId} - ${error.message}`);
    return { message: 'Lỗi không xác định khi xử lý báo cáo' };
  }
};

exports.reviewReports = async (req, res) => {
  try {
    const { blogId } = req.params;
    const result = await processReports(blogId);

    // Nếu báo cáo hoặc bài viết bị xóa, xóa tất cả báo cáo liên quan
    if (result.message.includes("bị xóa")) {
      await Reports.deleteAllByBlogId(blogId);  // Gọi phương thức này chỉ một lần
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Error processing reports:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi kiểm duyệt bài viết.",
      error: error.stack || error.message,
    });
  }
};



