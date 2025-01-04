var db = require('../config/database');

module.exports = class User {
    constructor() { }

    static async fetchAllApprovedBlogs() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) AS tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.is_delete != 1 AND status = 'approved'
                GROUP BY blogs.blog_id`;

            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async fetchAllBlogs(offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
            FROM blogs
            LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
            LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
            WHERE blogs.is_delete != 1 AND status = 'approved'
            GROUP BY blogs.blog_id
            LIMIT ?, ?`;

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
                                total: result[0].total
                            });
                        }
                    });
                }
            });
        });
    }

    static async fetchAllBlogsFollow(followerId, offset, limit) {
        return new Promise((resolve, reject) => {
            if (!followerId) {
                // Trường hợp không đăng nhập: trả về tất cả bài viết
                let sql = `
                SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.is_delete != 1 AND blogs.status = 'approved'
                GROUP BY blogs.blog_id
                ORDER BY blogs.created_at DESC
                LIMIT ?, ?
            `;
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
            } else {
                // Trường hợp có đăng nhập: xử lý logic người theo dõi
                let followQuery = `
                SELECT followed_id
                FROM follow
                WHERE follower_id = ?
            `;

                db.query(followQuery, [followerId], (err, followData) => {
                    if (err) {
                        reject(err);
                    } else {
                        const followedIds = followData.map(follow => follow.followed_id);
                        const followedIdsString = followedIds.length > 0 ? followedIds.join(',') : null;

                        let sql = `
    SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
    FROM blogs
    LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
    LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
    WHERE blogs.is_delete != 1 AND blogs.status = 'approved'
    ${followedIdsString
                                ? `AND (
                blogs.author_id IN (${followedIdsString}) 
                OR blogs.author_id NOT IN (${followedIdsString})
              )`
                                : ""
                            }
    GROUP BY blogs.blog_id
    ORDER BY 
        -- Ưu tiên các bài viết từ người theo dõi trong vòng 2 ngày
        CASE 
            WHEN blogs.author_id IN (${followedIdsString}) AND blogs.created_at >= NOW() - INTERVAL 2 DAY THEN 1
            WHEN blogs.author_id IN (${followedIdsString}) AND blogs.created_at < NOW() - INTERVAL 2 DAY THEN 2
            ELSE 3
        END,
        blogs.created_at DESC
    LIMIT ?, ?
`;

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
                    }
                });
            }
        });
    }



    static async fetchAllBlogsWithAuthors() {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT blogs.*, blogs.author_id
            FROM blogs
            WHERE blogs.is_delete != 1 AND blogs.status = 'approved'`;

            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        data: data,
                        total: data.length,
                    });
                }
            });
        });
    }


    static async getBlogUserDelete(userId, offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.author_id = ? AND blogs.is_delete = 1 AND status = 'rejected'
                GROUP BY blogs.blog_id
                ORDER BY blogs.created_at DESC
                LIMIT ?, ?
            `;
            db.query(sql, [userId, offset, limit], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    db.query("SELECT FOUND_ROWS() as total", (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                data: data,
                                total: result[0].total
                            });
                        }
                    });
                }
            });
        });
    }

    static async fetchRestoreBlogs(offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
            FROM blogs
            LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
            LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
            WHERE blogs.is_delete = 1 AND status = 'rejected'
            GROUP BY blogs.blog_id
            LIMIT ?, ?`;

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
                                total: result[0].total
                            });
                        }
                    });
                }
            });
        });
    }

    static async fetchPendingBlogs(offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
            FROM blogs
            LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
            LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
            WHERE blogs.is_delete = 0 AND status = 'pending'
            GROUP BY blogs.blog_id
            LIMIT ?, ?`;

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
                                total: result[0].total
                            });
                        }
                    });
                }
            });
        });
    }


    static async detail(id) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.blog_id = ?
                GROUP BY blogs.blog_id
            `;
            db.query(sql, [id], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async detailBlog(id) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.blog_id = ?
                GROUP BY blogs.blog_id
            `;
            db.query(sql, [id], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async getBlogUser(userId, offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT SQL_CALC_FOUND_ROWS blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.author_id = ? AND blogs.is_delete != 1 AND status = 'approved'
                GROUP BY blogs.blog_id
                ORDER BY blogs.created_at DESC
                LIMIT ?, ?
            `;
            db.query(sql, [userId, offset, limit], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    db.query("SELECT FOUND_ROWS() as total", (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                data: data,
                                total: result[0].total
                            });
                        }
                    });
                }
            });
        });
    }
    static async getALLBlogUser(userId) {
        return new Promise((resolve, reject) => {
            let sql =
                `SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.author_id = ?
                GROUP BY blogs.blog_id
                ORDER BY blogs.created_at DESC`
                ;
            db.query(sql, [userId], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    static async create(blogs) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO blogs SET ?", blogs,
                function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    static async addTag(blogId, tagId) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)",
                [blogId, tagId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static async update(id, blogs) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE blogs SET ? WHERE blog_id = ?';
            db.query(sql, [blogs, id], function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async softDelete(id, whyDelete) {
        return new Promise((resolve, reject) => {
            let sqlUpdateBlog = `UPDATE blogs SET is_delete = 1, status = "rejected", why_delete = ? WHERE blog_id = ?`;
            db.query(sqlUpdateBlog, [whyDelete, id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Không Thể Xóa Tạm thời bài viết này");
                } else {
                    let sqlGetAuthor = `SELECT author_id FROM blogs WHERE blog_id = ?`;
                    db.query(sqlGetAuthor, [id], (err, rows) => {
                        if (err || rows.length === 0) {
                            console.log(err || "Không tìm thấy tác giả");
                            reject("Không thể lấy thông tin tác giả của bài viết");
                        } else {
                            const authorId = rows[0].author_id;
                            let sqlInsertNotification = `
                                INSERT INTO notifications_blogs (user_id, blog_id, reason)
                                VALUES (?, ?, ?)
                            `;
                            db.query(sqlInsertNotification, [authorId, id, whyDelete], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    reject("Không thể lưu thông báo bài viết bị xóa");
                                } else {
                                    resolve("Xóa Tạm Thời Thành Công và đã lưu thông báo");
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    static async restore(id) {
        return new Promise((resolve, reject) => {
            let sqlUpdateBlog = `
                UPDATE blogs 
                SET is_delete = 0, status = "pending", why_delete = null 
                WHERE blog_id = ?
            `;
            db.query(sqlUpdateBlog, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Không Thể Khôi Phục bài viết này");
                } else {
                    let sqlDeleteNotification = `
                        DELETE FROM notifications_blogs 
                        WHERE blog_id = ?
                    `;
                    db.query(sqlDeleteNotification, [id], (err, result) => {
                        if (err) {
                            console.log(err);
                            reject("Bài viết đã được khôi phục nhưng không thể xóa thông báo");
                        } else {
                            resolve("Khôi Phục Thành Công và đã xóa thông báo");
                        }
                    });
                }
            });
        });
    }

    // xóa vĩnh viễn
    static async delete(id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM blogs WHERE blog_id = ${id}`;
            db.query(sql, (err, rows) => {
                if (!err) {
                    resolve("Xóa Thành Công");
                } else {
                    console.log(err);
                    reject("Không Thể Xóa");
                }
            })
        })
    }

    static async search(keywords) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    blogs.*, 
                    GROUP_CONCAT(tags.tag_id) AS tag_ids
                FROM 
                    blogs
                LEFT JOIN 
                    blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN 
                    tags ON blog_tags.tag_id = tags.tag_id
                WHERE 
                    (
                        blogs.title LIKE ? OR 
                        blogs.title LIKE ? OR 
                        blogs.title LIKE ? OR
                        blogs.content LIKE ? OR 
                        blogs.content LIKE ? OR 
                        blogs.content LIKE ?
                    )
                    AND blogs.status = "approved"
                    AND blogs.is_delete = 0
                GROUP BY 
                    blogs.blog_id
            `;
            const queryParams = [
                `%${keywords}%`,
                `${keywords} %`,
                `% ${keywords}`,
                `% ${keywords} %`,
                `${keywords} %`,
                `% ${keywords}`,
                `% ${keywords} %`,
            ];

            db.query(sql, queryParams, (err, data) => {
                if (err) {
                    console.error("SQL Error:", err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }




    static async searchWithTitle(keywords) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM blogs WHERE title LIKE ? AND status = approved AND is_delete = 0`;
            db.query(sql, [`% ${keywords}%`], (err, data) => {
                if (err) {
                    console.error('SQL Error:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async approved(id) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE blogs SET status = "approved" WHERE blog_id = ?`;
            db.query(sql, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Không Thể duyệt bài viết này");
                } else {
                    resolve("Duyệt bài viết Thành Công");
                }
            });
        });
    }

    static async getBlogsByCategory(categoryId) {
        return new Promise((resolve, reject) => {
            let sql = `
            SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
            FROM blogs
            LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
            LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
            WHERE blogs.category_id = ?
            GROUP BY blogs.blog_id`;

            db.query(sql, [categoryId], (err, results) => {
                if (err) {
                    console.error('Error fetching blogs:', err);
                    reject('Không thể lấy các bài viết');
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async fetchBlogsByTag(tagId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                GROUP BY blogs.blog_id
                HAVING FIND_IN_SET(?, tag_ids) > 0`;
            db.query(sql, [tagId], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async getBlogsBySport(sportId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.sport_id = ?
                GROUP BY blogs.blog_id`;

            db.query(sql, [sportId], (err, results) => {
                if (err) {
                    console.error('Error fetching blogs by sport:', err);
                    reject('Không thể lấy các bài viết theo thể thao');
                } else {
                    resolve(results);
                }
            });
        });
    }

    // bài viết theo ngày 
    static async getBlogsByDateRange(startDate, endDate) {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.created_at BETWEEN ? AND ?
                GROUP BY blogs.blog_id
            `;
            db.query(sql, [startDate, endDate], (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // bài viết theo ngày hôm nay 
    static async getBlogsToday() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE DATE(blogs.created_at) = CURDATE()
                GROUP BY blogs.blog_id
            `;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    //bài viết theo tuần này
    static async getBlogsThisWeek() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE YEARWEEK(blogs.created_at, 1) = YEARWEEK(CURDATE(), 1)
                GROUP BY blogs.blog_id;
            `;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    console.log('Data fetched from database:', data); // Kiểm tra dữ liệu trả về
                    resolve(data);
                }
            });
        });
    }

    //bài viết theo tháng trước 
    static async getBlogsLastMonth() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE YEAR(blogs.created_at) = YEAR(CURDATE()) 
                AND MONTH(blogs.created_at) = MONTH(CURDATE()) - 1
                GROUP BY blogs.blog_id
            `;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    // bài viết 3 tháng trước
    static async getBlogsThreeMonthsAgo() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.created_at >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
                GROUP BY blogs.blog_id
            `;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // bài viết 1 năm trước
    static async getBlogsOneYearAgo() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
                GROUP BY blogs.blog_id
            `;
            db.query(sql, (err, data) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static async suggestBlog() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT blog_id, title, context FROM blogs`;
            db.query(sql, (err, results) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async fetchLatestBlog() {
        return new Promise((resolve, reject) => {
            let sql = `
                SELECT blogs.*, GROUP_CONCAT(tags.tag_id) as tag_ids
                FROM blogs
                LEFT JOIN blog_tags ON blogs.blog_id = blog_tags.blog_id
                LEFT JOIN tags ON blog_tags.tag_id = tags.tag_id
                WHERE blogs.is_delete != 1 AND status = 'approved'
                GROUP BY blogs.blog_id
                ORDER BY blogs.created_at DESC
                LIMIT 1`;

            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data && data.length > 0) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    static async findById(blogId) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM blogs WHERE blog_id = ?";
            db.query(sql, [blogId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return resolve(null);
                resolve(results[0]);
            });
        });
    }


    static async updateBlogsForInactiveUsers() {
        return new Promise((resolve, reject) => {
            let sql = `
                UPDATE blogs
                SET is_delete = 1, status = 'rejected'
                WHERE author_id IN (
                    SELECT user_id
                    FROM users
                    WHERE status = 'inactive'
                )
            `;

            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
