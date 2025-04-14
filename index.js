require("dotenv").config();
const express = require("express");
const http = require("http");
const ConnectDatabase = require("./config/db");
const app = require("./app");

const server = http.createServer(app);

// connect Database here
ConnectDatabase();
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
   
});
