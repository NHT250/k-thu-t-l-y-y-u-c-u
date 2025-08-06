# Hướng dẫn sử dụng Giao diện Trung tâm Hỗ trợ Sinh viên - GiaSu Lang

## Tổng quan

Giao diện Trung tâm Hỗ trợ Sinh viên được thiết kế dành riêng cho nhân viên trung tâm hỗ trợ sinh viên của Đại học Văn Lang để quản lý và duyệt các hồ sơ gia sư và khóa học. Giao diện này thực hiện 3 chức năng chính theo User Story Map:

1. **UA1_Duyệt gia sư** - Xét duyệt hồ sơ gia sư mới và quản lý quy trình phỏng vấn
2. **UA2_Duyệt khóa học** - Phê duyệt khóa học mới do gia sư tạo
3. **UA3_Xem thông tin tổng quan** - Thống kê tổng hợp về hoạt động hệ thống

## Cách truy cập

1. Mở file `index.html` trong trình duyệt
2. Click "Đăng nhập" ở góc trên bên phải
3. Chọn vai trò "Trung tâm hỗ trợ sinh viên"
4. Nhập email và mật khẩu
5. Click "Đăng nhập"
6. Hệ thống sẽ tự động chuyển hướng đến `support-interface.html`

## Các chức năng chính

### 1. Trang Tổng quan (UA3)

**Mục đích**: Hiển thị thông tin tổng hợp về hoạt động của hệ thống GiaSu Lang.

**Quy tắc nghiệp vụ**:
- BR1: Các số liệu thống kê hiển thị trong trang Tổng quan phải được cập nhật theo thời gian thực hoặc định kỳ (theo cấu hình hệ thống), đảm bảo dữ liệu luôn chính xác khi người dùng truy cập.

**Các chỉ số hiển thị**:
- Tổng số hồ sơ gia sư
- Số hồ sơ đã duyệt / chưa duyệt
- Số khóa học đã tạo / đang chờ duyệt / đã duyệt

**Thao tác nhanh**:
- Duyệt gia sư: Chuyển đến trang duyệt gia sư
- Duyệt khóa học: Chuyển đến trang duyệt khóa học
- Xem lịch sử: Chuyển đến trang lịch sử

**Hoạt động gần đây**:
- Hiển thị các hoạt động duyệt gần nhất
- Thời gian thực hiện
- Loại hoạt động (duyệt hồ sơ, duyệt khóa học, tạo lịch phỏng vấn)

### 2. Duyệt gia sư (UA1)

**Mục đích**: Xét duyệt hồ sơ gia sư mới và quản lý quy trình phỏng vấn theo quy định.

**Quy tắc nghiệp vụ**:
- BR1: Lịch phỏng vấn bắt buộc phải được tạo và gửi thông qua hệ thống trung tâm, không hẹn riêng qua kênh ngoài (zalo, fb…).
- BR2: Nhân viên trung tâm không được phê duyệt hồ sơ gia sư nếu ứng viên chưa trải qua buổi phỏng vấn chính thức (theo lịch hẹn từ hệ thống).

**Quy trình thực hiện**:

#### 2.1 Xét duyệt hồ sơ
1. Truy cập mục "Hồ sơ gia sư chờ duyệt"
2. Xem thông tin chi tiết từng hồ sơ
3. Đánh giá tính hợp lệ của hồ sơ

#### 2.2 Gửi lịch hẹn phỏng vấn
1. Nhấn vào tạo lịch hẹn phỏng vấn
2. Chọn ngày giờ phỏng vấn
3. Chọn hình thức phỏng vấn (Online/Offline)
4. Nhập ghi chú cho ứng viên
5. Nhấn "Gửi lịch hẹn"
6. Ứng viên nhận thông báo phỏng vấn online

#### 2.3 Xác nhận duyệt
1. Xác nhận duyệt hồ sơ gia sư đã phỏng vấn
2. Hệ thống hiển thị hồ sơ đã duyệt

#### 2.4 Gửi kết quả thông báo
1. Gửi thông báo cho gia sư "Hồ sơ gia sư của bạn đã được duyệt"
2. Hiển thị hồ sơ đã duyệt

#### 2.5 Xem lịch sử hồ sơ
1. Hiển thị tất cả kết quả mục "Lịch sử hồ sơ gia sư"
2. Xem được thông tin chi tiết của hồ sơ bất kỳ

**Các tab quản lý**:
- **Hồ sơ chờ duyệt**: Danh sách hồ sơ mới nộp
- **Lịch phỏng vấn**: Quản lý lịch phỏng vấn đã tạo
- **Đã duyệt**: Danh sách hồ sơ đã được phê duyệt

### 3. Duyệt khóa học (UA2)

**Mục đích**: Phê duyệt khóa học mới do gia sư tạo và quản lý danh sách khóa học.

**Quy tắc nghiệp vụ**:
- BR1: Chỉ tài khoản nhân viên trung tâm mới được truy cập mục "Khóa học chờ duyệt" và thực hiện thao tác phê duyệt hoặc từ chối khóa học.
- BR2: Nhân viên trung tâm chỉ được phê duyệt khóa học khi thông tin khóa học đã được kiểm tra đầy đủ và hợp lệ, bao gồm: tên, mô tả, lịch học, học phí, đối tượng, hình thức học.
- BR3: Khóa học chỉ được hiển thị công khai trên hệ thống học viên sau khi nhân viên trung tâm nhấn phê duyệt; hệ thống tự động gửi thông báo đến Gia sư ngay sau khi duyệt.

**Quy trình thực hiện**:

#### 3.1 Truy cập danh sách khóa học chờ duyệt
1. Chọn menu "Khóa học"
2. Nhấn vào mục "Khóa học chờ duyệt"
3. Hệ thống hiển thị danh sách các khóa học do Gia sư gửi lên

#### 3.2 Kiểm tra thông tin khóa học
1. Nhấn vào nút "Xem"
2. Kiểm tra các nội dung khóa học:
   - Tên khóa học
   - Mô tả
   - Lịch học
   - Thời lượng
   - Số học viên tối đa
   - Gia sư phụ trách

#### 3.3 Phê duyệt khóa học
1. Nhấn nút "Phê duyệt"
2. Hệ thống:
   - Hiển thị khóa học trên trang học viên
   - Gửi thông báo cho Gia sư: "Khóa học của bạn đã được duyệt và hiển thị"

#### 3.4 Xem lịch sử khóa học
1. Hiển thị tất cả kết quả mục "Lịch sử khóa học"
2. Xem được thông tin chi tiết của khóa học bất kỳ

**Các tab quản lý**:
- **Khóa học chờ duyệt**: Danh sách khóa học mới tạo
- **Khóa học đã duyệt**: Danh sách khóa học đã được phê duyệt

### 4. Lịch sử

**Mục đích**: Xem lại lịch sử duyệt hồ sơ và khóa học.

**Tính năng**:
- Tìm kiếm theo tên, email
- Lọc theo loại (Hồ sơ gia sư / Khóa học)
- Lọc theo trạng thái (Đã duyệt / Từ chối)
- Hiển thị thông tin chi tiết về mỗi hoạt động

## Cấu trúc file

```
support-interface.html    # Giao diện chính
support-styles.css        # CSS cho giao diện
support-script.js         # JavaScript xử lý logic
SUPPORT_README.md         # Hướng dẫn sử dụng
```

## Tính năng kỹ thuật

### Responsive Design
- Tương thích với desktop, tablet và mobile
- Layout tự động điều chỉnh theo kích thước màn hình
- Navigation menu ẩn trên mobile

### Modal Windows
- Modal tạo lịch phỏng vấn
- Modal xem chi tiết hồ sơ gia sư
- Modal xem chi tiết khóa học

### Data Management
- Dữ liệu mẫu được lưu trong JavaScript
- Mô phỏng API calls cho các thao tác CRUD
- Cập nhật real-time cho thống kê

### User Experience
- Loading states cho các thao tác
- Thông báo thành công/lỗi
- Xác nhận trước khi thực hiện các hành động quan trọng
- Tìm kiếm và lọc dữ liệu

## Business Rules Implementation

### UA1 - Duyệt gia sư
- ✅ Bắt buộc tạo lịch phỏng vấn qua hệ thống
- ✅ Không thể duyệt hồ sơ chưa phỏng vấn
- ✅ Quy trình phỏng vấn được quản lý chặt chẽ

### UA2 - Duyệt khóa học
- ✅ Chỉ nhân viên trung tâm có quyền duyệt
- ✅ Kiểm tra đầy đủ thông tin trước khi duyệt
- ✅ Tự động hiển thị và thông báo sau khi duyệt

### UA3 - Thông tin tổng quan
- ✅ Cập nhật thống kê real-time
- ✅ Hiển thị đầy đủ các chỉ số quan trọng
- ✅ Truy cập nhanh đến các chức năng chính

## Hướng dẫn sử dụng chi tiết

### Đăng nhập và truy cập
1. Mở trình duyệt và truy cập `index.html`
2. Click "Đăng nhập" ở góc trên bên phải
3. Chọn vai trò "Trung tâm hỗ trợ sinh viên"
4. Nhập thông tin đăng nhập
5. Click "Đăng nhập" để vào giao diện quản lý

### Quản lý hồ sơ gia sư
1. Từ trang tổng quan, click "Duyệt gia sư"
2. Chọn tab "Hồ sơ chờ duyệt"
3. Xem danh sách hồ sơ mới nộp
4. Click "Xem chi tiết" để xem thông tin đầy đủ
5. Click "Tạo lịch phỏng vấn" để lên lịch
6. Sau khi phỏng vấn, click "Duyệt" hoặc "Từ chối"

### Quản lý khóa học
1. Từ trang tổng quan, click "Duyệt khóa học"
2. Chọn tab "Khóa học chờ duyệt"
3. Xem danh sách khóa học mới tạo
4. Click "Xem chi tiết" để kiểm tra thông tin
5. Click "Duyệt" hoặc "Từ chối" sau khi đánh giá

### Xem lịch sử
1. Từ navigation, click "Lịch sử"
2. Sử dụng thanh tìm kiếm để tìm kiếm nhanh
3. Sử dụng bộ lọc để lọc theo loại và trạng thái
4. Xem chi tiết từng hoạt động

## Lưu ý quan trọng

1. **Bảo mật**: Chỉ nhân viên trung tâm có quyền truy cập giao diện này
2. **Quy trình**: Tuân thủ đúng quy trình phỏng vấn trước khi duyệt
3. **Dữ liệu**: Kiểm tra kỹ thông tin trước khi phê duyệt
4. **Thông báo**: Hệ thống tự động gửi thông báo cho gia sư
5. **Lịch sử**: Tất cả hoạt động đều được ghi lại để theo dõi

## Tương lai

- Tích hợp với hệ thống email để gửi thông báo tự động
- Thêm tính năng xuất báo cáo
- Tích hợp với hệ thống quản lý sinh viên của trường
- Thêm tính năng chat hỗ trợ real-time
- Tích hợp với hệ thống thanh toán (nếu có)