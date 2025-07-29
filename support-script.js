// Global variables
let currentTab = 'pending';
let currentCourseTab = 'pending-courses';

// Sample data
const sampleApplications = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@vanlanguni.vn",
        phone: "0123 456 789",
        khoa: "Khoa Công nghệ Thông tin",
        year: "Năm 3",
        subjects: ["Toán", "Lý", "Hóa"],
        experience: "2 năm kinh nghiệm dạy kèm",
        status: "pending",
        submittedDate: "2024-01-15"
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@vanlanguni.vn",
        phone: "0987 654 321",
        khoa: "Khoa Kinh tế",
        year: "Năm 2",
        subjects: ["Toán", "Tiếng Anh"],
        experience: "1 năm kinh nghiệm gia sư",
        status: "pending",
        submittedDate: "2024-01-14"
    },
    {
        id: 3,
        name: "Lê Văn C",
        email: "levanc@vanlanguni.vn",
        phone: "0555 123 456",
        khoa: "Khoa Ngoại ngữ",
        year: "Năm 4",
        subjects: ["Tiếng Anh", "Tiếng Nhật"],
        experience: "3 năm kinh nghiệm dạy ngoại ngữ",
        status: "approved",
        submittedDate: "2024-01-10",
        approvedDate: "2024-01-12"
    }
];

const sampleCourses = [
    {
        id: 1,
        title: "Toán cơ bản cho sinh viên năm 1",
        description: "Khóa học cung cấp kiến thức toán cơ bản cho sinh viên mới",
        tutor: "Nguyễn Văn A",
        subject: "Toán",
        schedule: "Thứ 2, 4, 6 - 14:00-16:00",
        duration: "12 buổi",
        maxStudents: 5,
        status: "pending",
        submittedDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Luyện thi TOEIC",
        description: "Khóa học luyện thi TOEIC cho sinh viên",
        tutor: "Trần Thị B",
        subject: "Tiếng Anh",
        schedule: "Thứ 3, 5, 7 - 18:00-20:00",
        duration: "16 buổi",
        maxStudents: 8,
        status: "approved",
        submittedDate: "2024-01-12",
        approvedDate: "2024-01-14"
    }
];

const sampleInterviews = [
    {
        id: 1,
        applicantName: "Nguyễn Văn A",
        date: "2024-01-20",
        time: "15:00",
        type: "online",
        status: "scheduled",
        notes: "Phỏng vấn qua Zoom"
    },
    {
        id: 2,
        applicantName: "Trần Thị B",
        date: "2024-01-21",
        time: "14:00",
        type: "offline",
        status: "scheduled",
        notes: "Phỏng vấn tại văn phòng"
    }
];

const sampleHistory = [
    {
        id: 1,
        type: "tutor",
        name: "Nguyễn Văn A",
        action: "approved",
        date: "2024-01-12",
        time: "10:30"
    },
    {
        id: 2,
        type: "course",
        name: "Luyện thi TOEIC",
        action: "approved",
        date: "2024-01-14",
        time: "14:15"
    },
    {
        id: 3,
        type: "tutor",
        name: "Lê Văn C",
        action: "rejected",
        date: "2024-01-10",
        time: "16:45"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeOverview();
    loadPendingApplications();
    loadApprovedApplications();
    loadInterviewSchedule();
    loadPendingCourses();
    loadApprovedCourses();
    loadHistory();
    setupEventListeners();
});

// Initialize Overview
function initializeOverview() {
    updateStats();
}

// Update dashboard stats
function updateStats() {
    const totalTutors = sampleApplications.length;
    const approvedTutors = sampleApplications.filter(app => app.status === 'approved').length;
    const pendingTutors = sampleApplications.filter(app => app.status === 'pending').length;
    const totalCourses = sampleCourses.length;
    const pendingCourses = sampleCourses.filter(course => course.status === 'pending').length;
    const approvedCourses = sampleCourses.filter(course => course.status === 'approved').length;

    // Update stats in the DOM
    document.querySelector('.stat-card:nth-child(1) .stat-content h3').textContent = totalTutors;
    document.querySelector('.stat-card:nth-child(2) .stat-content h3').textContent = approvedTutors;
    document.querySelector('.stat-card:nth-child(3) .stat-content h3').textContent = pendingTutors;
    document.querySelector('.stat-card:nth-child(4) .stat-content h3').textContent = totalCourses;
    document.querySelector('.stat-card:nth-child(5) .stat-content h3').textContent = pendingCourses;
    document.querySelector('.stat-card:nth-child(6) .stat-content h3').textContent = approvedCourses;
}

// Load pending applications
function loadPendingApplications() {
    const pendingApplications = document.getElementById('pendingApplications');
    const pendingApps = sampleApplications.filter(app => app.status === 'pending');
    
    pendingApplications.innerHTML = pendingApps.map(app => `
        <div class="application-card">
            <div class="application-header">
                <div class="application-title">${app.name}</div>
                <span class="application-status pending">Chờ duyệt</span>
            </div>
            <div class="application-info">
                <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">${app.email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Khoa</span>
                    <span class="info-value">${app.khoa}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Môn học</span>
                    <span class="info-value">${app.subjects.join(', ')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày nộp</span>
                    <span class="info-value">${formatDate(app.submittedDate)}</span>
                </div>
            </div>
            <div class="application-actions">
                <button class="btn btn-primary btn-sm" onclick="viewApplicationDetail(${app.id})">
                    <i class="fas fa-eye"></i>
                    Xem chi tiết
                </button>
                <button class="btn btn-success btn-sm" onclick="scheduleInterview(${app.id})">
                    <i class="fas fa-calendar"></i>
                    Tạo lịch phỏng vấn
                </button>
                <button class="btn btn-outline btn-sm" onclick="approveApplication(${app.id})">
                    <i class="fas fa-check"></i>
                    Duyệt
                </button>
                <button class="btn btn-danger btn-sm" onclick="rejectApplication(${app.id})">
                    <i class="fas fa-times"></i>
                    Từ chối
                </button>
            </div>
        </div>
    `).join('');
}

// Load approved applications
function loadApprovedApplications() {
    const approvedApplications = document.getElementById('approvedApplications');
    const approvedApps = sampleApplications.filter(app => app.status === 'approved');
    
    approvedApplications.innerHTML = approvedApps.map(app => `
        <div class="application-card">
            <div class="application-header">
                <div class="application-title">${app.name}</div>
                <span class="application-status approved">Đã duyệt</span>
            </div>
            <div class="application-info">
                <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">${app.email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Khoa</span>
                    <span class="info-value">${app.khoa}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Môn học</span>
                    <span class="info-value">${app.subjects.join(', ')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày duyệt</span>
                    <span class="info-value">${formatDate(app.approvedDate)}</span>
                </div>
            </div>
            <div class="application-actions">
                <button class="btn btn-primary btn-sm" onclick="viewApplicationDetail(${app.id})">
                    <i class="fas fa-eye"></i>
                    Xem chi tiết
                </button>
            </div>
        </div>
    `).join('');
}

// Load interview schedule
function loadInterviewSchedule() {
    const interviewSchedule = document.getElementById('interviewSchedule');
    
    interviewSchedule.innerHTML = sampleInterviews.map(interview => `
        <div class="schedule-item">
            <div class="schedule-header">
                <div class="schedule-title">${interview.applicantName}</div>
                <div class="schedule-time">${interview.date} - ${interview.time}</div>
            </div>
            <div class="schedule-details">
                <div class="info-item">
                    <span class="info-label">Hình thức</span>
                    <span class="info-value">${interview.type === 'online' ? 'Online' : 'Offline'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Trạng thái</span>
                    <span class="info-value">Đã lên lịch</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ghi chú</span>
                    <span class="info-value">${interview.notes}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load pending courses
function loadPendingCourses() {
    const pendingCourses = document.getElementById('pendingCourses');
    const pendingCrs = sampleCourses.filter(course => course.status === 'pending');
    
    pendingCourses.innerHTML = pendingCrs.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div class="course-title">${course.title}</div>
                <span class="course-status pending">Chờ duyệt</span>
            </div>
            <div class="course-info">
                <div class="info-item">
                    <span class="info-label">Gia sư</span>
                    <span class="info-value">${course.tutor}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Môn học</span>
                    <span class="info-value">${course.subject}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Lịch học</span>
                    <span class="info-value">${course.schedule}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Thời lượng</span>
                    <span class="info-value">${course.duration}</span>
                </div>
            </div>
            <div class="course-actions">
                <button class="btn btn-primary btn-sm" onclick="viewCourseDetail(${course.id})">
                    <i class="fas fa-eye"></i>
                    Xem chi tiết
                </button>
                <button class="btn btn-success btn-sm" onclick="approveCourse(${course.id})">
                    <i class="fas fa-check"></i>
                    Duyệt
                </button>
                <button class="btn btn-danger btn-sm" onclick="rejectCourse(${course.id})">
                    <i class="fas fa-times"></i>
                    Từ chối
                </button>
            </div>
        </div>
    `).join('');
}

// Load approved courses
function loadApprovedCourses() {
    const approvedCourses = document.getElementById('approvedCourses');
    const approvedCrs = sampleCourses.filter(course => course.status === 'approved');
    
    approvedCourses.innerHTML = approvedCrs.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div class="course-title">${course.title}</div>
                <span class="course-status approved">Đã duyệt</span>
            </div>
            <div class="course-info">
                <div class="info-item">
                    <span class="info-label">Gia sư</span>
                    <span class="info-value">${course.tutor}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Môn học</span>
                    <span class="info-value">${course.subject}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Lịch học</span>
                    <span class="info-value">${course.schedule}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mã sinh viên</span>
                    <span class="info-value">${course.studentId ? course.studentId : 'VD123456'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Thời lượng</span>
                    <span class="info-value">${course.duration}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Số học viên tối đa</span>
                    <span class="info-value">${course.maxStudents}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày bắt đầu</span>
                    <span class="info-value">${course.startDate ? formatDate(course.startDate) : '01/01/2024'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày kết thúc</span>
                    <span class="info-value">${course.endDate ? formatDate(course.endDate) : '31/12/2024'}</span>
                </div>
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
                <h4>${item.type === 'tutor' ? 'Hồ sơ gia sư' : 'Khóa học'}: ${item.name}</h4>
                <p>${formatDate(item.date)} - ${item.time}</p>
            </div>
            <span class="history-status ${item.action}">
                ${item.action === 'approved' ? 'Đã duyệt' : 'Từ chối'}
            </span>
        </div>
    `).join('');
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
    document.getElementById('interviewForm').addEventListener('submit', handleInterviewForm);
    
    // Search and filters
    document.getElementById('historySearch').addEventListener('input', filterHistory);
    document.getElementById('historyTypeFilter').addEventListener('change', filterHistory);
    document.getElementById('historyStatusFilter').addEventListener('change', filterHistory);
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

// Switch tabs for tutor approval
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update active tab button
    document.querySelectorAll('.approval-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Switch tabs for course approval
function switchCourseTab(tabName) {
    currentCourseTab = tabName;
    
    // Update active tab button
    document.querySelectorAll('.course-approval-section .approval-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.course-approval-section .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target tab content
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// View application detail
function viewApplicationDetail(appId) {
    const app = sampleApplications.find(a => a.id === appId);
    if (!app) return;
    
    const detailContainer = document.getElementById('applicationDetail');
    detailContainer.innerHTML = `
        <div class="detail-section">
            <h4>Thông tin cá nhân</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Họ và tên</span>
                    <span class="detail-value">${app.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mã sinh viên</span>
                    <span class="detail-value">${app.studentId ? app.studentId : 'VD123456'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${app.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Số điện thoại</span>
                    <span class="detail-value">${app.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Khoa</span>
                    <span class="detail-value">${app.khoa}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Năm học</span>
                    <span class="detail-value">${app.year}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Môn học có thể dạy</span>
                    <span class="detail-value">${app.subjects.join(', ')}</span>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>Kinh nghiệm dạy học</h4>
            <p>${app.experience}</p>
        </div>
        <div class="detail-section">
            <h4>Chứng chỉ chuyên ngành</h4>
            <ul class="file-list">
                ${(app.certificates && app.certificates.length) ? app.certificates.map(f => `<li><a href='${f.url}' target='_blank'><i class='fas fa-file'></i> ${f.name}</a></li>`).join('') : '<li>Không có</li>'}
            </ul>
            <h4>Ảnh khen thưởng</h4>
            <ul class="file-list">
                ${(app.awards && app.awards.length) ? app.awards.map(f => `<li><a href='${f.url}' target='_blank'><i class='fas fa-image'></i> ${f.name}</a></li>`).join('') : '<li>Không có</li>'}
            </ul>
        </div>
        <div class="detail-section">
            <h4>Thông tin đăng ký</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Ngày nộp hồ sơ</span>
                    <span class="detail-value">${formatDate(app.submittedDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Trạng thái</span>
                    <span class="detail-value">${app.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}</span>
                </div>
            </div>
        </div>
    `;
    
    openModal('applicationModal');
}

// View course detail
function viewCourseDetail(courseId) {
    const course = sampleCourses.find(c => c.id === courseId);
    if (!course) return;
    
    const detailContainer = document.getElementById('courseDetail');
    detailContainer.innerHTML = `
        <div class="detail-section">
            <h4>Thông tin khóa học</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Tên khóa học</span>
                    <span class="detail-value">${course.title}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Gia sư</span>
                    <span class="detail-value">${course.tutor}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Môn học</span>
                    <span class="detail-value">${course.subject}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Lịch học</span>
                    <span class="detail-value">${course.schedule}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Thời lượng</span>
                    <span class="detail-value">${course.duration}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Số học viên tối đa</span>
                    <span class="detail-value">${course.maxStudents}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mã sinh viên</span>
                    <span class="detail-value">${course.studentId ? course.studentId : 'VD123456'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Ngày bắt đầu</span>
                    <span class="detail-value">${course.startDate ? formatDate(course.startDate) : '01/01/2024'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Ngày kết thúc</span>
                    <span class="detail-value">${course.endDate ? formatDate(course.endDate) : '31/12/2024'}</span>
                </div>
            </div>
        </div>
        <div class="detail-section">
            <h4>Mô tả khóa học</h4>
            <p>${course.description}</p>
        </div>
        <div class="detail-section">
            <h4>Thông tin duyệt</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Ngày nộp</span>
                    <span class="detail-value">${formatDate(course.submittedDate)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Trạng thái</span>
                    <span class="detail-value">${course.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}</span>
                </div>
            </div>
        </div>
    `;
    
    openModal('courseDetailModal');
}

// Schedule interview
function scheduleInterview(appId) {
    const app = sampleApplications.find(a => a.id === appId);
    if (!app) return;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('interviewDate').value = formatDate(tomorrow);
    
    openModal('interviewModal');
}

// Handle interview form submission
function handleInterviewForm(e) {
    e.preventDefault();
    
    const formData = {
        date: document.getElementById('interviewDate').value,
        time: document.getElementById('interviewTime').value,
        type: document.getElementById('interviewType').value,
        notes: document.getElementById('interviewNotes').value
    };
    
    // Validate required fields
    if (!formData.date || !formData.time || !formData.type) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        return;
    }
    
    // Simulate API call
    console.log('Creating interview schedule:', formData);
    
    // Show success message
    alert('Đã tạo lịch phỏng vấn thành công! Ứng viên sẽ nhận được thông báo.');
    
    // Close modal and reset form
    closeModal('interviewModal');
    e.target.reset();
}

// Approve application
function approveApplication(appId) {
    if (confirm('Bạn có chắc chắn muốn duyệt hồ sơ này?')) {
        // Simulate API call
        console.log('Approving application:', appId);
        
        // Show success message
        alert('Đã duyệt hồ sơ thành công! Gia sư sẽ nhận được thông báo.');
        
        // Reload data
        loadPendingApplications();
        loadApprovedApplications();
        updateStats();
    }
}

// Reject application
function rejectApplication(appId) {
    const reason = prompt('Nhập lý do từ chối:');
    if (reason) {
        // Simulate API call
        console.log('Rejecting application:', appId, 'Reason:', reason);
        
        // Show success message
        alert('Đã từ chối hồ sơ thành công! Gia sư sẽ nhận được thông báo.');
        
        // Reload data
        loadPendingApplications();
        updateStats();
    }
}

// Approve course
function approveCourse(courseId) {
    if (confirm('Bạn có chắc chắn muốn duyệt khóa học này?')) {
        // Simulate API call
        console.log('Approving course:', courseId);
        
        // Show success message
        alert('Đã duyệt khóa học thành công! Khóa học sẽ hiển thị cho học viên và gia sư sẽ nhận được thông báo.');
        
        // Reload data
        loadPendingCourses();
        loadApprovedCourses();
        updateStats();
    }
}

// Reject course
function rejectCourse(courseId) {
    const reason = prompt('Nhập lý do từ chối:');
    if (reason) {
        // Simulate API call
        console.log('Rejecting course:', courseId, 'Reason:', reason);
        
        // Show success message
        alert('Đã từ chối khóa học thành công! Gia sư sẽ nhận được thông báo.');
        
        // Reload data
        loadPendingCourses();
        updateStats();
    }
}

// Filter history
function filterHistory() {
    const searchTerm = document.getElementById('historySearch').value.toLowerCase();
    const typeFilter = document.getElementById('historyTypeFilter').value;
    const statusFilter = document.getElementById('historyStatusFilter').value;
    
    const filteredHistory = sampleHistory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesType = !typeFilter || item.type === typeFilter;
        const matchesStatus = !statusFilter || item.action === statusFilter;
        
        return matchesSearch && matchesType && matchesStatus;
    });
    
    // Update history display
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = filteredHistory.map(item => `
        <div class="history-item">
            <div class="history-info">
                <h4>${item.type === 'tutor' ? 'Hồ sơ gia sư' : 'Khóa học'}: ${item.name}</h4>
                <p>${formatDate(item.date)} - ${item.time}</p>
            </div>
            <span class="history-status ${item.action}">
                ${item.action === 'approved' ? 'Đã duyệt' : 'Từ chối'}
            </span>
        </div>
    `).join('');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        window.location.href = 'index.html';
    }
}