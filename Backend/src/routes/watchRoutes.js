const express = require("express");
const router = express.Router();

const {
  addToHistory,
  getHistory,
  clearHistory
} = require("../controllers/watchController");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware, getHistory);
router.post("/", authMiddleware, addToHistory);
router.delete("/", authMiddleware, clearHistory);

module.exports = router;
