const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');
const db = require('../config/database');
const auth = require('../middleware/auth');

dotenv.config();

const router = express.Router();

router.post('/google-login', async (req, res) => {
    const { id_token } = req.body;

    try {
        // Xác thực ID token với Google
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
        const user = response.data;

        const query = 'SELECT * FROM users WHERE google_id = ?';
        db.query(query, [user.sub], async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ success: false, message: 'Server error!' });
            }

            let newUser;
            if (results.length === 0) {
                // Thêm người dùng mới vào cơ sở dữ liệu
                const insertQuery = 'INSERT INTO users (google_id, email, full_name, image_user, username, status) VALUES (?, ?, ?, ?, ?, ?)';
                const insertValues = [user.sub, user.email, user.name, user.picture, user.name, 'active'];

                try {
                    const result = await new Promise((resolve, reject) => {
                        db.query(insertQuery, insertValues, (err, results) => {
                            if (err) reject(err);
                            else resolve(results);
                        });
                    });

                    newUser = {
                        google_id: user.sub,
                        email: user.email,
                        fullname: user.name,
                        picture: user.picture || '',
                        username: user.name
                    };

                    // Lấy ID người dùng mới
                    newUser.user_id = result.insertId;
                } catch (insertError) {
                    console.error('Error inserting new user:', insertError);
                    return res.status(500).json({ success: false, message: 'Failed to create user' });
                }
            } else {
                newUser = results[0];
            }

            // Tạo JWT token
            const token = jwt.sign(
                { id: newUser.user_id, username: newUser.username, role: newUser.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Lưu token vào cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                expires: new Date(Date.now() + 30 * 60 * 1000) // Token hết hạn sau 30 phút
            });

            res.json({ success: true, token, user: newUser });
        });
    } catch (error) {
        console.error('Error authenticating with Google:', error);
        res.status(400).json({ success: false, message: 'Authentication failed' });
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const query = 'SELECT * FROM users WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ msg: 'Lỗi server!' });
            }
            if (results.length === 0) {
                return res.status(404).json({ msg: 'Người dùng không tồn tại' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Error in /profile route:', error);
        res.status(500).json({ msg: 'Lỗi server!' });
    }
});

module.exports = router;
