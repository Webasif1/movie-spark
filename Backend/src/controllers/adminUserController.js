const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const banUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { isBanned: true },
      { new: true },
    );
    if (!user) return res.status(404).json({ message: "userModel not found" });
    res.json({ message: "userModel banned", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const unbanUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { isBanned: false },
      { new: true },
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to unban user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    res.json({ message: "userModel deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getUsers,
  banUser,
  unbanUser,
  deleteUser,
};
