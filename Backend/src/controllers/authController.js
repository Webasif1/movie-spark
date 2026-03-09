const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email or username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: { username, email, role },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log("Generated JWT Token:", token); // Debugging log
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ message: "Login successful", token, user });
};

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
}

async function logoutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");

  //** use mongoose to store data
  // await blacklistModel.create({
  //   token,
  // });

  //**use redis to store data */
  await redis.set(token,Date.now().toString(), "EX", 60 * 60)


  res.status(200).json({
    message: "logout successfully.",
  });
}

module.exports = { register, login, getMeController, logoutController };
