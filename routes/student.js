const express = require('express');
const { db } = require('../database/init');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get student profile
router.get('/profile', verifyToken, (req, res) => {
    db.get('SELECT * FROM users WHERE id = ?', [req.userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    });
});

// Update profile
router.put('/profile', verifyToken, (req, res) => {
    const { email, phone, dateOfBirth } = req.body;
    
    db.run('UPDATE users SET email = ?, phone = ?, date_of_birth = ? WHERE id = ?',
        [email, phone, dateOfBirth, req.userId],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update profile' });
            }
            res.json({ message: 'Profile updated successfully' });
        }
    );
});

// Get dashboard data
router.get('/dashboard', verifyToken, (req, res) => {
    const dashboardData = {};
    
    // Get user info
    db.get('SELECT * FROM users WHERE id = ?', [req.userId], (err, user) => {
        if (err || !user) {
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }
        
        const { password, ...userWithoutPassword } = user;
        dashboardData.user = userWithoutPassword;
        
        // Get academic record
        db.get('SELECT * FROM academic_records WHERE user_id = ? ORDER BY id DESC LIMIT 1', [req.userId], (err, academic) => {
            dashboardData.academic = academic || {};
            
            // Get deadlines
            db.all('SELECT * FROM deadlines WHERE user_id = ? AND status = "pending" ORDER BY due_date ASC', [req.userId], (err, deadlines) => {
                dashboardData.deadlines = deadlines || [];
                
                // Get financial record
                db.get('SELECT * FROM financial_records WHERE user_id = ? ORDER BY id DESC LIMIT 1', [req.userId], (err, financial) => {
                    dashboardData.financial = financial || {};
                    
                    // Get announcements
                    db.all('SELECT * FROM announcements ORDER BY created_at DESC LIMIT 5', [], (err, announcements) => {
                        dashboardData.announcements = announcements || [];
                        
                        // Get events
                        db.all('SELECT * FROM events WHERE user_id = ? ORDER BY event_date ASC', [req.userId], (err, events) => {
                            dashboardData.events = events || [];
                            
                            // Get activity log
                            db.all('SELECT * FROM activity_log WHERE user_id = ? ORDER BY date DESC LIMIT 10', [req.userId], (err, activities) => {
                                dashboardData.activities = activities || [];
                                
                                res.json(dashboardData);
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;
