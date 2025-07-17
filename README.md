# 🛒 TAHshop

TAHshop is a full-stack e-commerce application built with modern web technologies. The project features a Node.js/Express backend with MongoDB database and a React frontend with Vite build tool, designed to provide a complete online shopping experience.

**Vietnamese:** TAHshop là một ứng dụng thương mại điện tử full-stack được xây dựng bằng các công nghệ web hiện đại. Dự án có backend Node.js/Express với cơ sở dữ liệu MongoDB và frontend React với công cụ build Vite, được thiết kế để cung cấp trải nghiệm mua sắm trực tuyến hoàn chỉnh.

---

## 🏗️ Architecture

### Backend (`/backend`)
- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with HTTP-only cookies
- **File Upload:** Multer for image handling
- **Structure:** MVC pattern with separate routes, controllers, models, and middlewares

### Frontend (`/frontend`)
- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit with RTK Query
- **Build Tool:** Vite for fast development and optimized builds

---

## 📦 Features

### Backend Features
- **User Management:**
  - User registration and authentication
  - JWT-based secure login/logout
  - Admin role authorization
  - User profile management
  - Password encryption

- **Product Management:**
  - CRUD operations for products
  - Category management system
  - Image upload functionality (JPEG, PNG, WebP)
  - File storage in `/uploads` directory

- **API Endpoints:**
  - `/api/users` - User management
  - `/api/category` - Category operations
  - `/api/products` - Product management
  - `/api/upload` - File upload handling

- **Security Features:**
  - JWT token authentication
  - Admin authorization middleware
  - Cookie-based session management
  - Input validation and sanitization

### Frontend Features
- **Modern React Setup:**
  - Component-based architecture
  - Responsive design with Tailwind CSS
  - Form handling with controlled components
  - API integration with RTK Query

- **User Interface:**
  - Category management forms
  - Image upload interface
  - Admin dashboard components
  - Responsive design for all devices

---

## 🛠️ Technology Stack

### Backend Dependencies
- **Core:** Express.js, Node.js
- **Database:** MongoDB, Mongoose
- **Authentication:** jsonwebtoken, bcryptjs
- **File Upload:** Multer
- **Utilities:** dotenv, cookie-parser, cors
- **Development:** nodemon

### Frontend Dependencies
- **Core:** React, Vite
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** Redux Toolkit, RTK Query
- **Development:** ESLint, Vite dev server

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/TAHshop.git
   cd TAHshop
   ```

2. **Install Backend Dependencies**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/TAHstore
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

5. **Start the Application**
   
   **Backend (from root directory):**
   ```bash
   npm run dev
   ```
   Server runs at: `http://localhost:5000`
   
   **Frontend (from frontend directory):**
   ```bash
   cd frontend
   npm run dev
   ```
   Client runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
TAHshop/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers
│   ├── middlewares/     # Custom middleware (auth, etc.)
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── utilities/       # Helper functions
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/             # React source code
│   ├── public/          # Static assets
│   ├── index.html       # HTML template
│   └── vite.config.js   # Vite configuration
├── uploads/             # Uploaded images storage
├── .env                 # Environment variables
└── package.json         # Root dependencies
```

---

## 🔐 API Endpoints

### Authentication & Users
- `POST /api/users` - Register new user
- `POST /api/users/auth` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user by ID (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Categories
- `GET /api/category/categories` - Get all categories
- `POST /api/category` - Create new category (Admin only)
- `PUT /api/category/:id` - Update category (Admin only)
- `DELETE /api/category/:id` - Delete category (Admin only)

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### File Upload
- `POST /api/upload` - Upload product images

---

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Admin Authorization:** Role-based access control
- **Password Hashing:** Bcrypt for secure password storage
- **HTTP-only Cookies:** Secure token storage
- **File Type Validation:** Only allows image uploads (JPEG, PNG, WebP)
- **Input Sanitization:** Protection against malicious inputs

---

## 🛠️ Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Structure Guidelines
- Follow MVC pattern for backend
- Use functional components with hooks for React
- Implement proper error handling
- Maintain consistent code formatting
- Use TypeScript-style JSDoc comments

---

## 🚀 Future Improvements

- **Payment Integration:** PayPal, Stripe, ZaloPay
- **Order Management:** Shopping cart, order tracking
- **Email Notifications:** Order confirmations, password reset
- **Search & Filtering:** Advanced product search
- **Reviews & Ratings:** Product review system
- **Inventory Management:** Stock tracking
- **Mobile App:** React Native implementation
- **Performance:** Caching, CDN integration
- **Testing:** Unit and integration tests

---

## 🧑‍💻 Author

**Trần Anh Hào**

Feel free to contribute, fork, or reach out for collaboration!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



