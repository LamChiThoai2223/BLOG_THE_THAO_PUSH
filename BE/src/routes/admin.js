const express = require('express')

const usersAPIController = require('../controllers/admin/user');
const categoryAPIController = require('../controllers/admin/category');
const sportAPIController = require('../controllers/admin/sport');
const blogsAPIController = require('../controllers/admin/blog');
const LikesAPIController = require('../controllers/admin/post_like');
const ratingsAPIController = require('../controllers/admin/ratings');
const postViewsAPIController = require('../controllers/admin/post_views');
const postShareAPIController = require('../controllers/admin/share');
const commentsAPIController = require('../controllers/admin/comment');
const tagsAPIController = require('../controllers/admin/tag');
const parentCommnentAPIController = require('../controllers/client/parent_comment');
const router = express.Router();


const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../src/assets/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage });
// API USER ADMIN

router.get('/users/', usersAPIController.list);
router.get('/user_deleted/', usersAPIController.listDeleted);

router.post('/users/', usersAPIController.register);
router.delete('/users/:id', usersAPIController.delete);
router.get('/users/:id', usersAPIController.getDetail);
router.put('/users/:id/soft-delete', usersAPIController.softDeleteUser);
router.put('/users/:id', usersAPIController.update);
router.put('/users/:id/restore', usersAPIController.restoreUser);
router.post('/users/search', usersAPIController.search);
router.post('/users/searchSoftDelete', usersAPIController.searchSoftDelete);
router.put('/users/:id/confirm-author', usersAPIController.confirmAuthor);
router.put('/profile/:id', usersAPIController.profile);
router.get('/check-email', usersAPIController.checkEmailExists);
router.get('/email', usersAPIController.getEmails);
router.get('/check-username', usersAPIController.checkUsernameExists);
router.get('/check-cccd', usersAPIController.checkCccdExists);
router.get('/check-phone', usersAPIController.checkPhoneExists);
router.put('/users/:id/agrreAuthor', usersAPIController.agreeAuthor);
router.put('/users/:id/refuseAuthor', usersAPIController.refuseAuthor);
router.get('/users/author/register', usersAPIController.fetchRegisterAuthor);

// API Category Admin
router.get('/categories/', categoryAPIController.list);
router.get('/category_deleted', categoryAPIController.listDeleted);
router.post('/categories/', categoryAPIController.add);
router.delete('/categories/:id', categoryAPIController.delete);
router.get('/categories/:id', categoryAPIController.getDetail);
router.put('/categories/:id/soft-delete', categoryAPIController.softDeleteCategory);
router.put('/categories/:id', categoryAPIController.update);
router.put('/categories/:id/restore', categoryAPIController.restore);
router.get('/categories_list/', categoryAPIController.fetchCategories);

// API Sport Admin
// router.get('/sports/', sportAPIController.list);
router.get('/sports/', sportAPIController.getPages);
router.get('/sports_delete/', sportAPIController.getPagesDelete);
router.post('/sports/', upload.single('images'), sportAPIController.add);
router.delete('/sports/:id', sportAPIController.delete);
router.get('/sports/:id', sportAPIController.getDetail);
router.put('/sports/:id/soft-delete', sportAPIController.softDeleteSport);
router.put('/sports/:id', sportAPIController.update);
router.get('/sports_list/', sportAPIController.fetchSports);
router.put('/sports/:id/restore', sportAPIController.restoreSports);

//  API BLOG ADMIN
router.get('/blogs/', blogsAPIController.getBlogs);
router.get('/blogs/follow/:id', blogsAPIController.getBlogsFollow);
router.get('/blogsAll/', blogsAPIController.getBlogsAllAuthor);
router.get('/blogs_restore', blogsAPIController.getBlogsRestore);
router.get('/blogs_pending', blogsAPIController.getBlogsPending);
router.get('/blogs/:id', blogsAPIController.detail);
router.get('/blogs/edit/:id', blogsAPIController.detailBlog);
router.post('/blogs/', blogsAPIController.add);
router.put('/blogs/:id', blogsAPIController.update);
router.delete('/blogs/:id', blogsAPIController.delete);
router.put('/blogs/:id/soft-delete', blogsAPIController.softDelete);
router.put('/blogs/:id/restore', blogsAPIController.restore);
router.get('/blogs/category/:categoryId', blogsAPIController.getBlogsByCategory);
router.get('/blogs/tag/:tagId', blogsAPIController.getBlogsByTag);
router.get('/blogs/sport/:sportId', blogsAPIController.getBlogsBySport);
router.put('/blogs/:id/approved', blogsAPIController.approved);
router.post('/blogs/search', blogsAPIController.sreach);
router.post('/blogs/search_title', blogsAPIController.sreach);
router.get('/blogs/:userId/blog', blogsAPIController.getBlogUser);
router.get('/blogs/:userId/blogAll', blogsAPIController.getAllBlogUser);
router.get('/blogs/recommendations/:blog_id', blogsAPIController.getRecommendations);
router.post('/blogs/latest-blog', blogsAPIController.getLatestBlog);
router.post("/blogs/approved", blogsAPIController.getApprovedBlogs);
router.post('/blogs/auto-approve', blogsAPIController.autoApprovePost);
router.get('/blogs/:userId/blogDelete', blogsAPIController.getBlogUserDelete);
router.post('/blogs/update-inactive-blogs', blogsAPIController.updateInactiveBlogs);
// Route để lấy bài viết hôm nay
router.post('/blogs/today', blogsAPIController.getBlogsToday);

// Route để lấy bài viết tuần này
router.post('/blogs/this-week', blogsAPIController.getBlogsThisWeek);

// Route để lấy bài viết tháng trước
router.post('/blogs/last-month', blogsAPIController.getBlogsLastMonth);

// Route để lấy bài viết 3 tháng trước
router.post('/blogs/three-months-ago', blogsAPIController.getBlogsThreeMonthsAgo);

// Route để lấy bài viết 1 năm trước
router.post('/blogs/one-year-ago', blogsAPIController.getBlogsOneYearAgo);

//  API POST LIKE ADMIN
// Đếm số lượng like cho bài viết
router.get('/like/blog/:blog_id', LikesAPIController.findUserLikeBlog);
router.get('/post-like/:blogId/count', LikesAPIController.countLikes);
router.post('/post-like', LikesAPIController.toggleLike);
router.get('/post_likes_blogs', LikesAPIController.getLikedPosts);
router.get('/total_likes', LikesAPIController.getTotalLikes);
router.get('/total_likes_in_day', LikesAPIController.getTotalLikesInDay);
router.get('/liked-posts/:id', LikesAPIController.getLikedPosts);

// API TAG
router.get('/tags/', tagsAPIController.list);
router.get('/tag_deleted', tagsAPIController.listDeleted);
router.post('/tags/', tagsAPIController.add);
router.get('/tags/:tag_id', tagsAPIController.getDetail);
router.get('/check-tags/:name', tagsAPIController.checkNameTag);
router.put('/tags/:tag_id', tagsAPIController.update);
router.put('/tags/:tag_id/soft-delete', tagsAPIController.softDelete);
router.delete('/tags/:tag_id', tagsAPIController.delete);
router.put('/tags/:tag_id/restore', tagsAPIController.restore);

// API COMMENTS

router.post('/comments/', commentsAPIController.add);
router.get('/comments/:comment_id', commentsAPIController.getDetail);
router.get('/blog_comment', commentsAPIController.listAllBlogs);
router.put('/comments/:comment_id', commentsAPIController.update);
router.put('/comments/:comment_id/soft-delete', commentsAPIController.softDelete);
router.delete('/comments/:comment_id', commentsAPIController.delete);
router.get('/blogs/:blog_id/comments', commentsAPIController.list);
router.put('/replies/:id', commentsAPIController.editReply);

// API PARENT COMMENT
router.get('/parent_comment/:comment_id', parentCommnentAPIController.list);
router.post('/parent_comment', parentCommnentAPIController.add);
router.put('/parent_comment/:parent_comment_id', parentCommnentAPIController.update);
router.put('/parent_comment/:parent_comment_id/soft-delete', parentCommnentAPIController.softDelete);
router.delete('/parent_comment/:parent_comment_id/', parentCommnentAPIController.delete);
router.get('/parent_comment/count/:blog_id/', parentCommnentAPIController.countParentCommentsByBlog);

// API RAITNGS ADMIN
router.get('/ratings/', ratingsAPIController.list);
router.post('/ratings/', ratingsAPIController.add);
router.delete('/ratings/:id', ratingsAPIController.delete);
router.get('/ratings/:id', ratingsAPIController.getDetail);
router.put('/ratings/:id/soft-delete', ratingsAPIController.softDeleteRating);
router.put('/ratings/:id', ratingsAPIController.update);

// API POST VIEWS ADMIN
router.get('/post_views/', postViewsAPIController.list);
router.get('/total_views/', postViewsAPIController.totalViews);
router.get('/total_views_in_day/', postViewsAPIController.totalViewsInDay);
router.get('/post_views_blogs/', postViewsAPIController.fetchPostViewsWithTotal);
router.post('/post_views/', postViewsAPIController.add);
router.put('/post_views/:id/soft-delete', postViewsAPIController.softDeletePostView);
router.post('/views/:id', postViewsAPIController.viewBlog);
router.get('/view_by_user_id/', postViewsAPIController.totalViewsByUserId);
router.get('/view_total_blog/', postViewsAPIController.fetchTotalViewsWithBlogs);

// API POST SHARES ADMIN
router.get('/post_share_blogs/', postShareAPIController.fetchPostSharesWithTotal);
router.get('/share_total_blog/', postShareAPIController.fetchTotalSharesWithBlogs);
router.post('/share/', postShareAPIController.addShare);

module.exports = router;
