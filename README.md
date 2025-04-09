# 🛒 TAHshop

TAHshop is a full-stack e-commerce application built using Node.js, Express, and MongoDB. It is designed to be a foundation for online retail stores, with backend functionality for managing users, products, orders, and secure authentication using JWT

vietnamese: 

TAHshop là một ứng dụng thương mại điện tử full-stack được xây dựng bằng Node.js, Express và MongoDB. Ứng dụng này được thiết kế để trở thành nền tảng cho các cửa hàng bán lẻ trực tuyến, với các chức năng backend như quản lý người dùng, sản phẩm, đơn hàng và xác thực bảo mật bằng JWT

---

## 📦 Features

- User authentication with JWT
- Product management
- Order processing
- MongoDB for database storage
- Environment-based configuration
- Ready for REST API integration with frontend

---

## 🚀 Getting Started

### Step 1: Install Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Step 2: Clone the Repository

if you use cmd on Windowns, you can use the command belew:

git clone https://github.com/your-username/TAHshop.git
cd TAHshop

### Step 3: Install Dependencies

Go to the folder you want to use and type(go to frontend folder and do the same) :

npm install

### Step 4: Set Up Environment Variables

Create a .env file in the root of the project:

example from mine:
"PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/TAHstore
JWT_SECRET=hianng2601
NODE_ENV=development"

### Step 5: Run the Server

run cmd: npm run dev

The server should be running at http://localhost:5000.

🛠️ Future Improvements

- Payment gateway integration (e.g., PayPal, ZaloPay, ...)

🧑‍💻 Author
Trần Anh Hào
Feel free to contribute, fork, or reach out for collaboration!



