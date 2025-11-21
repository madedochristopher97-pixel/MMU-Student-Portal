// Interactive functionality for the student portal

document.addEventListener('DOMContentLoaded', function() {
    // Calendar navigation
    const calendarNavButtons = document.querySelectorAll('.calendar-nav');
    const calendarMonth = document.querySelector('.calendar-month');
    
    let currentMonth = 9; // October (0-indexed)
    let currentYear = 2025;
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    calendarNavButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) {
                // Previous month
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
            } else {
                // Next month
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
            }
            calendarMonth.textContent = `${months[currentMonth]} ${currentYear}`;
        });
    });
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            alert(`Action: ${action}\nThis would open the respective functionality.`);
        });
    });
    
    // Announcement arrows
    const arrowBtns = document.querySelectorAll('.arrow-btn');
    arrowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const announcement = this.previousElementSibling;
            const title = announcement.querySelector('strong').textContent;
            alert(`Opening: ${title}`);
        });
    });
    
    // Action buttons in activity stream
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const activityTitle = this.previousElementSibling.querySelector('strong').textContent;
            alert(`Taking action on: ${activityTitle}`);
        });
    });
    
    // Calendar day selection
    const calendarDays = document.querySelectorAll('.calendar-day:not(.inactive)');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => {
                if (d !== this && !d.classList.contains('today')) {
                    d.style.background = '';
                    d.style.color = '';
                }
            });
            
            if (!this.classList.contains('today')) {
                this.style.background = '#fff3f0';
                this.style.color = '#ff5722';
            }
        });
    });
    
    // Share button
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            alert('Share functionality would open here');
        });
    }
    
    // Already Paid button
    const paidBtn = document.querySelector('.paid-btn');
    if (paidBtn) {
        paidBtn.addEventListener('click', function() {
            alert('Payment confirmation submitted!');
        });
    }
    
    // View all announcements link
    const viewAllLink = document.querySelector('.view-all-link');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would show all announcements');
        });
    }
    
    // External link button
    const externalLinkBtn = document.querySelector('.external-link-btn');
    if (externalLinkBtn) {
        externalLinkBtn.addEventListener('click', function() {
            alert('Opening detailed academic performance view');
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
