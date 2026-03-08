const express = require("express");
const authMiddleware = require("../middleware/auth.middleware.js");
const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require("../controllers/favoriteController.js");

const router = express.Router();

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/:movieId", authMiddleware, removeFavorite);

module.exports = router;
