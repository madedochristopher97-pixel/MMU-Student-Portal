const express = require('express');
const { db } = require('../database/init');
const { verifyToken } = require('./auth');

const router = express.Router();

// Get financial summary
router.get('/summary', verifyToken, (req, res) => {
    db.get('SELECT * FROM financial_records WHERE user_id = ? ORDER BY id DESC LIMIT 1', [req.userId], (err, financial) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(financial || {});
    });
});

// Get transactions
router.get('/transactions', verifyToken, (req, res) => {
    db.all('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.userId], (err, transactions) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(transactions);
    });
});

// Add payment
router.post('/payment', verifyToken, (req, res) => {
    const { amount, description } = req.body;
    const date = new Date().toISOString().split('T')[0];
    
    db.run('INSERT INTO transactions (user_id, amount, type, description, date) VALUES (?, ?, ?, ?, ?)',
        [req.userId, amount, 'payment', description, date],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to record payment' });
            }
            
            // Update financial record
            db.run('UPDATE financial_records SET total_paid = total_paid + ?, credit_balance = credit_balance + ? WHERE user_id = ?',
                [amount, amount, req.userId],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to update financial record' });
                    }
                    res.json({ message: 'Payment recorded successfully', transactionId: this.lastID });
                }
            );
        }
    );
});

module.exports = router;
