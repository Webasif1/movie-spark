const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true
  },
  title: String,
  poster_pat: String,
  media_type:String,
  vote_average:Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  favorites: [favoriteSchema]
});

module.exports = mongoose.model("User", userSchema);
