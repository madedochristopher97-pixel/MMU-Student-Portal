const express = require('express');
const { db } = require('../database/init');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get courses
router.get('/courses', verifyToken, (req, res) => {
    db.all('SELECT * FROM courses WHERE user_id = ?', [req.userId], (err, courses) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(courses);
    });
});

// Get grades
router.get('/grades', verifyToken, (req, res) => {
    db.all('SELECT * FROM courses WHERE user_id = ? AND grade IS NOT NULL', [req.userId], (err, grades) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(grades);
    });
});

// Get deadlines
router.get('/deadlines', verifyToken, (req, res) => {
    db.all('SELECT * FROM deadlines WHERE user_id = ? ORDER BY due_date ASC', [req.userId], (err, deadlines) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(deadlines);
    });
});

// Update deadline status
router.put('/deadlines/:id', verifyToken, (req, res) => {
    const { status } = req.body;
    
    db.run('UPDATE deadlines SET status = ? WHERE id = ? AND user_id = ?',
        [status, req.params.id, req.userId],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update deadline' });
            }
            res.json({ message: 'Deadline updated successfully' });
        }
    );
});

module.exports = router;
