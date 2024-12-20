import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Middleware xác thực token
const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user theo ID từ token và loại bỏ password khỏi kết quả
      req.user = await User.findById(decoded.userID).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found.");
      }

      next(); // Chuyển sang middleware tiếp theo
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token provided.");
  }
});

// Middleware kiểm tra quyền admin
const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Nếu là admin, tiếp tục xử lý
  } else {
    res.status(403).send("Not authorized as an admin."); // Trả lỗi "403 Forbidden"
  }
};

export { authenticate, authorizedAdmin };
