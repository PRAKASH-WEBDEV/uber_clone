const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
const connectToDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
app.use(express.json());

connectToDB();


const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

module.exports = app;
