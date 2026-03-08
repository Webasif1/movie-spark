const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/authRouter")
const favoriteRoutes = require("./routes/favoriteRoutes")
const watchRoutes = require("./routes/watchRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/favorites", favoriteRoutes);
app.use("/api/history", watchRoutes);


module.exports = app
