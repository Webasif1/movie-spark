const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  title: String,
  poster: String,
  media_type: String,
  vote_average: Number,
});

const watchSchema = new mongoose.Schema({
  tmdbId: Number,
  title: String,
  poster: String,
  mediaType: String,
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  favorites: [favoriteSchema],
  watchHistory: [watchSchema],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
