const movieModel = require("../models/movies.model");

const getMovies = async (req, res) => {
  try {
    const movies = await movieModel.find().sort({ createdAt: -1 });

    res.json({ movies });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await movieModel.create(req.body);

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to create movie" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to update movie" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);

    res.json({ message: "movieModel deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie" });
  }
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
