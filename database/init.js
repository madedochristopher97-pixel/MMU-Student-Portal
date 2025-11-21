const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'student_portal.db');
const db = new sqlite3.Database(dbPath);

function initDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                date_of_birth TEXT,
                id_number TEXT,
                phone TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Academic records
            db.run(`CREATE TABLE IF NOT EXISTS academic_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                semester TEXT NOT NULL,
                gpa REAL NOT NULL,
                percentile INTEGER,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Courses
            db.run(`CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                course_name TEXT NOT NULL,
                course_code TEXT NOT NULL,
                grade TEXT,
                credits INTEGER,
                semester TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Assignments/Deadlines
            db.run(`CREATE TABLE IF NOT EXISTS deadlines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                course TEXT NOT NULL,
                due_date TEXT NOT NULL,
                type TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Financial records
            db.run(`CREATE TABLE IF NOT EXISTS financial_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                total_billed REAL NOT NULL,
                total_paid REAL NOT NULL,
                credit_balance REAL DEFAULT 0,
                semester TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Transactions
            db.run(`CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                amount REAL NOT NULL,
                type TEXT NOT NULL,
                description TEXT,
                date TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Announcements
            db.run(`CREATE TABLE IF NOT EXISTS announcements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                type TEXT NOT NULL,
                priority TEXT NOT NULL,
                date TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

            // Events
            db.run(`CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                title TEXT NOT NULL,
                description TEXT,
                event_date TEXT NOT NULL,
                event_type TEXT,
                color TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Activity log
            db.run(`CREATE TABLE IF NOT EXISTS activity_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                activity_type TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                date TEXT NOT NULL,
                icon TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`);

            // Chat history
            db.run(`CREATE TABLE IF NOT EXISTS chat_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                message TEXT NOT NULL,
                sender TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    // Insert demo data
                    insertDemoData().then(resolve).catch(reject);
                }
            });
        });
    });
}

async function insertDemoData() {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync('password123', 10);
        
        db.get('SELECT id FROM users WHERE student_id = ?', ['SST-261-155/2023'], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            
            if (!row) {
                // Insert demo user
                db.run(`INSERT INTO users (student_id, email, password, first_name, last_name, date_of_birth, id_number, phone)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    ['SST-261-155/2023', 'madedochristopher97@gmail.com', hashedPassword, 'Christopher', 'Madedo', '2004-02-06', '42144740', '+254700000000'],
                    function(err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        
                        const userId = this.lastID;
                        
                        // Insert academic record
                        db.run(`INSERT INTO academic_records (user_id, semester, gpa, percentile)
                            VALUES (?, ?, ?, ?)`, [userId, 'Semester 2, 2025', 3.67, 92]);
                        
                        // Insert courses
                        const courses = [
                            ['Software Engineering', 'CSE301', 'A', 4, 'Semester 2, 2025'],
                            ['Database Systems', 'CSE302', 'A-', 3, 'Semester 2, 2025'],
                            ['Web Development', 'CSE303', 'B+', 3, 'Semester 2, 2025'],
                            ['Data Structures', 'CSE304', 'A', 4, 'Semester 2, 2025'],
                            ['Computer Networks', 'CSE305', 'A-', 3, 'Semester 2, 2025']
                        ];
                        
                        courses.forEach(course => {
                            db.run(`INSERT INTO courses (user_id, course_name, course_code, grade, credits, semester)
                                VALUES (?, ?, ?, ?, ?, ?)`, [userId, ...course]);
                        });
                        
                        // Insert deadlines
                        const deadlines = [
                            ['Project Phase 2', 'Software Engineering', '2025-10-25', 'project'],
                            ['Final Exam', 'Database Systems', '2025-10-28', 'exam'],
                            ['Portfolio Submission', 'Web Development', '2025-11-01', 'assignment']
                        ];
                        
                        deadlines.forEach(deadline => {
                            db.run(`INSERT INTO deadlines (user_id, title, course, due_date, type)
                                VALUES (?, ?, ?, ?, ?)`, [userId, ...deadline]);
                        });
                        
                        // Insert financial record
                        db.run(`INSERT INTO financial_records (user_id, total_billed, total_paid, credit_balance, semester)
                            VALUES (?, ?, ?, ?, ?)`, [userId, 203600.00, 221960.00, 18360.00, 'Semester 2, 2025']);
                        
                        // Insert transactions
                        const transactions = [
                            [100000, 'credit', 'Government Scholarship', '2025-09-15'],
                            [121960, 'payment', 'Tuition Payment', '2025-09-20'],
                            [203600, 'debit', 'Semester 2 Fees', '2025-09-01']
                        ];
                        
                        transactions.forEach(transaction => {
                            db.run(`INSERT INTO transactions (user_id, amount, type, description, date)
                                VALUES (?, ?, ?, ?, ?)`, [userId, ...transaction]);
                        });
                        
                        // Insert announcements
                        const announcements = [
                            ['Exam Schedule Published', 'Final examination timetable for Semester 2, 2025 is now available. Check your student portal for details.', 'urgent', 'high', '2025-10-20'],
                            ['Library Hours Extended', 'Main library will be open 24/7 during examination period starting October 24th.', 'info', 'medium', '2025-10-19']
                        ];
                        
                        announcements.forEach(announcement => {
                            db.run(`INSERT INTO announcements (title, description, type, priority, date)
                                VALUES (?, ?, ?, ?, ?)`, announcement);
                        });
                        
                        // Insert events
                        const events = [
                            [userId, 'Project Phase 2 Due', 'Software Engineering project deadline', '2025-10-25', 'deadline', 'red'],
                            [userId, 'Database Final Exam', 'Final examination', '2025-10-28', 'exam', 'orange'],
                            [userId, 'Portfolio Submission', 'Web Development portfolio', '2025-11-01', 'assignment', 'blue']
                        ];
                        
                        events.forEach(event => {
                            db.run(`INSERT INTO events (user_id, title, description, event_date, event_type, color)
                                VALUES (?, ?, ?, ?, ?, ?)`, event);
                        });
                        
                        // Insert activity log
                        const activities = [
                            [userId, 'exam', 'Exam Schedule Released', 'Database Systems Final - Oct 28, 2025', '2025-10-13', '📅'],
                            [userId, 'class', 'Class Rescheduled', 'Web Development Lab moved to Friday 2PM', '2025-10-13', '🕐'],
                            [userId, 'scholarship', 'Scholarship Applied', 'Government scholarship of Ksh. 100,000 credited', '2025-10-06', '💰'],
                            [userId, 'registration', 'Course Registration Complete', '5 courses registered for this semester', '2025-09-29', '🎓']
                        ];
                        
                        activities.forEach(activity => {
                            db.run(`INSERT INTO activity_log (user_id, activity_type, title, description, date, icon)
                                VALUES (?, ?, ?, ?, ?, ?)`, activity);
                        });
                        
                        console.log('Demo data inserted successfully');
                        resolve();
                    }
                );
            } else {
                console.log('Demo data already exists');
                resolve();
            }
        });
    });
}

module.exports = { db, initDatabase };
