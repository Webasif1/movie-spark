const User = require("../models/userModel");

const addWatchHistory = async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;

    const user = await User.findById(req.user._id);

    const exists = user.watchHistory.find(
      (movie) => movie.movieId === movieId
    );

    if (!exists) {
      user.watchHistory.unshift({ movieId, title, poster });
      // Keep only latest 20
      if (user.watchHistory.length > 20) user.watchHistory.pop();
      await user.save();
    }

    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchHistory);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addWatchHistory,
  getWatchHistory
};
