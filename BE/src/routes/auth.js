const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();


// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND is_delete = 0 AND verified = 1';

    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Lỗi server!' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
        }
        const user = results[0];
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu không đúng!' });
            }

            // Tạo token
            const token = jwt.sign(
                { id: user.user_id, username: user.username, role: user.role },
                'your_jwt_secret_key',
                { expiresIn: '30m' }
            );

            res.cookie('token', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
            // Trả về token và thông tin người dùng
            res.json({
                token,
                user: {
                    fullname: user.fullname,
                    phone: user.phone,
                    bio: user.bio,
                    role: user.role
                },

            });

        } catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ message: 'Lỗi server!' });
        }
    });
});


// Đăng xuất
router.post('/logout', auth, (req, res) => {
    res.clearCookie('token', { path: '/' }); // Xóa token cookie
    res.clearCookie('role', { path: '/' });  // Xóa role cookie
    res.json({ msg: 'Logged out successfully' });
});

// Get user profile
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

router.post('/change-password', auth, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old password and new password are required' });
    }

    try {
        const userQuery = 'SELECT * FROM users WHERE user_id = ?';
        const userResults = await new Promise((resolve, reject) => {
            db.query(userQuery, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (!userResults || userResults.length === 0) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const user = userResults[0];

        if (!user.password) {
            return res.status(500).json({ message: 'Server error: User password not found!' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updateQuery = 'UPDATE users SET password = ? WHERE user_id = ?';
        await new Promise((resolve, reject) => {
            db.query(updateQuery, [hashedPassword, userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({ message: 'Password has been successfully updated!' });
    } catch (error) {
        console.error('Error in /change-password route:', error);
        res.status(500).json({ message: 'Server error!' });
    }
});


module.exports = router;
