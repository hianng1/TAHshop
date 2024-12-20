import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utilities/createToken.js";

// Tạo user mới
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra nếu không có đủ thông tin
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs!!");
  }

  // Kiểm tra xem user đã tồn tại chưa
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Tạo user mới
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Lưu user và trả về response
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user. Please try again." });
  }
});

// Đăng nhập user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra nếu không cung cấp đủ thông tin
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password!!");
  }

  // Tìm user theo email
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // So sánh mật khẩu
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (isPasswordValid) {
    createToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const logoutCurrentUser = asyncHandler(async(req,res) =>{
  res.cookie('jwt', '' ,{
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({message: "logged out success!!"});
});

const getAllUsers = asyncHandler(async (req,res) => {
  const users = await User.find({})
  res.json(users)
})
export { createUser, loginUser ,logoutCurrentUser, getAllUsers};
