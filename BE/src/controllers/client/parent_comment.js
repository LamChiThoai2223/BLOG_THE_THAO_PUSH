const ParentComment = require("../../models/parent_comment");
const axios = require('axios');
const HUGGING_FACE_API_KEY = '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'; // API Key từ Hugging Face
const API_URL_AUTO = process.env.API_URL_AUTO;
exports.list = async (req, res, next) => {
  try {
    const comment_id = req.params.comment_id;
    const parentComment = await ParentComment.fetch(comment_id);
    if (!parentComment || parentComment.length === 0) {
      return res.status(200).json({
        message: "No parent comments found",
        data: [],
      });
    } else {
      res.status(200).json({
        message: "Get parent comment successfully",
        data: parentComment,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.countParentCommentsByBlog = async (req, res, next) => {
    const blog_id  = req.params.blog_id;
    try {
      const data = await ParentComment.countParentCommentsByBlog(blog_id);
      res.status(200).json({
        message: "Get count parent comment successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


// exports.add = async (req, res, next) => {
//   const parentComment = {
//     comment_id: req.body.comment_id,
//     user_id: req.body.user_id,
//     content: req.body.content,
//     image_url: req.body.image_url,
//     reply_to_user_id: req.body.reply_to_user_id
//   };
//   try {
//     const data = await ParentComment.create(parentComment);
//     res.status(200).json({
//       message: "Post parent comment successfully",
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.add = async (req, res, next) => {
  // Create the parent comment object from the request body
  const parentComment = {
    comment_id: req.body.comment_id,
    user_id: req.body.user_id,
    content: req.body.content,
    image_url: req.body.image_url,
    reply_to_user_id: req.body.reply_to_user_id,
  };

  try {
    // Call the Hugging Face API for content moderation
    const textModerationResponse = await axios.post(
      API_URL_AUTO,
      { inputs: parentComment.content },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const textModerationResult = textModerationResponse.data;
    if (Array.isArray(textModerationResult) && Array.isArray(textModerationResult[0])) {
      const labels = textModerationResult[0].map(item => item.label);
      const scores = textModerationResult[0].map(item => item.score);
      const toxicIndex = labels.indexOf('toxic');
      if (toxicIndex !== -1 && scores[toxicIndex] > 0.9) {
        return res.status(200).json({
          message: `Your comment contains harmful content and cannot be added. Please edit your comment.`,
        });
      }
    } else {
      console.error('Invalid response structure:', textModerationResult);
      return res.status(500).json({ error: 'Invalid response structure from Hugging Face API.' });
    }

    // If content is safe, create the parent comment
    const data = await ParentComment.create(parentComment);
    res.status(200).json({
      message: 'Post parent comment successfully',
      data: data,
    });

  } catch (error) {
    console.error('Error posting parent comment:', error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.update = async (req, res, next) => {
  const parent_comment_id = req.params.parent_comment_id;
  const parentComment = {
    content: req.body.content,
  };

  if (req.body.image_url !== undefined) {
    parentComment.image_url = req.body.image_url; 
  }

  try {
    const data = await ParentComment.edit(parent_comment_id, parentComment);
    res.status(200).json({
      message: "Put parent comment successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.softDelete = async (req, res, next) => {
  const parent_comment_id = req.params.parent_comment_id;
  try {
    const result = await ParentComment.softDelete(parent_comment_id);
    res.status(200).json({
      message: "Soft delete parent comment successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res, next) => {
  const parent_comment_id = req.params.parent_comment_id;
  try {
    const result = await ParentComment.delete(parent_comment_id);
    res.status(200).json({
      message: "Delete parent comment successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


