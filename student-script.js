// Student Interface JavaScript with Tutor Registration

// Global variables
let currentUser = {
    name: 'Nguyễn Văn A',
    email: 'student@vanlang.edu.vn',
    role: 'student'
};

let currentCourses = [];
let completedCourses = [];
let availableCourses = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserData();
    displayDashboard();
});

// Initialize application
function initializeApp() {
    loadSampleData();
    document.getElementById('userName').textContent = currentUser.name;
    showSection('dashboard');
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('href').substring(1);
            showSection(section);
            updateActiveNav(e.target);
        });
    });

    const courseSearch = document.getElementById('courseSearch');
    const tutorSearch = document.getElementById('tutorSearch');
    const subjectFilter = document.getElementById('subjectFilter');
    
    if (courseSearch) {
        courseSearch.addEventListener('input', debounce(handleCourseSearch, 300));
    }
    if (tutorSearch) {
        tutorSearch.addEventListener('input', debounce(handleTutorSearch, 300));
    }
    if (subjectFilter) {
        subjectFilter.addEventListener('change', handleCourseFilter);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterHistory(e.target.dataset.filter);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Tutor registration form submission
    const tutorRegisterForm = document.getElementById('tutorRegisterForm');
    if (tutorRegisterForm) {
        tutorRegisterForm.addEventListener('submit', handleTutorRegistration);
    }
}

// Load sample data
function loadSampleData() {
    availableCourses = [
        {
            id: 1,
            title: 'Toán học cơ bản',
            subject: 'toan',
            subjectName: 'Toán học',
            tutor: 'Nguyễn Văn B',
            rating: 4.8,
            students: 15,
            sessions: 12,
            description: 'Khóa học toán học cơ bản dành cho sinh viên năm nhất',
            schedule: 'Thứ 2, 4, 6 - 14:00-16:00',
            price: 'Miễn phí cho sinh viên VLU',
            startDate: '2024-07-01',
            endDate: '2024-08-01',
            meetingUrl: 'https://zoom.us/j/123456789'
        },
        {
            id: 2,
            title: 'Vật lý đại cương',
            subject: 'ly',
            subjectName: 'Vật lý',
            tutor: 'Trần Thị C',
            rating: 4.6,
            students: 12,
            sessions: 10,
            description: 'Khóa học vật lý đại cương với thí nghiệm thực hành',
            schedule: 'Thứ 3, 5 - 15:00-17:00',
            price: 'Miễn phí cho sinh viên VLU',
            startDate: '2024-07-05',
            endDate: '2024-08-10',
            meetingUrl: 'https://meet.google.com/abc-defg-hij'
        },
        {
            id: 3,
            title: 'Tiếng Anh giao tiếp',
            subject: 'anh',
            subjectName: 'Tiếng Anh',
            tutor: 'Lê Văn D',
            rating: 4.9,
            students: 20,
            sessions: 15,
            description: 'Khóa học tiếng Anh giao tiếp cơ bản',
            schedule: 'Thứ 2, 3, 5 - 18:00-19:30',
            price: 'Miễn phí cho sinh viên VLU',
            startDate: '2024-07-10',
            endDate: '2024-08-20',
            meetingUrl: 'https://teams.microsoft.com/l/meetup-join/1234567890'
        },
        {
            id: 4,
            title: 'Lập trình Python',
            subject: 'tin',
            subjectName: 'Tin học',
            tutor: 'Phạm Thị E',
            rating: 4.7,
            students: 18,
            sessions: 14,
            description: 'Khóa học lập trình Python từ cơ bản đến nâng cao',
            schedule: 'Thứ 4, 6 - 16:00-18:00',
            price: 'Miễn phí cho sinh viên VLU',
            startDate: '2024-07-15',
            endDate: '2024-08-25',
            meetingUrl: 'https://zoom.us/j/987654321'
        }
    ];

    currentCourses = [
        {
            id: 1,
            title: 'Toán học cơ bản',
            subject: 'Toán học',
            tutor: 'Nguyễn Văn B',
            progress: 75,
            nextSession: '2024-07-16 14:00',
            totalSessions: 12,
            completedSessions: 9,
            startDate: '2024-07-01',
            endDate: '2024-08-01',
            meetingUrl: 'https://zoom.us/j/123456789'
        }
    ];

    completedCourses = [
        {
            id: 5,
            title: 'Hóa học đại cương',
            subject: 'Hóa học',
            tutor: 'Hoàng Văn F',
            completedDate: '2023-12-20',
            totalSessions: 10,
            attendance: 9,
            finalGrade: 'A',
            tutorRating: 4.5,
            startDate: '2023-11-01',
            endDate: '2023-12-20',
            meetingUrl: 'https://zoom.us/j/555555555'
        }
    ];
}

// Load user data
function loadUserData() {
    updateStats();
    displayCurrentCourses();
    displayHistory();
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    switch(sectionId) {
        case 'dashboard':
            displayDashboard();
            break;
        case 'courses':
            displayAvailableCourses();
            break;
        case 'profile':
            displayProfile();
            break;
        case 'history':
            displayHistory();
            break;
        case 'tutor-register':
            displayTutorRegister();
            break;
    }
}

// Update active navigation
function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Display dashboard
function displayDashboard() {
    updateStats();
    displayTodayClasses();
}

// Update statistics
function updateStats() {
    document.getElementById('activeCourses').textContent = currentCourses.length;
    document.getElementById('completedCourses').textContent = completedCourses.length;
    
    const totalHours = completedCourses.reduce((sum, course) => sum + course.totalSessions * 2, 0);
    document.getElementById('totalHours').textContent = totalHours;
    
    const avgRating = completedCourses.length > 0 
        ? (completedCourses.reduce((sum, course) => sum + course.tutorRating, 0) / completedCourses.length).toFixed(1)
        : '0.0';
    document.getElementById('averageRating').textContent = avgRating;
}

// Display today's classes
function displayTodayClasses() {
    const todayClassesList = document.getElementById('todayClassesList');
    const today = new Date();
    const todayClasses = currentCourses.filter(course => {
        const nextSession = new Date(course.nextSession);
        return nextSession.toDateString() === today.toDateString();
    });

    if (todayClasses.length === 0) {
        todayClassesList.innerHTML = `
            <div class="no-classes">
                <i class="fas fa-calendar-times"></i>
                <p>Không có lớp học nào hôm nay</p>
            </div>
        `;
    } else {
        todayClassesList.innerHTML = todayClasses.map(course => `
            <div class="class-item">
                <div class="class-info">
                    <h4>${course.title}</h4>
                    <p>Gia sư: ${course.tutor} | Thời gian: ${formatTime(course.nextSession)}</p>
                </div>
                <div class="class-actions">
                    <button class="btn btn-primary" onclick="joinClassSession(${course.id})">
                        <i class="fas fa-play"></i>
                        Vào lớp
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Display available courses
function displayAvailableCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = availableCourses.map(course => `
        <div class="course-card">
            <div class="course-image">
                <i class="fas fa-${getSubjectIcon(course.subject)}"></i>
            </div>
            <div class="course-content">
                <div class="course-header">
                    <div>
                        <h3 class="course-title">${course.title}</h3>
                        <span class="course-subject">${course.subjectName}</span>
                    </div>
                </div>
                <p class="course-tutor">Gia sư: ${course.tutor}</p>
                <div class="course-details">
                    <div class="course-rating">
                        <i class="fas fa-star"></i>
                        <span>${course.rating}</span>
                    </div>
                    <span>${course.sessions} buổi học</span>
                    <span>Bắt đầu: ${course.startDate} - Kết thúc: ${course.endDate}</span>
                </div>
                <div class="course-actions">
                    <button class="btn btn-secondary" onclick="viewCourseDetail(${course.id})">
                        <i class="fas fa-eye"></i>
                        Chi tiết
                    </button>
                    <button class="btn btn-primary" onclick="joinCourse(${course.id})">
                        <i class="fas fa-plus"></i>
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Display current courses in profile
function displayCurrentCourses() {
    const currentCoursesList = document.getElementById('currentCoursesList');
    if (currentCourses.length === 0) {
        currentCoursesList.innerHTML = `
            <div class="no-classes">
                <i class="fas fa-book-open"></i>
                <p>Bạn chưa tham gia khóa học nào</p>
            </div>
        `;
    } else {
        currentCoursesList.innerHTML = currentCourses.map(course => {
            let cancelBtn = '';
            if (course.registeredAt) {
                const now = new Date();
                const registered = new Date(course.registeredAt);
                const diffMs = now - registered;
                const diffHours = diffMs / (1000 * 60 * 60);
                if (diffHours <= 12) {
                    cancelBtn = `<button class="btn btn-danger" onclick="cancelCourse(${course.id})"><i class='fas fa-times'></i> Hủy khóa học</button>`;
                }
            }
            return `
            <div class="course-item">
                <div class="course-info">
                    <h4>${course.title}</h4>
                    <p>Gia sư: ${course.tutor} | Tiến độ: ${course.progress}%</p>
                    <p>Thời gian: ${course.startDate} - ${course.endDate}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="goToMeeting('${course.meetingUrl}')"><i class="fas fa-play"></i> Vào lớp</button>
                    ${cancelBtn}
                </div>
            </div>
            `;
        }).join('');
    }
}

// Display history
function displayHistory() {
    const historyList = document.getElementById('historyList');
    if (completedCourses.length === 0) {
        historyList.innerHTML = `
            <div class="no-classes">
                <i class="fas fa-history"></i>
                <p>Chưa có khóa học nào hoàn thành</p>
            </div>
        `;
    } else {
        historyList.innerHTML = completedCourses.map(course => `
            <div class="history-item">
                <div class="history-header">
                    <h4 class="history-title">${course.title}</h4>
                    <span class="history-status completed">Đã hoàn thành</span>
                </div>
                <div class="history-details">
                    <p><strong>Gia sư:</strong> ${course.tutor}</p>
                    <p><strong>Ngày hoàn thành:</strong> ${formatDate(course.completedDate)}</p>
                    <p><strong>Thời gian khóa học:</strong> ${course.startDate} - ${course.endDate}</p>
                    <p><strong>Tổng số buổi:</strong> ${course.totalSessions || course.sessions}</p>
                    <p><strong>Điểm danh:</strong> ${course.attendance || '-'} / ${course.totalSessions || course.sessions}</p>
                    <p><strong>Điểm cuối khóa:</strong> ${course.finalGrade || '-'}</p>
                    <p><strong>Đánh giá gia sư:</strong> ${course.tutorRating || '-'} / 5.0</p>
                </div>
            </div>
        `).join('');
    }
}

// Display profile
function displayProfile() {
    displayCurrentCourses();
}

// Display tutor registration form
function displayTutorRegister() {
    // No additional content to load, form is static in HTML
}

// Handle course search
function handleCourseSearch() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const filteredCourses = availableCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.tutor.toLowerCase().includes(searchTerm) ||
        course.subjectName.toLowerCase().includes(searchTerm)
    );
    displayFilteredCourses(filteredCourses);
}

// Handle course filter
function handleCourseFilter() {
    const selectedSubject = document.getElementById('subjectFilter').value;
    let filteredCourses = availableCourses;
    
    if (selectedSubject) {
        filteredCourses = availableCourses.filter(course => course.subject === selectedSubject);
    }
    
    displayFilteredCourses(filteredCourses);
}

// Handle tutor search
function handleTutorSearch() {
    const tutorTerm = document.getElementById('tutorSearch').value.toLowerCase();
    const filteredCourses = availableCourses.filter(course =>
        course.tutor.toLowerCase().includes(tutorTerm)
    );
    displayFilteredCourses(filteredCourses);
}

// Display filtered courses
function displayFilteredCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-classes" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <p>Không tìm thấy khóa học phù hợp</p>
            </div>
        `;
    } else {
        coursesGrid.innerHTML = courses.map(course => `
            <div class="course-card">
                <div class="course-image">
                    <i class="fas fa-${getSubjectIcon(course.subject)}"></i>
                </div>
                <div class="course-content">
                    <div class="course-header">
                        <div>
                            <h3 class="course-title">${course.title}</h3>
                            <span class="course-subject">${course.subjectName}</span>
                        </div>
                    </div>
                    <p class="course-tutor">Gia sư: ${course.tutor}</p>
                    <div class="course-details">
                        <div class="course-rating">
                            <i class="fas fa-star"></i>
                            <span>${course.rating}</span>
                        </div>
                        <span>${course.sessions} buổi học</span>
                        <span>Bắt đầu: ${course.startDate} - Kết thúc: ${course.endDate}</span>
                    </div>
                    <div class="course-actions">
                        <button class="btn btn-secondary" onclick="viewCourseDetail(${course.id})">
                            <i class="fas fa-eye"></i>
                            Chi tiết
                        </button>
                        <button class="btn btn-primary" onclick="joinCourse(${course.id})">
                            <i class="fas fa-plus"></i>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Filter history
function filterHistory(filter) {
    let filteredHistory = completedCourses;
    
    if (filter === 'completed') {
        filteredHistory = completedCourses.filter(course => course.status === 'completed');
    } else if (filter === 'cancelled') {
        filteredHistory = completedCourses.filter(course => course.status === 'cancelled');
    }
    
    displayHistory();
}

// View course detail
function viewCourseDetail(courseId) {
    const course = availableCourses.find(c => c.id === courseId);
    if (!course) return;
    const certificates = course.certificates || [
        { name: 'Chứng chỉ Toán nâng cao.pdf', url: '#' },
        { name: 'Chứng chỉ Sư phạm.png', url: '#' }
    ];
    const awards = course.awards || [
        { name: 'Khen thưởng Olympic Toán.jpg', url: '#' }
    ];
    document.getElementById('modalCourseTitle').textContent = course.title;
    document.getElementById('modalCourseContent').innerHTML = `
        <div class="course-detail-content">
            <div class="detail-section">
                <h4>Thông tin khóa học</h4>
                <p><strong>Môn học:</strong> ${course.subjectName}</p>
                <p><strong>Gia sư:</strong> ${course.tutor}</p>
                <p><strong>Mô tả:</strong> ${course.description}</p>
                <p><strong>Lịch học:</strong> ${course.schedule}</p>
                <p><strong>Số buổi học:</strong> ${course.sessions}</p>
                <p><strong>Thời gian khóa học:</strong> ${course.startDate} - ${course.endDate}</p>
                <p><strong>Đánh giá:</strong> ${course.rating}/5.0</p>
                <p><strong>Học phí:</strong> ${course.price}</p>
            </div>
            <div class="detail-section">
                <h4>Chứng chỉ gia sư</h4>
                <ul class="file-list">
                    ${certificates.map(f => `<li><a href='${f.url}' target='_blank'><i class='fas fa-file'></i> ${f.name}</a></li>`).join('')}
                </ul>
                <h4>Ảnh khen thưởng</h4>
                <ul class="file-list">
                    ${awards.map(f => `<li><a href='${f.url}' target='_blank'><i class='fas fa-image'></i> ${f.name}</a></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    document.getElementById('joinCourseBtn').setAttribute('onclick', `joinCourse(${course.id})`);
    openModal('courseDetail');
}

// Join course
function joinCourse(courseId) {
    const course = availableCourses.find(c => c.id === courseId);
    if (!course) return;
    
    showMessage('Đang đăng ký khóa học...', 'info');
    
    setTimeout(() => {
        const newCourse = {
            id: course.id,
            title: course.title,
            subject: course.subjectName,
            tutor: course.tutor,
            progress: 0,
            nextSession: getNextSessionTime(),
            totalSessions: course.sessions,
            completedSessions: 0,
            registeredAt: new Date().toISOString(),
            startDate: course.startDate,
            endDate: course.endDate,
            meetingUrl: course.meetingUrl
        };
        
        currentCourses.push(newCourse);
        availableCourses = availableCourses.filter(c => c.id !== courseId);
        
        showMessage('Đăng ký khóa học thành công!', 'success');
        closeModal('courseDetail');
        
        updateStats();
        displayAvailableCourses();
        displayCurrentCourses();

        setTimeout(() => {
            joinClassSession(newCourse.id);
        }, 500);
    }, 2000);
}

// Join class session
function joinClassSession(courseId) {
    const course = currentCourses.find(c => c.id === courseId);
    if (!course) return;
    
    document.getElementById('sessionTitle').textContent = course.title;
    document.getElementById('sessionTutor').textContent = course.tutor;
    document.getElementById('sessionSubject').textContent = course.subject;
    document.getElementById('sessionTime').textContent = formatTime(course.nextSession);
    document.getElementById('sessionContent').textContent = 'Nội dung bài học sẽ được gia sư cung cấp';
    
    openModal('classSession');
}

// Start session
function startSession() {
    const statusIndicator = document.getElementById('sessionStatus');
    const startBtn = document.getElementById('startSessionBtn');
    const endBtn = document.getElementById('endSessionBtn');
    
    statusIndicator.innerHTML = '<i class="fas fa-play-circle"></i><span>Đang học</span>';
    statusIndicator.className = 'status-indicator active';
    
    startBtn.style.display = 'none';
    endBtn.style.display = 'inline-flex';
    
    showMessage('Buổi học đã bắt đầu!', 'success');
}

// End session
function endSession() {
    const statusIndicator = document.getElementById('sessionStatus');
    const startBtn = document.getElementById('startSessionBtn');
    const endBtn = document.getElementById('endSessionBtn');
    
    statusIndicator.innerHTML = '<i class="fas fa-check-circle"></i><span>Đã hoàn thành</span>';
    statusIndicator.className = 'status-indicator completed';
    
    startBtn.style.display = 'inline-flex';
    endBtn.style.display = 'none';
    
    showMessage('Buổi học đã kết thúc! Vui lòng đánh giá buổi học.', 'success');
    
    setTimeout(() => {
        const rating = prompt('Đánh giá buổi học (1-5 sao):');
        if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
            showMessage(`Cảm ơn bạn đã đánh giá ${rating} sao!`, 'success');
        }
    }, 1000);
}

// Cancel course
function cancelCourse(courseId) {
    const course = currentCourses.find(c => c.id === courseId);
    if (!course) return;
    
    if (confirm('Bạn có chắc muốn hủy khóa học này?')) {
        showMessage('Đang hủy khóa học...', 'info');
        
        setTimeout(() => {
            currentCourses = currentCourses.filter(c => c.id !== courseId);
            availableCourses.push({
                id: course.id,
                title: course.title,
                subject: course.subject.toLowerCase(),
                subjectName: course.subject,
                tutor: course.tutor,
                rating: 4.5,
                students: 0,
                sessions: course.totalSessions,
                description: `Khóa học ${course.subject.toLowerCase()} cơ bản`,
                schedule: 'Thứ 2, 4, 6 - 14:00-16:00',
                price: 'Miễn phí cho sinh viên VLU',
                startDate: course.startDate,
                endDate: course.endDate,
                meetingUrl: course.meetingUrl
            });
            
            showMessage('Hủy khóa học thành công!', 'success');
            updateStats();
            displayAvailableCourses();
            displayCurrentCourses();
        }, 2000);
    }
}

// Handle tutor registration
function handleTutorRegistration(e) {
    e.preventDefault();
    
    const subject = document.getElementById('tutorSubject').value;
    const experience = document.getElementById('tutorExperience').value;
    const qualifications = document.getElementById('tutorQualifications').value;
    const schedule = document.getElementById('tutorSchedule').value;
    const certificates = document.getElementById('tutorCertificates').files;
    
    if (!subject || !experience || !qualifications || !schedule) {
        showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    // Simulate file validation
    const validFileTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    for (let file of certificates) {
        if (!validFileTypes.includes(file.type)) {
            showMessage('Chỉ chấp nhận file PDF, PNG hoặc JPEG', 'error');
            return;
        }
    }
    
    showMessage('Đang gửi yêu cầu đăng ký gia sư...', 'info');
    
    setTimeout(() => {
        // Update user role (in a real app, this would be sent to a server)
        currentUser.role = 'tutor';
        currentUser.tutorInfo = {
            subject,
            experience,
            qualifications,
            schedule,
            certificates: Array.from(certificates).map(file => ({
                name: file.name,
                url: '#' // In a real app, this would be a server-uploaded URL
            }))
        };
        
        showMessage('Đăng ký làm gia sư thành công! Đang chờ phê duyệt.', 'success');
        closeModal('tutorRegister');
        
        // Update UI to reflect tutor status
        document.getElementById('userName').textContent = `${currentUser.name} (Gia sư)`;
    }, 2000);
}

// Update profile
function updateProfile() {
    const studentId = document.getElementById('profileStudentId').value;
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const phone = document.getElementById('profilePhone').value;
    const faculty = document.getElementById('profileFaculty').value;
    
    if (!studentId || !name || !email || !phone || !faculty) {
        showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    currentUser.studentId = studentId;
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.faculty = faculty;
    
    document.getElementById('userName').textContent = name;
    
    showMessage('Cập nhật thông tin thành công!', 'success');
}

// Logout
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        currentUser = null;
        currentCourses = [];
        window.location.href = 'index.html';
    }
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Utility functions
function getSubjectIcon(subject) {
    const icons = {
        'toan': 'calculator',
        'ly': 'atom',
        'hoa': 'flask',
        'van': 'book',
        'anh': 'language',
        'tin': 'laptop-code'
    };
    return icons[subject] || 'book';
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function getNextSessionTime() {
    const now = new Date();
    const nextSession = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    nextSession.setHours(14, 0, 0, 0);
    return nextSession.toISOString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Message system
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    const colors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#4299e1'
    };
    
    messageDiv.style.background = colors[type] || colors.info;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    messageDiv.innerHTML = `
        <i class="fas fa-${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: auto;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Go to meeting
function goToMeeting(url) {
    window.open(url, '_blank');
}