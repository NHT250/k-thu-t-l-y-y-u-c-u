# GiaSu Lang - Nền tảng kết nối gia sư sinh viên

## Giới thiệu

GiaSu Lang là một nền tảng số được phát triển bởi team 3bro, kết nối sinh viên có năng lực với những sinh viên cần hỗ trợ học tập tại Đại học Văn Lang. Dự án giải quyết vấn đề thiếu kết nối giữa gia sư tiềm năng và người học, giúp sinh viên tìm được gia sư phù hợp đồng thời tạo cơ hội cho những người khác chia sẻ kiến thức. **Tất cả khóa học và buổi dạy đều hoàn toàn miễn phí cho sinh viên Văn Lang.**

## Mục tiêu

- Tạo môi trường học tập chủ động, hiệu quả và **hoàn toàn miễn phí**
- Cung cấp công cụ cho phép sinh viên dễ dàng tìm kiếm gia sư, đặt lịch học và đánh giá chất lượng gia sư
- Kết nối trực tiếp giữa gia sư và học viên, không qua trung gian

## Phạm vi dự án

- Triển khai nội bộ tại Đại học Văn Lang
- Có sẵn trên cả nền tảng web và mobile
- Thời gian phát triển: 2 tháng
- Ngân sách: Tận dụng hiệu quả nguồn lực nội bộ của team 3bro

## Tính năng chính

### 🏠 Trang chủ
- Hero section với thông tin tổng quan về dự án
- Giới thiệu các tính năng nổi bật
- Thống kê về số lượng gia sư và buổi học

### 👨‍🏫 Tìm kiếm gia sư
- Tìm kiếm theo tên, môn học, mô tả
- Lọc theo môn học và mức giá
- Hiển thị thông tin chi tiết về gia sư
- Đánh giá và nhận xét từ học viên

### 📝 Đăng ký làm gia sư
- Form đăng ký với thông tin cá nhân
- Chọn vai trò (gia sư/học viên)
- Xác thực thông tin

### 👥 Quản lý tài khoản
- Đăng nhập/Đăng ký với 3 vai trò: Học viên, Gia sư, Trung tâm hỗ trợ sinh viên
- Quản lý thông tin cá nhân
- Lịch sử học tập

### 📞 Liên hệ
- Form liên hệ trực tiếp
- Thông tin liên hệ của team phát triển

## Giao diện người dùng

### 🎓 Giao diện Học viên (`student-interface.html`)
- Dashboard tổng quan
- Tìm kiếm và đặt lịch với gia sư
- Quản lý lịch học cá nhân
- Đánh giá và review gia sư
- Lịch sử học tập

### 👨‍🏫 Giao diện Gia sư (`tutor-interface.html`)
- Dashboard với thống kê dạy học
- **UA1_Đăng ký Gia sư**: Tạo hồ sơ gia sư mới (dạy miễn phí)
- **UA2_Tham gia khóa học**: Xác nhận vào lớp học và bắt đầu buổi dạy
- **UA3_Xem lịch dạy**: Quản lý lịch trình dạy học
- **UA4_Hủy lịch dạy**: Hủy buổi học với điều kiện thời gian
- Quản lý hồ sơ và thông tin cá nhân
- Lịch sử dạy học

### 🏢 Giao diện Trung tâm hỗ trợ sinh viên (`support-interface.html`)
- Dashboard với thống kê tổng hợp hệ thống
- **UA1_Duyệt gia sư**: Xét duyệt hồ sơ gia sư mới và quản lý quy trình phỏng vấn
- **UA2_Duyệt khóa học**: Phê duyệt khóa học mới do gia sư tạo
- **UA3_Xem thông tin tổng quan**: Thống kê tổng hợp về hoạt động hệ thống
- Quản lý lịch phỏng vấn và lịch sử duyệt

## Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Responsive Design**: Mobile-first approach

## Cấu trúc dự án

```
giasu-lang/
├── index.html              # Trang chủ
├── styles.css              # File CSS chính
├── script.js               # File JavaScript chính
├── student-interface.html  # Giao diện học viên
├── student-script.js       # JavaScript cho học viên
├── student-styles.css      # CSS cho học viên
├── tutor-interface.html    # Giao diện gia sư
├── tutor-script.js         # JavaScript cho gia sư
├── tutor-styles.css        # CSS cho gia sư
├── support-interface.html  # Giao diện trung tâm hỗ trợ sinh viên
├── support-script.js       # JavaScript cho trung tâm hỗ trợ
├── support-styles.css      # CSS cho trung tâm hỗ trợ
├── TUTOR_README.md         # Hướng dẫn sử dụng giao diện gia sư
├── SUPPORT_README.md       # Hướng dẫn sử dụng giao diện trung tâm hỗ trợ
└── README.md               # Tài liệu dự án
```

## Cài đặt và chạy

### Yêu cầu hệ thống
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet để tải fonts và icons

### Cách chạy
1. Clone hoặc tải xuống dự án
2. Mở file `index.html` trong trình duyệt web
3. Hoặc sử dụng live server để chạy local:
   ```bash
   # Nếu có Node.js
   npx live-server
   
   # Hoặc sử dụng Python
   python -m http.server 8000
   ```

## Cách sử dụng các giao diện

### Giao diện Học viên
1. Mở `index.html` và click "Đăng nhập"
2. Chọn vai trò "Học viên"
3. Nhập thông tin đăng nhập
4. Hệ thống sẽ chuyển hướng đến `student-interface.html`

### Giao diện Gia sư
1. Mở `index.html` và click "Đăng nhập"
2. Chọn vai trò "Gia sư"
3. Nhập thông tin đăng nhập
4. Hệ thống sẽ chuyển hướng đến `tutor-interface.html`

### Giao diện Trung tâm Hỗ trợ Sinh viên
1. Mở `index.html` và click "Đăng nhập"
2. Chọn vai trò "Trung tâm hỗ trợ sinh viên"
3. Nhập thông tin đăng nhập
4. Hệ thống sẽ chuyển hướng đến `support-interface.html`

Chi tiết hướng dẫn sử dụng giao diện gia sư xem tại [TUTOR_README.md](TUTOR_README.md)

Chi tiết hướng dẫn sử dụng giao diện trung tâm hỗ trợ sinh viên xem tại [SUPPORT_README.md](SUPPORT_README.md)

## Tính năng kỹ thuật

### Responsive Design
- Tương thích với tất cả kích thước màn hình
- Mobile-first approach
- Touch-friendly interface

### Performance
- Lazy loading cho hình ảnh
- Debounced search input
- Optimized animations

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast colors
- Focus indicators

### Interactive Features
- Smooth scrolling navigation
- Modal dialogs
- Form validation
- Real-time search and filtering
- Loading states
- Success/error messages

## Cấu hình và tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa các biến CSS trong file `styles.css`:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2980b9;
    --accent-color: #f39c12;
    --text-color: #2c3e50;
    --light-bg: #f8f9fa;
}
```

### Thêm gia sư mới
Chỉnh sửa mảng `tutorsData` trong file `script.js`:
```javascript
const tutorsData = [
    {
        id: 7,
        name: "Tên gia sư",
        subject: "Môn học - Khoa",
        rating: 4.5,
        reviews: 10,
        price: 150000,
        subjects: ["Môn 1", "Môn 2"],
        description: "Mô tả về gia sư",
        experience: "1 năm",
        avatar: "T"
    }
];
```

## User Story Map

### Gia sư
- **UA1_Đăng ký Gia sư**: Tạo hồ sơ gia sư mới (dạy miễn phí)
- **UA2_Tham gia khóa học**: Xác nhận vào lớp học và bắt đầu buổi dạy
- **UA3_Xem lịch dạy**: Quản lý lịch trình dạy học
- **UA4_Hủy lịch dạy**: Hủy buổi học với điều kiện thời gian

### Trung tâm Hỗ trợ Sinh viên
- **UA1_Duyệt gia sư**: Xét duyệt hồ sơ gia sư mới và quản lý quy trình phỏng vấn
- **UA2_Duyệt khóa học**: Phê duyệt khóa học mới do gia sư tạo
- **UA3_Xem thông tin tổng quan**: Thống kê tổng hợp về hoạt động hệ thống

### Học viên
- **UA1_Tìm kiếm gia sư**: Tìm kiếm và lọc gia sư phù hợp
- **UA2_Đặt lịch học**: Đặt lịch học với gia sư
- **UA3_Tham gia buổi học**: Xác nhận tham gia và đánh giá
- **UA4_Quản lý lịch học**: Xem và hủy lịch học

## Tính năng tương lai

- Hệ thống đặt lịch học nâng cao
- Tích hợp thanh toán online
- Ứng dụng mobile
- Hệ thống đánh giá và review chi tiết hơn
- Tích hợp với hệ thống quản lý sinh viên của trường

## Đóng góp

Dự án được phát triển bởi team 3bro. Để đóng góp:

1. Fork dự án
2. Tạo branch mới cho tính năng
3. Commit thay đổi
4. Push lên branch
5. Tạo Pull Request

## Liên hệ

- **Email**: contact@giasulang.edu.vn
- **Điện thoại**: 0123 456 789
- **Địa chỉ**: Đại học Văn Lang, TP.HCM

## License

Dự án này được phát triển cho mục đích học tập và nghiên cứu tại Đại học Văn Lang.

---

**Team 3bro** - Phát triển với ❤️ cho cộng đồng sinh viên Văn Lang 