const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"]
  },

  password: {
    type: String,
    required: true
  },

  favorites: [
    {
      movieId: Number,
      title: String,
      poster: String
    }
  ],
  watchHistory: [
  {
    movieId: Number,
    title: String,
    poster: String,
    watchedAt: {
      type: Date,
      default: Date.now
    }
  }
]

});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel
