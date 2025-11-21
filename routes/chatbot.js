const express = require('express');
const { db } = require('../database/init');
const { verifyToken } = require('./auth');

const router = express.Router();

// AI Chatbot response logic
function generateChatbotResponse(message, userData) {
    const lowerMessage = message.toLowerCase();
    
    // GPA and grades queries
    if (lowerMessage.includes('gpa') || lowerMessage.includes('grade')) {
        if (userData.academic && userData.academic.gpa) {
            return `Your current GPA is ${userData.academic.gpa} out of 4.00. You're in the ${userData.academic.percentile}th percentile of your cohort! Great work! 🎓`;
        }
        return "I couldn't find your GPA information. Please contact the academic office.";
    }
    
    // Fee and payment queries
    if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('balance')) {
        if (userData.financial) {
            const { total_billed, total_paid, credit_balance } = userData.financial;
            if (credit_balance > 0) {
                return `You have a credit balance of Ksh. ${credit_balance.toLocaleString()}. Your total billed amount is Ksh. ${total_billed.toLocaleString()} and you've paid Ksh. ${total_paid.toLocaleString()}. 💰`;
            } else {
                const owing = total_billed - total_paid;
                return `Your total billed amount is Ksh. ${total_billed.toLocaleString()}. You've paid Ksh. ${total_paid.toLocaleString()}. ${owing > 0 ? `You owe Ksh. ${owing.toLocaleString()}.` : 'Your account is up to date!'}`;
            }
        }
        return "I couldn't find your financial information. Please check the Financials section.";
    }
    
    // Deadline queries
    if (lowerMessage.includes('deadline') || lowerMessage.includes('assignment') || lowerMessage.includes('due')) {
        if (userData.deadlines && userData.deadlines.length > 0) {
            const upcoming = userData.deadlines.filter(d => d.status === 'pending').slice(0, 3);
            if (upcoming.length > 0) {
                let response = "Here are your upcoming deadlines:\n\n";
                upcoming.forEach(d => {
                    const dueDate = new Date(d.due_date);
                    const today = new Date();
                    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    response += `📌 ${d.title} (${d.course}) - Due in ${daysLeft} days (${d.due_date})\n`;
                });
                return response;
            }
            return "You have no pending deadlines. Great job staying on top of things! ✅";
        }
        return "I couldn't find any deadline information.";
    }
    
    // Course queries
    if (lowerMessage.includes('course') || lowerMessage.includes('class')) {
        if (userData.courses && userData.courses.length > 0) {
            let response = "You're currently enrolled in:\n\n";
            userData.courses.forEach(c => {
                response += `📚 ${c.course_name} (${c.course_code})${c.grade ? ` - Grade: ${c.grade}` : ''}\n`;
            });
            return response;
        }
        return "I couldn't find your course information.";
    }
    
    // Event and calendar queries
    if (lowerMessage.includes('event') || lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) {
        if (userData.events && userData.events.length > 0) {
            let response = "Upcoming events:\n\n";
            userData.events.slice(0, 5).forEach(e => {
                response += `📅 ${e.title} - ${e.event_date}\n`;
            });
            return response;
        }
        return "You have no upcoming events scheduled.";
    }
    
    // Announcement queries
    if (lowerMessage.includes('announcement') || lowerMessage.includes('news')) {
        if (userData.announcements && userData.announcements.length > 0) {
            let response = "Recent announcements:\n\n";
            userData.announcements.slice(0, 3).forEach(a => {
                response += `📢 ${a.title}\n${a.description}\n\n`;
            });
            return response;
        }
        return "There are no recent announcements.";
    }
    
    // Profile queries
    if (lowerMessage.includes('profile') || lowerMessage.includes('information') || lowerMessage.includes('details')) {
        if (userData.user) {
            return `Here's your profile information:\n\nName: ${userData.user.first_name} ${userData.user.last_name}\nStudent ID: ${userData.user.student_id}\nEmail: ${userData.user.email}\nPhone: ${userData.user.phone || 'Not provided'}\nDate of Birth: ${userData.user.date_of_birth || 'Not provided'}`;
        }
        return "I couldn't retrieve your profile information.";
    }
    
    // Help queries
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        return `I'm your student portal assistant! I can help you with:

📊 Academic information (GPA, grades, courses)
💰 Financial information (fees, payments, balance)
📅 Deadlines and assignments
📆 Events and calendar
📢 Announcements
👤 Profile information
📚 Course details

Just ask me anything about your student portal!`;
    }
    
    // Greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return `Hello ${userData.user?.first_name || 'there'}! 👋 How can I assist you today? I can help with your grades, fees, deadlines, and more!`;
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're welcome! Feel free to ask if you need anything else. 😊";
    }
    
    // Default response
    return "I'm not sure I understand. Try asking about your GPA, fees, deadlines, courses, events, or announcements. You can also type 'help' to see what I can do!";
}

// Send message to chatbot
router.post('/message', verifyToken, (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    
    // Save user message
    db.run('INSERT INTO chat_history (user_id, message, sender) VALUES (?, ?, ?)',
        [req.userId, message, 'user'],
        (err) => {
            if (err) {
                console.error('Failed to save user message:', err);
            }
        }
    );
    
    // Get user data for context
    db.get('SELECT * FROM users WHERE id = ?', [req.userId], (err, user) => {
        if (err || !user) {
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }
        
        const userData = { user };
        
        // Get academic data
        db.get('SELECT * FROM academic_records WHERE user_id = ? ORDER BY id DESC LIMIT 1', [req.userId], (err, academic) => {
            userData.academic = academic;
            
            // Get financial data
            db.get('SELECT * FROM financial_records WHERE user_id = ? ORDER BY id DESC LIMIT 1', [req.userId], (err, financial) => {
                userData.financial = financial;
                
                // Get deadlines
                db.all('SELECT * FROM deadlines WHERE user_id = ? AND status = "pending" ORDER BY due_date ASC', [req.userId], (err, deadlines) => {
                    userData.deadlines = deadlines;
                    
                    // Get courses
                    db.all('SELECT * FROM courses WHERE user_id = ?', [req.userId], (err, courses) => {
                        userData.courses = courses;
                        
                        // Get events
                        db.all('SELECT * FROM events WHERE user_id = ? ORDER BY event_date ASC LIMIT 5', [req.userId], (err, events) => {
                            userData.events = events;
                            
                            // Get announcements
                            db.all('SELECT * FROM announcements ORDER BY created_at DESC LIMIT 5', [], (err, announcements) => {
                                userData.announcements = announcements;
                                
                                // Generate response
                                const response = generateChatbotResponse(message, userData);
                                
                                // Save bot response
                                db.run('INSERT INTO chat_history (user_id, message, sender) VALUES (?, ?, ?)',
                                    [req.userId, response, 'bot'],
                                    (err) => {
                                        if (err) {
                                            console.error('Failed to save bot message:', err);
                                        }
                                    }
                                );
                                
                                res.json({ response });
                            });
                        });
                    });
                });
            });
        });
    });
});

// Get chat history
router.get('/history', verifyToken, (req, res) => {
    db.all('SELECT * FROM chat_history WHERE user_id = ? ORDER BY timestamp ASC LIMIT 50', [req.userId], (err, history) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(history);
    });
});

// Clear chat history
router.delete('/history', verifyToken, (req, res) => {
    db.run('DELETE FROM chat_history WHERE user_id = ?', [req.userId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to clear history' });
        }
        res.json({ message: 'Chat history cleared' });
    });
});

module.exports = router;
