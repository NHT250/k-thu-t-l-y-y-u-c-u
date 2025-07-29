// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal Management
function openModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(`${type}Modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(from, to) {
    closeModal(from);
    openModal(to);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Student Verification
function verifyStudent() {
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    
    if (!studentId || !studentName) {
        showMessage('Vui lòng nhập đầy đủ thông tin sinh viên', 'error');
        return;
    }
    
    // Simulate verification process
    showMessage('Đang xác minh thông tin sinh viên...', 'info');
    
    setTimeout(() => {
        if (studentId.length >= 8 && studentName.length >= 2) {
            showMessage('Xác minh thành công! Bạn có thể sử dụng dịch vụ miễn phí.', 'success');
            closeModal('verify');
            // Update UI to show verified status
            updateVerifiedStatus();
        } else {
            showMessage('Thông tin sinh viên không hợp lệ. Vui lòng kiểm tra lại.', 'error');
        }
    }, 2000);
}

function updateVerifiedStatus() {
    const banner = document.querySelector('.free-banner');
    if (banner) {
        banner.innerHTML = `
            <div class="container">
                <i class="fas fa-check-circle"></i>
                <span><strong>Đã xác minh!</strong> Bạn có thể sử dụng dịch vụ miễn phí</span>
                <span class="verified-badge">✓ Sinh viên VLU</span>
            </div>
        `;
        banner.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    }
}

// Tutor Data
const tutorsData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        subject: "Gia sư Toán - Khoa CNTT",
        rating: 5.0,
        reviews: 15,
        subjects: ["Toán", "Lý", "Hóa"],
        description: "Chuyên gia sư môn Toán, có kinh nghiệm 2 năm. Phương pháp dạy hiệu quả, dễ hiểu.",
        experience: "2 năm",
        avatar: "A",
        isFree: true
    },
    {
        id: 2,
        name: "Trần Thị B",
        subject: "Gia sư Tiếng Anh - Khoa Ngoại ngữ",
        rating: 4.8,
        reviews: 12,
        subjects: ["Tiếng Anh", "Tiếng Việt"],
        description: "Sinh viên năm 3 khoa Ngoại ngữ, có chứng chỉ IELTS 7.5. Phương pháp dạy thú vị, tương tác cao.",
        experience: "1.5 năm",
        avatar: "B",
        isFree: true
    },
    {
        id: 3,
        name: "Lê Văn C",
        subject: "Gia sư Vật Lý - Khoa Kỹ thuật",
        rating: 4.9,
        reviews: 18,
        subjects: ["Vật Lý", "Toán", "Hóa"],
        description: "Sinh viên xuất sắc khoa Kỹ thuật, có kinh nghiệm gia sư từ năm nhất. Giải thích rõ ràng, dễ hiểu.",
        experience: "2.5 năm",
        avatar: "C",
        isFree: true
    },
    {
        id: 4,
        name: "Phạm Thị D",
        subject: "Gia sư Hóa học - Khoa Khoa học",
        rating: 4.7,
        reviews: 10,
        subjects: ["Hóa học", "Sinh học"],
        description: "Sinh viên khoa Khoa học, đam mê hóa học. Có phương pháp dạy thực hành và lý thuyết kết hợp.",
        experience: "1 năm",
        avatar: "D",
        isFree: true
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        subject: "Gia sư Lập trình - Khoa CNTT",
        rating: 5.0,
        reviews: 20,
        subjects: ["Lập trình", "Toán", "Logic"],
        description: "Sinh viên xuất sắc khoa CNTT, có kinh nghiệm lập trình web và mobile. Dạy từ cơ bản đến nâng cao.",
        experience: "3 năm",
        avatar: "E",
        isFree: true
    },
    {
        id: 6,
        name: "Ngô Thị F",
        subject: "Gia sư Văn học - Khoa Xã hội",
        rating: 4.6,
        reviews: 8,
        subjects: ["Văn học", "Lịch sử", "Địa lý"],
        description: "Sinh viên khoa Xã hội, yêu thích văn học. Phương pháp dạy sáng tạo, giúp học sinh hiểu sâu.",
        experience: "1 năm",
        avatar: "F",
        isFree: true
    }
];

let currentTutors = [...tutorsData];
let displayedTutors = 6;

// DOM Elements
const tutorsGrid = document.getElementById('tutorsGrid');
const searchInput = document.getElementById('searchInput');
const subjectFilter = document.getElementById('subjectFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayTutors();
    setupEventListeners();
});

function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', handleFilter);
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTutors);
    }
    
    // Form event listeners
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm('login');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm('register');
        });
    }
}

// Search and Filter Functions
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedSubject = subjectFilter.value;
    
    currentTutors = tutorsData.filter(tutor => {
        const matchesSearch = tutor.name.toLowerCase().includes(searchTerm) ||
                            tutor.subject.toLowerCase().includes(searchTerm) ||
                            tutor.description.toLowerCase().includes(searchTerm) ||
                            tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm));
        
        const matchesFilter = selectedSubject === '' || tutor.subjects.includes(selectedSubject);
        
        return matchesSearch && matchesFilter;
    });
    
    displayedTutors = 6;
    displayTutors();
    updateLoadMoreButton();
}

function handleFilter() {
    handleSearch();
}

function loadMoreTutors() {
    displayedTutors += 3;
    displayTutors();
    updateLoadMoreButton();
}

function updateLoadMoreButton() {
    if (loadMoreBtn) {
        if (displayedTutors >= currentTutors.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Display Functions
function createTutorCard(tutor) {
    return `
        <div class="tutor-card" data-id="${tutor.id}">
            <div class="tutor-image">
                <i class="fas fa-user"></i>
            </div>
            <div class="tutor-info">
                <h3 class="tutor-name">${tutor.name}</h3>
                <p class="tutor-subject">${tutor.subject}</p>
                <div class="tutor-rating">
                    ${generateStars(tutor.rating)}
                    <span>${tutor.rating} (${tutor.reviews} đánh giá)</span>
                </div>
                <div class="tutor-subjects">
                    ${tutor.subjects.map(subject => `<span class="tag">${subject}</span>`).join('')}
                </div>
                <p class="tutor-description">${tutor.description}</p>
                <div class="tutor-price-free">
                    <i class="fas fa-gift"></i>
                    <strong>Miễn phí cho sinh viên VLU</strong>
                </div>
                <button class="tutor-button" onclick="contactTutor(${tutor.id})">
                    <i class="fas fa-phone"></i>
                    Liên hệ
                </button>
            </div>
        </div>
    `;
}

function displayTutors(tutors = currentTutors) {
    const tutorsToShow = tutors.slice(0, displayedTutors);
    tutorsGrid.innerHTML = tutorsToShow.map(tutor => createTutorCard(tutor)).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Utility Functions
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

// Contact Functions
function contactTutor(tutorId) {
    const tutor = tutorsData.find(t => t.id === tutorId);
    if (tutor) {
        showMessage(`Đang kết nối với ${tutor.name}...`, 'info');
        setTimeout(() => {
            showMessage(`Đã gửi yêu cầu liên hệ đến ${tutor.name}. Gia sư sẽ phản hồi trong thời gian sớm nhất!`, 'success');
        }, 1500);
    }
}

// Form Submission
function submitForm(formType) {
    const form = document.getElementById(`${formType}Form`);
    const submitBtn = document.querySelector(`#${formType}Form .btn-primary`);
    const originalText = submitBtn.innerHTML;
    
    // Get form data
    const role = document.getElementById(`${formType}Role`).value;
    const email = document.getElementById(`${formType}Email`).value;
    const password = document.getElementById(`${formType}Password`).value;
    
    // Validate role selection
    if (!role) {
        showMessage('Vui lòng chọn vai trò của bạn', 'error');
        return;
    }
    
    // Validate other fields
    if (!email || !password) {
        showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }
    
    // Additional validation for registration
    if (formType === 'register') {
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (!name || !phone) {
            showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('Mật khẩu xác nhận không khớp', 'error');
            return;
        }
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        const roleNames = {
            'student': 'Học viên',
            'tutor': 'Gia sư',
            'support': 'Trung tâm hỗ trợ sinh viên'
        };
        
        const roleName = roleNames[role] || 'Người dùng';
        showMessage(`${formType === 'login' ? 'Đăng nhập' : 'Đăng ký'} thành công với vai trò ${roleName}!`, 'success');
        closeModal(formType);
        
        // Reset form and button
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect based on role for login
        if (formType === 'login') {
            setTimeout(() => {
                if (role === 'student') {
                    window.location.href = 'student-interface.html';
                } else if (role === 'tutor') {
                    window.location.href = 'tutor-interface.html';
                } else if (role === 'support') {
                    window.location.href = 'support-interface.html';
                }
            }, 1500);
        }
    }, 2000);
}

// Message System
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${getMessageIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

function getMessageIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 