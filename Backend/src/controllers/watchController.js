const User = require("../models/userModel");

const addToHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const { tmdbId, title, poster, mediaType } = req.body;

    const user = await User.findById(userId);

    const exists = user.watchHistory.find(
      (item) => item.tmdbId === tmdbId
    );

    if (exists) {
      exists.watchedAt = new Date();
    } else {
      user.watchHistory.unshift({
        tmdbId,
        title,
        poster, // IMPORTANT
        mediaType,
        watchedAt: new Date(),
      });
    }

    await user.save();

    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const clearHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.watchHistory = [];

    await user.save();

    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToHistory,
  getHistory,
  clearHistory
};
