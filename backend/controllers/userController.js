import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utilities/createToken.js";

// Tạo user mới
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra nếu không có đủ thông tin
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs!!");
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Please provide a valid email address");
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
    generateToken(res, newUser._id);
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
    generateToken(res, existingUser._id);
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

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out success!!" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateCurrentProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword
    }
    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user){
    if(user.isAdmin){
      res.status(400)
      throw new Error("Can't delete admin")
    }
    await User.deleteOne({_id: user._id})
    res.json({message: "user removed!"})
  }else {
    res.status(404)
    throw new Error("User not found")
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if(user) {
    res.json(user)
  }else {
    res.status(404)
    throw new Error("User not found")
  }
});

const updateUserById = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)
  if(user){
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()
    res.json({
      _id:updatedUser._id,
      username:updatedUser.username,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
});
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentProfile,
  deleteUserById,
  getUserById,
  updateUserById
};
