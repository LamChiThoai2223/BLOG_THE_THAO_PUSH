const express = require('express')

const usersAPIController = require('../controllers/client/user');
const tagsAPIController = require('../controllers/client/tag');
const EmailController = require('../controllers/client/email');
const FollowController = require('../controllers/client/follow');
const LikesController = require('../controllers/client/likes');
const NotificationController = require('../controllers/client/notification');
const NotificationBlogsController = require('../controllers/client/notification_blogs');
const BlockUserController = require('../controllers/client/blocked_user');
const MessageController = require('../controllers/client/message');
const ReportsController = require("../controllers/client/reports");
const router = express.Router();

// API USER CLIENT
router.get('/users/', usersAPIController.list);
router.post('/users/', usersAPIController.add);
router.post('/register/', usersAPIController.register);
router.delete('/users/:id', usersAPIController.delete);
router.get('/users/:id', usersAPIController.getDetail);
router.put('/users/:id/soft-delete', usersAPIController.softDeleteUser);
router.put('/users/:id', usersAPIController.update);
router.get('/check-user/:username', usersAPIController.getUserByUsername);
router.post("/test-email", usersAPIController.sendVerificationEmail);
router.get("/verify-email", usersAPIController.verifyEmail);
router.get("/check-token", usersAPIController.checkToken);

//// API TAGS
router.get('/tags/', tagsAPIController.list);
router.post('/tags/', tagsAPIController.add);
router.get('/tags/:tag_id', tagsAPIController.getDetail);
router.put('/tags/:tag_id', tagsAPIController.update);
router.put('/tags/:tag_id/soft-delete', tagsAPIController.softDelete);
router.delete('/tags/:tag_id', tagsAPIController.delete);
router.get('/tags_list/', tagsAPIController.fetchTags);

//// API Change Pass
router.post('/sendEmail/', EmailController.sendEmail);
router.post('/sendEmailRegister/', EmailController.sendEmailRegister);
router.post('/optEmail/', EmailController.opt);
router.post('/forgot-password', usersAPIController.forgotPass);
router.post('/sendEmailRegisterAuthor', EmailController.sendEmailRegisterAuthor);
router.post('/sendEmailAgreeAuthor', EmailController.sendEmailAgreeAuthor);
router.post('/sendEmailRefuseAuthor', EmailController.sendEmailRefuseAuthor);
router.post('/sendEmailAccountLocked', EmailController.sendEmailAccountLocked);
router.post('/sendEmailAccountRestored', EmailController.sendEmailAccountRestored);
//// API Follow API
router.post('/follow', FollowController.followUser);
router.delete('/unfollow', FollowController.unfollowUser);
router.get('/sendFriends/:id', FollowController.getFriends);
router.get('/followers/:id', FollowController.getFollowers);
router.get('/following/:id', FollowController.getFollowing);
router.get('/followersAll/:id', FollowController.getFollowersAllNoPage);
router.get('/followingAll/:id', FollowController.getFollowingAllNoPage);

// API Notifications
router.get('/notifications/:id', NotificationController.getNotifications);
router.get('/notificationsAll/:id', NotificationController.getAllNotifications);
router.post('/notifications/', NotificationController.createNotification);
router.put('/notifications/:id/read', NotificationController.markAsRead);
router.delete('/notifications/:id', NotificationController.deleteNotification);
router.patch('/notifications/hide/:id', NotificationController.hideNotification);
router.post('/notifications/turn-off/:userId/:authorId', NotificationController.turnOffNotifications);
router.put('/notifications/turn-on/:userId/:authorId', NotificationController.turnOnNotifications);

// API Notifications Blogs
router.get('/notificationsBlog/:id', NotificationBlogsController.getNotificationsBlog);
router.get('/notificationsBlogsAll/:id', NotificationBlogsController.getAllNotificationsBlog);
router.put('/notificationsBlog/:id/read', NotificationBlogsController.markAsReadBlog);
router.delete('/notificationsBlogs/:id', NotificationBlogsController.deleteNotificationBlog);

// API Blocked Users
router.post("/blocked-users", BlockUserController.blockUser);
router.delete("/blocked-users", BlockUserController.unblockUser);
router.post("/blocked-users/check", BlockUserController.isUserBlocked);
router.get("/blocked-users/:id", BlockUserController.getBlockedUsers);
router.get("/blockedAll-users/:id", BlockUserController.getAllBlockedUsers);

// API Message
router.get('/messages/:senderId/:receiverId', MessageController.getMessages);
router.post('/messages/', MessageController.sendMessage);
router.delete('/messages/:messageId', MessageController.deleteMessage);
router.get('/messages/exists/:messageId', MessageController.checkMessageExists);
router.get('/messages/user/:userId', MessageController.getUserInfo);

// API Report
router.get("/report", ReportsController.getReports);
router.get("/report/:reportId", ReportsController.getReportById);
router.post("/report", ReportsController.createReport);
router.put("/report/:reportId", ReportsController.updateReportStatus);
router.delete("/report/:id", ReportsController.deleteReport);
router.get('/report/user/:userId', ReportsController.getReportsByUser);
router.put('/review-reports/:blogId', ReportsController.reviewReports);



router.get("/chat-receivers/:userId", MessageController.getChatReceivers);

//// API Likes API
router.get('/likes/:user_id', LikesController.ListLikesByUser);

router.post('/sendEmailRegisterAuthor', EmailController.sendEmailRegisterAuthor);
module.exports = router;
