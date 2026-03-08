const User = require("../models/userModel");

const addFavorite = async (req, res) => {

  try {

    const { movieId, title, poster } = req.body;

    const user = await User.findById(req.user._id);

    const exists = user.favorites.find(
      (movie) => movie.movieId === movieId
    );

    if (exists) {
      return res.status(400).json({ message: "Already added" });
    }

    user.favorites.push({ movieId, title, poster });

    await user.save();

    res.json(user.favorites);

  } catch (error) {
    res.status(500).json(error);
  }

};

const getFavorites = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    res.json(user.favorites);

  } catch (error) {
    res.status(500).json(error);
  }

};

const removeFavorite = async (req, res) => {

  try {

    const movieId = Number(req.params.movieId);

    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (movie) => movie.movieId !== movieId
    );

    await user.save();

    res.json(user.favorites);

  } catch (error) {
    res.status(500).json(error);
  }

};

module.exports = { addFavorite, getFavorites, removeFavorite };
