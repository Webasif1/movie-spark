const express = require("express");
const { register, login, getMeController, logoutController } =  require("../controllers/authController");
const authMiddleware =require("../middleware/auth.middleware")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-me", authMiddleware, getMeController);
router.get("/logout",authMiddleware, logoutController)

module.exports = router;
