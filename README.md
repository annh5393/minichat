# 🗨️ Mini Realtime Chat

Ứng dụng chat realtime mini (text + socket.io) với **frontend React + Tailwind** và **backend Express + Socket.io**, chạy bằng **Docker Compose**.  

---

## 🚀 Chức năng
- Chat realtime giữa nhiều client
- Giao diện đẹp với hiệu ứng Tailwind + animation
- Sẵn sàng mở rộng để gửi ảnh, file
- Deploy dễ dàng với Docker

---

## 📂 Cấu trúc thư mục
## 📂 Cấu trúc thư mục

mini-realtime-chat/
│
├── backend/ # Server Express + Socket.io
│ ├── server.js
│ ├── package.json
│ └── Dockerfile
│
├── frontend/ # Client React + Vite + Tailwind
│ ├── src/
│ │ ├── main.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── components/
│ │ └── ChatBox.jsx
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── index.html
│
├── docker-compose.yml # Compose để chạy cả frontend & backend
├── .gitignore
└── README.md

Sao chép mã
⚠️ Lưu ý:

---

## ▶️ Cách chạy

### 1. Clone repo
```bash
git clone https://github.com/annh5393/minichat.git
cd minichat

2. Build & run bằng Docker Compose
docker-compose up --build

3. Truy cập

Frontend: 👉 http://localhost:3000

Backend API + Socket.io: 👉 http://localhost:5000

⚡ Công nghệ sử dụng

Frontend: React, Vite, Tailwind CSS

Backend: Node.js, Express, Socket.io

Container: Docker, Docker Compose

📌 Hướng phát triển

Hỗ trợ gửi ảnh, file

Thêm username/avatar cho người dùng

Deploy lên Render/Heroku/VPS
