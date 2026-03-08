const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  addWatchHistory,
  getWatchHistory,
} = require("../controllers/watchController.js");

const router = express.Router();

router.post("/", authMiddleware, addWatchHistory);
router.get("/", authMiddleware, getWatchHistory);

module.exports = router;
