// Dashboard backend integration and chatbot functionality

const API_BASE = '/api';
let token = localStorage.getItem('token');
let currentUser = JSON.parse(localStorage.getItem('user') || '{}');

// Check authentication
if (!token) {
    window.location.href = '/login.html';
}

// API helper function
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    });
    
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
        return;
    }
    
    return response.json();
}

// Load dashboard data
async function loadDashboard() {
    try {
        const data = await apiCall('/student/dashboard');
        
        // Update welcome message
        if (data.user) {
            document.querySelector('.welcome-section h2').textContent = 
                `Welcome back, ${data.user.first_name}`;
            
            // Update profile section
            const initials = `${data.user.first_name[0]}${data.user.last_name[0]}`;
            document.querySelector('.profile-avatar').textContent = initials;
            document.querySelector('.profile-name').textContent = 
                `${data.user.first_name} ${data.user.last_name}`;
            document.querySelector('.profile-id').textContent = data.user.student_id;
            
            // Update profile details
            const profileDetails = document.querySelectorAll('.profile-detail-item .detail-value');
            if (profileDetails[0]) profileDetails[0].textContent = data.user.id_number || 'N/A';
            if (profileDetails[1]) {
                const dob = data.user.date_of_birth ? new Date(data.user.date_of_birth) : null;
                if (dob) {
                    const age = new Date().getFullYear() - dob.getFullYear();
                    profileDetails[1].textContent = `${dob.toLocaleDateString()} (${age} years)`;
                }
            }
            if (profileDetails[2]) profileDetails[2].textContent = data.user.email;
        }
        
        // Update GPA
        if (data.academic && data.academic.gpa) {
            document.querySelector('.gpa-number').textContent = data.academic.gpa.toFixed(2);
            document.querySelector('.percentile-text').textContent = 
                `${data.academic.percentile}th percentile in your cohort`;
            const percentage = (data.academic.gpa / 4.0) * 100;
            document.querySelector('.progress-fill').style.width = `${percentage}%`;
        }
        
        // Update deadlines
        if (data.deadlines && data.deadlines.length > 0) {
            const deadlinesContainer = document.querySelector('.deadlines-section');
            const deadlineItems = deadlinesContainer.querySelectorAll('.deadline-item');
            
            data.deadlines.slice(0, 3).forEach((deadline, index) => {
                if (deadlineItems[index]) {
                    const dueDate = new Date(deadline.due_date);
                    const today = new Date();
                    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    
                    deadlineItems[index].querySelector('strong').textContent = deadline.title;
                    deadlineItems[index].querySelector('.deadline-course').textContent = deadline.course;
                    const badge = deadlineItems[index].querySelector('.deadline-badge');
                    badge.textContent = `${daysLeft}d`;
                    badge.className = daysLeft <= 5 ? 'deadline-badge urgent' : 'deadline-badge';
                }
            });
        }
        
        // Update financial info
        if (data.financial) {
            const { total_billed, total_paid, credit_balance } = data.financial;
            document.querySelector('.fee-amount').textContent = 
                `Ksh. ${credit_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            document.querySelectorAll('.fee-row span')[1].textContent = 
                `Ksh. ${total_billed.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
            document.querySelectorAll('.fee-row span')[3].textContent = 
                `Ksh. ${total_paid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        }
        
        // Update announcements
        if (data.announcements && data.announcements.length > 0) {
            const announcementsContainer = document.querySelector('.announcements-card');
            const announcementItems = announcementsContainer.querySelectorAll('.announcement-item');
            
            data.announcements.slice(0, 2).forEach((announcement, index) => {
                if (announcementItems[index]) {
                    announcementItems[index].querySelector('strong').textContent = announcement.title;
                    announcementItems[index].querySelector('p').textContent = announcement.description;
                    
                    const badge = announcementItems[index].querySelector('.badge:not(.red)');
                    if (badge) {
                        badge.textContent = announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1);
                        badge.className = announcement.priority === 'high' ? 'badge urgent' : 'badge info';
                    }
                }
            });
        }
        
        // Update activity stream
        if (data.activities && data.activities.length > 0) {
            const activitiesContainer = document.querySelector('.activity-stream-card');
            const existingActivities = activitiesContainer.querySelectorAll('.activity-item:not(.time-marker)');
            
            data.activities.slice(0, 4).forEach((activity, index) => {
                if (existingActivities[index]) {
                    existingActivities[index].querySelector('.activity-icon').textContent = activity.icon;
                    existingActivities[index].querySelector('strong').textContent = activity.title;
                    existingActivities[index].querySelector('p').textContent = activity.description;
                }
            });
        }
        
    } catch (error) {
        console.error('Failed to load dashboard:', error);
    }
}

// Chatbot functionality
const chatToggle = document.getElementById('chatToggle');
const chatbot = document.getElementById('chatbot');
const minimizeChat = document.getElementById('minimizeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

// Toggle chatbot
chatToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
    chatToggle.style.display = 'none';
    loadChatHistory();
});

minimizeChat.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatToggle.style.display = 'flex';
});

// Load chat history
async function loadChatHistory() {
    try {
        const history = await apiCall('/chatbot/history');
        chatMessages.innerHTML = '';
        
        if (history.length === 0) {
            addMessage('bot', `Hello ${currentUser.firstName}! 👋 I'm your AI assistant. I can help you with information about your grades, fees, deadlines, courses, and more. What would you like to know?`);
        } else {
            history.forEach(msg => {
                addMessage(msg.sender, msg.message, false);
            });
        }
        
        scrollToBottom();
    } catch (error) {
        console.error('Failed to load chat history:', error);
    }
}

// Add message to chat
function addMessage(sender, message, animate = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${sender}`;
    avatar.textContent = sender === 'bot' ? '🤖' : (currentUser.firstName ? currentUser.firstName[0] : 'U');
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    if (!animate) {
        messageDiv.style.animation = 'none';
    }
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar bot';
    avatar.textContent = '🤖';
    
    const content = document.createElement('div');
    content.className = 'message-content typing-indicator';
    content.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) {
        typing.remove();
    }
}

// Send message
async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage('user', message);
    chatInput.value = '';
    
    showTyping();
    
    try {
        const response = await apiCall('/chatbot/message', {
            method: 'POST',
            body: JSON.stringify({ message })
        });
        
        removeTyping();
        
        if (response.response) {
            addMessage('bot', response.response);
        } else {
            addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        }
    } catch (error) {
        removeTyping();
        addMessage('bot', 'Sorry, I\'m having trouble connecting. Please try again later.');
        console.error('Chat error:', error);
    }
}

sendMessage.addEventListener('click', sendChatMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sign out functionality
document.querySelector('.sidebar-footer .nav-item:last-of-type').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
});

// Load dashboard on page load
loadDashboard();
