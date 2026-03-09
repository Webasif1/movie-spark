const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/adminMovieController");

const {
  getUsers,
  banUser,
  unbanUser,
  deleteUser,
} = require("../controllers/adminUserController");


// MOVIES
router.get("/movies", auth, isAdmin, getMovies);
router.post("/movies", auth, isAdmin, createMovie);
router.put("/movies/:id", auth, isAdmin, updateMovie);
router.delete("/movies/:id", auth, isAdmin, deleteMovie);


// USERS
router.get("/users", auth, isAdmin, getUsers);
router.patch("/users/:id/ban", auth, isAdmin, banUser);
router.patch("/users/:id/unban", auth, isAdmin, unbanUser);
router.delete("/users/:id", auth, isAdmin, deleteUser);

module.exports = router;
