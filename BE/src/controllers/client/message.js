const Message = require("../../models/message.js");
const Notification = require('../../models/notification');

// Hàm lấy tất cả tin nhắn giữa hai người dùng
exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await Message.fetchMessages(senderId, receiverId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

// Hàm gửi tin nhắn
exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, blog_id, message } = req.body;

  try {
    const result = await Message.sendMessage(sender_id, receiver_id, blog_id, message);
    await Notification.createNotification( sender_id, blog_id, receiver_id, message, "message");
    res.status(200).json({ message: "Message sent successfully", result });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
};


// Hàm xóa tin nhắn
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const result = await Message.deleteMessage(messageId);
    res.status(200).json({ message: "Message deleted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
};

// Hàm kiểm tra tin nhắn có tồn tại hay không
exports.checkMessageExists = async (req, res) => {
  const { messageId } = req.params;

  try {
    const exists = await Message.messageExists(messageId);
    res.status(200).json({ messageExists: exists });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking message existence", error });
  }
};

// Hàm lấy thông tin người dùng gửi tin nhắn
exports.getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const userInfo = await Message.getUserInfo(userId);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error });
  }
};
// Hàm lấy danh sách receiver_id mà người dùng đã nhắn tin
exports.getChatReceivers = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    const receivers = await Message.getChatReceivers(userId); // Gọi hàm getChatReceivers
    res.status(200).json(receivers); // Trả về danh sách receivers
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat receivers", error });
  }
};
