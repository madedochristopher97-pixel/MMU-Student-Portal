const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database/init');

const router = express.Router();

// Login
router.post('/login', (req, res) => {
    const { studentId, password } = req.body;
    
    db.get('SELECT * FROM users WHERE student_id = ? OR email = ?', [studentId, studentId], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, studentId: user.student_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.json({
            token,
            user: {
                id: user.id,
                studentId: user.student_id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    });
});

// Register
router.post('/register', async (req, res) => {
    const { studentId, email, password, firstName, lastName, dateOfBirth, idNumber, phone } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.run(`INSERT INTO users (student_id, email, password, first_name, last_name, date_of_birth, id_number, phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [studentId, email, hashedPassword, firstName, lastName, dateOfBirth, idNumber, phone],
        function(err) {
            if (err) {
                return res.status(400).json({ error: 'User already exists or invalid data' });
            }
            
            res.json({ message: 'User registered successfully', userId: this.lastID });
        }
    );
});

// Verify token middleware
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = router;
module.exports.verifyToken = verifyToken;
