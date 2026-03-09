const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")

const app = express()


app.use(
  cors({
    origin: "https://movie-spark-backend.onrender.com",
    credentials: true
  })
);
app.use(express.json())
app.use(cookie())

const authRouter = require("./routes/authRouter")
const favoriteRoutes = require("./routes/favoriteRoutes")
const watchRoutes = require("./routes/watchRoutes")
const adminRoutes = require("./routes/adminRoute")

app.use("/api/auth", authRouter)
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watch-history", watchRoutes);
app.use("/api/admin", adminRoutes);


module.exports = app
