# Hướng dẫn sử dụng Giao diện Gia sư - GiaSu Lang

## Tổng quan

Giao diện Gia sư được thiết kế dành riêng cho sinh viên Đại học Văn Lang đăng ký làm gia sư để hỗ trợ học tập cho các sinh viên khác. **Tất cả hoạt động dạy học đều hoàn toàn miễn phí**, tạo môi trường học tập cộng đồng và chia sẻ kiến thức.

## Các chức năng chính

### 1. Dashboard
- **Thống kê tổng quan**: Số buổi dạy hôm nay, học viên đang dạy, điểm đánh giá, giờ đã dạy
- **Thao tác nhanh**: Đăng ký gia sư, tham gia khóa học, xem lịch dạy, hủy lịch dạy
- **Lịch dạy hôm nay**: Danh sách các buổi học trong ngày

### 2. Đăng ký Gia sư (UA1)
**Mục đích**: Tạo hồ sơ gia sư mới để tham gia hệ thống dạy học miễn phí.

**Quy trình**:
1. Đăng nhập vào hệ thống
2. Nhấn "Đăng ký gia sư" từ Dashboard
3. Điền thông tin cá nhân (tên, email, số điện thoại)
4. Chọn khoa và năm học
5. Chọn các môn học có thể dạy
6. Mô tả kinh nghiệm dạy học
7. Thiết lập lịch dạy có thể
8. Gửi hồ sơ và chờ phê duyệt

**Quy tắc nghiệp vụ**:
- Phải có tài khoản hợp lệ
- Điền đầy đủ các trường bắt buộc
- Mỗi tài khoản chỉ được tạo một hồ sơ gia sư
- Dạy học hoàn toàn miễn phí, không thu phí từ học viên

### 3. Tham gia khóa học (UA2)

**Business Rules:**
- BR1: Học viên phải đăng nhập bằng tài khoản hợp lệ mới có quyền truy cập lớp học
- BR2: Học viên phải bấm "Xác nhận vào học" để được ghi nhận tham gia
- BR3: Khi kết thúc buổi dạy hệ thống cảnh báo hết thời gian dạy

**Các bước thực hiện:**
1. Click "Tham gia khóa học" trong Dashboard
2. Chọn khóa học muốn tham gia từ danh sách
3. Click "Bắt đầu" để xác nhận vào lớp học
4. Hệ thống sẽ bắt đầu buổi dạy và tự động kết thúc sau 2 giờ

### 4. Xem lịch dạy (UA3)

**Business Rules:**
- BR1: Lịch sử dạy thêm phải bao gồm đầy đủ thông tin
- BR2: Dữ liệu phải được hệ thống cập nhật tự động

**Các bước thực hiện:**
1. Click "Lịch dạy" trong menu navigation
2. Xem lịch theo tuần/tháng
3. Sử dụng nút "Tuần trước"/"Tuần sau" để di chuyển
4. Click vào sự kiện trong lịch để xem chi tiết

### 5. Hủy lịch dạy (UA4)

**Business Rules:**
- BR1: Gia sư chỉ được phép hủy những buổi học còn cách thời gian diễn ra ít nhất 12 giờ
- BR2: Lịch dạy chỉ bao gồm các buổi học sắp tới
- BR3: Nếu có thể dời buổi học, sẽ hiển thị tùy chọn chọn ngày học thay thế

**Các bước thực hiện:**
1. Click "Hủy lịch dạy" trong Dashboard
2. Chọn buổi học muốn hủy (chỉ hiển thị buổi học cách ít nhất 12 giờ)
3. Nhập lý do hủy (bắt buộc)
4. Chọn ngày học thay thế (nếu có)
5. Click "Gửi yêu cầu hủy"
6. Hệ thống sẽ thông báo cho học viên

## Các tính năng khác

### Hồ sơ gia sư
- Xem thông tin cá nhân và hồ sơ dạy học
- Chỉnh sửa thông tin (sẽ được phát triển)

### Lịch sử dạy
- Xem lại các buổi học đã hoàn thành
- Tìm kiếm và lọc theo môn học, trạng thái
- Xem đánh giá từ học viên

### Khóa học đang dạy
- Quản lý các khóa học hiện tại
- Xem thông tin học viên và lịch học
- Bắt đầu buổi dạy trực tiếp

## Cấu trúc file

```
tutor-interface.html    # Giao diện chính
tutor-styles.css        # CSS styling
tutor-script.js         # JavaScript functionality
```

## Responsive Design

Giao diện được thiết kế responsive và hoạt động tốt trên:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## Lưu ý

- Đây là phiên bản demo với dữ liệu mẫu
- Các chức năng backend sẽ được phát triển trong phiên bản tiếp theo
- Tất cả dữ liệu sẽ được lưu trữ và đồng bộ với server thực tế

## Hỗ trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ:
- Email: contact@giasulang.edu.vn
- Điện thoại: 0123 456 789