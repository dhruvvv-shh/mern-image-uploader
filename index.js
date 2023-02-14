require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const viewImages = require("./routes/services")
const addImages = require("./routes/addImages")
const viewCount = require("./routes/viewImageCount")
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/image/add", addImages)
app.use("/api/view/images", viewImages)
app.use("/api/update/view", viewCount)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
