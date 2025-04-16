const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.FRONTEND_URL || `http://localhost:3000`,
  credentials: true,
  optionsuccessStatus: 200,
};
app.use(cors(corsOptions));

// import routes
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);

module.exports = app;
