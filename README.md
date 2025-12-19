# ☁️ Upload Service – Canvas Backend (Microservice)

## 📌 Tổng quan

**Upload Service** là một **microservice độc lập** trong hệ thống **Canvas**, chịu trách nhiệm quản lý toàn bộ các nghiệp vụ liên quan đến **tài nguyên hình ảnh** của người dùng, bao gồm:

* Upload ảnh thủ công từ thiết bị người dùng
* Quản lý bộ sưu tập ảnh phục vụ thiết kế
* Tích hợp **AI Image Generation** để tạo ảnh từ prompt
* Cung cấp API cho frontend và các service khác thông qua **API Gateway**

Service này đóng vai trò quan trọng trong việc đảm bảo trải nghiệm thiết kế mượt mà, nhanh chóng và có khả năng mở rộng cao.

🔗 Repository: [https://github.com/nam-Space/upload-service-canvas-be](https://github.com/nam-Space/upload-service-canvas-be)

---

## 🎯 Mục tiêu của service

* Tách biệt nghiệp vụ upload & xử lý ảnh khỏi các service khác
* Dễ dàng mở rộng thêm các loại media (video, SVG, template)
* Tối ưu lưu trữ và băng thông
* Áp dụng tư duy **Single Responsibility Principle** trong Microservice

---

## 🧩 Vai trò trong kiến trúc Microservice

```
Frontend (Canvas FE)
        │
        ▼
API Gateway Service
        │
        ▼
Upload Service  ──► Cloud Storage / AI Service
```

Upload Service **không giao tiếp trực tiếp với frontend**, mà thông qua **API Gateway** để đảm bảo bảo mật, logging và kiểm soát truy cập.

---

## 🚀 Công nghệ sử dụng

### Backend Core

* **Node.js** – Runtime
* **Express.js** – RESTful API
* **JavaScript / TypeScript** (tuỳ cấu hình repo)

### Media & Storage

* **Cloudinary** / Cloud Storage
* **Multer** – Xử lý multipart/form-data

### AI Integration

* AI Image Generation API (Text → Image)
* Prompt-based image creation

### Khác

* **dotenv** – Quản lý biến môi trường
* **UUID** – Tạo định danh tài nguyên
* **Axios / Fetch** – Gọi external API

---

## 📂 Cấu trúc thư mục

```bash
upload-service-canvas-be/
├── src/
│   ├── controllers/          # Xử lý request/response
│   ├── routes/               # Định nghĩa API endpoints
│   ├── services/             # Business logic (upload, AI)
│   ├── middlewares/          # Validate, error handling
│   ├── utils/                # Helper functions
│   ├── config/               # Cloudinary, AI config
│   └── app.js / server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🖼️ Các chức năng chính

### 1️⃣ Upload ảnh từ người dùng

* Nhận file ảnh từ frontend
* Validate:

  * Loại file (jpg, png, webp, ...)
  * Dung lượng
* Upload lên Cloud Storage
* Trả về URL ảnh

```http
POST /upload/image
```

---

### 2️⃣ Quản lý bộ sưu tập ảnh (Image Library)

* Lưu metadata ảnh:

  * URL
  * Owner (userId)
  * Thời gian upload
* Cho phép frontend load lại ảnh đã upload

```http
GET /upload/images
```

---

### 3️⃣ Tạo ảnh bằng AI (AI Image Generation)

* Người dùng nhập prompt
* Service gọi AI API
* Nhận ảnh sinh ra
* Lưu ảnh vào storage
* Trả về URL cho frontend

```http
POST /upload/ai-generate
```

---

## 🔐 Authentication & Authorization

* Request từ frontend **luôn đi qua API Gateway**
* Gateway inject thông tin user (userId, role)
* Upload Service kiểm tra quyền truy cập
* Mỗi tài nguyên ảnh gắn với **chủ sở hữu**

---

## 📥 Luồng upload ảnh chi tiết

```
User → Frontend → API Gateway → Upload Service → Cloud Storage
                                      ↓
                               Save metadata
```

---

## ⚙️ Cấu hình môi trường (.env)

```env
PORT=4003

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Service
AI_API_KEY=your_ai_api_key
AI_API_URL=https://api.ai-provider.com
```

---

## ▶️ Cài đặt & Chạy service

### 1️⃣ Clone repository

```bash
git clone https://github.com/nam-Space/upload-service-canvas-be.git
cd upload-service-canvas-be
```

---

### 2️⃣ Cài đặt dependencies

```bash
npm install
```

---

### 3️⃣ Chạy development

```bash
npm run dev
```

Service chạy tại:

```
http://localhost:4003
```

---

## 🧪 Test API (gợi ý)

* Sử dụng Postman / Thunder Client
* Gửi request multipart/form-data
* Test upload ảnh & AI generation

---

## 🔒 Bảo mật & Best Practices

* Giới hạn dung lượng upload
* Validate định dạng file
* Không expose API key
* Logging lỗi tập trung

---

## 🚀 Hướng phát triển trong tương lai

* Upload video / SVG
* Image compression & optimization
* CDN caching
* Batch upload
* AI style transfer

---

## 👨‍💻 Tác giả

* **Nam Nguyen**
* GitHub: [https://github.com/nam-Space](https://github.com/nam-Space)

---

## 📄 License

Service được xây dựng cho mục đích **học tập, nghiên cứu kiến trúc microservice và xử lý media trong hệ thống Canvas**.
