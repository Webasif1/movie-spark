const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
{
  title: { type: String, required: true },
  description: String,
  poster: String,
  genre: String,
  trailerLink: String,
  releaseDate: Date,
},
{ timestamps: true }
);

const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel
