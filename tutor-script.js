// Global variables
let currentWeek = new Date();
let currentView = 'week';

// Global variables for teaching room
let currentSession = null;
let sessionTimer = null;
let sessionStartTime = null;
let isVideoOn = true;
let isAudioOn = true;
let isScreenSharing = false;
let sessionDuration = 120; // Default 2 hours in minutes
let timeWarningShown = false;
let ratingData = {
    knowledge: 0,
    method: 0,
    attitude: 0,
    effectiveness: 0,
    feedback: ''
};

// Faculty and subjects mapping
const facultySubjects = {
    cntt: {
        name: 'Khoa Công nghệ Thông tin',
        subjects: [
            { value: 'laptrinh', label: 'Lập trình cơ bản' },
            { value: 'csdl', label: 'Cơ sở dữ liệu' },
            { value: 'web', label: 'Lập trình Web' },
            { value: 'mobile', label: 'Lập trình Mobile' },
            { value: 'ai', label: 'Trí tuệ nhân tạo' },
            { value: 'network', label: 'Mạng máy tính' },
            { value: 'toan', label: 'Toán rời rạc' },
            { value: 'ly', label: 'Vật lý đại cương' }
        ]
    },
    kt: {
        name: 'Khoa Kinh tế',
        subjects: [
            { value: 'kinhte', label: 'Kinh tế học' },
            { value: 'ketoan', label: 'Kế toán' },
            { value: 'taichinh', label: 'Tài chính' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'quanly', label: 'Quản lý kinh doanh' },
            { value: 'toan', label: 'Toán kinh tế' },
            { value: 'thongke', label: 'Thống kê' }
        ]
    },
    nn: {
        name: 'Khoa Ngoại ngữ',
        subjects: [
            { value: 'anh', label: 'Tiếng Anh' },
            { value: 'phap', label: 'Tiếng Pháp' },
            { value: 'duc', label: 'Tiếng Đức' },
            { value: 'nhat', label: 'Tiếng Nhật' },
            { value: 'han', label: 'Tiếng Hàn' },
            { value: 'trung', label: 'Tiếng Trung' },
            { value: 'van', label: 'Văn học nước ngoài' }
        ]
    },
    ktcn: {
        name: 'Khoa Kỹ thuật Công nghệ',
        subjects: [
            { value: 'dien', label: 'Kỹ thuật điện' },
            { value: 'co', label: 'Kỹ thuật cơ khí' },
            { value: 'xaydung', label: 'Kỹ thuật xây dựng' },
            { value: 'hoa', label: 'Kỹ thuật hóa học' },
            { value: 'toan', label: 'Toán kỹ thuật' },
            { value: 'ly', label: 'Vật lý kỹ thuật' }
        ]
    },
    kh: {
        name: 'Khoa Khoa học',
        subjects: [
            { value: 'toan', label: 'Toán học' },
            { value: 'ly', label: 'Vật lý' },
            { value: 'hoa', label: 'Hóa học' },
            { value: 'sinh', label: 'Sinh học' },
            { value: 'dia', label: 'Địa lý' },
            { value: 'thongke', label: 'Thống kê' }
        ]
    },
    xh: {
        name: 'Khoa Xã hội',
        subjects: [
            { value: 'van', label: 'Văn học' },
            { value: 'lichsu', label: 'Lịch sử' },
            { value: 'tamly', label: 'Tâm lý học' },
            { value: 'xahoi', label: 'Xã hội học' },
            { value: 'trienlam', label: 'Triết học' },
            { value: 'ngonngu', label: 'Ngôn ngữ học' }
        ]
    },
    yt: {
        name: 'Khoa Y tế',
        subjects: [
            { value: 'y', label: 'Y học cơ bản' },
            { value: 'duoc', label: 'Dược học' },
            { value: 'yte', label: 'Y tế công cộng' },
            { value: 'hoa', label: 'Hóa sinh' },
            { value: 'sinh', label: 'Sinh học y học' },
            { value: 'toan', label: 'Toán y học' }
        ]
    },
    mt: {
        name: 'Khoa Môi trường',
        subjects: [
            { value: 'moitruong', label: 'Khoa học môi trường' },
            { value: 'sinh', label: 'Sinh thái học' },
            { value: 'hoa', label: 'Hóa học môi trường' },
            { value: 'dia', label: 'Địa chất môi trường' },
            { value: 'toan', label: 'Toán môi trường' },
            { value: 'ly', label: 'Vật lý môi trường' }
        ]
    }
};

// Helper function to get current week dates
function getCurrentWeekDates() {
    const weekStart = getWeekStart(currentWeek);
    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(formatDate(addDays(weekStart, i)));
    }
    return dates;
}

// Sample data
const sampleTutors = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        studentId: "SV00123456",
        email: "nguyenvana@vanlanguni.vn",
        phone: "0123 456 789",
        khoa: "Khoa Công nghệ Thông tin",
        year: "Năm 3",
        subjects: ["Toán", "Lý", "Hóa"],
        experience: "2 năm",
        rating: 5.0,
        reviews: 15,
        status: "active"
    }
];

// Generate sample courses with current week dates
function generateSampleCourses() {
    const weekDates = getCurrentWeekDates();
    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    const subjects = ['Toán', 'Lý', 'Hóa', 'Văn', 'Tiếng Anh'];
    const courseTitles = [
        'Toán cơ bản', 'Lý 12', 'Hóa học cơ bản', 'Văn học Việt Nam', 'Tiếng Anh giao tiếp',
        'Toán nâng cao', 'Lý cơ bản', 'Hóa nâng cao', 'Văn học hiện đại', 'Tiếng Anh thương mại'
    ];
    const students = [
        'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Nguyễn Văn E', 'Hoàng Thị F',
        'Đỗ Văn G', 'Vũ Thị H', 'Lý Văn I', 'Trịnh Thị K', 'Bùi Văn L'
    ];
    const timeSlots = [
        '08:00 - 10:00', '09:00 - 11:00', '14:00 - 16:00', '15:00 - 17:00', 
        '16:00 - 18:00', '19:00 - 21:00', '20:00 - 22:00'
    ];

    return weekDates.map((date, index) => {
        if (index >= 6) return null; // Skip Sunday
        
        // Calculate start and end dates for the course
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30); // Course lasts 30 days
        
        return {
            id: index + 1,
            title: courseTitles[index % courseTitles.length],
            subject: subjects[index % subjects.length],
            student: {
                name: students[index % students.length],
                avatar: "https://via.placeholder.com/32"
            },
            schedule: {
                day: days[index],
                time: timeSlots[index % timeSlots.length],
                date: date
            },
            coursePeriod: {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                startDateFormatted: formatDateForDisplay(startDate),
                endDateFormatted: formatDateForDisplay(endDate)
            },
            status: "active"
        };
    }).filter(course => course !== null);
}

const sampleCourses = generateSampleCourses();

const sampleHistory = [
    {
        id: 1,
        date: "2024-01-10",
        time: "14:00 - 16:00",
        title: "Toán cơ bản",
        subject: "Toán",
        student: "Trần Thị B",
        status: "completed",
        rating: 5
    },
    {
        id: 2,
        date: "2024-01-08",
        time: "16:00 - 18:00",
        title: "Lý 12",
        subject: "Lý",
        student: "Lê Văn C",
        status: "completed",
        rating: 4
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadTodaySchedule();
    loadHistory();
    loadCourses();
    generateCalendar();
    setupEventListeners();
});

// Initialize Dashboard
function initializeDashboard() {
    // Update stats
    updateStats();
    
    // Load today's schedule
    loadTodaySchedule();
}

// Update dashboard stats
function updateStats() {
    const todaySessions = sampleCourses.filter(course => 
        course.schedule.date === new Date().toISOString().split('T')[0]
    ).length;
    
    const activeStudents = sampleCourses.length;
    const totalHours = 156; // This would come from backend
    const averageRating = 4.8; // This would come from backend
    
    // Update stats in the DOM
    const statsCards = document.querySelectorAll('.stat-card');
    if (statsCards.length >= 4) {
        statsCards[0].querySelector('h3').textContent = todaySessions;
        statsCards[1].querySelector('h3').textContent = activeStudents;
        statsCards[2].querySelector('h3').textContent = averageRating;
        statsCards[3].querySelector('h3').textContent = totalHours;
    }
}

// Load today's schedule
function loadTodaySchedule() {
    const todaySchedule = document.getElementById('todaySchedule');
    const today = new Date().toISOString().split('T')[0];
    
    const todayCourses = sampleCourses.filter(course => 
        course.schedule.date === today
    );
    
    if (todayCourses.length === 0) {
        todaySchedule.innerHTML = `
            <div class="schedule-item">
                <div class="schedule-info">
                    <div class="schedule-details">
                        <p>Không có buổi dạy nào hôm nay</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    todaySchedule.innerHTML = todayCourses.map(course => `
        <div class="schedule-item">
            <div class="schedule-info">
                <div class="schedule-time">${course.schedule.time}</div>
                <div class="schedule-details">
                    <h4>${course.title}</h4>
                    <p>Học viên: ${course.student.name} | ${course.subject}</p>
                </div>
            </div>
            <div class="schedule-actions">
                <button class="btn btn-primary" onclick="joinCourse(${course.id})">
                    <i class="fas fa-play"></i>
                    Bắt đầu
                </button>
            </div>
        </div>
    `).join('');
}

// Load history
function loadHistory() {
    const historyList = document.getElementById('historyList');
    
    historyList.innerHTML = sampleHistory.map(item => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-date">${formatDate(item.date)}</div>
                <div class="history-details">
                    <h4>${item.title}</h4>
                    <p>Học viên: ${item.student} | ${item.time}</p>
                </div>
            </div>
            <div class="history-status ${item.status}">
                ${item.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
            </div>
        </div>
    `).join('');
}

// Load courses
function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    
    coursesGrid.innerHTML = sampleCourses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-subject">${course.subject}</p>
            </div>
            <div class="course-body">
                <div class="course-info">
                    <div class="course-student">
                        <img src="${course.student.avatar}" alt="${course.student.name}">
                        <span>${course.student.name}</span>
                    </div>
                    <div class="course-price">Miễn phí</div>
                </div>
                <div class="course-schedule">
                    <h5>Lịch học</h5>
                    <p>${course.schedule.day} | ${course.schedule.time}</p>
                </div>
                <div class="course-period">
                    <h5>Thời gian khóa học</h5>
                    <p><i class="fas fa-calendar-alt"></i> ${course.coursePeriod.startDateFormatted} - ${course.coursePeriod.endDateFormatted}</p>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="joinCourse(${course.id})">
                        <i class="fas fa-play"></i>
                        Bắt đầu
                    </button>
                    <button class="btn btn-outline" onclick="viewCourseDetails(${course.id})">
                        <i class="fas fa-eye"></i>
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate calendar
function generateCalendar() {
    const calendar = document.getElementById('scheduleCalendar');
    const weekStart = getWeekStart(currentWeek);
    
    // Update week display
    document.getElementById('currentWeek').textContent = 
        `Tuần ${formatDate(weekStart)} - ${formatDate(addDays(weekStart, 6))}`;
    
    // Generate calendar HTML
    let calendarHTML = `
        <div class="calendar-header">
            <div class="calendar-day-header">Thứ 2</div>
            <div class="calendar-day-header">Thứ 3</div>
            <div class="calendar-day-header">Thứ 4</div>
            <div class="calendar-day-header">Thứ 5</div>
            <div class="calendar-day-header">Thứ 6</div>
            <div class="calendar-day-header">Thứ 7</div>
            <div class="calendar-day-header">Chủ nhật</div>
        </div>
        <div class="calendar-body">
    `;
    
    for (let i = 0; i < 7; i++) {
        const currentDate = addDays(weekStart, i);
        const dayCourses = sampleCourses.filter(course => 
            course.schedule.date === formatDate(currentDate)
        );
        
        calendarHTML += `
            <div class="calendar-day ${isToday(currentDate) ? 'today' : ''}">
                <div class="calendar-date">${currentDate.getDate()}</div>
                <div class="calendar-events">
                    ${dayCourses.length > 0 ? dayCourses.map(course => `
                        <div class="calendar-event active-course" onclick="viewCourseDetails(${course.id})">
                            <div class="event-header">
                                <div class="event-time">${course.schedule.time}</div>
                                <div class="event-status active">Đang dạy</div>
                            </div>
                            <div class="event-title">${course.title}</div>
                            <div class="event-subject">${course.subject}</div>
                            <div class="event-period">
                                <i class="fas fa-calendar-alt"></i>
                                ${course.coursePeriod.startDateFormatted} - ${course.coursePeriod.endDateFormatted}
                            </div>
                            <div class="event-student">
                                <i class="fas fa-user"></i>
                                ${course.student.name}
                            </div>
                            <div class="event-actions">
                                <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); joinCourse(${course.id})">
                                    <i class="fas fa-play"></i>
                                    Bắt đầu
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="calendar-empty">
                            <i class="fas fa-calendar-day"></i>
                            <span>Không có lịch dạy</span>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
    
    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submissions
    const registerTutorForm = document.getElementById('registerTutorForm');
    if (registerTutorForm) {
        registerTutorForm.addEventListener('submit', handleRegisterTutor);
    }
    
    const cancelScheduleForm = document.getElementById('cancelScheduleForm');
    if (cancelScheduleForm) {
        cancelScheduleForm.addEventListener('submit', handleCancelSchedule);
    }
    
    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Search and filters
    const historySearch = document.getElementById('historySearch');
    if (historySearch) {
        historySearch.addEventListener('input', filterHistory);
    }
    
    const historySubjectFilter = document.getElementById('historySubjectFilter');
    if (historySubjectFilter) {
        historySubjectFilter.addEventListener('change', filterHistory);
    }
    
    const historyStatusFilter = document.getElementById('historyStatusFilter');
    if (historyStatusFilter) {
        historyStatusFilter.addEventListener('change', filterHistory);
    }
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Load data for specific modals
        if (modalId === 'joinCourse') {
            loadCourseList();
        } else if (modalId === 'cancelSchedule') {
            loadCancelableCourses();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        
        // If closing teaching room, stop timer
        if (modalId === 'teachingRoom') {
            stopSessionTimer();
            currentSession = null;
            sessionStartTime = null;
        }
    }
}

// Load course list for join course modal
function loadCourseList() {
    const courseList = document.getElementById('courseList');
    
    courseList.innerHTML = sampleCourses.map(course => `
        <div class="course-list-item">
            <div class="course-list-info">
                <h4>${course.title}</h4>
                <p>${course.schedule.day} | ${course.schedule.time} | ${course.student.name}</p>
            </div>
            <button class="btn btn-primary" onclick="joinCourse(${course.id})">
                <i class="fas fa-play"></i>
                Bắt đầu
            </button>
        </div>
    `).join('');
}

// Load cancelable courses
function loadCancelableCourses() {
    const cancelCourseSelect = document.getElementById('cancelCourse');
    const futureCourses = sampleCourses.filter(course => {
        const courseDate = new Date(course.schedule.date);
        const now = new Date();
        const hoursDiff = (courseDate - now) / (1000 * 60 * 60);
        return hoursDiff >= 12; // Only courses at least 12 hours away
    });
    
    cancelCourseSelect.innerHTML = `
        <option value="">Chọn buổi học muốn hủy</option>
        ${futureCourses.map(course => `
            <option value="${course.id}">${course.title} - ${course.schedule.day} ${course.schedule.time}</option>
        `).join('')}
    `;
}

// Handle register tutor form
function handleRegisterTutor(e) {
    e.preventDefault();
    
    const faculty = document.getElementById('tutorFaculty').value;
    const subjects = Array.from(document.querySelectorAll('#subjectsContainer input[type="checkbox"]:checked')).map(cb => cb.value);
    const experience = document.getElementById('tutorExperience').value;
    
    // Validate required fields
    if (!faculty) {
        alert('Vui lòng chọn khoa chuyên ngành');
        return;
    }
    
    if (subjects.length === 0) {
        alert('Vui lòng chọn ít nhất một môn học có thể dạy');
        return;
    }
    
    // Get uploaded files
    const certificateFiles = Array.from(document.getElementById('certificateList').children).map(item => item.querySelector('.file-name').textContent);
    const awardFiles = Array.from(document.getElementById('awardList').children).map(item => item.querySelector('.file-name').textContent);
    
    const tutorData = {
        faculty: faculty,
        facultyName: facultySubjects[faculty].name,
        subjects: subjects,
        experience: experience,
        certificates: certificateFiles,
        awards: awardFiles
    };
    
    // Simulate API call
    console.log('Submitting tutor registration:', tutorData);
    
    // Show success message
    alert('Hồ sơ đã được gửi thành công! Chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất.');
    
    // Close modal and reset form
    closeModal('registerTutor');
    e.target.reset();
    
    // Reset file lists
    document.getElementById('certificateList').innerHTML = '';
    document.getElementById('awardList').innerHTML = '';
    
    // Reset subjects
    document.getElementById('subjectsContainer').innerHTML = '<p class="no-subjects">Vui lòng chọn khoa chuyên ngành trước</p>';
}

// Handle cancel schedule form
function handleCancelSchedule(e) {
    e.preventDefault();
    
    const courseId = document.getElementById('cancelCourse').value;
    const reason = document.getElementById('cancelReason').value;
    const rescheduleDate = document.getElementById('rescheduleDate').value;
    
    if (!courseId || !reason) {
        alert('Vui lòng chọn buổi học và nhập lý do hủy');
        return;
    }
    
    // Simulate API call
    console.log('Cancelling schedule:', { courseId, reason, rescheduleDate });
    
    // Show success message
    alert('Yêu cầu hủy đã được gửi thành công! Học viên sẽ được thông báo.');
    
    // Close modal and reset form
    closeModal('cancelSchedule');
    e.target.reset();
}

// Join course function
function joinCourse(courseId) {
    const course = sampleCourses.find(c => c.id === courseId);
    if (!course) return;
    
    // Simulate joining course
    console.log('Joining course:', course);
    
    // Show confirmation
    if (confirm(`Bạn có muốn bắt đầu buổi dạy "${course.title}" với học viên ${course.student.name}?`)) {
        // Start teaching session
        startTeachingSession(course);
    }
}

// Start teaching session
function startTeachingSession(course) {
    currentSession = course;
    sessionStartTime = new Date();
    
    // Update room info
    document.getElementById('roomTitle').textContent = `Phòng dạy: ${course.title}`;
    document.getElementById('roomDetails').textContent = `Học viên: ${course.student.name} | Môn: ${course.subject}`;
    document.getElementById('sessionStartTime').textContent = formatDateForDisplay(sessionStartTime);
    
    // Start timer
    startSessionTimer();
    
    // Open teaching room modal
    openModal('teachingRoom');
    
    // Add system message
    addChatMessage('system', `Buổi học "${course.title}" đã bắt đầu với học viên ${course.student.name}`);
}

// Start session timer
function startSessionTimer() {
    sessionTimer = setInterval(() => {
        const now = new Date();
        const duration = now - sessionStartTime;
        const totalMinutes = Math.floor(duration / (1000 * 60));
        const remainingMinutes = sessionDuration - totalMinutes;
        
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('teachingTimer').textContent = timeString;
        document.getElementById('currentDuration').textContent = timeString;
        
        // Check for time warnings
        if (remainingMinutes <= 10 && remainingMinutes > 0 && !timeWarningShown) {
            showTimeWarning(remainingMinutes);
        } else if (remainingMinutes <= 0) {
            autoEndSession();
        }
    }, 1000);
}

// Stop session timer
function stopSessionTimer() {
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
    }
}

// Add chat message
function addChatMessage(type, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<span>${message}</span>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send chat message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage('sent', message);
        chatInput.value = '';
        
        // Simulate student response
        setTimeout(() => {
            const responses = [
                'Em hiểu rồi ạ!',
                'Thầy/cô giảng rất dễ hiểu',
                'Em có thể hỏi thêm không ạ?',
                'Cảm ơn thầy/cô!',
                'Em cần làm bài tập gì ạ?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage('received', `Học viên: ${randomResponse}`);
        }, 1000 + Math.random() * 2000);
    }
}

// Video controls
function toggleVideo() {
    isVideoOn = !isVideoOn;
    const videoIcon = document.getElementById('videoIcon');
    const mainVideo = document.getElementById('mainVideo');
    
    if (isVideoOn) {
        videoIcon.className = 'fas fa-video';
        mainVideo.innerHTML = '<i class="fas fa-user"></i><span>Video chính</span>';
    } else {
        videoIcon.className = 'fas fa-video-slash';
        mainVideo.innerHTML = '<i class="fas fa-video-slash"></i><span>Video đã tắt</span>';
    }
    
    addChatMessage('system', `Video ${isVideoOn ? 'đã bật' : 'đã tắt'}`);
}

function toggleAudio() {
    isAudioOn = !isAudioOn;
    const audioIcon = document.getElementById('audioIcon');
    
    if (isAudioOn) {
        audioIcon.className = 'fas fa-microphone';
    } else {
        audioIcon.className = 'fas fa-microphone-slash';
    }
    
    addChatMessage('system', `Microphone ${isAudioOn ? 'đã bật' : 'đã tắt'}`);
}

function toggleScreenShare() {
    isScreenSharing = !isScreenSharing;
    const screenIcon = document.getElementById('screenIcon');
    const mainVideo = document.getElementById('mainVideo');
    
    if (isScreenSharing) {
        screenIcon.className = 'fas fa-desktop';
        mainVideo.innerHTML = '<i class="fas fa-desktop"></i><span>Chia sẻ màn hình</span>';
    } else {
        screenIcon.className = 'fas fa-desktop';
        mainVideo.innerHTML = '<i class="fas fa-user"></i><span>Video chính</span>';
    }
    
    addChatMessage('system', `Chia sẻ màn hình ${isScreenSharing ? 'đã bật' : 'đã tắt'}`);
}

// Teaching tools
function openWhiteboard() {
    addChatMessage('system', 'Bảng trắng đã được mở');
    alert('Bảng trắng sẽ được mở trong tab mới');
}

function shareFile() {
    addChatMessage('system', 'Cửa sổ chia sẻ file đã được mở');
    alert('Vui lòng chọn file để chia sẻ');
}

function openNotes() {
    addChatMessage('system', 'Ghi chú đã được mở');
    alert('Cửa sổ ghi chú đã được mở');
}

function openQuiz() {
    addChatMessage('system', 'Bài tập đã được mở');
    alert('Cửa sổ bài tập đã được mở');
}

// Session management
function pauseSession() {
    if (sessionTimer) {
        stopSessionTimer();
        addChatMessage('system', 'Buổi học đã tạm dừng');
    } else {
        startSessionTimer();
        addChatMessage('system', 'Buổi học đã tiếp tục');
    }
}

// Show time warning
function showTimeWarning(remainingMinutes) {
    timeWarningShown = true;
    const warningElement = document.getElementById('timeWarning');
    const warningMessage = document.getElementById('warningMessage');
    
    warningMessage.textContent = `Còn ${remainingMinutes} phút nữa sẽ kết thúc buổi học`;
    warningElement.style.display = 'block';
    
    // Auto hide after 30 seconds
    setTimeout(() => {
        warningElement.style.display = 'none';
    }, 30000);
    
    // Add chat notification
    addChatMessage('system', `⚠️ Cảnh báo: Còn ${remainingMinutes} phút nữa sẽ kết thúc buổi học`);
}

// Extend session
function extendSession() {
    sessionDuration += 30; // Add 30 minutes
    timeWarningShown = false;
    
    // Hide warning
    document.getElementById('timeWarning').style.display = 'none';
    
    // Add chat notification
    addChatMessage('system', '✅ Buổi học đã được gia hạn thêm 30 phút');
    
    // Show confirmation
    alert('Buổi học đã được gia hạn thêm 30 phút!');
}

// Auto end session
function autoEndSession() {
    stopSessionTimer();
    addChatMessage('system', '⏰ Buổi học đã tự động kết thúc do hết thời gian');
    
    setTimeout(() => {
        alert('Buổi học đã tự động kết thúc do hết thời gian!');
        closeModal('teachingRoom');
        showRatingModal();
    }, 1000);
}

// Show rating modal
function showRatingModal() {
    if (!currentSession) return;
    
    // Populate session info
    document.getElementById('ratingCourseTitle').textContent = currentSession.title;
    document.getElementById('ratingTutorName').textContent = 'Nguyễn Văn A'; // Current tutor name
    document.getElementById('ratingSessionTime').textContent = document.getElementById('currentDuration').textContent;
    document.getElementById('ratingSessionDate').textContent = formatDateForDisplay(sessionStartTime);
    
    // Reset rating data
    ratingData = {
        knowledge: 0,
        method: 0,
        attitude: 0,
        effectiveness: 0,
        feedback: ''
    };
    
    // Reset stars
    document.querySelectorAll('.stars').forEach(starGroup => {
        starGroup.setAttribute('data-rating', '0');
        starGroup.querySelectorAll('i').forEach(star => {
            star.classList.remove('active');
        });
        starGroup.nextElementSibling.textContent = 'Chưa đánh giá';
    });
    
    // Reset feedback
    document.getElementById('ratingFeedback').value = '';
    
    // Setup star rating events
    setupStarRating();
    
    // Show modal
    openModal('rating');
}

// Setup star rating functionality
function setupStarRating() {
    document.querySelectorAll('.stars').forEach(starGroup => {
        const stars = starGroup.querySelectorAll('i');
        const ratingText = starGroup.nextElementSibling;
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                const category = getRatingCategory(starGroup);
                
                // Update stars
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
                
                // Update rating text
                ratingText.textContent = getRatingText(value);
                
                // Update rating data
                ratingData[category] = value;
            });
        });
    });
}

// Get rating category from star group
function getRatingCategory(starGroup) {
    const label = starGroup.previousElementSibling.textContent;
    if (label.includes('Kiến thức')) return 'knowledge';
    if (label.includes('Phương pháp')) return 'method';
    if (label.includes('Thái độ')) return 'attitude';
    if (label.includes('Hiệu quả')) return 'effectiveness';
    return 'knowledge';
}

// Get rating text
function getRatingText(rating) {
    const texts = {
        1: 'Rất không hài lòng',
        2: 'Không hài lòng',
        3: 'Bình thường',
        4: 'Hài lòng',
        5: 'Rất hài lòng'
    };
    return texts[rating] || 'Chưa đánh giá';
}

// Submit rating
function submitRating() {
    const feedback = document.getElementById('ratingFeedback').value.trim();
    ratingData.feedback = feedback;
    
    // Check if all ratings are provided
    const totalRating = ratingData.knowledge + ratingData.method + ratingData.attitude + ratingData.effectiveness;
    
    if (totalRating === 0) {
        alert('Vui lòng đánh giá ít nhất một tiêu chí!');
        return;
    }
    
    // Calculate average rating
    const averageRating = totalRating / 4;
    
    // Simulate API call
    console.log('Submitting rating:', ratingData);
    
    // Show success message
    alert(`Cảm ơn bạn đã đánh giá!\n\nĐiểm trung bình: ${averageRating.toFixed(1)}/5.0\n\nĐánh giá của bạn sẽ giúp gia sư cải thiện chất lượng dạy học.`);
    
    // Close rating modal
    closeModal('rating');
    
    // Reset session data
    currentSession = null;
    sessionStartTime = null;
    timeWarningShown = false;
}

// Skip rating
function skipRating() {
    if (confirm('Bạn có chắc chắn muốn bỏ qua đánh giá?')) {
        closeModal('rating');
        currentSession = null;
        sessionStartTime = null;
        timeWarningShown = false;
    }
}

// Update endSession function
function endSession() {
    if (confirm('Bạn có chắc chắn muốn kết thúc buổi học?')) {
        stopSessionTimer();
        
        if (currentSession) {
            const duration = new Date() - sessionStartTime;
            const hours = Math.floor(duration / (1000 * 60 * 60));
            const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
            
            addChatMessage('system', `Buổi học "${currentSession.title}" đã kết thúc. Thời gian: ${hours}h ${minutes}m`);
            
            // Show summary and rating modal
            setTimeout(() => {
                alert(`Buổi học đã kết thúc!\n\nKhóa học: ${currentSession.title}\nHọc viên: ${currentSession.student.name}\nThời gian: ${hours}h ${minutes}m\n\nCảm ơn bạn đã dạy học!`);
                closeModal('teachingRoom');
                showRatingModal();
            }, 1000);
        }
    }
}

// View course details
function viewCourseDetails(courseId) {
    const course = sampleCourses.find(c => c.id === courseId);
    if (!course) return;
    
    alert(`Chi tiết khóa học:\n
Tên khóa học: ${course.title}
Môn học: ${course.subject}
Học viên: ${course.student.name}
Lịch học: ${course.schedule.day} ${course.schedule.time}
Thời gian khóa học: ${course.coursePeriod.startDateFormatted} - ${course.coursePeriod.endDateFormatted}
Hình thức: Miễn phí`);
}

// Filter history
function filterHistory() {
    const searchTerm = document.getElementById('historySearch').value.toLowerCase();
    const subjectFilter = document.getElementById('historySubjectFilter').value;
    const statusFilter = document.getElementById('historyStatusFilter').value;
    
    const filteredHistory = sampleHistory.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
                             item.student.toLowerCase().includes(searchTerm);
        const matchesSubject = !subjectFilter || item.subject.toLowerCase() === subjectFilter;
        const matchesStatus = !statusFilter || item.status === statusFilter;
        
        return matchesSearch && matchesSubject && matchesStatus;
    });
    
    // Update history display
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = filteredHistory.map(item => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-date">${formatDate(item.date)}</div>
                <div class="history-details">
                    <h4>${item.title}</h4>
                    <p>Học viên: ${item.student} | ${item.time}</p>
                </div>
            </div>
            <div class="history-status ${item.status}">
                ${item.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
            </div>
        </div>
    `).join('');
}

// Calendar navigation
function previousWeek() {
    currentWeek = addDays(currentWeek, -7);
    generateCalendar();
}

function nextWeek() {
    currentWeek = addDays(currentWeek, 7);
    generateCalendar();
}

function switchView(view) {
    currentView = view;
    
    // Update active button
    document.querySelectorAll('.view-options .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Regenerate calendar
    generateCalendar();
}

// Utility functions
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toISOString().split('T')[0];
}

function formatPrice(price) {
    return 'Miễn phí';
}

function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function formatDateForDisplay(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Navigation functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function editProfile() {
    alert('Chức năng chỉnh sửa hồ sơ sẽ được phát triển trong phiên bản tiếp theo.');
}

function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        // Redirect to main page
        window.location.href = 'index.html';
    }
}

// Update subjects based on faculty selection
function updateSubjects() {
    const facultySelect = document.getElementById('tutorFaculty');
    const subjectsContainer = document.getElementById('subjectsContainer');
    const selectedFaculty = facultySelect.value;
    
    if (!selectedFaculty) {
        subjectsContainer.innerHTML = '<p class="no-subjects">Vui lòng chọn khoa chuyên ngành trước</p>';
        return;
    }
    
    const faculty = facultySubjects[selectedFaculty];
    if (!faculty) return;
    
    let subjectsHTML = '';
    faculty.subjects.forEach(subject => {
        subjectsHTML += `
            <label class="checkbox-item">
                <input type="checkbox" value="${subject.value}">
                <span>${subject.label}</span>
            </label>
        `;
    });
    
    subjectsContainer.innerHTML = subjectsHTML;
}

// Handle file upload
function handleFileUpload(input, listId) {
    const files = Array.from(input.files);
    const fileList = document.getElementById(listId);
    
    files.forEach(file => {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            showFileError(`File ${file.name} quá lớn (tối đa 5MB)`);
            return;
        }
        
        // Validate file type
        const allowedTypes = listId === 'certificateList' 
            ? ['.pdf', '.jpg', '.jpeg', '.png']
            : ['.jpg', '.jpeg', '.png'];
        
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            showFileError(`File ${file.name} không được hỗ trợ`);
            return;
        }
        
        addFileToList(file, listId);
    });
    
    // Clear input
    input.value = '';
}

// Add file to list
function addFileToList(file, listId) {
    const fileList = document.getElementById(listId);
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileIcon = getFileIcon(file.name);
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <i class="fas ${fileIcon} file-icon ${getFileTypeClass(file.name)}"></i>
        <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${fileSize}</div>
        </div>
        <button class="file-remove" onclick="removeFile(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    fileList.appendChild(fileItem);
}

// Get file icon
function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf': return 'fa-file-pdf';
        case 'jpg':
        case 'jpeg':
        case 'png': return 'fa-file-image';
        default: return 'fa-file';
    }
}

// Get file type class
function getFileTypeClass(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf': return 'pdf';
        case 'jpg':
        case 'jpeg':
        case 'png': return 'image';
        default: return 'document';
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Remove file from list
function removeFile(button) {
    button.parentElement.remove();
}

// Show file error
function showFileError(message) {
    // Create temporary error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'file-error';
    errorDiv.textContent = message;
    
    // Add to page and remove after 3 seconds
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Add CSS for calendar
const calendarStyles = `
    .calendar-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 20px;
        margin: 20px 0;
    }
    
    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
    }
    
    .calendar-day {
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .calendar-day:hover {
        background-color: #f0f0f0;
    }
    
    .calendar-day.today {
        background-color: #007bff;
        color: white;
    }
    
    .calendar-day.has-schedule {
        background-color: #28a745;
        color: white;
    }
`;