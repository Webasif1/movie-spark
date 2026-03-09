const express = require("express");
const router = express.Router();

const {
  addFavorite,
  getFavorites,
  removeFavorite
} = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/:movieId", authMiddleware, removeFavorite);

module.exports = router;
