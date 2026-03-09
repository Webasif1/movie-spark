const userModel = require("../models/userModel")
const isAdmin = async (req, res, next) => {
  const userId = req.user.id
  const user = await userModel.findById(userId);
  if (!user|| user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};

module.exports = isAdmin;
