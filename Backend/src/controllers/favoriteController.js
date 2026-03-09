const userModel = require("../models/userModel");

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // or req.user._id depending on your JWT

    const { movieId, title, poster_path, media_type, vote_average } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = user.favorites.find((movie) => movie.movieId === movieId);
    if (exists) return res.status(400).json({ message: "Already added" });

    user.favorites.push({
      movieId,
      title,
      poster: poster_path,
      media_type,
      vote_average,
    });


    await user.save();

    res.json(user.favorites);
  } catch (error) {
    console.error(error); // log actual error
    res.status(500).json({ message: "Server error" });
  }
};


const getFavorites = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    // Use the correct key from JWT
    const userId = req.user.id || req.user._id;

    // Parse movieId from params
    const movieId = Number(req.params.movieId);

    // Find user
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out the movie
    user.favorites = user.favorites.filter(
      (movie) => movie.movieId !== movieId
    );

    await user.save();

    res.json(user.favorites);
  } catch (error) {
    console.error(error); // log actual error
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};
